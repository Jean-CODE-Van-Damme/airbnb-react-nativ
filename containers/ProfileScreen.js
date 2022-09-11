import {
  Text,
  View,
  Button,
  ActivityIndicator,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import logo from "../assets/logo-juve.jpeg";

import { useState, useEffect } from "react";

export default function ProfileScreen({ saveToken, userId, userToken }) {
  // console.log("userIdInPS >>>", userId);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const userProfile = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          { headers: { Authorization: ` Bearer ${userToken}` } }
        );
        setData(response.data);
        setEmail(response.data.email);
        setUsername(response.data.username);
        setDescription(response.data.description);
        console.log("responseProfilData >>>", response.data);
      } catch (error) {
        console.log(error.response);
      }
      setIsLoading(false);
    };
    userProfile();

    const updateProfile = async () => {
      try {
        const response2 = await axios.put(
          "https://express-airbnb-api.herokuapp.com/user/update",
          {
            email: email,
            description: description,
            username: username,
          },
          { headers: { Authorization: ` Bearer ${userToken}` } }
        );
        console.log("responseUdpdate >>>", response2.data);
      } catch (error) {
        console.log(error.response2);
      }
    };
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="purple"
          style={{ marginTop: 100 }}
        ></ActivityIndicator>
      ) : (
        <ScrollView style={styles.container}>
          <View>
            <View style={styles.photoPart}>
              {data.photo ? (
                <Image
                  style={styles.userPhoto}
                  source={{ uri: data.photo }}
                ></Image>
              ) : (
                <Image style={styles.userPhoto} source={logo}></Image>
              )}
            </View>

            <View>
              <TextInput
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                }}
              ></TextInput>

              <TextInput
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                }}
              ></TextInput>

              <TextInput
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                }}
              ></TextInput>
            </View>

            <View>
              <TouchableOpacity
                // onPress={updateProfile}
                style={styles.buttonUpdate}
                activeOpacity={0.8}
              >
                <Text>UPDATE</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonUpdate}
                activeOpacity={0.8}
                onPress={() => {
                  saveToken(null);
                }}
              >
                <Text>LOG OUT </Text>
              </TouchableOpacity>
            </View>

            <Text>{username}</Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "gold",
  },

  photoPart: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },

  userPhoto: {
    width: 150,
    height: 150,
    borderRadius: 150,
  },

  buttonUpdate: {
    borderColor: "black",
    borderWidth: 2,
  },
});
