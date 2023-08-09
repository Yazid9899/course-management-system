import { StyleSheet, Text } from "react-native";
import { Card } from "react-native-paper";

const CourseCard = ({ course }) => {
  return (
    <Card style={styles.card}>
      <Card.Title title={course.name} />
      <Card.Content>
        <Text>Students:</Text>
        {course.students.map((name, index) => (
          <Text key={index}>- {name}</Text>
        ))}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
});
export default CourseCard;
