import React, { Component } from "react";
import * as SecureStore from "expo-secure-store";

import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { log } from "react-native-reanimated";
import { keyboardProps } from "react-native-web/dist/cjs/modules/forwardedProps";
let title,
  content,
  keys = "";

async function saveItem(props, color) {
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

  value = content + "_" + color;
  console.log(value);
  await SecureStore.setItemAsync("keys", keys);
  await SecureStore.setItemAsync(key, value);
  props.navigation.navigate("Notes");
}

export default class S2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props.route.params.key, this.props.route.params.content);
    return (
      <View style={styles.all}>
        <View style={styles.container}>
          <Text style={styles.element}>TITLE</Text>
          <TextInput
            style={styles.element}
            underlineColorAndroid="#000000"
            placeholder="title"
            defaultValue={this.props.route.params.key}
            onChangeText={(text) => (title = text)}
          />
          <Text style={styles.element}>Content</Text>
          <TextInput
            style={styles.element}
            underlineColorAndroid="#000000"
            placeholder="content"
            defaultValue={this.props.route.params.content}
            onChangeText={(text) => (content = text)}
          />
        </View>
        <Button
          onPress={() => {
            saveItem(this.props, this.props.route.params.color);
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
