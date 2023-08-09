import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Button, Checkbox, List, TextInput } from "react-native-paper";
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
    <View style={{ top: 40, marginHorizontal: 20 }}>
      <TextInput
        selectionColor="#000080"
        label="Course Name"
        placeholder=" Ex: Science"
        value={courseName}
        onChangeText={setCourseName}
        mode="outlined"
      />
      <List.Section title="Students:">
        <List.Accordion title="Select students">
          <ScrollView>
            {students.map((student) => (
              <Checkbox.Item
                color="#000080"
                labelVariant={"bodyMedium"}
                label={student.name}
                status={
                  selectedStudents.includes(student.id)
                    ? "checked"
                    : "unchecked"
                }
                onPress={() => handleSelect(student.id)}
              />
            ))}
          </ScrollView>
        </List.Accordion>
      </List.Section>
      <Button
        mode="contained"
        buttonColor="#000080"
        textColor="white"
        onPress={handleSubmit}
      >
        {editMode ? "Update Course" : "Add Course"}
      </Button>
    </View>
  );
};

export default FormCourse;
