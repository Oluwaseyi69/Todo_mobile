// import { useNavigation } from "@react-navigation/native";
// import { Text, TouchableOpacity, View } from "react-native";

// export default function WelcomeScreen() {
//   const navigation = useNavigation();

//   return (
//     <View className="flex-1 justify-center items-center bg-white px-6">
//       {/* Illustration */}
//       {/* <Image
//         source={require("../assets/faded.jpg")} // Replace with your image
//         className="w-60 h-60 mb-6"
//         resizeMode="contain"
//       /> */}
//       {/* <ImageBackground
//         source={require("../assets/faded.jpg")}
//         resizeMode="cover"
//         className="flex-1 justify-center items-center px-6"
//       ></ImageBackground> */}

//       {/* Heading */}
//       <Text className="text-2xl font-bold text-center text-orange-700 mb-2">
//         Task Management &{"\n"}To-Do List
//       </Text>

//       {/* Subtext */}
//       <Text className="text-gray-500 text-center mb-8">
//         This productive tool is designed to help{"\n"}
//         you better manage your task project-wise conveniently!
//       </Text>

//       {/* Button */}
//       <TouchableOpacity
//         onPress={() => navigation.navigate("SignUp")}
//         className="bg-purple-600 rounded-full px-6 py-3 shadow-lg"
//       >
//         <Text className="text-white font-semibold text-base">Let’s Start</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 relative">
      {/* Background Image */}
      <ImageBackground
        source={require("../assets/faded.jpg")} // Replace with your own image
        resizeMode="cover"
        className="flex-1"
      >
        <BlurView
          intensity={30}
          tint="dark"
          className="w-full h-full justify-center items-center px-6"
        >
          {/* Heading */}
          <Text className="text-3xl text-white font-bold text-center mb-3">
            Task Management{" "}
            <Text className="text-3xl text-white">& To‑Do List</Text>
          </Text>

          {/* Subtext */}
          <Text className="text-gray-200 text-base text-center mb-10">
            Organize, plan, and track your daily tasks{"\n"}
            with ease and clarity.
          </Text>

          {/* Call to Action */}
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            className="bg-black px-6 py-3 p-8 rounded-full shadow-lg active:opacity-80 mt-20 "
          >
            <Text className="text-white text-lg font-semibold">
              Let’s Start
            </Text>
          </TouchableOpacity>
        </BlurView>
      </ImageBackground>
    </View>
  );
}
