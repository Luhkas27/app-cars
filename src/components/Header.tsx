import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackClick?: VoidFunction;
  logout?: boolean;
  onLogoutClick?: VoidFunction;
}

export function Header({
  title,
  showBackButton = false,
  logout = false,
  onLogoutClick,
}: HeaderProps) {
  const navigation = useNavigation();
  return (
    <View className="flex h-16 w-full flex-row items-center justify-between px-2">
      <View className="flex flex-row items-center">
        {showBackButton && (
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <Text className="text-2xl text-white">←</Text>
          </TouchableOpacity>
        )}
        <Text className="text-2xl font-bold text-white">{title}</Text>
      </View>

      {logout && (
        <TouchableOpacity onPress={onLogoutClick} className="rounded-md bg-white p-2">
          <Text className="text-md font-bold text-red-500">Sair</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
