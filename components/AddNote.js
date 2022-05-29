import React, { Component } from "react";
import * as SecureStore from "expo-secure-store";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { log } from "react-native-reanimated";
import { keyboardProps } from "react-native-web/dist/cjs/modules/forwardedProps";
let title,
  content,
  keys = "",
  colors = ["#ff0000", "#00ff00", "#0000ff", "#00FFFF", "#FF00FF", "#808080"],
  i = 0,
  category,
  exist = false;

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      categories: [],
    };
  }
  saveItem = async () => {
    // console.log("xd");
    exist = false;
    this.keys = await SecureStore.getItemAsync("keys");
    this.key = title;
    if (this.keys != null) {
      this.keysCheck = this.keys.split("_");
      for (let i = 0; i < this.keysCheck.length; i++) {
        if (this.keysCheck[i] == this.key) {
          exist = true;
        }
      }
    }

    if (!exist) {
      keys += "_" + this.key;
      this.color = colors[i % 6];
      i++;
      this.content = content;
      this.category = category;
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
      await SecureStore.setItemAsync("keys", keys);
      await SecureStore.setItemAsync(this.key, this.value);
      this.setState({ exist: "" });
      this.props.navigation.navigate("Notes");
    } else {
      this.setState({ exist: "Note with this title already exist" });
    }
  };
  getCategories = async () => {
    console.log(this.state.category);

    this.categoriesString = await SecureStore.getItemAsync("categories");
    this.categories = this.categoriesString.split("_");
    this.categories.shift();
    this.setState({ category: this.categories[0] });
    this.setState({ categories: this.categories });
    category = this.state.category;
    // console.log(this.state.category);
  };
  componentDidMount = () => {
    this.funkcja = this.props.navigation.addListener("focus", () => {
      // ta funkcja wykona się za każdym razem kiedy ekran zostanie przywrócony
      this.getCategories();
    });

    // ta funkcja wykona się raz podczas uruchomienia ekranu
    this.getCategories();
  };

  componentWillUnmount() {
    this.funkcja();
  }
  render() {
    return (
      <View style={styles.all}>
        <Text>{this.state.exist}</Text>
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
            multiline={true}
            onChangeText={(text) => (content = text)}
          />
          <Text style={styles.element}>Category</Text>
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
              this.saveItem();
            }}
            title="Save"
          />
        </View>
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
    height: 360,
    width: "70%",
    marginLeft: "15%",
    marginTop: "5%",
    marginBottom: "0%",
    display: "flex",
    justifyContent: "flex-start",
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
    width: "100%",
    marginLeft: "15%",
    marginTop: -80,
  },
});
