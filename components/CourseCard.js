import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import { Card, IconButton } from "react-native-paper";

const CourseCard = ({ course }) => {
  const navigation = useNavigation();
  return (
    <Card style={{ marginBottom: 17 }}>
      <Card.Title
        title={course.name}
        titleVariant="headlineMedium"
        right={() => (
          <IconButton
            icon="book-edit-outline"
            size={35}
            iconColor="black"
            onPress={() => navigation.navigate("FormCourse", course)}
          />
        )}
      />
      <Card.Content>
        <Text style={{ fontSize: 15 }}>Attendance:</Text>
        {course.students.map((name, index) => (
          <Text key={index}>- {name}</Text>
        ))}
      </Card.Content>
    </Card>
  );
};

export default CourseCard;
