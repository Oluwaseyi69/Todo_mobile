// import { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   Modal,
//   SafeAreaView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Toast from "react-native-toast-message";
// import { completeTodo, deleteTodo, fetchTodos } from "../services/TodoService";

// export default function TodosScreen() {
//   const [todos, setTodos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedTodoId, setSelectedTodoId] = useState(null);

//   // Load todos
//   const loadTodos = async () => {
//     setLoading(true);
//     try {
//       const data = await fetchTodos();
//       setTodos(Array.isArray(data) ? data : data.todos || []);
//     } catch (err) {
//       console.error("Failed to fetch todos", err);
//       Toast.show({ type: "error", text1: "Failed to load tasks" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadTodos();
//   }, []);

//   // Mark complete
//   const handleComplete = async (id) => {
//     try {
//       await completeTodo(id);
//       Toast.show({ type: "success", text1: "Task marked completed ✅" });
//       await loadTodos();
//     } catch (err) {
//       console.error("Complete failed", err);
//       Toast.show({ type: "error", text1: "Failed to complete task" });
//     }
//   };

//   // Delete (triggered after confirmation)
//   const confirmDelete = async () => {
//     try {
//       await deleteTodo(selectedTodoId);
//       Toast.show({ type: "success", text1: "Task deleted ✅" });
//       setShowModal(false);
//       await loadTodos();
//     } catch (err) {
//       console.error("Delete failed", err);
//       Toast.show({ type: "error", text1: "Failed to delete task" });
//     }
//   };

//   const renderItem = ({ item }) => {
//     const done = !!item.completed;
//     return (
//       <View
//         className={`rounded-lg p-4 mb-3 shadow ${
//           done ? "bg-gray-200" : "bg-white"
//         }`}
//       >
//         <Text
//           className={`text-lg font-semibold mb-2 ${
//             done ? "text-gray-400 line-through" : "text-gray-800"
//           }`}
//         >
//           {item.title}
//         </Text>

//         <Text className={`mb-4 ${done ? "text-gray-300" : "text-gray-600"}`}>
//           {item.description}
//         </Text>

//         <Text
//           className={`text-sm mb-4 ${done ? "text-gray-300" : "text-gray-500"}`}
//         >
//           Due: {new Date(item.dueDate).toLocaleString()}
//         </Text>

//         {/* <View className="flex-row justify-end space-x-2">
//           {!done && (
//             <TouchableOpacity
//               onPress={() => handleComplete(item._id)}
//               className="bg-green-600 px-4 py-2 rounded"
//             >
//               <Text className="text-white">Complete</Text>
//             </TouchableOpacity>
//           )}

//           <TouchableOpacity
//             onPress={() => {
//               setSelectedTodoId(item._id);
//               setShowModal(true);
//             }}
//             className="bg-red-600 px-4 py-2 rounded"
//           >
//             <Text className="text-white">Delete</Text>
//           </TouchableOpacity>
//         </View> */}
//         <View className="flex-row space-x-4">
//           <TouchableOpacity
//             disabled={done}
//             onPress={() => {
//               setEditForm({
//                 id: item._id,
//                 title: item.title,
//                 description: item.description,
//                 dueDate: item.dueDate,
//               });
//               setShowEditModal(true);
//             }}
//             className={`px-4 py-2 rounded ${
//               done ? "bg-gray-400" : "bg-blue-600"
//             }`}
//           >
//             <Text className="text-white">Edit</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => {
//               setSelectedTodoId(item._id);
//               setShowModal(true);
//             }}
//             className="bg-red-600 px-4 py-2 rounded"
//           >
//             <Text className="text-white">Delete</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-gray-100">
//       {/* Header */}
//       <View className="px-4 py-3 bg-white border-b border-gray-200">
//         <Text className="text-2xl font-bold text-gray-800">📋 All Tasks</Text>
//       </View>

//       {/* Content */}
//       {loading ? (
//         <View className="flex-1 justify-center items-center">
//           <ActivityIndicator size="large" color="#9333EA" />
//         </View>
//       ) : (
//         <FlatList
//           contentContainerStyle={{ padding: 16 }}
//           data={todos}
//           keyExtractor={(item) => item._id}
//           ListEmptyComponent={
//             <Text className="text-center text-gray-500 mt-10">
//               No tasks available.
//             </Text>
//           }
//           renderItem={renderItem}
//         />
//       )}

