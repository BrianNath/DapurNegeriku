import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { setCustomText, setCustomTextInput } from "react-native-global-props";


import {
  RegisterScreen,
  HomeScreen,
  LoginScreen,
  LandingScreen,
} from "./screens";
import { UCartscreen, UHistoryscreen, UProfilescreen } from './screens/User/'
import { FONTS } from "./constant";

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

          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />

          <Stack.Screen
            options={{
              headerTitleAlign: 'center',
              title: 'Profile',
              headerTitleStyle: {
                ...FONTS.regular_green
              },
            }}
            name="UProfile"
            component={UProfilescreen} />

          <Stack.Screen
            options={{
              headerTitleAlign: 'center',
              title: 'Cart',
              headerTitleStyle: {
                ...FONTS.regular_green
              },
            }}
            name="UCart"
            component={UCartscreen} />

          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeScreen}
          />

          <Stack.Screen
            options={{
              headerTitleAlign: 'center',
              title: 'History',
              headerTitleStyle: {
                ...FONTS.regular_green
              },
            }}
            name="UHistory"
            component={UHistoryscreen}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="Landing"
            component={LandingScreen}
          />

          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
        <StatusBar style="auto" />
        <StatusBar translucent backgroundColor="transparent" />
      </NavigationContainer>
    );
  }
}


