import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import logo from "../assets/logo-airbnb.png";

export default function AroundMe() {
  const [isAgree, setIsAgree] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [latitude, setLatititude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [data, setData] = useState({});
  const [data2, setData2] = useState({});

  useEffect(() => {
    const askPermission = async () => {
      try {
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
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          );

          setData(response.data);
          console.log("responseAPI >>>", response.data);
        } else {
          setIsAgree(false);

          const response2 = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around`
          );
          setData2(response2.data);

          // retourner tous les apt sans la localisation
        }
      } catch (error) {
        console.log("ERROR", error.response);
      }
      setIsLoading(false);
    };
    askPermission();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.logoView}>
          <Image style={styles.logo} source={logo} />
        </View>

        {isLoading ? (
          <Text>En attente de validation</Text>
        ) : !isAgree ? (
          // <Text>Permission refusee</Text>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.mapWithPosition}
            initialRegion={{
              latitude: 48.856614,
              longitude: 2.3522219,
              latitudeDelta: 0.2,
              longitudeDelta: 0.2,
            }}
          >
            {/* maper le state coords pour afficher les markeurs  */}
            {data2.map((flat) => {
              return (
                <MapView.Marker
                  key={flat._id}
                  coordinate={{
                    longitude: flat.location[0],
                    latitude: flat.location[1],
                  }}
                />
              );
            })}
          </MapView>
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
              {/* maper le state coords pour afficher les markeurs  */}
              {data.map((flat) => {
                return (
                  <MapView.Marker
                    key={flat._id}
                    coordinate={{
                      longitude: flat.location[0],
                      latitude: flat.location[1],
                    }}
                  />
                );
              })}
            </MapView>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
  },

  title: {
    marginTop: 30,
    // textAlign: "center",
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
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 40,
    height: 40,
  },
});
