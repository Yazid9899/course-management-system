import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import BASE_URL from "../config/baseurl";
const deleteIcon = require("../assets/delete-icon.png");
const editIcon = require("../assets/edit-icon.png");

const StudentRow = ({ student, fetchStudent }) => {
  const navigation = useNavigation();

  const handleEdit = () => {
    navigation.push("StudentForm", { student });
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
    <View style={styles.studentRow}>
      <View style={styles.idCell}>
        <Text style={styles.cellText}>{student.id}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{student.name}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{student.birth}</Text>
      </View>
      <View style={styles.cell}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              handleEdit();
            }}
          >
            <Image
              source={editIcon}
              style={styles.button}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleDelete();
            }}
          >
            <Image
              source={deleteIcon}
              style={styles.button}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default StudentRow;
