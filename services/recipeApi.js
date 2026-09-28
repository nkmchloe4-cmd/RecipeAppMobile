import Constants from "expo-constants";

const API_PORT = 5205;

function getApiBaseUrl() {
  const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
  return `http://${host}:${API_PORT}`;
}

export const API_BASE_URL = getApiBaseUrl();

async function fetchWithTimeout(url, options = {}, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

export async function getRecipes() {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/api/recipes`);
    if (!response.ok) {
      throw new Error("Kunde inte hämta recept från servern.");
    }
    return await response.json();
  } catch (err) {
    throw new Error("Kunde inte hämta recept från servern. Kontrollera att backend körs.");
  }
}

export async function createRecipe(recipe) {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/api/recipes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    });
    if (!response.ok) {
      throw new Error("Kunde inte lägga till receptet.");
    }
    return await response.json();
  } catch (err) {
    throw new Error("Kunde inte lägga till receptet. Kontrollera att backend körs.");
  }
}

export async function updateRecipe(id, recipe) {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/api/recipes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    });
    if (!response.ok) {
      throw new Error("Kunde inte uppdatera receptet.");
    }
    return await response.json();
  } catch (err) {
    throw new Error("Kunde inte uppdatera receptet. Kontrollera att backend körs.");
  }
}

export function getImageUrl(imagePath) {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;
  return `${API_BASE_URL}${imagePath}`;
}