import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home";
import Student from "./screens/Student";
import Course from "./screens/Course";
import StudentFormScreen from "./screens/FormStudent";
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen
          name="Students"
          component={Student}
          options={({ navigation }) => ({
            title: "Student List",
            headerRight: () => (
              <Text
                style={styles.headerButton}
                onPress={() => navigation.navigate("StudentForm")}
              >
                Add Student
              </Text>
            ),
          })}
        />
        <Stack.Screen name="Course" component={Course} />
        <Stack.Screen
          name="StudentForm"
          component={StudentFormScreen}
          options={{ title: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFFE7",
    alignItems: "center",
    justifyContent: "center",
  },
});
