import React, { useContext, useState, useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Calendar, CheckCircle, ClipboardList, ChevronDown, ChevronUp, Trash2 } from 'lucide-react-native';
import { TaskContext } from './TaskContext'; // Importa o TaskContext
import BottomNav from './BottomNav';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const { tasks, lists, addList, deleteList } = useContext(TaskContext); // Usa o contexto para listas
  const navigation = useNavigation();

  const [showCreateList, setShowCreateList] = useState(false);
  const [newListName, setNewListName] = useState('');

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

  const handleCreateList = () => {
    if (newListName.trim() === '') {
      return; // Verificação para evitar listas vazias
    }
    addList(newListName); // Adiciona a nova lista ao contexto
    setNewListName('');
    setShowCreateList(false);
  };

  const handleDeleteList = (listName) => {
    Alert.alert(
      'Excluir Lista',
      `Tem certeza que deseja excluir a lista "${listName}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => deleteList(listName) },
      ]
    );
  };

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
          <View style={styles.listsHeader}>
            <Text style={styles.listsTitle}>Listas</Text>
            <TouchableOpacity onPress={() => setShowCreateList(!showCreateList)}>
              {showCreateList ? (
                <ChevronUp size={24} color="#007AFF" />
              ) : (
                <ChevronDown size={24} color="#007AFF" />
              )}
            </TouchableOpacity>
          </View>

          {showCreateList && (
            <View style={styles.createListContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nome da nova lista"
                value={newListName}
                onChangeText={setNewListName}
              />
              <TouchableOpacity style={styles.createButton} onPress={handleCreateList}>
                <Text style={styles.buttonText}>Criar Lista</Text>
              </TouchableOpacity>
            </View>
          )}

          {lists.map((list, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.listItemText}>{list}</Text>
              <TouchableOpacity onPress={() => handleDeleteList(list)}>
                <Trash2 size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          ))}
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  statCount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 105,
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
  listsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  createListContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  createButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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
