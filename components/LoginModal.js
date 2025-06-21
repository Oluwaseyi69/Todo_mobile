// components/LoginModal.js
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import api from "../services/api";

export default function LoginModal({ visible, onClose, navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.token;

      console.log("Token from login:", token);
      // store token
      await AsyncStorage.setItem("token", token);

      Toast.show({
        type: "success",
        text1: "Sign‑up successful!",
      });

      setTimeout(() => {
        navigation.replace("Home");
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
      Toast.show({
        type: "error",
        text1: "Login Failed",
        // text2: err.data.message,
      });
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-white bg-opacity-50 justify-center items-center">
        <View className="bg-white w-11/12 max-w-md p-6 rounded-lg drop-shadow-sm">
          <Text className="text-2xl font-bold mb-4 text-center">Log In</Text>

          {error ? (
            <Text className="text-red-500 text-center mb-3">{error}</Text>
          ) : null}

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            className="border border-gray-400 rounded px-4 py-2 mb-3"
          />

          {/* Password with toggle */}
          <View className="relative mb-6">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry={!showPassword}
              className="border border-gray-400 rounded px-4 py-2 pr-10"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5"
            >
              <Feather
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-end space-x-3">
            <TouchableOpacity
              onPress={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              <Text className="text-gray-700">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogin}
              className="px-4 py-2 bg-purple-600 rounded"
              disabled={loading}
            >
              <Text className="text-white font-semibold">
                {loading ? "Logging in…" : "Log In"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
