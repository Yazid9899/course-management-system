import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, DataTable } from "react-native-paper";
import StudentRow from "../components/StudentRow";
import { useFocusEffect } from "@react-navigation/native";
import BASE_URL from "../config/baseurl";
import LoadingScreen from "../components/LoadingScreen";

const Student = () => {
  const [students, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudent = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/Students`);
      setStudent(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchStudent();
    }, [])
  );

  if (loading) return <LoadingScreen />;

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>No</DataTable.Title>
        <DataTable.Title style={{ right: 50 }}>Name</DataTable.Title>
        <DataTable.Title style={{ right: 60 }}>Date of birth</DataTable.Title>
        <DataTable.Title>Actions</DataTable.Title>
      </DataTable.Header>
      {students.map((item, index) => (
        <StudentRow student={item} fetchStudent={fetchStudent} />
      ))}
    </DataTable>
  );
};

export default Student;
