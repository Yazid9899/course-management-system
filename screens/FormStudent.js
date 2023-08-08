import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import BASE_URL from "../config/baseurl";

const StudentFormScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleAddStudent = async () => {
    try {
      if (!route.params) {
        await axios.post(`${BASE_URL}/Students`, {
          name,
          birth,
        });
      } else {
        await axios.put(`${BASE_URL}/Students/${route.params.student.id}`, {
          name,
          birth,
        });
      }
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selected) => {
    setSelectedDate(selected);
    setBirth(selected.toLocaleDateString());
    Platform.OS === "android" ? setShowDatePicker(false) : null;
  };

  const hideDatePicker = () => {
    setShowDatePicker(false);
  };
  useEffect(() => {
    if (route.params) {
      const { name, birth } = route.params.student;
      const [month, day, year] = birth.split("/");
      setName(name);
      setBirth(birth);
      setSelectedDate(
        new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      );
    }
  }, []);
  return (
    <>
      <Text>{route.params ? "Edit Student" : "Add New Student"}</Text>
      <View style={styles.container}>
        <Text>Name:</Text>
        <TextInput
          placeholder="Input Student Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <View style={styles.dateInput}>
          <TextInput
            style={styles.input}
            value={selectedDate.toLocaleDateString()}
            editable={false}
          />
          <Button
            style={styles.datebtn}
            title="Date of Birth"
            onPress={showDatePickerHandler}
          />
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
          />
        )}
        {Platform.OS === "ios" && showDatePicker && (
          <Button title="Done" onPress={hideDatePicker} />
        )}
        <Button title="Add Student" onPress={handleAddStudent} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 20,
  },
  dateInput: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    color: "#000000",
  },
  selectedDateText: {
    fontSize: 16,
    color: "#000000",
  },
  datebtn: {
    color: "#30A2FF",
    backgroundColor: "#ffff",
    borderRadius: 20,
  },
});

export default StudentFormScreen;
