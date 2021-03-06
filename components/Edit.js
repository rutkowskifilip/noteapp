import React, { Component, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Picker } from "@react-native-picker/picker";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { log } from "react-native-reanimated";
import { keyboardProps } from "react-native-web/dist/cjs/modules/forwardedProps";
let title,
  defaultTitle,
  content,
  keys = "",
  category,
  exist = false;

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = { category: "", categories: [], exist: "" };
    this.funkcja = null;
  }
  saveItem = async (color) => {
    await SecureStore.deleteItemAsync(defaultTitle);
    exist = false;
    this.keysString = await SecureStore.getItemAsync("keys");
    this.keys = this.keysString.split("_");
    console.log(this.keys);
    this.key = title;
    for (let i = 0; i < this.keys.length; i++) {
      console.log(this.keys[i], title, defaultTitle);
      if (title != defaultTitle) {
        if (this.keys[i] == title) {
          exist = true;
        } else if (this.keys[i] == defaultTitle) {
          console.log("xd");
          this.keys[i] = title;
          console.log("this.keys[i]: " + this.keys[i]);
        }
      }
    }
    console.log(this.keys);
    this.keysString = this.keys.join("_");
    console.log(this.keysString);
    if (!exist || title == defaultTitle) {
      await SecureStore.setItemAsync("keys", this.keysString);

      this.color = color;
      this.content = content;
      console.log(category);
      this.category = this.state.category;
      this.key = title;
      this.d = new Date();
      this.data =
        this.d.getDate() +
        "." +
        this.d.getMonth() +
        "." +
        this.d.getFullYear() +
        " - " +
        this.d.getHours() +
        ":" +
        this.d.getMinutes();
      this.value =
        this.content + "_" + this.color + "_" + this.category + "_" + this.data;
      // console.log(this.value);
      console.log(this.value);
      await SecureStore.setItemAsync(this.key, this.value);
      this.setState({ exist: "" });
      console.log(keys);
      this.props.navigation.navigate("Notes");
    } else {
      this.setState({ exist: "Note with this title already exist" });
    }
  };
  getCategories = async () => {
    this.categoriesString = await SecureStore.getItemAsync("categories");
    this.categories = this.categoriesString.split("_");
    this.categories.shift();
    this.setState({ category: category });
    this.setState({ categories: this.categories });
    console.log(this.state.category);
  };
  componentDidMount = () => {
    this.funkcja = this.props.navigation.addListener("focus", () => {
      // ta funkcja wykona si?? za ka??dym razem kiedy ekran zostanie przywr??cony
      this.getCategories();
    });

    // ta funkcja wykona si?? raz podczas uruchomienia ekranu
    this.getCategories();
  };
  render() {
    defaultTitle = this.props.route.params.key;
    title = this.props.route.params.key;
    content = this.props.route.params.content;
    category = this.props.route.params.category;

    // console.log(title, content);
    return (
      <View style={styles.all}>
        <Text>{this.state.exist}</Text>
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
            multiline={true}
            defaultValue={this.props.route.params.content}
            onChangeText={(text) => (content = text)}
          />
          <Text style={styles.element}>Category</Text>
        </View>

        <Picker
          selectedValue={this.state.category}
          onValueChange={(text) => {
            this.setState({ category: text });
            category = text;
          }}
          style={styles.picker}
        >
          {this.state.categories.map((item, index) => {
            return <Picker.Item label={item} value={item} key={index} />;
          })}
        </Picker>
        <Button
          onPress={() => {
            this.saveItem(this.props.route.params.color);
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
    flexDirection: "column",
    flexWrap: "nowrap",
    height: 480,
    width: "70%",
    marginLeft: "15%",
    marginTop: "5%",
    marginBottom: "0%",
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
  picker: {
    width: "70%",
    marginLeft: "15%",
    marginTop: -160,
  },
});
