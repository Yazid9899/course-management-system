import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text } from "react-native";
import { Card, IconButton } from "react-native-paper";

const CourseCard = ({ course }) => {
  const navigation = useNavigation();
  return (
    <Card style={styles.card}>
      <Card.Title
        title={course.name}
        right={() => (
          <IconButton
            icon="book-edit-outline"
            size={35}
            onPress={() => navigation.navigate("FormCourse", course)}
          />
        )}
      />
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
