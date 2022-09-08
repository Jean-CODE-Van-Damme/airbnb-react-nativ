import { Text, View, Image, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import logo from "../assets/logo-airbnb.png";

export default function AroundMe() {
  const [isAgree, setIsAgree] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCooords] = useState([]);
  const [latitude, setLatititude] = useState();
  const [longitude, setLongitude] = useState();
  const [data, setData] = useState({});

  useEffect(() => {
    const askPermission = async () => {
      try {
        // let result = await Location.requestForegroundPermissionsAsync().status
        let { status } = await Location.requestForegroundPermissionsAsync();
        // console.log("status >>>", status);
        // console.log("result", result);
        if (status === "granted") {
          let location = await Location.getCurrentPositionAsync();
          // console.log("lat >>>", location.coords.latitude);
          // console.log("long >>>", location.coords.longitude);
          setLatititude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          setIsAgree(true);

          // console.log("stateLaltitude", latitude);
          // console.log("stateLongitude", longitude);

          // retourner les apts les plus proche et la localisation
          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${latitude}&longitude=${longitude}`
          );

          setData(response.data);
          console.log("responseAPI >>>", response.data);
        } else {
          setIsAgree(false);

          // retourner tous les apt sans la localisation
        }
      } catch (error) {
        console.log(error.response);
      }
      setIsLoading(false);
    };
    askPermission();
  }, []);

  return (
    <View>
      <View style={styles.logoView}>
        <Image style={styles.logo} source={logo} />
      </View>
      <Text style={styles.title}>Around Me </Text>
      {isLoading ? (
        <Text>En attente de validation</Text>
      ) : !isAgree ? (
        <Text>Permission refusee</Text>
      ) : (
        <View>
          {/* <Text>{latitude}</Text>
          <Text>{longitude}</Text> */}

          <MapView
            showsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            style={styles.mapWithPosition}
            initialRegion={{
              latitude: 48.856614,
              longitude: 2.3522219,
              latitudeDelta: 0.2,
              longitudeDelta: 0.2,
            }}
          >
            {/* <MapView.Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}
            /> */}
          </MapView>

          {/* {data.map((elem, index) => {
            return <View>key={index}</View>;
          })} */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },

  title: {
    marginTop: 30,
    textAlign: "center",
    color: "#F49EA2",
    fontWeight: "bold",
  },

  mapWithPosition: {
    height: 500,
    width: "100%",
    marginTop: 20,
  },

  logoView: {
    // backgroundColor: "gold",
    height: 50,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 40,
    height: 40,
  },
});
