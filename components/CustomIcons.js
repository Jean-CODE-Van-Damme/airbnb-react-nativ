import { StyleSheet, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

const CustomIcons = ({ ratingValue }) => {
  const tab = [];
  for (let i = 0; i < 5; i++) {
    if (i < ratingValue) {
      tab.push(<Entypo key={i} name="star" size={24} color="gold" />);
    } else {
      tab.push(<Entypo key={i} name="star" size={24} color="grey" />);
    }
  }
  return tab;
};

export default CustomIcons;
