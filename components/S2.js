import React, { Component } from "react";
import * as SecureStore from "expo-secure-store";

import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { log } from "react-native-reanimated";
import { keyboardProps } from "react-native-web/dist/cjs/modules/forwardedProps";
let title,
  content,
  keys = "",
  colors = ["#ff0000", "#00ff00", "#0000ff", "#00FFFF", "#FF00FF", "#808080"],
  i = 0;

async function saveItem(navigation) {
  keys = await SecureStore.getItemAsync("keys");
  key = title;
  if (keys != null) {
    let keysCheck = keys.split("_");
    for (let i = 0; i < keysCheck.length; i++) {
      if (keysCheck[i] == key) {
        key = key + "1";
        i = 0;
      }
    }
  }
  keys += "_" + key;
  let color = colors[i % 6];
  i++;
  value = content + "_" + color;
  console.log(value);
  await SecureStore.setItemAsync("keys", keys);
  await SecureStore.setItemAsync(key, value);
  navigation.navigate("Notes");
}

export default class S2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.all}>
        <View style={styles.container}>
          <Text style={styles.element}>TITLE</Text>
          <TextInput
            style={styles.element}
            underlineColorAndroid="#000000"
            placeholder="title"
            onChangeText={(text) => (title = text)}
          />
          <Text style={styles.element}>Content</Text>
          <TextInput
            style={styles.element}
            underlineColorAndroid="#000000"
            placeholder="content"
            onChangeText={(text) => (content = text)}
          />
        </View>
        <Button
          onPress={() => {
            saveItem(this.props.navigation);
          }}
          title="Save"
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  all: {
    width: "100%",
  },
  container: {
    backgroundColor: "#ffff00",
    flexDirection: "column",
    flexWrap: "nowrap",
    height: 240,
    width: "70%",
    marginLeft: "15%",
    marginTop: "25%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  element: {
    width: "90%",
    margin: "5%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
