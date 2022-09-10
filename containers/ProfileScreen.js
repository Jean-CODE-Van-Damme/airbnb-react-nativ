import { useRoute } from "@react-navigation/core";
import { Text, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen(saveToken) {
  const UserProfile = async () => {
    try {
      let userId = await AsyncStorage.getItem("userId");
      console.log("userId by get Item >>>", userId);
    } catch (error) {
      console.log(error.response);
    }
    UserProfile();
  };

  return (
    <View>
      <Text>Profile Screen</Text>
      <Button
        title="Log Out"
        onPress={() => {
          saveToken(null);
        }}
      />
    </View>
  );
}
