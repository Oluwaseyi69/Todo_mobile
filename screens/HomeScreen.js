// import DateTimePicker from "@react-native-community/datetimepicker";
// import { useEffect, useState } from "react";
// import {
//   FlatList,
//   Platform,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Toast from "react-native-toast-message";
// import { addTodo, fetchTodos } from "../services/TodoService";

// export default function AddTodoScreen() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const [date, setDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showTimePicker, setShowTimePicker] = useState(false);

//   const [todos, setTodos] = useState([]);

//   // Load existing todos on mount
//   useEffect(() => {
//     (async () => {
//       try {
//         const list = await fetchTodos();
//         setTodos(list);
//       } catch (e) {
//         Toast.show({ type: "error", text1: "Failed to load todos" });
//       }
//     })();
//   }, []);

//   const handleAdd = async () => {
//     if (!title.trim()) {
//       Toast.show({ type: "error", text1: "Title is required" });
//       return;
//     }

//     const dueDate = date.toISOString();
//     console.log("[Screen] handleAdd sending:", { title, description, dueDate });

//     try {
//       const newTodo = await addTodo(title, description, dueDate);
//       console.log("[Screen] addTodo returned:", newTodo);

//       Toast.show({
//         type: "success",
//         text1: "✅ Todo added successfully!",
//       });

//       // Clear inputs
//       setTitle("");
//       setDescription("");
//       setDate(new Date());

//       // Refresh list
//       const list = await fetchTodos();

//       console.log("[Screen] fetchTodos after add returned:", list);
//       setTodos(list);
//     } catch (err) {
//       Toast.show({
//         type: "error",
//         text1: "Failed to add todo",
//       });
//       console.error("[Screen] handleAdd error:", err);
//     }
//   };

//   const onChangeDate = (_e, selected) => {
//     setShowDatePicker(false);
//     if (selected) setDate(selected);
//   };

//   const onChangeTime = (_e, selected) => {
//     setShowTimePicker(false);
//     if (selected) {
//       const updated = new Date(date);
//       updated.setHours(selected.getHours());
//       updated.setMinutes(selected.getMinutes());
//       setDate(updated);
//     }
//   };

//   return (
//     <View className="flex-1 p-4 bg-white">
//       {/* Title */}
//       <Text className="text-gray-600 mb-1">Title</Text>
//       <TextInput
//         placeholder="Enter Title"
//         value={title}
//         onChangeText={setTitle}
//         className="border border-gray-300 p-3 rounded mb-4"
//       />

//       {/* Description */}
//       <Text className="text-gray-600 mb-1">Description</Text>
//       <TextInput
//         placeholder="Enter Description"
//         value={description}
//         onChangeText={setDescription}
//         multiline
//         scrollEnabled
//         textAlignVertical="top"
//         className="border border-gray-300 p-3 rounded mb-4 h-20"
//       />

//       {/* Date */}
//       <Text className="text-gray-600 mb-1">Due Date</Text>
//       <TextInput
//         placeholder="Select Date"
//         value={date.toDateString()}
//         editable={false}
//         onTouchStart={() => setShowDatePicker(true)}
//         className="border border-gray-300 p-3 rounded mb-4 text-gray-700"
//       />

//       {/* Time */}
//       <Text className="text-gray-600 mb-1">Due Time</Text>
//       <TextInput
//         placeholder="Select Time"
//         value={date.toLocaleTimeString()}
//         editable={false}
//         onTouchStart={() => setShowTimePicker(true)}
//         className="border border-gray-300 p-3 rounded mb-4 text-gray-700"
//       />

//       {/* Pickers */}
//       {showDatePicker && (
//         <DateTimePicker
//           value={date}
//           mode="date"
//           display={Platform.OS === "ios" ? "spinner" : "default"}
//           onChange={onChangeDate}
//         />
//       )}
//       {showTimePicker && (
//         <DateTimePicker
//           value={date}
//           mode="time"
//           display={Platform.OS === "ios" ? "spinner" : "default"}
//           onChange={onChangeTime}
//         />
//       )}

