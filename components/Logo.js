import { View, Text, Image } from "react-native";

const Logo = () => {
  return (
    <Image
      style={{
        height: 40,
        width: 40,
        marginBottom: 15,
      }}
      source={require("../assets/logo-airbnb.png")}
    />
  );
};

export default Logo;
