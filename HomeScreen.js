import React, { useContext, useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, CheckCircle, ClipboardList } from 'lucide-react-native';
import { TaskContext } from './TaskContext'; // Ajuste o caminho do contexto de tarefas
import BottomNav from './BottomNav'; // Importa a barra inferior de navegação
import { useNavigation } from '@react-navigation/native'; // Importa o hook de navegação

export default function HomeScreen() {
  const { tasks } = useContext(TaskContext); 
  const navigation = useNavigation();

  const todayTasks = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter(task => task.date === today);
  }, [tasks]);

  const completedTasks = useMemo(() => tasks.filter(task => task.completed), [tasks]);

  const stats = useMemo(() => [
    {
      id: 1,
      title: 'Hoje',
      count: todayTasks.length,
      icon: <Calendar size={24} color="#007AFF" />,
      onPress: () => navigation.navigate('Today'),
    },
    {
      id: 2,
      title: 'Agendados',
      count: tasks.length,
      icon: <Calendar size={24} color="#FF3B30" />,
      onPress: () => navigation.navigate('DailyTasks'),
    },
    {
      id: 3,
      title: 'Todos',
      count: tasks.length,
      icon: <ClipboardList size={24} color="#FF9500" />,
      onPress: () => navigation.navigate('AllTasks'),
    },
    {
      id: 4,
      title: 'Concluídos',
      count: completedTasks.length,
      icon: <CheckCircle size={24} color="#4CD964" />,
      onPress: () => navigation.navigate('CompletedTasks'),
    },
  ], [todayTasks, tasks, completedTasks, navigation]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          {stats.map(stat => (
            <TouchableOpacity key={stat.id} style={styles.statItem} onPress={stat.onPress}>
              <View style={styles.statIconAndCount}>
                {stat.icon}
                <Text style={styles.statCount}>{stat.count}</Text>
              </View>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.listsSection}>
          <Text style={styles.listsTitle}>Listas</Text>
          <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('DailyTasks')}>
            <Text style={styles.listItemText}>Tarefas Diárias</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listItemText}>Remédios</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listItemText}>Trabalho</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 50,
    marginBottom: 24,
  },
  statItem: {
    width: '48%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statIconAndCount: {
    flexDirection: 'row', // Coloca o ícone e o contador na horizontal
    alignItems: 'center',
  },
  statCount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 105, // Dá um espaçamento entre o ícone e o número
  },
  statTitle: {
    color: '#8E8E93',
    marginTop: 8,
    
  },
  listsSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    paddingBottom: 16,
  },
  listsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
  },
  listItemText: {
    fontSize: 16,
  },
});
