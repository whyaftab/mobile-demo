// libraries
import AsyncStorage from "@react-native-async-storage/async-storage";

// misc

export const secureStorage = (() => {
  try {
    return AsyncStorage;
  } catch (error) {
    console.log(error);
  }
})();
