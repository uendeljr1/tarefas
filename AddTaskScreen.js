import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ScrollView, Modal } from 'react-native';
import { ArrowLeft, MoreHorizontal, ChevronDown } from 'lucide-react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TaskContext } from './TaskContext';
import BottomNav from './BottomNav'; // Importa a barra inferior

export default function AddTaskScreen({ navigation, route }) {
  const { addTask, lists } = useContext(TaskContext); // Usa o contexto para as listas
  const task = route.params?.task || null; // Tarefa a ser editada, se existir
  const [taskName, setTaskName] = useState(task ? task.name : '');
  const [selectedDate, setSelectedDate] = useState(task ? task.date : '');
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Estado para controlar a lista selecionada e o modal
  const [selectedList, setSelectedList] = useState(task ? task.list : '');
  const [showListModal, setShowListModal] = useState(false);

  // Estado para controlar se o formulário está pronto
  const [isFormReady, setIsFormReady] = useState(false);

  const onDateSelect = (day) => setSelectedDate(day.dateString);
  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  useEffect(() => {
    // Verifica se todos os campos obrigatórios estão preenchidos
    if (taskName && selectedDate && selectedList) {
      setIsFormReady(true); // Ativa o botão se tudo estiver preenchido
    } else {
      setIsFormReady(false); // Desativa o botão se algo estiver faltando
    }
  }, [taskName, selectedDate, selectedList]);

  const createOrUpdateTask = async () => {
    if (!taskName || !selectedDate || !selectedList) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const newTask = {
      id: task ? task.id : Date.now().toString(),
      name: taskName,
      date: selectedDate,
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      list: selectedList, // Lista selecionada
    };

    await addTask(newTask);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
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
          markedDates={{ [selectedDate]: { selected: true, selectedColor: '#007bff' } }}
          theme={{ arrowColor: '#007bff', selectedDayBackgroundColor: '#007bff' }}
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

        {/* Botão para abrir o modal de seleção da lista */}
        <TouchableOpacity style={styles.listPickerButton} onPress={() => setShowListModal(true)}>
          <Text style={styles.label}>{selectedList || 'Escolha a Lista'}</Text>
          <ChevronDown size={20} color="#007bff" />
        </TouchableOpacity>

        {/* O botão muda de cor conforme o estado `isFormReady` */}
        <TouchableOpacity
          style={[styles.createButton, isFormReady ? styles.createButtonActive : styles.createButtonInactive]} 
          onPress={createOrUpdateTask}
          disabled={!isFormReady} // Desativa o botão se não estiver pronto
        >
          <Text style={styles.buttonText}>+ {task ? 'Salvar Tarefa' : 'Criar Tarefa'}</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav />

      {/* Modal para seleção da lista */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showListModal}
        onRequestClose={() => setShowListModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            {lists.length === 0 ? (
              <Text style={styles.noListsText}>Nenhuma lista criada</Text>
            ) : (
              lists.map((list, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.listItem} 
                  onPress={() => { 
                    setSelectedList(list);
                    setShowListModal(false); // Fecha o modal após selecionar
                  }}>
                  <Text style={styles.listItemText}>{list}</Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>
      </Modal>
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
  listPickerButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createButton: {
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    width: 180,
    height: 40,
    alignSelf: 'center', // Alinha o botão ao centro
  },
  createButtonActive: {
    backgroundColor: '#007bff', // Cor ativa (habilitada)
  },
  createButtonInactive: {
    backgroundColor: '#acacac', // Cor desativada (desabilitada)
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
  },
  modalView: {
    width: '70%', // Diminuindo a largura do modal
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5, // Sombra
  },
  listItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listItemText: {
    fontSize: 16,
    color: '#007bff',
  },
  noListsText: {
    padding: 10,
    color: '#999',
    textAlign: 'center',
  },
});
