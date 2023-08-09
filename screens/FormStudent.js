import React, { useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { View, StyleSheet, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
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
      <View style={styles.container}>
        <TextInput
          selectionColor="#000080"
          label="Student Name"
          placeholder=" Ex: John Doe..."
          value={name}
          onChangeText={(text) => setName(text)}
          mode="outlined"
        />
        <View>
          <TextInput
            value={selectedDate.toLocaleDateString()}
            editable={false}
            mode="outlined"
          />
          <Button textColor="black" onPress={showDatePickerHandler}>
            Select date of birth
          </Button>
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
          <Button title="Done" onPress={hideDatePicker}>
            Done
          </Button>
        )}
        <Button
          title="Add Student"
          onPress={handleAddStudent}
          buttonColor="#000080"
          textColor="white"
          style={{
            top: 90,
          }}
        >
          Add Student
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 50,
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
