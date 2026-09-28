import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import { createRecipe, updateRecipe } from "../services/recipeApi";

function RecipeFormScreen({ route, navigation }) {
  const existingRecipe = route.params?.recipe ?? null;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (existingRecipe) {
      setName(existingRecipe.name);
      setDescription(existingRecipe.description);
      setCookTime(existingRecipe.cookTime);
      setIngredients(existingRecipe.ingredients.join("\n"));
      setSteps(existingRecipe.steps.join("\n"));
    }
  }, [existingRecipe]);

  async function handleSave() {
    setError("");
    setSaving(true);

    const recipeData = {
      name,
      description,
      cookTime,
      ingredients: ingredients.split("\n").filter((line) => line.trim() !== ""),
      steps: steps.split("\n").filter((line) => line.trim() !== ""),
      imagePath: existingRecipe ? existingRecipe.imagePath : null,
    };

    try {
      if (existingRecipe) {
        await updateRecipe(existingRecipe.id, recipeData);
      } else {
        await createRecipe(recipeData);
      }
      navigation.goBack();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {existingRecipe ? "Redigera recept" : "Lägg till recept"}
      </Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Namn"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Beskrivning"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Tillagningstid (t.ex. 30 minuter)"
        value={cookTime}
        onChangeText={setCookTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingredienser (en per rad)"
        value={ingredients}
        onChangeText={setIngredients}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Steg (en per rad)"
        value={steps}
        onChangeText={setSteps}
        multiline
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {existingRecipe ? "Spara ändringar" : "Lägg till recept"}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 15,
  },
  error: { color: "#c0392b", marginBottom: 12 },
  button: {
    backgroundColor: "#d35400",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 32,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default RecipeFormScreen;
