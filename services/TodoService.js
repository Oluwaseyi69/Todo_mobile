import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

console.log("i got to service");

const API_BASE_URL = "http://localhost:5050/api/todo";

export const fetchTodos = async () => {
  console.log("[TodoService] fetchTodos called");
  const token = await AsyncStorage.getItem("token");
  console.log("[TodoService] fetched token for fetchTodos:", token);

  try {
    const res = await axios.get(`${API_BASE_URL}/todos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("[TodoService] fetchTodos response:", res.data);
    return res.data.viewTodos;
  } catch (error) {
    console.error(
      "[TodoService] fetchTodos failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const addTodo = async (title, description, dueDate) => {
  console.log("i got to todo-service");
  const token = await AsyncStorage.getItem("token");
  console.log("token from service", token);

  try {
    const res = await axios.post(
      `${API_BASE_URL}/createTodo`,
      { title, description, dueDate },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const savedTodo = res.data.todo;
    console.log(savedTodo);
    return savedTodo;
  } catch (error) {
    console.error("Add todo failed:", error.response?.data || error.message);
    throw error;
  }
};
export const editTodo = async (id, title, description, dueDate) => {
  console.log("Editing Todo with ID:", id);
  const token = await AsyncStorage.getItem("token");
  console.log("Token from AsyncStorage:", token);

  try {
    const res = await axios.put(
      `${API_BASE_URL}/updateTodo/${id}`,
      { title, description, dueDate },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const updatedTodo = res.data.todo;
    console.log("✅ Todo updated:", updatedTodo);
    return updatedTodo;
  } catch (error) {
    console.error(" Edit todo failed:", error.response?.data || error.message);
    throw error;
  }
};
export const completeTodo = async (id) => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log("Token: ", token);
    const response = await axios.post(
      `${API_BASE_URL}/completed/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Failed to complete todo:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.delete(`${API_BASE_URL}/deleteTodo/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Failed to delete todo:",
      error.response?.data || error.message
    );
    throw error;
  }
};
