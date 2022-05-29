import React, { useRef, Component, useEffect, useState } from "react";
import {
  AppState,
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Edit from "./Edit";
import { useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
let keys;
let results = [{ key: "x", content: "d" }];

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
    this.funkcja = null;
  }

  async getItem() {
    console.log("getItem");
    //await SecureStore.deleteItemAsync("keys");
    let stringKeys = await SecureStore.getItemAsync("keys");
    console.log(stringKeys);
    keys = stringKeys.split("_");

    console.log(keys);
    results = [];
    for (let i = 1; i < keys.length; i++) {
      let result = await SecureStore.getItemAsync(keys[i]);
      //console.log(result);
      if (result != null) {
        let data = result.split("_");
        console.log(data);
        results.push({
          key: keys[i],
          content: data[0],
          category: data[2],
          number: i - 1,
          color: data[1],
          date: data[3],
        });
      }
    }

    this.setState({ notes: results });
  }

  componentDidMount = () => {
    this.funkcja = this.props.navigation.addListener("focus", () => {
      this.getItem();
      //console.log("cd");
    });
    //this.getItem();
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
  search() {
    console.log(searchText);
    let searchResults = results.filter(
      (item) =>
        item.content.includes(searchText) ||
        item.key.includes(searchText) ||
        item.category.includes(searchText)
    );
    this.setState({ notes: searchResults });
  }
  render() {
    return (
      <View>
        <TextInput
          style={styles.input}
          placeholder="search"
          onChangeText={(text) => {
            searchText = text;
            this.search();
          }}
        ></TextInput>
        <FlatList
          style={styles.container}
          numColumns={2}
          // keyExtractor={item => item.id.toString()}
          data={this.state.notes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.element, { backgroundColor: item.color }]}
              onLongPress={() => this.showAlert(item.key)}
              onPress={() =>
                this.props.navigation.navigate("Edit", {
                  key: item.key,
                  content: item.content,
                  category: item.category,
                  color: item.color,
                })
              }
            >
              <Text style={[styles.title, styles.text]}>
                {item.key}
                <Text style={styles.category}> ({item.category})</Text>
              </Text>

              <Text style={[styles.content, styles.text]}>
                {item.content.slice(0, 10)}
              </Text>
              <Text style={[styles.date, styles.text]}>{item.date}</Text>
            </TouchableOpacity>
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignContent: "center",
    borderRadius: 10,
  },
  text: {
    width: "90%",
    marginLeft: "5%",
  },
  date: {
    textAlign: "right",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
  },
  content: {
    textAlign: "left",
    fontSize: 16,
  },
  category: {
    fontSize: 14,
  },
  input: {
    width: "90%",
    marginLeft: "5%",
    backgroundColor: "lightgray",
    marginTop: 10,
    height: 40,
    fontSize: 24,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 16,
  },
});
