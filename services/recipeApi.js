import Constants from "expo-constants";

const API_PORT = 5205;

function getApiBaseUrl() {
  const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
  return `http://${host}:${API_PORT}`;
}

export const API_BASE_URL = getApiBaseUrl();

export async function getRecipes() {
  const response = await fetch(`${API_BASE_URL}/api/recipes`);
  if (!response.ok) {
    throw new Error("Kunde inte hämta recept från servern.");
  }
  return response.json();
}

export function getImageUrl(imagePath) {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;
  return `${API_BASE_URL}${imagePath}`;
}