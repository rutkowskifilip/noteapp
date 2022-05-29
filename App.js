import * as React from "react";
import { Image, StyleSheet, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import * as SecureStore from "expo-secure-store";
import Icon from "react-native-vector-icons/AntDesign";
const Drawer = createDrawerNavigator();

import Notes from "./components/Notes";
import AddNote from "./components/AddNote";
import Edit from "./components/Edit";
import AddCategory from "./components/AddCategory";
import AddPhoto from "./images/add.png";
import AddCatPhoto from "./images/addCat.png";
import NotesPhoto from "./images/notes.png";
function showAlert() {
  Alert.alert("NoteApp", "Version 2.0", [{ text: "Cancel", style: "cancel" }]);
}
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      <DrawerItem
        label="Info"
        icon={() => <Image />}
        onPress={() => showAlert()}
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
        <Drawer.Screen
          name="Notes"
          component={Notes}
          options={{
            drawerIcon: (config) => <Icon size={23} name={"bars"}></Icon>,
          }}
        />
        <Drawer.Screen
          name="Add Note"
          component={AddNote}
          options={{
            drawerIcon: (config) => <Icon size={23} name={"addfile"}></Icon>,
          }}
        />
        <Drawer.Screen
          name="Add Category"
          component={AddCategory}
          options={{
            drawerIcon: (config) => <Icon size={23} name={"addfolder"}></Icon>,
          }}
        />
        <Drawer.Screen
          name="Edit"
          component={Edit}
          options={{
            drawerLabel: () => null,
            title: null,
            drawerIcon: () => null,
            drawerItemStyle: {
              display: "none",
              height: 0,
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  none: {
    display: "none",
  },
});
