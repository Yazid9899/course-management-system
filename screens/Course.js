import axios, { Axios } from "axios";
import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
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
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  flatListContainer: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
});

export default Course;
