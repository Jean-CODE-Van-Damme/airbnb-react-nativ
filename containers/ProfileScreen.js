import { useRoute } from "@react-navigation/core";
import { Text, View } from "react-native";

export default function ProfileScreen() {
  const { params } = useRoute();
  console.log("iduser >>>", params.userId);
  return (
    <View>
      <Text>user id : {params.userId}</Text>;
    </View>
  );
}
