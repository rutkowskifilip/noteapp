import React, { Component } from "react";
import * as SecureStore from "expo-secure-store";
import { Picker } from "@react-native-picker/picker";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { log } from "react-native-reanimated";
import { keyboardProps } from "react-native-web/dist/cjs/modules/forwardedProps";
let category,
  exist = false,
  categoriesString = "",
  categories = [""];

export default class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
    };
  }
  addCategory = async () => {
    this.exist = false;
    // console.log("xd");
    this.categoriesString = await SecureStore.getItemAsync("categories");
    if (this.categoriesString != null) {
      //   console.log(this.categoriesString);
      this.categories = this.categoriesString.split("_");
      //   console.log(this.categories);
      for (let i = 0; i < this.categories.length; i++) {
        // await SecureStore.deleteItemAsync(categories[i]);
        // console.log(this.category, this.categories[i]);
        if (this.category == this.categories[i]) {
          this.exist = true;
        }
      }
    }
    if (!this.exist) {
      //   console.log(this.category);
      this.categoriesString += "_" + this.category;
      //   console.log(this.categoriesString);
      this.setState({ status: "" });
      await SecureStore.setItemAsync("categories", this.categoriesString);
      this.props.navigation.navigate("Notes");
    } else {
      this.setState({ status: "This category already existed." });
    }
  };

  render() {
    return (
      <View style={styles.all}>
        <Text>{this.state.status}</Text>
        <View style={styles.container}>
          <Text style={styles.element}>Category name</Text>
          <TextInput
            style={styles.element}
            underlineColorAndroid="#000000"
            placeholder="title"
            onChangeText={(text) => (this.category = text)}
          />

          <Button
            onPress={() => {
              this.addCategory();
            }}
            title="Add"
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
