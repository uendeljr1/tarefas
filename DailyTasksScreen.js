import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { ArrowLeft, MoreVertical, ChevronDown } from 'lucide-react-native';
import { TaskContext } from './TaskContext';

export default function DailyTasksScreen({ navigation }) {
  const { tasks, completeTask, deleteTask } = useContext(TaskContext);

  // Filtrar todas as tarefas diárias
  const dailyTasks = tasks.filter(task => !task.completed); // Exibir todas as tarefas não concluídas

  // Função para concluir tarefa
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

  // Função para excluir tarefa
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com título */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tarefas Diárias</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Seletor de categoria */}
      <TouchableOpacity style={styles.categorySelector}>
        <Text style={styles.categoryText}>Tarefas Diárias</Text>
        <ChevronDown size={20} color="#000" />
      </TouchableOpacity>

      <ScrollView style={styles.content}>
        {/* Lista de tarefas ou mensagem "Nenhuma tarefa" */}
        {dailyTasks.length > 0 ? (
          dailyTasks.map(task => (
            <View key={task.id} style={styles.taskItem}>
              <TouchableOpacity style={styles.checkCircle} onPress={() => handleCompleteTask(task.id)} />
              <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>{task.name}</Text>
                <Text style={styles.taskTime}>{task.time}</Text>
              </View>
              <TouchableOpacity onPress={() => handleDeleteTask(task.id)}>
                <MoreVertical size={20} color="#8E8E93" />
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
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 0,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
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
