import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
import { ArrowLeft, MoreHorizontal, ChevronDown, ChevronUp } from 'lucide-react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TaskContext } from './TaskContext';
import BottomNav from './BottomNav'; // Importa a barra inferior

export default function AddTaskScreen({ navigation, route }) {
  const { addTask, editTask } = useContext(TaskContext);
  const task = route.params?.task || null; // Tarefa a ser editada, se existir
  const [taskName, setTaskName] = useState(task ? task.name : '');
  const [selectedDate, setSelectedDate] = useState(task ? task.date : '');
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  // Novo estado para a lista
  const [selectedList, setSelectedList] = useState(task ? task.list : ''); 

  // Definindo listas disponíveis
  const availableLists = ['Trabalho', 'Pessoal', 'Remédios']; 

  // Controla a visibilidade das listas (dropdown)
  const [showListDropdown, setShowListDropdown] = useState(false);

  // Função para selecionar a data
  const onDateSelect = (day) => {
    setSelectedDate(day.dateString); // Define a data selecionada
  };

  // Função para alterar o horário
  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false); // Oculta o seletor de tempo
    setTime(currentTime); // Define o tempo selecionado
  };

  // Função para criar ou atualizar a tarefa
  const createOrUpdateTask = async () => {
    if (!taskName || !selectedDate || !selectedList) {
      Alert.alert('Erro', 'Por favor, preencha o nome da tarefa, selecione uma data e uma lista.');
      return;
    }

    const newTask = {
      id: task ? task.id : Date.now().toString(),
      name: taskName,
      date: selectedDate,
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      list: selectedList, // Adicionando a lista à tarefa
    };

    try {
      if (task) {
        // Editar tarefa existente
        await editTask(newTask.id, newTask);
        Alert.alert('Sucesso', 'Tarefa editada com sucesso!');
      } else {
        // Criar nova tarefa
        await addTask(newTask);
        Alert.alert('Sucesso', 'Tarefa criada com sucesso!');
      }
      navigation.goBack(); // Volta para a tela anterior
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a tarefa. Tente novamente.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()} // Navega de volta para a tela anterior
        >
          <ArrowLeft size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{task ? 'Editar Tarefa' : 'Nova Tarefa'}</Text>
        <TouchableOpacity>
          <MoreHorizontal size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <TextInput
          style={styles.input}
          placeholder="Nome da tarefa"
          value={taskName}
          onChangeText={setTaskName}
        />

        <Calendar
          onDayPress={onDateSelect}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#007bff' },
          }}
          theme={{
            arrowColor: '#007bff',
            selectedDayBackgroundColor: '#007bff',
          }}
        />

        <View style={styles.timePickerContainer}>
          <Text style={styles.label}>Escolha o Horário:</Text>
          <TouchableOpacity onPress={() => setShowTimePicker(true)}>
            <Text style={styles.timeText}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </TouchableOpacity>
        </View>

        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}

        {/* Seletor de Lista com dropdown */}
        <View style={styles.listPickerContainer}>
          <TouchableOpacity 
            style={styles.dropdownHeader} 
            onPress={() => setShowListDropdown(!showListDropdown)}
          >
            <Text style={styles.label}>Escolha a Lista:</Text>
            {showListDropdown ? (
              <ChevronUp size={20} color="#007bff" />
            ) : (
              <ChevronDown size={20} color="#007bff" />
            )}
          </TouchableOpacity>

          {/* Mostra as listas somente se o dropdown estiver visível */}
          {showListDropdown && (
            <View style={styles.dropdownContent}>
              {availableLists.map((list, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.listItem,
                    selectedList === list && styles.selectedListItem, // Aplica estilo se a lista estiver selecionada
                  ]}
                  onPress={() => {
                    setSelectedList(list);
                    setShowListDropdown(false); // Fecha o dropdown após selecionar
                  }}
                >
                  <Text style={[styles.listText, selectedList === list && styles.selectedListText]}>
                    {list}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.createButton} onPress={createOrUpdateTask}>
          <Text style={styles.buttonText}>+ {task ? 'Salvar Tarefa' : 'Criar Tarefa'}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Barra inferior de navegação */}
      <BottomNav />
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
    paddingHorizontal: 16,
    paddingVertical: 42,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  timeText: {
    fontSize: 16,
    color: '#007bff',
  },
  listPickerContainer: {
    marginVertical: 20,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dropdownContent: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 5,
  },
  listItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedListItem: {
    backgroundColor: '#007bff', // Estilo para item selecionado
  },
  listText: {
    color: '#333',
  },
  selectedListText: {
    color: '#fff', // Texto branco quando o item está selecionado
  },
  createButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
