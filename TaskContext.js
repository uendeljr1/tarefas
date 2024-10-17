import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState([]); // Novo estado para listas personalizadas

  // Função para adicionar nova lista
  const addList = (listName) => {
    setLists([...lists, listName]);
  };

  // Função para excluir lista
  const deleteList = (listName) => {
    setLists(lists.filter(list => list !== listName));
  };

  // Função para adicionar nova tarefa
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, lists, addList, deleteList }}>
      {children}
    </TaskContext.Provider>
  );
};
