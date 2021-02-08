function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const searchInput = document.getElementById("search-input")
const submitBtn = document.getElementById("submit-btn")
const meals = document.getElementById("meals")
const output = document.getElementById("search-item")
const foods = document.getElementById("foods")
const element = document.getElementById("element");

function searchItems(parameter) {
  parameter.preventDefault();
  meals.innerHTML = foods.innerHTML = element.innerHTML = "";
  const term = searchInput.value;
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        if (data.meals === null) {
          output.innerHTML = `<p> Search not found </p>`;
        } else {
          meals.innerHTML = data.meals.map(meal => `
              <div class = "meal" >
              <img src = "${meal.strMealThumb}" alt = "${meal.strMeal} />"
              <div class ="meal-info" onclick ="ingredients('${meal.idMeal}')"  data-mealID = "${meal.idMeal}" />
              <h4>${meal.strMeal}</h4>
              </div>
              </div>
              `
          )
            .join('');
        }
        searchInput.value = '';
      })
  } else {
    alert('Invalid input');
  };
}

submitBtn.addEventListener('submit', searchItems);

function ingredients(idMeal) {
  element.innerHTML = "";
  const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + idMeal;
  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      let ingDet = data.meals;
      console.log(ingDet);
      return ingDet.map(function (ingDet) {
        let div = createNode('div');
        let img = createNode('img');
        let span = createNode('span');
        let ingredientsTitle = createNode('h3');
        let ingredientsDiv = createNode('div');
        let ul = createNode('ul');
        img.src = ingDet.strMealThumb;
        span.innerHTML = `${ingDet.strMeal}`;
        ingredientsTitle.innerHTML = `Ingredients`;
        append(div, img);
        append(div, span);
        append(ingredientsDiv, ingredientsTitle);
        for (i = 1; i < 10; i++) {
          let li = createNode('li');
          li.innerHTML = ingDet['strIngredient' + i];
          append(ul, li);
        }
        append(ingredientsDiv, ul);
        append(div, ingredientsDiv);
        append(element, div);
      })
    })
    .catch(function (error) {
      console.log(error);
    });
}