import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabs from './BottomTabs';
import CourseDetailScreen from '../screens/CourseDetailScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderSuccessScreen from '../screens/OrderSuccessScreen';
import OrderListScreen from '../screens/OrderListScreen';
import HealthDataScreen from '../screens/HealthDataScreen';
import ChatScreen from '../screens/ChatScreen';
import DoctorListScreen from '../screens/DoctorListScreen';

export type RootStackParamList = {
  Tabs: undefined;
  CourseDetail: { courseId: string };
  ProductDetail: { productId: string };
  Cart: undefined;
  Checkout: { items: { productId: string; qty: number; spec?: string }[]; total: number };
  OrderSuccess: { orderId: string; total: number };
  OrderList: undefined;
  HealthData: undefined;
  Chat: { messageId: string };
  DoctorList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="Tabs" component={BottomTabs} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen
        name="OrderSuccess"
        component={OrderSuccessScreen}
        options={{ animation: 'fade' }}
      />
      <Stack.Screen name="OrderList" component={OrderListScreen} />
      <Stack.Screen name="HealthData" component={HealthDataScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="DoctorList" component={DoctorListScreen} />
    </Stack.Navigator>
  );
}
