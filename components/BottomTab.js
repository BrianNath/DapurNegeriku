import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, UCartScreen } from '../screens';

const BottomTab = () => {

    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            {/* <Tab.Screen name="UCart" component={UCartScreen} /> */}
        </Tab.Navigator>
    );
}

export default BottomTab