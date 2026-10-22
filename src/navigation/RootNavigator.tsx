import React from 'react';
import { useNavigation } from './NavigationContext';
import {
  SignInScreen, SignUp1Screen, SignUp2Screen,
  Forgot1Screen, Forgot2Screen, Forgot3Screen, Forgot4Screen,
  ChangePassword1Screen, ChangePassword2Screen, HomeScreen,
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
  }
}