import { ActivityIndicator } from "react-native-paper";

const LoadingScreen = () => {
  return (
    <ActivityIndicator
      style={{ top: 170 }}
      animating={true}
      color="#000080"
      size={70}
    />
  );
};

export default LoadingScreen;
