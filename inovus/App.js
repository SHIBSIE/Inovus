import React from 'react';
import { View, LogBox } from "react-native";
import Routes from './navigators/index';

LogBox.ignoreAllLogs();

export default function App() {
  return <Routes />;
}