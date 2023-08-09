import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home";
import Student from "./screens/Student";
import Course from "./screens/Course";
import StudentFormScreen from "./screens/FormStudent";
import FormCourse from "./screens/FormCourse";
import { Button, IconButton, Provider } from "react-native-paper";
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen
            name="Students"
            component={Student}
            options={({ navigation }) => ({
              title: "Student List",
              headerRight: () => (
                <IconButton
                  icon="account-plus-outline"
                  size={35}
                  style={styles.headerButton}
                  onPress={() => navigation.navigate("FormStudent")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Course"
            component={Course}
            options={({ navigation }) => ({
              title: "Courses List",
              headerRight: () => (
                <IconButton
                  icon="account-plus-outline"
                  size={35}
                  style={styles.headerButton}
                  onPress={() => navigation.navigate("FormCourse")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="FormStudent"
            component={StudentFormScreen}
            options={({ route }) => ({
              title: route.params ? "Edit Student" : "Add Student",
            })}
          />
          <Stack.Screen
            name="FormCourse"
            component={FormCourse}
            options={({ route }) => ({
              title: route.params ? "Edit Course" : "Add Course",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFFE7",
    alignItems: "center",
    justifyContent: "center",
  },
  headerButton: {},
});
