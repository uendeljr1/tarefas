import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, Plus, User, List } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function BottomNav() {
  const navigation = useNavigation();

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => navigation.navigate('Home')} 
        accessibilityRole="button"
      >
        <Home size={24} color="#007AFF" />
        <Text style={styles.navText}>Início</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('AddTask')}
        accessibilityRole="button"
      >
        <Plus size={24} color="#8E8E93" />
        <Text style={styles.navText}>Adicionar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('AllTasks')}
        accessibilityRole="button"
      >
        <List size={24} color="#8E8E93" />
        <Text style={styles.navText}>Todas</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('Profile')}
        accessibilityRole="button"
      >
        <User size={24} color="#8E8E93" />
        <Text style={styles.navText}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingBottom: 25,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#8E8E93',
  },
});