//       {/* Confirmation Modal */}
//       <Modal
//         transparent={true}
//         visible={showModal}
//         animationType="fade"
//         onRequestClose={() => setShowModal(false)}
//       >
//         <View className="flex-1 justify-center items-center bg-black/40 px-4">
//           <View className="bg-white w-full rounded-lg p-6">
//             <Text className="text-lg font-semibold text-gray-800 mb-4">
//               ❗ Are you sure you want to delete this task?
//             </Text>
//             <View className="flex-row justify-between">
//               <TouchableOpacity
//                 onPress={() => setShowModal(false)}
//                 className="bg-gray-300 px-4 py-2 rounded"
//               >
//                 <Text className="text-gray-700">Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={confirmDelete}
//                 className="bg-red-600 px-4 py-2 rounded"
//               >
//                 <Text className="text-white">Yes, Delete</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       <Toast />
//     </SafeAreaView>
//   );
// }

// import { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   Modal,
//   SafeAreaView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Toast from "react-native-toast-message";
// import { completeTodo, deleteTodo, fetchTodos } from "../services/TodoService";

// export default function TodosScreen() {
//   const [todos, setTodos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedTodoId, setSelectedTodoId] = useState(null);
//   const [editForm, setEditForm] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false); // required for edit modal

//   // Load todos
//   const loadTodos = async () => {
//     setLoading(true);
//     try {
//       const data = await fetchTodos();
//       setTodos(Array.isArray(data) ? data : data.todos || []);
//     } catch (err) {
//       console.error("Failed to fetch todos", err);
//       Toast.show({ type: "error", text1: "Failed to load tasks" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadTodos();
//   }, []);

//   // Mark complete
//   const handleComplete = async (id) => {
//     try {
//       await completeTodo(id);
//       Toast.show({ type: "success", text1: "Task marked completed ✅" });
//       await loadTodos();
//     } catch (err) {
//       console.error("Complete failed", err);
//       Toast.show({ type: "error", text1: "Failed to complete task" });
//     }
//   };

//   // Delete (triggered after confirmation)
//   const confirmDelete = async () => {
//     try {
//       await deleteTodo(selectedTodoId);
//       Toast.show({ type: "success", text1: "Task deleted ✅" });
//       setShowModal(false);
//       await loadTodos();
//     } catch (err) {
//       console.error("Delete failed", err);
//       Toast.show({ type: "error", text1: "Failed to delete task" });
//     }
//   };

//   const renderItem = ({ item }) => {
//     const done = !!item.completed;
//     return (
//       <View
//         className={`rounded-lg p-4 mb-3 shadow ${
//           done ? "bg-gray-200" : "bg-white"
//         }`}
//       >
//         <Text
//           className={`text-lg font-semibold mb-2 ${
//             done ? "text-gray-400 line-through" : "text-gray-800"
//           }`}
//         >
//           {item.title}
//         </Text>

//         <Text className={`mb-4 ${done ? "text-gray-300" : "text-gray-600"}`}>
//           {item.description}
//         </Text>

//         <Text
//           className={`text-sm mb-4 ${done ? "text-gray-300" : "text-gray-500"}`}
//         >
//           Due: {new Date(item.dueDate).toLocaleString()}
//         </Text>

