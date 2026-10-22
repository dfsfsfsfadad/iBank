import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { homeActions } from '../data/homeActions';
import { useNavigation } from '../navigation/NavigationContext';
import { colors, radius } from '../theme';

const TABS = [
  { id: 'home', icon: 'home' },
  { id: 'search', icon: 'search' },
  { id: 'mail', icon: 'mail-outline' },
  { id: 'profile', icon: 'person-outline' },
] as const;

export function HomeScreen() {
  const { navigate } = useNavigation();
  const [tab, setTab] = useState('home');

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: 'transparent' }}>
        <LinearGradient colors={[colors.primary, colors.primaryDark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
          <View style={styles.headerTop}>
            <View style={styles.avatar}><Ionicons name="person" size={20} color={colors.white} /></View>
            <View style={{ flex: 1, marginLeft: 12 }}><Text style={styles.hi}>Hi, Puth Puttichai</Text></View>
            <TouchableOpacity style={styles.iconBtn}><Ionicons name="scan-outline" size={20} color={colors.white} /></TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}><Ionicons name="settings-outline" size={20} color={colors.white} /></TouchableOpacity>
          </View>
          <View style={styles.visa}>
            <View style={styles.visaStrip} />
            <Text style={styles.visaName}>John Smith</Text>
            <Text style={styles.visaTier}>Amazon Premium</Text>
            <Text style={styles.visaNum}>4755&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;908</Text>
            <View style={styles.visaBottom}>
              <Text style={styles.visaBal}>$3,488.52</Text>
              <Text style={styles.visaLogo}>VISA</Text>
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
        <View style={styles.grid}>
          {homeActions.map(a => (
            <TouchableOpacity key={a.id} style={styles.item} activeOpacity={0.7}>
              <View style={[styles.itemIcon, { backgroundColor: a.color + '1A' }]}>
                <Ionicons name={a.icon} size={22} color={a.color} />
              </View>
              <Text style={styles.itemLabel}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 10 }} />
      </ScrollView>

      <View style={styles.nav}>
        {TABS.map(it => {
          const on = tab === it.id;
          return (
            <TouchableOpacity key={it.id} style={styles.navItem} onPress={() => setTab(it.id)} activeOpacity={0.7}>
              {on ? (
                <View style={styles.pill}>
                  <Ionicons name={it.icon} size={18} color={colors.white} />
                  <Text style={styles.pillText}>Home</Text>
                </View>
              ) : (
                <Ionicons name={it.icon} size={22} color={colors.textSub} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgMuted },
  header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 90 },
  headerTop: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center' },
  hi: { color: colors.white, fontSize: 15, fontWeight: '700' },
  iconBtn: { width: 34, height: 34, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center', marginLeft: 8 },
  visa: { position: 'absolute', left: 20, right: 20, bottom: -64, backgroundColor: colors.white, borderRadius: radius.card, padding: 18, shadowColor: '#2A2350', shadowOpacity: 0.18, shadowRadius: 18, shadowOffset: { width: 0, height: 10 }, elevation: 8, overflow: 'hidden' },
  visaStrip: { position: 'absolute', right: 0, bottom: 0, width: 14, height: 56, backgroundColor: colors.red, borderTopLeftRadius: 10 },
  visaName: { color: colors.text, fontSize: 16, fontWeight: '800' },
  visaTier: { color: colors.textSub, fontSize: 12, marginTop: 2 },
  visaNum: { color: colors.text, fontSize: 14, fontWeight: '600', letterSpacing: 1, marginTop: 14 },
  visaBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 12 },
  visaBal: { color: colors.text, fontSize: 18, fontWeight: '800' },
  visaLogo: { color: '#1A1F71', fontStyle: 'italic', fontWeight: '900', fontSize: 18, letterSpacing: 1 },
  body: { paddingHorizontal: 20, paddingTop: 84 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  item: { width: '31%', alignItems: 'center', marginBottom: 22 },
  itemIcon: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  itemLabel: { color: colors.textSub, fontSize: 11, textAlign: 'center', lineHeight: 14 },
  nav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 70, backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.border, paddingHorizontal: 10 },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.primary, paddingHorizontal: 18, paddingVertical: 9, borderRadius: radius.pill },
  pillText: { color: colors.white, fontSize: 13, fontWeight: '700' },
});