import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Home from "./screens/Home";
import Student from "./screens/Student";
import Course from "./screens/Course";
import StudentFormScreen from "./screens/FormStudent";
import FormCourse from "./screens/FormCourse";
import { IconButton, Provider } from "react-native-paper";

const optionStyle = {
  headerTitleAlign: "center",
  statusBarColor: "#000080",
  headerTintColor: "white",
};
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#000080",
            },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen
            name="home"
            component={Home}
            options={{
              title: "Course Management System",
              ...optionStyle,
            }}
          />
          <Stack.Screen
            name="Students"
            component={Student}
            options={({ navigation }) => ({
              title: "Student List",
              ...optionStyle,
              headerRight: () => (
                <IconButton
                  icon="account-plus-outline"
                  size={35}
                  iconColor="white"
                  onPress={() => navigation.navigate("FormStudent")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Courses"
            component={Course}
            options={({ navigation }) => ({
              title: "Courses List",
              ...optionStyle,
              headerRight: () => (
                <IconButton
                  icon="book-plus-outline"
                  size={28}
                  iconColor="white"
                  onPress={() => navigation.navigate("FormCourse")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="FormStudent"
            component={StudentFormScreen}
            options={({ route }) => ({
              ...optionStyle,
              title: route.params ? "Edit Student" : "Add Student",
            })}
          />
          <Stack.Screen
            name="FormCourse"
            component={FormCourse}
            options={({ route }) => ({
              ...optionStyle,
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
