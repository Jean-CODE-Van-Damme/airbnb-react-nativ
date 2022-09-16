// imports React  et React Nativ
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

// imports Packages
import axios from "axios";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import MapView from "react-native-maps";

// imports pictures / logos
import { AntDesign } from "@expo/vector-icons";
import logo from "../assets/logo-airbnb.png";

// imports composants
import CustomIcons from "../components/CustomIcons";

export default function RoomScreen() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();

  // recuperation de l id de l offre selectionnee avec route.params
  console.log("id >>>", route.params.id);
  const { id } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // requete API pour retourner les info de l offre selectionee
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${id}`
        );
        setData(response.data);
      } catch (error) {
        console.log(error.response);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  const latitude = data?.location?.[1];
  const longitude = data?.location?.[0];

  return (
    <View style={styles.room}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="purple"
          style={{ marginTop: 100 }}
        ></ActivityIndicator>
      ) : (
        <ScrollView>
          <View style={styles.topPart}>
            <View style={styles.picturePart}>
              <Image
                source={{ uri: data?.photos?.[1].url ?? "" }}
                style={styles.pictureApt}
              />

              <View style={styles.priceView}>
                <Text style={styles.priceText}>{data.price} $</Text>
              </View>
            </View>

            <View style={styles.firstPart}>
              <View style={styles.firstPartLeft}>
                <Text style={styles.titleText} numberOfLines={1}>
                  {data.title}
                </Text>
                <View style={styles.review}>
                  <CustomIcons ratingValue={data?.ratingValue} />
                  <Text style={{ opacity: 0.5, marginLeft: 10 }}>
                    {data.reviews} reviews
                  </Text>
                </View>
              </View>
              <View style={styles.firstPartRight}>
                <Image
                  source={{ uri: data.user?.account?.photo?.url }}
                  style={styles.pictureUser}
                ></Image>
              </View>
            </View>

            <View
              // afficher le texte complet ou non selon l etat du state Show
              style={
                !show
                  ? styles.descriptionPartHidden
                  : styles.descriptionPartShow
              }
            >
              <Text numberOfLines={!show ? 3 : 0}>{data.description}</Text>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setShow((prev) => !prev);
                  }}
                  style={styles.button}
                >
                  {/* Modificaiton du logo selon l etat du state show */}
                  {!show ? (
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.opacity}>Show more</Text>
                      <AntDesign
                        style={styles.icon}
                        name="caretdown"
                        size={15}
                        color="black"
                      />
                    </View>
                  ) : (
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.opacity}>Show less</Text>
                      <AntDesign
                        style={styles.icon}
                        name="caretup"
                        size={15}
                        color="black"
                      />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* Afficher la map avec un marker sur la localisation de l offre selectionnee */}
          <MapView
            style={{ width: "100%", height: 500, marginTop: 30 }}
            initialRegion={{
              latitude: data.location[1],
              longitude: data.location[0],
              latitudeDelta: 0.2,
              longitudeDelta: 0.2,
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}
            ></MapView.Marker>
          </MapView>
        </ScrollView>
      )}
    </View>
  );
}

// Partie Style
const styles = StyleSheet.create({
  room: {
    flex: 1,
    backgroundColor: "white",
  },

  topPart: {
    width: "100%",
    height: 400,
  },

  picturePart: {
    width: "100%",

    height: "50%",
  },

  pictureApt: {
    width: "100%",
    height: "100%",

    position: "relative",
  },

  priceView: {
    position: "absolute",
    top: 140,
    backgroundColor: "black",
    width: 80,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  priceText: {
    color: "white",
    fontSize: 20,
  },

  firstPart: {
    flexDirection: "row",
    height: "15%",
  },

  firstPartLeft: {
    justifyContent: "space-between",
    width: "70%",
    padding: 10,
  },

  firstPartRight: {
    alignItems: "flex-end",
    width: "30%",
    height: 90,
  },

  pictureUser: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
    marginTop: 5,
  },

  review: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  star: {
    flexDirection: "row",
  },

  descriptionPartShow: {
    padding: 10,
    height: "35%",
  },

  descriptionPartHidden: {
    padding: 10,
    height: "20%",
  },

  opacity: {
    opacity: 0.5,
  },

  titleText: {
    fontSize: 15,
    fontWeight: "bold",
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "red",
    height: 40,
    width: 150,
    marginTop: 15,
    backgroundColor: "white",
  },

  icon: {
    marginLeft: 10,
  },
});
