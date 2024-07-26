import AsyncStorage from "@react-native-async-storage/async-storage";

export const getItem = async (key: string): Promise<any> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error getting item from AsyncStorage", error);
    return null;
  }
};

export const setItem = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error("Error setting item in AsyncStorage", error);
  }
};
