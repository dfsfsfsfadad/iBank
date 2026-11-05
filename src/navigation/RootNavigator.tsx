import React from 'react';
import { useNavigation } from './NavigationContext';
import {
  SignInScreen, SignUp1Screen, SignUp2Screen,
  Forgot1Screen, Forgot2Screen, Forgot3Screen, Forgot4Screen,
  ChangePassword1Screen, ChangePassword2Screen, HomeScreen,
  SearchScreen, BranchScreen, InterestRateScreen, ExchangeRateScreen, LanguageScreen,
  Exchange1Screen, Exchange2Screen, Exchange2ModalScreen,
  Transfer1Screen, Transfer2Screen, Transfer3Screen, Transfer4Screen,
  PayBill1Screen, PayBill2Screen, PayBill3Screen,
  MessageScreen, ChatScreen, SettingScreen, AppInfoScreen, SettingPasswordScreen,
  CardDetailScreen, Withdraw1Screen, Withdraw2Screen, Mobile1Screen, Mobile2Screen,
} from '../screens';

export function RootNavigator() {
  const { route } = useNavigation();
  switch (route) {
    case 'signin': return <SignInScreen />;
    case 'signup1': return <SignUp1Screen />;
    case 'signup2': return <SignUp2Screen />;
    case 'forgot1': return <Forgot1Screen />;
    case 'forgot2': return <Forgot2Screen />;
    case 'forgot3': return <Forgot3Screen />;
    case 'forgot4': return <Forgot4Screen />;
    case 'changepw1': return <ChangePassword1Screen />;
    case 'changepw2': return <ChangePassword2Screen />;
    case 'home': return <HomeScreen />;
    case 'search': return <SearchScreen />;
    case 'branch': return <BranchScreen />;
    case 'interest': return <InterestRateScreen />;
    case 'exchangeRate': return <ExchangeRateScreen />;
    case 'language': return <LanguageScreen />;
    case 'exchange1': return <Exchange1Screen />;
    case 'exchange2': return <Exchange2Screen />;
    case 'exchange2Modal': return <Exchange2ModalScreen />;
    case 'transfer1': return <Transfer1Screen />;
    case 'transfer2': return <Transfer2Screen />;
    case 'transfer3': return <Transfer3Screen />;
    case 'transfer4': return <Transfer4Screen />;
    case 'paybill1': return <PayBill1Screen />;
    case 'paybill2': return <PayBill2Screen />;
    case 'paybill3': return <PayBill3Screen />;
    case 'message': return <MessageScreen />;
    case 'chat': return <ChatScreen />;
    case 'setting': return <SettingScreen />;
    case 'appinfo': return <AppInfoScreen />;
    case 'settingpw': return <SettingPasswordScreen />;
    case 'carddetail': return <CardDetailScreen />;
    case 'withdraw1': return <Withdraw1Screen />;
    case 'withdraw2': return <Withdraw2Screen />;
    case 'mobile1': return <Mobile1Screen />;
    case 'mobile2': return <Mobile2Screen />;
  }
}
