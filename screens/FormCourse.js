import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Button, Checkbox, List, Text, TextInput } from "react-native-paper";
import BASE_URL from "../config/baseurl";

const FormCourse = () => {
  const navigate = useNavigation();
  const [students, setStudent] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [courseName, setCourseName] = useState("");

  const handleSelect = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };
  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(`${BASE_URL}/Courses`, {
        name: courseName,
        studentsId: selectedStudents,
      });
      console.log(data);
      navigate.goBack();
    } catch (err) {
      console.log(err);
    }
  };
  const fetchStudent = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/Students`);
      setStudent(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchStudent();
    }, [])
  );
  return (
    <View style={styles.formContainer}>
      <TextInput
        label="Course Name"
        value={courseName}
        onChangeText={setCourseName}
      />
      <List.Section title="Students:">
        <List.Accordion title="select student here  ">
          <ScrollView style={styles.scrollView}>
            {students.map((student) => (
              <List.Item
                style={styles.listStudent}
                key={student.id}
                title={student.name}
                left={() => (
                  <Checkbox
                    status={
                      selectedStudents.includes(student.id)
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => handleSelect(student.id)}
                  />
                )}
              />
            ))}
          </ScrollView>
        </List.Accordion>
      </List.Section>
      <Button mode="contained" onPress={handleSubmit}>
        Add Course
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginVertical: 50,
  },
  listStudent: {
    marginVertical: -10,
    marginLeft: 7,
  },
  scrollView: {
    maxHeight: 150,
  },
});

export default FormCourse;
