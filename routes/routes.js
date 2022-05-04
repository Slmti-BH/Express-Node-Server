const { Router } = require("express");
const routes = Router();
const fs = require("fs");

// to read from data.json
const readData = () => {
  const data = fs.readFileSync("./data/data.json");

  return JSON.parse(data);
};

// to write to data.json
const writeData = (data) => {
  fs.writeFileSync("./data/data.json", JSON.stringify(data));
};

// get all recipes
routes.get("/recipes", (_req, res) => {
  const recipeNames = [];
  const data = readData();
  console.log(data);
  data.recipes.forEach((element) => {
    recipeNames.push(element.name);
    console.log(element.name);
  });

  res.json(recipeNames);
});

// get specific recipe details

routes.get("recipes/details/:name", (req,res)=>{
    data=readData();
    const selected = data.recipes.find((e) => {
      e.name===req.params.name;
    });
    if(!selected){
        return res.status(404).send("Recipe not found.");
    };
    const details = {
      ingredients: selected.ingredients,
      numSteps: selected.instructions.length,
    };
    console.log(details);
    res.json(details);
});

module.exports = routes;
