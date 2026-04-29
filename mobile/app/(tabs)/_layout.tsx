import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { theme } from '../../src/theme';

export default function TabsLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.accent,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarStyle: {
          height: 68,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: '#ffffffee',
          position: 'absolute',
          borderTopColor: theme.colors.line,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.home'),
          tabBarButtonTestID: 'tab-home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: t('tabs.products'),
          tabBarButtonTestID: 'tab-products',
          tabBarIcon: ({ color, size }) => <Ionicons name="water-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="brands"
        options={{
          title: t('tabs.brands'),
          tabBarButtonTestID: 'tab-brands',
          tabBarIcon: ({ color, size }) => <Ionicons name="layers-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="offers"
        options={{
          title: t('tabs.offers'),
          tabBarButtonTestID: 'tab-offers',
          tabBarIcon: ({ color, size }) => <Ionicons name="pricetags-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: t('tabs.cart'),
          tabBarButtonTestID: 'tab-cart',
          tabBarIcon: ({ color, size }) => <Ionicons name="bag-handle-outline" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
