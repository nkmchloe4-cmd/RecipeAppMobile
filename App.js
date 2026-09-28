import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecipeDetailScreen from "./screens/RecipeDetailScreen";
import RecipeFormScreen from "./screens/RecipeFormScreen";
import RecipeListScreen from "./screens/RecipeListScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="RecipeList"
          component={RecipeListScreen}
          options={{ title: "Recept" }}
        />
        <Stack.Screen
          name="RecipeDetail"
          component={RecipeDetailScreen}
          options={{ title: "Detaljer" }}
        />
        <Stack.Screen
          name="RecipeForm"
          component={RecipeFormScreen}
          options={({ route }) => ({
            title: route.params?.recipe
              ? "Redigera recept"
              : "Lägg till recept",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
