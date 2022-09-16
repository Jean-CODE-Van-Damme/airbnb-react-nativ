// import React, React Nativ
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

// import Packages
import * as Location from "expo-location";
import axios from "axios";

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
        // demander au user l autorisation pour la localisation
        let { status } = await Location.requestForegroundPermissionsAsync();

        // si le user repond oui
        if (status === "granted") {
          let location = await Location.getCurrentPositionAsync();
          setLatititude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          setIsAgree(true);

          // retourner les flats les plus proches et la localisation du user

          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          );

          setData(response.data);
          console.log("responseAPI >>>", response.data);
          // si ile user repond non
        } else {
          setIsAgree(false);

          // retourner les flats de l"API sans localisation du user
          const response2 = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around`
          );
          setData2(response2.data);
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
        {/* Attente validation user */}
        {isLoading ? (
          <Text>En attente de validation</Text>
        ) : !isAgree ? (
          //user pas d accord
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
          // utilisateur d accord
          <View>
            <MapView
              // localisation du user co affichee
              showsUserLocation={true}
              provider={PROVIDER_GOOGLE}
              style={styles.mapWithPosition}
              initialRegion={{
                // latitude et longitude du duser co
                latitude: latitude,
                longitude: longitude,
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

// Partie Style :
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    marginTop: 30,
    color: "#F49EA2",
    fontWeight: "bold",
  },

  mapWithPosition: {
    height: 600,
    width: "100%",
  },
});
