import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import createStyles from "./style/Home.style";
import { Button } from "react-native-paper";
import styles from "./style/Home.style";

const Home = () => {
  const navigation = useNavigation();

  const changeScreen = (name) => {
    navigation.push(name);
  };

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        labelStyle={styles.buttonText}
        onPress={() => {
          changeScreen("Students");
        }}
        icon="account-group"
        mode="contained-tonal"
      >
        Student
      </Button>
      <Button
        style={styles.button}
        labelStyle={styles.buttonText}
        onPress={() => {
          changeScreen("Courses");
        }}
        icon="book-open-variant"
        mode="contained-tonal"
      >
        Course
      </Button>
    </View>
  );
};

export default Home;
