import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  studentRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  idCell: {
    textAlign: "left",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  cell: {
    flex: 1,
    justifyContent: "center",
  },
  buttonCell: {
    width: 80,
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "left",
  },
  cellText: {
    fontSize: 16,
  },
  button: {
    height: 30,
    width: 40,
  },
});
export default styles;
