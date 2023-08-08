import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

const Student = () => {
  const [students, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudent = async () => {
    try {
      const { data } = await axios.get(
        "https://bbe8-103-136-59-170.ngrok-free.app/Students"
      );
      setStudent(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  return (
    <View>
      <Text>Student Screen!</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        students.map((student) => <Text key={student.id}>{student.name}</Text>)
      )}
    </View>
  );
};

export default Student;
