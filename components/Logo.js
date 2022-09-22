import { View, Text, Image } from "react-native";
import { Platform, StyleSheet } from "react-native";

const Logo = () => {
  return (
    <View>
      <Image
        style={styles.logo}
        source={require("../assets/logo-airbnb.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 40,
    width: 40,
  },
});

export default Logo;
