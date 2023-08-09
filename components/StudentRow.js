import React from "react";
import { useNavigation } from "@react-navigation/native";
import { DataTable, IconButton } from "react-native-paper";
import axios from "axios";
import BASE_URL from "../config/baseurl";

const StudentRow = ({ student, fetchStudent }) => {
  const navigation = useNavigation();

  const handleEdit = () => {
    navigation.push("FormStudent", { student });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/Students/${student.id}`);
      fetchStudent();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <DataTable.Row key={student.id}>
      <DataTable.Cell>{student.id}</DataTable.Cell>
      <DataTable.Cell style={{ marginLeft: -40 }}>
        {student.name}
      </DataTable.Cell>
      <DataTable.Cell>{student.birth}</DataTable.Cell>
      <DataTable.Cell style={{ left: 50 }}>
        <IconButton icon="account-edit-outline" onPress={() => handleEdit()} />
      </DataTable.Cell>
      <DataTable.Cell style={{ left: 10 }}>
        <IconButton icon="trash-can" onPress={() => handleDelete(student.id)} />
      </DataTable.Cell>
    </DataTable.Row>
  );
};

export default StudentRow;
