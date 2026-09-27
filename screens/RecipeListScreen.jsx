import { useState, useEffect } from "react";
import { FlatList, TouchableOpacity, Image, View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { getRecipes, getImageUrl } from "../services/recipeApi";

function RecipeListScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRecipes()
      .then((data) => setRecipes(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#d35400" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recept</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.recipeItem}
            onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
          >
            {item.imagePath && (
              <Image source={{ uri: getImageUrl(item.imagePath) }} style={styles.recipeImage} />
            )}
            <View style={styles.recipeInfo}>
              <Text style={styles.recipeName}>{item.name}</Text>
              <Text style={styles.recipeDescription}>{item.description}</Text>
              <Text style={styles.recipeCookTime}>Tillagningstid: {item.cookTime}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  errorText: { fontSize: 16, color: "#c0392b", textAlign: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  recipeItem: { flexDirection: "row", marginBottom: 16, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, overflow: "hidden" },
  recipeImage: { width: 100, height: 100 },
  recipeInfo: { flex: 1, padding: 8 },
  recipeName: { fontSize: 18, fontWeight: "bold" },
  recipeDescription: { fontSize: 14, color: "#666", marginVertical: 4 },
  recipeCookTime: { fontSize: 12, color: "#999" },
});

export default RecipeListScreen;