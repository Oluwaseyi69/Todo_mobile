// screens/SignUpScreen.js
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import LoginModal from "../components/LoginModal";
import api from "../services/api";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [error, setError] = useState("");

  const phoneRegex = /^\+234\d{10}$/;

  const handleSignUp = async () => {
    // basic validation
    if (!username || !email || !phoneNumber || !password) {
      setError("All fields are required.");
      return;
    }
    if (!phoneRegex.test(phoneNumber)) {
      setError("Phone must be in format +234xxxxxxxxxx");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", {
        username,
        email,
        phoneNumber,
        password,
      });

      // toast on success
      Toast.show({
        type: "success",
        text1: "Sign‑up successful!",
      });

      // clear form (stay on screen)
      setUsername("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");

      setTimeout(() => {
        setShowLogin(true);
      }, 2000);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Sign‑up failed",
        text2: err.data,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center bg-white px-6">
      <Text className="text-3xl font-bold mb-6 text-center">Sign Up</Text>

      {error ? (
        <Text className="text-red-500 text-center mb-4">{error}</Text>
      ) : null}

      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        className="border border-gray-300 rounded px-4 py-2 mb-4"
      />

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        className="border border-gray-300 rounded px-4 py-2 mb-4"
      />

      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="+234xxxxxxxxxx"
        keyboardType="phone-pad"
        className="border border-gray-300 rounded px-4 py-2 mb-4"
      />

      {/* Password with show/hide */}
      <View className="relative mb-6">
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={!showPassword}
          className="border border-gray-300 rounded px-4 py-2 pr-10"
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

      <TouchableOpacity
        onPress={handleSignUp}
        className="bg-purple-600 rounded-full px-6 py-3 mb-4"
        disabled={loading}
      >
        <Text className="text-white font-semibold text-center">
          {loading ? "Signing up…" : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowLogin(true)}>
        <Text className="text-center text-black">
          Already have an account? Log In
        </Text>
      </TouchableOpacity>

      <LoginModal
        visible={showLogin}
        onClose={() => setShowLogin(false)}
        navigation={navigation}
      />
    </View>
  );
}
