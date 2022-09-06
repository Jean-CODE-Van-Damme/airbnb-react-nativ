import { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import logo from "../assets/logo-airbnb.png";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isSecureEntryConfirm, setIsSecureEntryConfirm] = useState(true);

  const fetchData = async () => {
    if (email && username && description && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          console.log("requete >>>", "requete is started");
          setErrorMessage("");
          setIsLoading(true);
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              username: username,
              description: description,
              password: password,
            }
          );
          console.log("response >>>", response.data);
          setToken(response.data.token);
          alert("Inscritpion successfull");
        } catch (error) {
          console.log(error.response);
          if (error.response.data) {
            setErrorMessage(error.response.data.error);
          }
        }
        setIsLoading(false);
      } else {
        setErrorMessage("Passwords must be the same ");
      }
    } else {
      setErrorMessage("Missing parameter ");
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="purple"
          style={{ marginTop: 100 }}
        ></ActivityIndicator>
      ) : null}

      <View style={styles.section1}>
        <Image source={logo} style={styles.logo}></Image>
        <Text style={styles.title}>Sign up</Text>
      </View>

      <View>
        <View>
          <View style={styles.section2}>
            <TextInput
              style={styles.section2Part}
              placeholder="email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />

            <TextInput
              style={styles.section2Part}
              placeholder="username"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
              }}
            />
          </View>

          <View style={styles.section3}>
            <TextInput
              style={styles.section3Part}
              placeholder="describe yourself in a few words..."
              multiline={true}
              textAlignVertical="top"
              value={description}
              onChangeText={(text) => {
                setDescription(text);
              }}
            />
          </View>

          <View style={styles.section4}>
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
                style={styles.section4Part}
                placeholder="password"
                secureTextEntry={isSecureEntry}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
              />
            </View>

            <View style={styles.password}>
              {isSecureEntryConfirm ? (
                <Feather
                  onPress={() => {
                    setIsSecureEntryConfirm((prev) => !prev);
                  }}
                  name="eye"
                  size={24}
                  color="black"
                />
              ) : (
                <Feather
                  onPress={() => {
                    setIsSecureEntryConfirm((prev) => !prev);
                  }}
                  name="eye-off"
                  size={24}
                  color="black"
                />
              )}
              <TextInput
                style={styles.section4Part}
                placeholder="confirm Password"
                secureTextEntry={isSecureEntryConfirm}
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                }}
              />
            </View>
          </View>

          <View style={styles.section5}>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.8}
              title="Sign up"
              onPress={() => fetchData()}

              // const userToken = "secret-token";
              // setToken(userToken);
            >
              <Text>Sign up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section6}>
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
              <Text>Already have an account? Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

// STYLE

const styles = StyleSheet.create({
  container: { flex: 1 },

  section1: {
    flex: 1,
    height: 120,
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
    height: 110,
    justifyContent: "space-around",
    paddingRight: 20,
    paddingLeft: 20,
  },

  section2Part: {
    borderBottomColor: "#FDBAC0",
    borderBottomWidth: 2,
    padding: 5,
  },

  section3: {
    flex: 1,
    height: 120,
    justifyContent: "center",
    padding: 20,
  },

  section3Part: {
    borderColor: "#FDBAC0",
    borderWidth: 2,
    padding: 5,
    height: "80%",
  },

  section4: {
    flex: 1,
    height: 110,
    justifyContent: "space-around",
    paddingLeft: 20,
    paddingRight: 20,
  },

  section4Part: {
    borderBottomColor: "#FDBAC0",
    borderBottomWidth: 2,
    padding: 5,
    width: "85%",
  },

  section5: {
    flex: 1,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
  },

  btn: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: "90%",
    borderWidth: 2,
    borderColor: "#FB7F83",
    borderRadius: 15,
    margin: 10,
  },

  errorMessage: {
    color: "#FBB2B5",
    fontWeight: "bold",
    fontSize: 12,
  },

  section6: {
    flex: 1,
    height: 80,
    opacity: 0.5,
    alignItems: "center",
  },

  textshow: {
    fontSize: 50,
    color: "black",
    backgroundColor: "gold",
  },

  password: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
});
