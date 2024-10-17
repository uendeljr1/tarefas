import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { TaskContext } from './TaskContext';

export default function DailyTasksScreen({ navigation }) {
  const { tasks, completeTask, deleteTask } = useContext(TaskContext);

  const dailyTasks = tasks.filter(task => !task.completed);

  const handleCompleteTask = (taskId) => {
    Alert.alert(
      'Confirmar',
      'Você tem certeza que deseja concluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Concluir', onPress: () => completeTask(taskId) }
      ],
      { cancelable: false }
    );
  };

  const handleDeleteTask = (taskId) => {
    Alert.alert(
      'Confirmar',
      'Você tem certeza que deseja excluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => deleteTask(taskId) }
      ],
      { cancelable: false }
    );
  };

  const handleAddTask = () => {
    Alert.alert('Adicionar Tarefa', 'Aqui você pode adicionar uma nova tarefa!');
  };

  const renderIcon = (name, size, color) => (
    <Text>
      <Icon name={name} size={size} color={color} />
    </Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {renderIcon("arrow-back", 24, "#007AFF")}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tarefas Diárias</Text>
        <View style={styles.headerRight} />
      </View>

      <TouchableOpacity style={styles.addTaskButton} onPress={handleAddTask}>
        <View style={styles.addTaskContent}>
          {renderIcon("add-circle", 24, "#007AFF")}
          <Text style={styles.addTaskText}>Adicionar Tarefa</Text>
        </View>
      </TouchableOpacity>

      <ScrollView style={styles.content}>
        {dailyTasks.length > 0 ? (
          dailyTasks.map(task => (
            <View key={task.id} style={styles.taskItem}>
              <TouchableOpacity style={styles.checkCircle} onPress={() => handleCompleteTask(task.id)} />
              <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>{task.name}</Text>
                <Text style={styles.taskTime}>{task.time}</Text>
              </View>
              <TouchableOpacity onPress={() => handleDeleteTask(task.id)}>
                {renderIcon("ellipsis-vertical", 20, "#8E8E93")}
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noTasksText}>Nenhuma tarefa diária.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 24,
  },
  addTaskButton: {
    paddingHorizontal: 16,
    marginTop: 10,
    borderRadius: 8,
  },
  addTaskContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addTaskText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
    color: '#007AFF',
  },
  content: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#8E8E93',
    marginRight: 12,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  taskTime: {
    fontSize: 14,
    color: '#8E8E93',
  },
  noTasksText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: '#8E8E93',
  },
});