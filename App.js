import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegisterScreen, HomeScreen, LoginScreen } from "./screens";
import { LogBox } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  setCustomText,
  setCustomTextInput,
  setCustomTouchableOpacity,
} from "react-native-global-props";

//Time error handler
LogBox.ignoreLogs(["Setting a timer"]);
//

//Stack Navitor
const Stack = createNativeStackNavigator();
//

export default function App() {
  let [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });

  //Set default
  const customTextProps = {
    style: {
      fontFamily: "Poppins-Regular",
    },
  };

  setCustomText(customTextProps);
  setCustomTextInput(customTextProps);
  //

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
