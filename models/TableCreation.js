import User from './User.js';
import Recipe from './Recipe.js';
import Category from './Category.js';
import RecipeCategory from './RecipeCategory.js';
import SavedRecipe from './SavedRecipe.js';
import UserFollows from './UserFollows.js';

// Define associations
Recipe.belongsTo(User, { foreignKey: 'userId', as: 'author' });

// Recipe-Category many-to-many relationship
Recipe.belongsToMany(Category, {
    through: RecipeCategory,
    foreignKey: 'recipeId',
    otherKey: 'categoryId',
    as: 'categories'
});

Category.belongsToMany(Recipe, {
    through: RecipeCategory,
    foreignKey: 'categoryId',
    otherKey: 'recipeId',
    as: 'recipes'
});

// Saved Recipes relationship
User.belongsToMany(Recipe, {
    through: SavedRecipe,
    foreignKey: 'user_id',
    otherKey: 'recipe_id',
    as: 'savedRecipes',
    constraints: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Recipe.belongsToMany(User, {
    through: SavedRecipe,
    foreignKey: 'recipe_id',
    otherKey: 'user_id',
    as: 'savedBy',
    constraints: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Add direct associations for SavedRecipe
User.hasMany(SavedRecipe, {
    foreignKey: 'user_id',
    as: 'saves'
});

Recipe.hasMany(SavedRecipe, {
    foreignKey: 'recipe_id',
    as: 'saves'
});

export {
    User,
    Recipe,
    Category,
    RecipeCategory,
    SavedRecipe,
    UserFollows
};