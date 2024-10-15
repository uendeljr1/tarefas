import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TaskProvider } from './TaskContext';
import SplashScreen from './SplashScreenView';
import HomeScreen from './HomeScreen';
import TodayScreen from './TodayScreen';
import DailyTasksScreen from './DailyTasksScreen';
import AddTaskScreen from './AddTaskScreen';
import CompletedTasksScreen from './CompletedTasksScreen';
import AllTasksScreen from './AllTasksScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Today" component={TodayScreen} />
          <Stack.Screen name="DailyTasks" component={DailyTasksScreen} />
          <Stack.Screen name="AddTask" component={AddTaskScreen} />
          <Stack.Screen name="CompletedTasks" component={CompletedTasksScreen} />
          <Stack.Screen name="AllTasks" component={AllTasksScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}