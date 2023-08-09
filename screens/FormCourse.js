import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Checkbox, List, Text, TextInput } from "react-native-paper";
import BASE_URL from "../config/baseurl";

const FormCourse = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [students, setStudent] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [courseName, setCourseName] = useState("");

  const courseId = route.params?.id;
  const editMode = !!courseId;

  const handleSelect = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const handleSubmit = async () => {
    try {
      const courseData = {
        name: courseName,
        studentsId: selectedStudents,
      };

      if (editMode) {
        await axios.put(`${BASE_URL}/Courses/${courseId}`, courseData);
      } else {
        await axios.post(`${BASE_URL}/Courses`, courseData);
      }

      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStudent = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/Students`);
      setStudent(data);

      if (editMode) {
        const initialSelectedStudents = route.params.studentsId || [];
        setSelectedStudents(initialSelectedStudents);
        setCourseName(route.params.name || "");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  return (
    <View style={styles.formContainer}>
      <TextInput
        label="Course Name"
        value={courseName}
        onChangeText={setCourseName}
      />
      <List.Section title="Students:">
        <List.Accordion title="Select students here">
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
        {editMode ? "Update Course" : "Add Course"}
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
