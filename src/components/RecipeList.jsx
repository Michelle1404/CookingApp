import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { recipeStore } from "../firebase/config";
// icon
import trashIcon from "../assets/delete.svg";

// styles
import "./RecipeList.css";

export default function RecipeList({ recipes }) {
  const { mode } = useTheme();
  const handleDelete = (id) => {
    recipeStore.collection("rezepte").doc(id).delete();
  };

  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>;
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <img
            src={trashIcon}
            className="delete"
            onClick={() => handleDelete(recipe.id)}
            alt="trashcan to remove the card"
          />
        </div>
      ))}
    </div>
  );
}
