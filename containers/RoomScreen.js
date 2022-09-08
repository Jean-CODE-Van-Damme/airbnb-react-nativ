// imports react nativ
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  // Dimensions
} from "react-native";

// imports fonctionnalites
import axios from "axios";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import MapView from "react-native-maps";

// imports img / logos
import { AntDesign } from "@expo/vector-icons";
import logo from "../assets/logo-airbnb.png";
// import { SwiperFlatList } from "react-native-swiper-flatlist";

// imports composants
import CustomIcons from "../CustomIcons";

export default function RoomScreen() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();

  console.log("id >>>", route.params.id);
  const { id } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${id}`
        );
        setData(response.data);
        // console.log("roomAnswerData >>>", response.data);
        console.log("url >>>", response.data.photos[0].url);
        console.log("urlUser >>>", response.data.user.account.photo.url);
      } catch (error) {
        console.log(error.response);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  console.log("DATA >>>", data);
  // const pictureArray = data.photos;
  const latitude = data?.location?.[1];
  const longitude = data?.location?.[0];
  console.log("latitude >>>", latitude);
  console.log("longitude >>>", longitude);
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
          <TouchableOpacity
            style={styles.arrowBack}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.logoPart}>
            <Image style={styles.logo} source={logo}></Image>
          </View>
          <View style={styles.topPart}>
            <View style={styles.picturePart}>
              <Image
                source={{ uri: data?.photos?.[1].url ?? "" }}
                style={styles.pictureApt}
              />
              {/* <View style={styles.container}>
                <SwiperFlatList
                  autoplay
                  autoplayDelay={2}
                  index={0}
                  autoplayLoop
                  showPagination
                  data={pictureArray}
                  keyExtractor={(element, index) => index}
                  renderItem={({ item }) => {
                    return (
                      <Image
                        source={{ uri: item?.url ?? "" }}
                        style={styles.pictureApt}
                      />
                    );
                  }}
                ></SwiperFlatList>
              </View> */}

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
          <MapView
            style={{ width: "100%", height: 500, marginTop: 30 }}
            initialRegion={{
              latitude: 48.856614,
              longitude: 2.3522219,
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
// const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  room: {
    flex: 1,
    backgroundColor: "white",
  },

  logoPart: {
    alignItems: "center",
    // marginTop: 5,
  },

  logo: {
    width: 40,
    height: 40,
  },

  arrowBack: {
    marginTop: 25,
    marginLeft: 5,
  },

  topPart: {
    width: "100%",
    height: 400,
    // backgroundColor: "blue",
  },

  picturePart: {
    width: "100%",
    // backgroundColor: "pink",
    height: "50%",
    marginTop: 5,
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

    // backgroundColor: "grey",
    padding: 10,
  },

  firstPartRight: {
    alignItems: "flex-end",
    width: "30%",
    height: 90,
    // backgroundColor: "green",
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
    // backgroundColor: "gold",
    marginTop: 10,
  },
  star: {
    flexDirection: "row",
  },

  descriptionPartShow: {
    padding: 10,
    height: "35%",
    // backgroundColor: "pink",
  },

  descriptionPartHidden: {
    padding: 10,
    height: "20%",
    // backgroundColor: "white",
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

  // Test Swiper

  // container: { flex: 1, backgroundColor: 'white' },
  // child: { width, justifyContent: 'center' },
  // text: { fontSize: width * 0.5, textAlign: 'center' },
});