//         <View className="flex-row justify-between items-center">
//           {/* Left side: Complete & Edit */}
//           <View className="flex-row space-x-3">
//             {!done && (
//               <TouchableOpacity
//                 onPress={() => handleComplete(item._id)}
//                 className="bg-green-600 px-4 py-2 rounded"
//               >
//                 <Text className="text-white">Complete</Text>
//               </TouchableOpacity>
//             )}
//             <TouchableOpacity
//               disabled={done}
//               onPress={() => {
//                 setEditForm({
//                   id: item._id,
//                   title: item.title,
//                   description: item.description,
//                   dueDate: item.dueDate,
//                 });
//                 setShowEditModal(true);
//               }}
//               className={`px-4 py-2 rounded ${
//                 done ? "bg-gray-400" : "bg-blue-600"
//               }`}
//             >
//               <Text className="text-white">Edit</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Right side: Delete */}
//           <TouchableOpacity
//             onPress={() => {
//               setSelectedTodoId(item._id);
//               setShowModal(true);
//             }}
//             className="bg-red-600 px-4 py-2 rounded"
//           >
//             <Text className="text-white">Delete</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-gray-100">
//       {/* Header */}
//       <View className="px-4 py-3 bg-white border-b border-gray-200">
//         <Text className="text-2xl font-bold text-gray-800">📋 All Tasks</Text>
//       </View>

//       {/* Content */}
//       {loading ? (
//         <View className="flex-1 justify-center items-center">
//           <ActivityIndicator size="large" color="#9333EA" />
//         </View>
//       ) : (
//         <FlatList
//           contentContainerStyle={{ padding: 16 }}
//           data={todos}
//           keyExtractor={(item) => item._id}
//           ListEmptyComponent={
//             <Text className="text-center text-gray-500 mt-10">
//               No tasks available.
//             </Text>
//           }
//           renderItem={renderItem}
//         />
//       )}

//       {/* Confirmation Modal */}
//       <Modal
//         transparent={true}
//         visible={showModal}
//         animationType="fade"
//         onRequestClose={() => setShowModal(false)}
//       >
//         <View className="flex-1 justify-center items-center bg-black/40 px-4">
//           <View className="bg-white w-full rounded-lg p-6">
//             <Text className="text-lg font-semibold text-gray-800 mb-4">
//               ❗ Are you sure you want to delete this task?
//             </Text>
//             <View className="flex-row justify-between">
//               <TouchableOpacity
//                 onPress={() => setShowModal(false)}
//                 className="bg-gray-300 px-4 py-2 rounded"
//               >
//                 <Text className="text-gray-700">Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={confirmDelete}
//                 className="bg-red-600 px-4 py-2 rounded"
//               >
//                 <Text className="text-white">Yes, Delete</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       <Toast />
//     </SafeAreaView>
//   );
// }

