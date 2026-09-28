import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function RecipeDetailScreen({ route, navigation }) {
  const { recipe } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text>
      <Text style={styles.description}>{recipe.description}</Text>
      <Text style={styles.cookTime}>Tillagningstid: {recipe.cookTime}</Text>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("RecipeForm", { recipe })}
      >
        <Text style={styles.editButtonText}>Redigera recept</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Ingredienser:</Text>
      {recipe.ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.ingredient}>
          • {ingredient}
        </Text>
      ))}
      <Text style={styles.sectionTitle}>Steg:</Text>
      {recipe.steps.map((step, index) => (
        <Text key={index} style={styles.step}>
          {index + 1}. {step}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fdf6f0" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  description: { fontSize: 16, marginBottom: 8 },
  cookTime: { fontSize: 15, color: "#666", marginBottom: 16 },
  editButton: {
    backgroundColor: "#d35400",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  editButtonText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  ingredient: { fontSize: 14, marginBottom: 4 },
  step: { fontSize: 14, marginBottom: 4 },
});

export default RecipeDetailScreen;