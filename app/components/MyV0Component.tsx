'use client'

import { useState } from 'react'
import { PlusCircle, X, ChevronRight } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mock API function to simulate fetching recipes
const fetchRecipes = (ingredients: string[]) => {
  // This is a mock implementation. In a real app, this would be an API call.
  const allRecipes = [
    { id: 1, name: 'Pasta Carbonara', ingredients: ['pasta', 'eggs', 'bacon', 'cheese'] },
    { id: 2, name: 'Vegetable Stir Fry', ingredients: ['vegetables', 'soy sauce', 'oil'] },
    { id: 3, name: 'Chicken Curry', ingredients: ['chicken', 'curry powder', 'coconut milk', 'onion'] },
    { id: 4, name: 'Tomato Soup', ingredients: ['tomatoes', 'onion', 'garlic', 'cream'] },
    { id: 5, name: 'Fruit Salad', ingredients: ['apple', 'banana', 'orange', 'grapes'] },
  ]
  
  return allRecipes.filter(recipe => 
    ingredients.every(ingredient => 
      recipe.ingredients.includes(ingredient.toLowerCase())
    )
  )
}

export default function RecipeFinder() {
  const [ingredients, setIngredients] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [recipes, setRecipes] = useState<any[]>([])
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null)

  const addIngredient = () => {
    if (inputValue && !ingredients.includes(inputValue)) {
      setIngredients([...ingredients, inputValue])
      setInputValue('')
    }
  }

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient))
  }

  const findRecipes = () => {
    const foundRecipes = fetchRecipes(ingredients)
    setRecipes(foundRecipes)
    setSelectedRecipe(null)
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Recipe Finder</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Enter Your Ingredients</CardTitle>
          <CardDescription>Add the ingredients you have on hand</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Enter an ingredient"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
            />
            <Button onClick={addIngredient}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient, index) => (
              <span key={index} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm flex items-center">
                {ingredient}
                <button onClick={() => removeIngredient(ingredient)} className="ml-2 text-secondary-foreground/70 hover:text-secondary-foreground">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={findRecipes} className="w-full">Find Recipes</Button>
        </CardFooter>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Matching Recipes</CardTitle>
          </CardHeader>
          <CardContent>
            {recipes.length === 0 ? (
              <p className="text-muted-foreground">No recipes found. Try adding more ingredients.</p>
            ) : (
              <ul className="space-y-2">
                {recipes.map((recipe) => (
                  <li key={recipe.id}>
                    <Button
                      variant="ghost"
                      className="w-full justify-between"
                      onClick={() => setSelectedRecipe(recipe)}
                    >
                      {recipe.name}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recipe Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedRecipe ? (
              <div>
                <h3 className="text-xl font-semibold mb-2">{selectedRecipe.name}</h3>
                <h4 className="text-lg font-medium mb-1">Ingredients:</h4>
                <ul className="list-disc list-inside mb-4">
                  {selectedRecipe.ingredients.map((ingredient: string, index: number) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <p className="text-muted-foreground">
                  For full instructions, please visit our full recipe page.
                </p>
              </div>
            ) : (
              <p className="text-muted-foreground">Select a recipe to see its details.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
