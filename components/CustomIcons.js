import { StyleSheet, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

const CustomIcons = ({ ratingValue = 1 }) => {
  if (ratingValue === 1) {
    return (
      <View style={styles.star}>
        <Entypo name="star" size={24} color="gold" />
        <Entypo name="star" size={24} color="grey" />
        <Entypo name="star" size={24} color="grey" />
        <Entypo name="star" size={24} color="grey" />
        <Entypo name="star" size={24} color="grey" />
      </View>
    );
  } else if (ratingValue === 2) {
    return (
      <View style={styles.star}>
        <Entypo name="star" size={24} color="gold" />
        <Entypo name="star" size={24} color="gold" />
        <Entypo name="star" size={24} color="grey" />
        <Entypo name="star" size={24} color="grey" />
        <Entypo name="star" size={24} color="grey" />
      </View>
    );
  } else if (ratingValue === 3) {
    return (
      <View style={styles.star}>
        <Entypo name="star" size={24} color="gold" />
        <Entypo name="star" size={24} color="gold" />
        <Entypo name="star" size={24} color="gold" />
        <Entypo name="star" size={24} color="grey" />
        <Entypo name="star" size={24} color="grey" />
      </View>
    );
  } else if (ratingValue === 4) {
    return (
      <View style={styles.star}>
        <Entypo name="star" size={24} color="gold" />
        <Entypo name="star" size={24} color="gold" />
        <Entypo name="star" size={24} color="gold" />
        <Entypo name="star" size={24} color="gold" />
        <Entypo name="star" size={24} color="grey" />
      </View>
    );
  } else if (ratingValue === 5) {
    return (
      <View style={styles.star}>
        <Entypo name="star" size={24} color="gold" />
        <Entypo name="star" size={24} color="gold" />
        <Entypo name="star" size={24} color="gold" />
        <Entypo name="star" size={24} color="gold" />
        <Entypo name="star" size={24} color="gold" />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  star: {
    flexDirection: "row",
  },
});

export default CustomIcons;
