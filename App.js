// App.js
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import "./global.css";
import TodoScreen from "./screens/AddTodoScreen";
import HomeScreen from "./screens/HomeScreen";
import Signup from "./screens/Signup";
import ViewScreen from "./screens/ViewTodoScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />

        <Stack.Screen name="SignUp" component={Signup} />

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ToDo" component={TodoScreen} />
        <Stack.Screen name="ViewTasks" component={ViewScreen} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