//       {/* Save Button */}
//       <TouchableOpacity
//         onPress={handleAdd}
//         className="bg-green-600 p-3 rounded mb-6"
//       >
//         <Text className="text-white text-center text-lg font-semibold">
//           Save Todo
//         </Text>
//       </TouchableOpacity>

//       {/* List of Todos */}
//       <FlatList
//         data={todos}
//         keyExtractor={(item) => item.id}
//         ListEmptyComponent={
//           <Text className="text-center text-gray-400">No todos yet.</Text>
//         }
//         renderItem={({ item }) => (
//           <View className="bg-gray-100 rounded p-3 mb-2">
//             <Text className="text-gray-800">{item.title}</Text>
//             <Text className="text-gray-500 text-sm">
//               Due: {new Date(item.dueDate).toLocaleString()}
//             </Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// screens/AddTodoScreen.js
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { addTodo } from "../services/TodoService";

export default function AddTodoScreen() {
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    if (!title.trim()) {
      Toast.show({ type: "error", text1: "Title is required" });
      return;
    }
    const dueDate = date.toISOString();
    setSaving(true);

    try {
      console.log("[AddTodoScreen] Sending:", { title, description, dueDate });
      const newTodo = await addTodo(title, description, dueDate);
      console.log("[AddTodoScreen] Received:", newTodo);

      Toast.show({
        type: "success",
        text1: "✅ Todo added!",
      });

      // clear form
      setTitle("");
      setDescription("");
      setDate(new Date());
    } catch (err) {
      console.error("[AddTodoScreen] Error adding todo:", err);
      Toast.show({ type: "error", text1: "Failed to add todo" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <View className="flex-1 p-4 bg-white">
      {/* Title */}
      <Text className="text-gray-600 mb-1">Title</Text>
      <TextInput
        placeholder="Enter Title"
        value={title}
        onChangeText={setTitle}
        className="border border-gray-300 p-3 rounded mb-4"
      />

      {/* Description */}
      <Text className="text-gray-600 mb-1">Description</Text>
      <TextInput
        placeholder="Enter Description"
        value={description}
        onChangeText={setDescription}
        multiline
        scrollEnabled
        textAlignVertical="top"
        className="border border-gray-300 p-3 rounded mb-4 h-20"
      />

      {/* Date */}
      <Text className="text-gray-600 mb-1"> 📅 Due Date</Text>
      <TextInput
        placeholder="Select Date"
        value={date.toDateString()}
        editable={false}
        onTouchStart={() => setShowDatePicker(true)}
        className="border border-gray-300 p-3 rounded mb-4 text-gray-700"
      />

      {/* Time */}
      <Text className="text-gray-600 mb-1"> ⏰ Due Time</Text>
      <TextInput
        placeholder="Select Time"
        value={date.toLocaleTimeString()}
        editable={false}
        onTouchStart={() => setShowTimePicker(true)}
        className="border border-gray-300 p-3 rounded mb-6 text-gray-700"
      />

      {/* Pickers */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, d) => {
            setShowDatePicker(false);
            if (d) setDate(d);
          }}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, t) => {
            setShowTimePicker(false);
            if (t) {
              const updated = new Date(date);
              updated.setHours(t.getHours());
              updated.setMinutes(t.getMinutes());
              setDate(updated);
            }
          }}
        />
      )}

      {/* Save Button */}
      <TouchableOpacity
        onPress={handleAdd}
        disabled={saving}
        className={`w-full rounded-full py-3 mb-4 items-center ${
          saving ? "bg-green-300" : "bg-green-600"
        }`}
      >
        <Text className="text-white font-semibold text-base">
          {saving ? "Saving..." : "Save Todo"}
        </Text>
      </TouchableOpacity>

      {/* View Todos Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("ViewTasks")} // adjust route as needed
        className="w-full rounded-full py-3 bg-blue-600 items-center"
      >
        <Text className="text-white font-semibold text-base">View Todos</Text>
      </TouchableOpacity>

      <Toast />
    </View>
  );
}
