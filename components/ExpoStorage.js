// For more info: https://docs.expo.dev/versions/latest/sdk/securestore/

import * as SecureStore from "expo-secure-store";

export async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    console.log("🔐 Here's your value 🔐 \n" + result);
    return result;
  } else {
    console.log("No values stored under that key. bruh");
    return null;
  }
}
