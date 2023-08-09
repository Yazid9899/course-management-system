import axios from "axios";
import React, { useState } from "react";
import { View, FlatList } from "react-native";
import BASE_URL from "../config/baseurl";
import { useFocusEffect } from "@react-navigation/native";
import CourseCard from "../components/CourseCard";
import LoadingScreen from "../components/LoadingScreen";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourse = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/db`);
      const updatedCourses = data?.Courses.map((course) => {
        const studentNames = course.studentsId.map(
          (studentId) => data?.Students.find((s) => s.id === studentId)?.name
        );
        return {
          ...course,
          students: studentNames,
        };
      });

      setCourses(updatedCourses);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchCourse();
    }, [])
  );

  if (loading) return <LoadingScreen />;

  return (
    <View style={{ padding: 16 }}>
      <FlatList
        data={courses}
        renderItem={({ item }) => (
          <CourseCard course={item} fetchCourse={fetchCourse} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Course;
