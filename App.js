import * as React from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import * as SecureStore from "expo-secure-store";

const Drawer = createDrawerNavigator();

import S1 from "./components/S1";
import S2 from "./components/S2";

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      <DrawerItem
        label="test"
        icon={() => <Image />}
        onPress={() => console.log("test")}
      />
    </DrawerContentScrollView>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="s1" component={S1} />
        <Drawer.Screen name="s2" component={S2} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
