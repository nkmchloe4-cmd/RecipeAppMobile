import { FlatList, TouchableOpacity } from "react-native";
import { Image, View, Text, StyleSheet } from "react-native";

const recipes = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400",
    description: "Krämig italiensk pastarätt med ägg, bacon och parmesan.",
    cookTime: "25 minuter",
    ingredients: [
        "400g spaghetti",
      "150g bacon eller pancetta",
      "3 ägg",
      "1 dl riven parmesan",
      "Svartpeppar",
      "Salt",
    ],
    steps: [
      "Koka spaghetti enligt förpackningen",
      "Stek baconet knaprigt",
      "Vispa ihop ägg och parmesan i en skål",
      "Blanda den varma pastan med bacon, ta bort från värmen",
      "Rör ner äggblandningen snabbt så det blir krämigt, inte äggröra",
      "Toppa med extra peppar och parmesan",
    ],
  },
  {
    id: 2,
    name: "Tacos",
    image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=400",
    description: "Mexikanska tacos med köttfärs och färska tillbehör.",
    cookTime: "30 minuter",
    ingredients: [
      "8 tacoskal",
      "500g köttfärs",
      "1 paket tacokrydda",
      "Sallad, tomat, lök",
      "Riven ost",
      "Salsa och gräddfil",
    ],
    steps: [
      "Bryn köttfärsen i en stekpanna",
      "Blanda i tacokryddan enligt förpackningen",
      "Skär grönsakerna i mindre bitar",
      "Värm tacoskalen enligt förpackningen",
      "Fyll skalen med kött och tillbehör efter smak",
    ],
  },
  {
    id: 3,
    name: "Pannkakor",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
    description: "Klassiska svenska pannkakor, perfekt till fika eller middag.",
    cookTime: "45 minuter",
    ingredients: [
      "3 dl mjöl",
      "6 dl mjölk",
      "3 ägg",
      "1 msk socker",
      "1 nypa salt",
      "Smör till stekning",
    ],
    steps: [
      "Vispa ihop mjöl och lite mjölk till en klumpfri smet",
      "Tillsätt resten av mjölken, ägg, socker och salt",
      "Låt smeten vila i 30 minuter",
      "Stek tunna pannkakor i smör på medelvärme",
      "Servera med sylt och grädde",
    ],
  },
];

function RecipeListScreen({ navigation }) {
    return (
        <View style ={styles.container}>
            <Text style={styles.title}>Recept</Text>
            <FlatList
                data={recipes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.recipeItem}
                        onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
                        >
                            <Image source={{ uri: item.image }} style={styles.recipeImage} />
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
    container: {flex: 1, padding: 16, backgroundColor: "#fff"},
    title: {fontSize: 24, fontWeight: "bold", marginBottom: 16},
    recipeItem: {flexDirection: "row", marginBottom: 16, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, overflow: "hidden"},
    recipeImage: {width: 100, height: 100},
    recipeInfo: {flex: 1, padding: 8},
    recipeName: {fontSize: 18, fontWeight: "bold"},
    recipeDescription: {fontSize: 14, color: "#666", marginVertical: 4},
    recipeCookTime: {fontSize: 12, color: "#999"},
});

export default RecipeListScreen;