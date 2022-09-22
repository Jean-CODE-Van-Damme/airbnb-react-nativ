// imports React et React Nativ
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

// Imports Packages

import axios from "axios";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

// Imports Logo et Icons
import logo from "../assets/logo-juve.jpeg";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProfileScreen({ saveToken, userId, userToken }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPicture, setSelectedPicture] = useState(null);

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
        // console.log("responseProfilData >>>", response.data);
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
      // console.log("responseUdpdate >>>", response2.data);
    } catch (error) {
      console.log("error >>>", error.response2);
    }
  };

  // FONCTION D ACCES GALERIE
  const getPermissionAndGetPicture = async () => {
    // demande d acces a la galerie

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      // si oui on ouvre la galerie
      const result = await ImagePicker.launchImageLibraryAsync();

      if (result.cancelled === true) {
        // si l utilisateur annule on annule
        alert("pas de photo selectionnee");
      } else {
        // si pas d annulation on met a jour le state avec la photo selec
        console.log("result>>>", result);
        setSelectedPicture(result.uri);
      }
    } else {
      alert("permisison refusee");
    }
  };

  console.log("picture ...>>>", selectedPicture);

  // FONCTION PRISE DE PHOTO
  const getPermissionAndTakePicture = async () => {
    //Demander le droit d'accéder à l'appareil photo
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      //ouvrir l'appareil photo
      const result = await ImagePicker.launchCameraAsync();
      // console.log(result);
      setSelectedPicture(result.uri);
    } else {
      alert("Permission refusée");
    }
  };

  // FOMCTION MISE A JOUR PHOTO DE PROFIL
  const updatePicture = async () => {
    setIsLoading(true);

    const tab = selectedPicture.split(".");

    try {
      const formData = new FormData();
      formData.append("photo", {
        uri: selectedPicture,
        name: `userpicture.${tab[1]}`,
        type: `image/${tab[1]}`,
      });

      const response3 = await axios.put(
        "https://express-airbnb-api.herokuapp.com/user/upload_picture",
        formData,

        { headers: { Authorization: ` Bearer ${userToken}` } }
      );
      console.log("responsePicture>>>", response3.data);

      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/user/${userId}`,
        { headers: { Authorization: ` Bearer ${userToken}` } }
      );
      setData(response.data);

      if (response3.data) {
        setIsLoading(false);
        alert("photo bien envoyee");
      }
    } catch (error) {
      console.log(error.reponse);
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
                  source={{ uri: data.photo.url }}
                ></Image>
              ) : (
                <Image style={styles.userPhoto} source={logo}></Image>
              )}

              <View style={styles.doubleIcon}>
                <TouchableOpacity onPress={getPermissionAndGetPicture}>
                  <FontAwesome name="picture-o" size={30} color="grey" />
                </TouchableOpacity>
                <TouchableOpacity onPress={getPermissionAndTakePicture}>
                  <MaterialIcons name="add-a-photo" size={30} color="grey" />
                </TouchableOpacity>
              </View>
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
                onPress={updatePicture}
                style={styles.buttonUp}
                activeOpacity={0.8}
              >
                <Text>Update Picture </Text>
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
    height: "100%",
  },

  photoPart: {
    marginTop: 10,
    width: "100%",
    height: 200,
    // justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "gold",
    flexDirection: "row",
    marginLeft: 140,
    marginBottom: 20,
  },

  doubleIcon: {
    height: 140,
    justifyContent: "space-around",
    // backgroundColor: "gold",
    marginLeft: 10,
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
    marginTop: 80,
    Width: "100%",
    height: 180,
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
