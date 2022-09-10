// imports react nativ
import {
  Button,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

// imports fonctionnalites
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";

// imports img / logos
import logo from "../assets/logo-airbnb.png";
import CustomIcons from "../components/CustomIcons";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(response.data);
        // console.log("responseDataHome >>>", response.data);
      } catch (error) {
        console.log(error.response);
        // console.log(error.response.data?.error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // console.log("data >>>", data);
  return (
    <View style={styles.home}>
      {/* {isLoading ?  : null} */}
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="purple"
          style={{ marginTop: 100 }}
        ></ActivityIndicator>
      ) : (
        <View style={styles.offers}>
          <FlatList
            data={data}
            keyExtractor={(element) => element._id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Room", { id: item._id });
                  }}
                >
                  <View style={styles.offer}>
                    <View style={styles.topPart}>
                      <Image
                        source={{ uri: item?.photos?.[0].url ?? "" }}
                        style={styles.aptPicture}
                      />
                      <View style={styles.priceWiew}>
                        <Text style={styles.priceText}>{item.price} $</Text>
                      </View>
                    </View>
                    <View style={styles.bottomPart}>
                      <View style={styles.bottomPartLeft}>
                        <Text style={styles.title} numberOfLines={1}>
                          {item.title}
                        </Text>
                        <View style={styles.starAndReview}>
                          <CustomIcons ratingValue={item.ratingValue} />

                          <Text style={styles.opacity}>
                            {item.reviews} reviews
                          </Text>
                        </View>
                      </View>

                      <View style={styles.bottomPartRight}>
                        <Image
                          style={styles.userPicture}
                          source={{
                            uri: item?.user?.account?.photo?.url ?? "",
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: "center",

    // backgroundColor: "gold",
  },

  offers: {
    width: "100%",
    alignItems: "center",
    // backgroundColor: "grey",
  },

  offer: {
    width: "100%",
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    marginBottom: 20,

    paddingBottom: 10,
  },

  topPart: {
    width: "100%",
  },
  aptPicture: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    position: "relative",
  },

  priceWiew: {
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "black",
    width: 80,
    height: 50,
    position: "absolute",
    top: 140,
  },

  priceText: {
    color: "white",
    textAlign: "center",
    fontSize: 22,
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
  },

  bottomPart: {
    flexDirection: "row",
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 5,
  },

  bottomPartLeft: {
    width: "70%",
    height: 70,
    justifyContent: "space-between",
  },

  bottomPartRight: {
    width: "30%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },

  starAndReview: {
    flexDirection: "row",
    // backgroundColor: "green",
    alignItems: "center",
    justifyContent: "space-between",
  },

  userPicture: {
    height: 50,
    width: 50,
    borderRadius: 50,
    resizeMode: "cover",
  },

  opacity: {
    opacity: 0.5,
  },

  star: {
    flexDirection: "row",
    // backgroundColor: "blue",
  },
});
