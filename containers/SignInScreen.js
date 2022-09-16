// Import React React Native
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";

import { useState } from "react";

// Imports packages
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// Imports picture/logo
import logo from "../assets/logo-airbnb.png";
import { Feather } from "@expo/vector-icons";

export default function SignInScreen({ saveToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const navigation = useNavigation();

  const fetchData = async () => {
    if (email && password) {
      try {
        setErrorMessage("");
        setIsLoading(true);
        // requete Apti pour envoyer email et password
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          { email: email, password: password }
        );

        // transmettre le token et l id du user dans App.js
        saveToken(response.data.token, response.data.id);
        alert("Connexion Successfull");
      } catch (error) {
        console.log(error.response);
        if (error.response.data) {
          setErrorMessage(error.response.data.error);
        }
      }
    } else {
      setErrorMessage("Please fill all fields");
    }

    setIsLoading(false);
  };

  return (
    <KeyboardAwareScrollView style={styles.keyboard}>
      {/* Chargement */}
      {isLoading && (
        <ActivityIndicator
          size="large"
          color="purple"
          style={{ marginTop: 100 }}
        ></ActivityIndicator>
      )}
      {/* Fin du chargement */}
      <View>
        <View>
          <View style={styles.section1}>
            <Image source={logo} style={styles.logo}></Image>
            <Text style={styles.title}>Sign in</Text>
          </View>

          <View style={styles.section2}>
            <TextInput
              style={styles.section2Part}
              placeholder="email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            {/* Afficher ou pas le password et le logo eye selon le state isSecureEntry */}
            <View style={styles.password}>
              {isSecureEntry ? (
                <Feather
                  onPress={() => {
                    setIsSecureEntry((prev) => !prev);
                  }}
                  name="eye"
                  size={24}
                  color="black"
                />
              ) : (
                <Feather
                  onPress={() => {
                    setIsSecureEntry((prev) => !prev);
                  }}
                  name="eye-off"
                  size={24}
                  color="black"
                />
              )}
              <TextInput
                style={styles.section2Part}
                placeholder="password"
                secureTextEntry={isSecureEntry}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
              />
            </View>
          </View>

          <View style={styles.section3}>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.btn}
              title="Sign in"
              // Appel de la fonction Fecthdata
              onPress={fetchData}
            >
              <Text>Sign in</Text>
            </TouchableOpacity>
          </View>

          {/* Navigaiton vers Sign-up si l user n a pas encore de compte cree */}
          <View style={styles.section4}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text>Create an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

// Partie Style
const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },

  section1: {
    flex: 1,
    height: 200,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    marginTop: 30,
  },

  logo: { width: "30%", height: "60%", resizeMode: "contain" },
  title: {
    fontSize: 20,
    height: "30%",
  },

  section2: {
    flex: 1,

    height: 200,
    justifyContent: "space-around",
    paddingRight: 20,
    paddingLeft: 20,
  },

  section2Part: {
    borderBottomColor: "#FDBAC0",
    width: "85%",
    borderBottomWidth: 2,
    padding: 5,
  },

  section3: {
    flex: 1,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
  },

  btn: {
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    height: "70%",
    borderWidth: 2,
    borderColor: "#FB7F83",
    borderRadius: 35,
    margin: 10,
  },

  section4: {
    flex: 1,
    height: 80,
    opacity: 0.5,
    alignItems: "center",
    marginTop: 20,
  },

  errorMessage: {
    color: "#FBB2B5",
    fontWeight: "bold",
    fontSize: 12,
  },

  password: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
});
