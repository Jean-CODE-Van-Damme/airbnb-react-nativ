import { View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const ArrowLeft = () => {
  const navigation = useNavigation();
  return (
    <AntDesign
      name="arrowleft"
      size={24}
      color="black"
      onPress={() => {
        navigation.goBack();
      }}
    />
  );
};

export default ArrowLeft;
