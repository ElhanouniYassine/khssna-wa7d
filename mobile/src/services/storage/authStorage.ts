import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";
export const saveToken = async (token: string) => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

export const getToken = async () => {
  try {
    const result = await SecureStore.getItemAsync(TOKEN_KEY);
    if (result) {
      return result;
    } else {
      console.log("No values stored under that key.");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

// this means "Store this token on the device under the key auth_token."

export const deleteToken = async () => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error("Error deleting token:", error);
  }
};
