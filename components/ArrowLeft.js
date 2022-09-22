import { View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Platform, StyleSheet } from "react-native";
const ArrowLeft = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.android}>
      <AntDesign
        name="arrowleft"
        size={24}
        color="black"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  android: {
    display: Platform.OS === "android" ? "none" : "inherit",
  },
});

export default ArrowLeft;