import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import {
  completeTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from "../services/TodoService";

export default function TodosScreen() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  const [editForm, setEditForm] = useState({
    id: "",
    title: "",
    description: "",
    dueDate: new Date(),
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const loadTodos = async () => {
    setLoading(true);
    try {
      const data = await fetchTodos();
      setTodos(Array.isArray(data) ? data : data.todos || []);
    } catch (err) {
      console.error("Failed to fetch todos", err);
      Toast.show({ type: "error", text1: "Failed to load tasks" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleComplete = async (id) => {
    try {
      await completeTodo(id);
      Toast.show({ type: "success", text1: "Task marked completed ✅" });
      await loadTodos();
    } catch (err) {
      console.error("Complete failed", err);
      Toast.show({ type: "error", text1: "Failed to complete task" });
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteTodo(selectedTodoId);
      Toast.show({ type: "success", text1: "Task deleted ✅" });
      setShowModal(false);
      await loadTodos();
    } catch (err) {
      console.error("Delete failed", err);
      Toast.show({ type: "error", text1: "Failed to delete task" });
    }
  };

  const handleEditSubmit = async () => {
    const { id, title, description, dueDate } = editForm;
    if (!title.trim()) {
      Toast.show({ type: "error", text1: "Title is required" });
      return;
    }

    try {
      await updateTodo(id, title, description, dueDate);
      Toast.show({ type: "success", text1: "Task updated successfully ✅" });
      setShowEditModal(false);
      await loadTodos();
    } catch (err) {
      console.error("Update failed", err);
      Toast.show({ type: "error", text1: "Failed to update task" });
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setEditForm((prev) => ({
        ...prev,
        dueDate: new Date(
          selectedDate.setHours(
            prev.dueDate.getHours(),
            prev.dueDate.getMinutes()
          )
        ),
      }));
    }
  };

  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setEditForm((prev) => {
        const updated = new Date(prev.dueDate);
        updated.setHours(selectedTime.getHours());
        updated.setMinutes(selectedTime.getMinutes());
        return { ...prev, dueDate: updated };
      });
    }
  };

  const renderItem = ({ item }) => {
    const done = !!item.completed;
    return (
      <View
        className={`rounded-lg p-4 mb-3 shadow ${
          done ? "bg-gray-200" : "bg-white"
        }`}
      >
        <Text
          className={`text-lg font-semibold mb-2 ${
            done ? "text-gray-400 line-through" : "text-gray-800"
          }`}
        >
          {item.title}
        </Text>

        <Text className={`mb-4 ${done ? "text-gray-300" : "text-gray-600"}`}>
          {item.description}
        </Text>

        <Text
          className={`text-sm mb-4 ${done ? "text-gray-300" : "text-gray-500"}`}
        >
          Due: {new Date(item.dueDate).toLocaleString()}
        </Text>

        <View className="flex-row justify-between items-center">
          {/* Left: Complete & Edit */}
          <View className="flex-row space-x-3">
            {!done && (
              <TouchableOpacity
                onPress={() => handleComplete(item._id)}
                className="bg-green-600 px-4 py-2 rounded"
              >
                <Text className="text-white">Complete</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              disabled={done}
              onPress={() => {
                setEditForm({
                  id: item._id,
                  title: item.title,
                  description: item.description,
                  dueDate: new Date(item.dueDate),
                });
                setShowEditModal(true);
              }}
              className={`px-4 py-2 rounded ${
                done ? "bg-gray-400" : "bg-blue-600"
              }`}
            >
              <Text className="text-white">Edit</Text>
            </TouchableOpacity>
          </View>

          {/* Right: Delete */}
          <TouchableOpacity
            onPress={() => {
              setSelectedTodoId(item._id);
              setShowModal(true);
            }}
            className="bg-red-600 px-4 py-2 rounded"
          >
            <Text className="text-white">Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="px-4 py-3 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-800">📋 All Tasks</Text>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#9333EA" />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ padding: 16 }}
          data={todos}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-10">
              No tasks available.
            </Text>
          }
          renderItem={renderItem}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        transparent
        visible={showModal}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/40 px-4">
          <View className="bg-white w-full rounded-lg p-6">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              ❗ Are you sure you want to delete this task?
            </Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                <Text className="text-gray-700">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmDelete}
                className="bg-red-600 px-4 py-2 rounded"
              >
                <Text className="text-white">Yes, Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Modal */}
      <Modal
        transparent
        visible={showEditModal}
        animationType="slide"
        onRequestClose={() => setShowEditModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/30 px-4">
          <View className="bg-white w-full rounded-lg p-6">
            <Text className="text-lg font-bold mb-4 text-gray-800">
              ✏️ Edit Task
            </Text>

            <TextInput
              placeholder="Title"
              value={editForm.title}
              onChangeText={(text) =>
                setEditForm((prev) => ({ ...prev, title: text }))
              }
              className="border border-gray-300 rounded p-2 mb-3"
            />
            <TextInput
              placeholder="Description"
              value={editForm.description}
              onChangeText={(text) =>
                setEditForm((prev) => ({ ...prev, description: text }))
              }
              multiline
              className="border border-gray-300 rounded p-2 mb-3 h-20"
            />

            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className="border border-gray-300 rounded p-3 mb-2"
            >
              <Text className="text-gray-700">
                📅 {editForm.dueDate.toDateString()}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              className="border border-gray-300 rounded p-3 mb-4"
            >
              <Text className="text-gray-700">
                ⏰ {editForm.dueDate.toLocaleTimeString()}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={editForm.dueDate}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onChangeDate}
              />
            )}
            {showTimePicker && (
              <DateTimePicker
                value={editForm.dueDate}
                mode="time"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onChangeTime}
              />
            )}

            <View className="flex-row justify-between mt-2">
              <TouchableOpacity
                onPress={() => setShowEditModal(false)}
                className="bg-gray-400 px-4 py-2 rounded"
              >
                <Text className="text-white">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleEditSubmit}
                className="bg-blue-600 px-4 py-2 rounded"
              >
                <Text className="text-white">Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Toast />
    </SafeAreaView>
  );
}
