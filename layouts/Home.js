import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "react-native-vector-icons/AntDesign";

const { Navigator, Screen } = createBottomTabNavigator();

import {
    BottomNavigation,
    BottomNavigationTab,
    Icon,
    IconElement,
} from "@ui-kitten/components";
import Products from "../screens/Products";
import Categories from "../screens/Categories";
import Staffs from "../screens/Staffs";
import Settings from "../screens/Settings";

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
        <BottomNavigationTab title="Products" />
        <BottomNavigationTab title="Categories" />
        <BottomNavigationTab title="Staffs" />
        <BottomNavigationTab title="Settings" />
    </BottomNavigation>
);

const Home = () => {
    return (
        <NavigationContainer>
            <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
                <Screen name="Products" component={Products} />
                <Screen name="Categories" component={Categories} />
                <Screen name="Staffs" component={Staffs} />
                <Screen name="Settings" component={Settings} />
            </Navigator>
        </NavigationContainer>
    );
};

export default Home;
