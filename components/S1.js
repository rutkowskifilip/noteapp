import React, { useRef, Component, useEffect, useState } from "react";
import {
  AppState,
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import Edit from "./Edit";
import { useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
let keys;
let results = [{ key: "x", content: "d" }];

export default class S1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
    this.funkcja = null;
  }

  async getItem() {
    let stringKeys = await SecureStore.getItemAsync("keys");

    keys = stringKeys.split("_");
    console.log(keys);
    results = [];
    for (let i = 1; i < keys.length; i++) {
      let result = await SecureStore.getItemAsync(keys[i]);
      let data = result.split("_");
      console.log(data[1]);
      results.push({
        key: keys[i],
        content: data[0],
        number: i - 1,
        color: data[1],
      });
    }
    // results.forEach((element) => {
    //   console.log(element.key, element.content);
    // });
    // console.log("-------------------------");
    this.setState({ notes: results });

    //AppState.removeEventListener("blur", getItem())
  }

  componentDidMount = () => {
    this.funkcja = this.props.navigation.addListener("focus", () => {
      this.getItem();
      //console.log("cd");
    });
    this.getItem();
  };
  componentWillUnmount() {
    this.funkcja();
  }

  showAlert(key) {
    Alert.alert("Delete note " + key + "?", "", [
      { text: "NO", style: "cancel" },
      {
        text: "YES",
        onPress: () => this.deleteItem(key),
      },
    ]);
  }
  async deleteItem(key) {
    await SecureStore.deleteItemAsync(key);

    let newKeys = keys.filter((str) => str != key);
    // console.log(newKeys);
    let keysN = newKeys.join("_");
    console.log(keysN);
    await SecureStore.setItemAsync("keys", keysN);
    this.getItem();
  }
  render() {
    return (
      <View>
        <FlatList
          style={styles.container}
          numColumns={2}
          // keyExtractor={item => item.id.toString()}
          data={this.state.notes}
          renderItem={({ item }) => (
            <Text
              style={[styles.element, { backgroundColor: item.color }]}
              onLongPress={() => this.showAlert(item.key)}
              onPress={() =>
                this.props.navigation.navigate("Edit", {
                  key: item.key,
                  content: item.content,
                  color: item.color,
                })
              }
            >
              {item.key}: {item.content}
            </Text>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flexWrap: "nowrap",
    height: "100%",
  },
  element: {
    width: "40%",
    height: 120,
    margin: "5%",
    backgroundColor: "#ff0000",
  },
});
