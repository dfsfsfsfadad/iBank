import * as Location from 'expo-location';

export type Branch = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  distM: number;
  hours?: string;
};

type Point = { lat: number; lon: number };

// Орналасу алынбаса қолданылатын орталық (Алматы)
export const DEFAULT_CENTER: Point = { lat: 43.238949, lon: 76.889709 };

// Негізгі сервер жауап бермесе, екінші айна қолданылады
const ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
];

type OverpassElement = {
  type: 'node' | 'way' | 'relation';
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
};

// Haversine: екі нүкте арасындағы қашықтық (метр)
export function distanceM(a: Point, b: Point): number {
  const R = 6371000;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export const fmtDist = (m: number) =>
  m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(1)} km`;

// Пайдаланушының орналасуы. Рұқсат жоқ / алынбаса → DEFAULT_CENTER
export async function getCenter(): Promise<{ center: Point; gps: boolean }> {
  const fallback = { center: DEFAULT_CENTER, gps: false };
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return fallback;

    // getCurrentPositionAsync кейбір Android құрылғыларда қатып қалады, сондықтан timeout бар
    const timeout = new Promise<null>(resolve => setTimeout(() => resolve(null), 8000));
    const pos =
      (await Promise.race([
        Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }),
        timeout,
      ])) ?? (await Location.getLastKnownPositionAsync());

    if (pos) return { center: { lat: pos.coords.latitude, lon: pos.coords.longitude }, gps: true };
  } catch {
    // fallback
  }
  return fallback;
}

function parse(elements: OverpassElement[], center: Point): Branch[] {
  const list: Branch[] = [];
  for (const el of elements) {
    const lat = el.lat ?? el.center?.lat;
    const lon = el.lon ?? el.center?.lon;
    if (lat === undefined || lon === undefined) continue;
    const t = el.tags ?? {};
    const street = [t['addr:street'], t['addr:housenumber']].filter(Boolean).join(' ');
    list.push({
      id: `${el.type}/${el.id}`,
      name: t.name ?? t.brand ?? t.operator ?? 'Bank',
      address: street,
      lat,
      lon,
      distM: distanceM(center, { lat, lon }),
      hours: t.opening_hours,
    });
  }
  return list.sort((a, b) => a.distM - b.distM).slice(0, 40);
}

async function post(url: string, body: string): Promise<OverpassElement[]> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 20000);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.elements ?? [];
  } finally {
    clearTimeout(timer);
  }
}

// Overpass API: радиус ішіндегі amenity=bank (node және way)
export async function fetchBanks(center: Point, radius = 5000): Promise<Branch[]> {
  const around = `(around:${radius},${center.lat},${center.lon})`;
  const query =
    `[out:json][timeout:20];(node["amenity"="bank"]${around};way["amenity"="bank"]${around};);out center 60;`;
  const body = 'data=' + encodeURIComponent(query);

  let lastError: unknown = new Error('No response');
  for (const url of ENDPOINTS) {
    try {
      return parse(await post(url, body), center);
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError;
}

// Бөлімшені OpenStreetMap-та ашу үшін сілтеме
export const osmUrl = (b: Branch) =>
  `https://www.openstreetmap.org/?mlat=${b.lat}&mlon=${b.lon}#map=17/${b.lat}/${b.lon}`;