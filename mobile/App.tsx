import { useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter';
import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';

import { Routes } from './src/routes';
import { Background } from './src/components/Background';
import { Loading } from './src/components/Loading';

import './src/services/notificationConfigs';
import { getPushNotificationToken } from './src/services/getPushNotificationToken';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  const getNotificationsListener = useRef<Subscription>();
  const responseNotificationsListener = useRef<Subscription>();

  useEffect(()=>{
    getPushNotificationToken()
  });

  useEffect(()=>{
    getNotificationsListener.current = Notifications
      .addNotificationReceivedListener(notification => {
        console.log(notification);
      });
      
    responseNotificationsListener.current = Notifications
      .addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
      
      return () => {
        if(getNotificationsListener.current && responseNotificationsListener.current){
          Notifications.removeNotificationSubscription(getNotificationsListener.current);
          Notifications.removeNotificationSubscription(responseNotificationsListener.current);   
        }
      }
  },[])

  return (
    <Background>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}