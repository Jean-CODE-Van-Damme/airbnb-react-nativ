import {
  Text,
  View,
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
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const userProfile = async () => {
      try {
        // requete API pour retourner les infos du user co
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
  }, []);

  const updateProfile = async () => {
    try {
      // requete API pour envoyer les modification a l API
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
      console.log("error >>>", error.response2);
    }
  };

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
                  // ATTENTION AU CHEMIN IL Y A UNE CLEF SUP
                  source={{ uri: data.photo }}
                ></Image>
              ) : (
                <Image style={styles.userPhoto} source={logo}></Image>
              )}
            </View>

            <View style={styles.formPart}>
              <View style={styles.section1}>
                <TextInput
                  style={styles.input1}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                  }}
                ></TextInput>

                <TextInput
                  style={styles.input1}
                  value={username}
                  onChangeText={(text) => {
                    setUsername(text);
                  }}
                ></TextInput>
              </View>
              <View style={styles.section2}>
                <TextInput
                  value={description}
                  onChangeText={(text) => {
                    setDescription(text);
                  }}
                ></TextInput>
              </View>
            </View>

            <View style={styles.buttonPart}>
              <TouchableOpacity
                onPress={updateProfile}
                style={styles.buttonUp}
                activeOpacity={0.8}
              >
                <Text>Update</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonLog}
                activeOpacity={0.8}
                onPress={() => {
                  saveToken(null);
                }}
              >
                <Text>Log out </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

// PARTIE STYLE
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },

  photoPart: {
    marginTop: 10,
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },

  userPhoto: {
    width: 150,
    height: 150,
    borderRadius: 150,
    borderColor: "#F9575C",
    borderWidth: 1,
  },

  formPart: {
    alignItems: "center",
    width: "100%",
    // backgroundColor: "green",
    height: 200,
  },

  section1: {
    justifyContent: "space-between",
    width: "80%",
    height: 80,
    // backgroundColor: "yellow",
  },

  input1: {
    paddingBottom: 5,
    borderBottomColor: "#F9575C",
    borderBottomWidth: 1,
  },

  section2: {
    marginTop: 30,
    width: "80%",
    height: 120,
    // backgroundColor: "blue",
    borderColor: "#F9575C",
    borderWidth: 1,
    padding: 5,
  },

  buttonPart: {
    marginTop: 30,
    Width: "100%",
    height: 140,
    // backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "space-around",
  },

  buttonUp: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: 40,
    borderColor: "#F9575C",
    borderWidth: 2,
    borderRadius: 20,
  },

  buttonLog: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: 40,
    borderColor: "#F9575C",
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: "#E7E7E7",
  },
});
