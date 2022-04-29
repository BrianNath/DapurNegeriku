import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { setCustomText, setCustomTextInput } from "react-native-global-props";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  RegisterScreen,
  HomeScreen,
  LoginScreen,
  LandingScreen
} from "./screens";
import {
  UCartscreen,
  UHistoryscreen,
  UProfilescreen,
  TabNavigator
} from "./screens/User/";
import { FONTS, COLORS } from "./constant";

//Time error handler
LogBox.ignoreLogs(["Setting a timer"]);
//

//Stack Navitor
const Stack = createNativeStackNavigator();
//
export default function App() {
  let [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf")
  });

  //Set default
  const customTextProps = {
    style: {
      fontFamily: "Poppins-Regular"
    }
  };

  setCustomText(customTextProps);
  setCustomTextInput(customTextProps);
  //

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="HomeStack" //for home
            component={Tab1}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="Landing"
            component={LandingScreen}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
        <StatusBar translucent backgroundColor="transparent" />
      </NavigationContainer>
    );
  }
}

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
export function Tab1() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          let size;

          switch (route.name) {
            case "Home":
              iconName = focused ? "ios-home" : "ios-home-outline";
              size = 30;
              break;
            case "Cart":
              iconName = focused ? "basket" : "basket-outline";
              size = 34;
              break;
            case "History":
              iconName = focused ? "md-list-circle" : "md-list-circle-outline";
              size = 34;
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              size = 30;
              break;
            default:
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.secondary,
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: hp(8)
        },
        tabBarShowLabel: false
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Cart"
        component={UCartscreen}
        options={{
          headerTitleAlign: "center",
          title: "Cart",
          headerTitleStyle: {
            ...FONTS.regular_green,
            paddingTop: hp(1),
            fontSize: 22
          }
        }}
      />
      <Tab.Screen
        name="History"
        component={UHistoryscreen}
        options={{
          headerTitleAlign: "center",
          title: "History",
          headerTitleStyle: {
            ...FONTS.regular_green,
            paddingTop: hp(1),
            fontSize: 22
          }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UProfilescreen}
        options={{
          headerTitleAlign: "center",
          title: "Profile",
          headerTitleStyle: {
            ...FONTS.regular_green,
            paddingTop: hp(1),
            fontSize: 22
          }
        }}
      />
    </Tab.Navigator>
  );
}
