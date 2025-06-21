import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function AddTodoScreen({ navigation }) {
  const [todo, setTodo] = useState("");

  const handleAdd = () => {
    if (todo.trim() === "") return;
    console.log("New Todo:", todo); // Later, pass this back to Home
    setTodo("");
    navigation.goBack();
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <TextInput
        placeholder="Enter new todo"
        value={todo}
        onChangeText={setTodo}
        className="border border-gray-300 p-3 rounded mb-4"
      />
      <TouchableOpacity
        className="bg-green-600 p-3 rounded"
        onPress={handleAdd}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Save Todo
        </Text>
      </TouchableOpacity>
    </View>
  );
}
