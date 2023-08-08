import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import StudentRow from "../components/StudentRow";
import { useFocusEffect } from "@react-navigation/native";
import BASE_URL from "../config/baseurl";

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

  if (loading)
    return (
      <View>
        <Text>LOADING..</Text>
      </View>
    );
  return (
    <View>
      <View style={styles.headerRow}>
        <Text style={styles.idCell}>ID</Text>
        <Text style={styles.headerCell}>Name</Text>
        <Text style={styles.headerCell}>Date of Birth</Text>
        <Text style={styles.headerCell}>Action</Text>
      </View>
      <FlatList
        data={students}
        renderItem={({ item }) => <StudentRow student={item} />}
        keyExtractor={(item) => item?.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f1f8ff",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
  },
  idCell: {
    fontWeight: "bold",
    textAlign: "left",
    marginHorizontal: 10,
  },
});
export default Student;
