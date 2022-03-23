import { createImg } from "./createImage.js";

// for indivudual card

export const createCard = (item, protein, carb, fat) => {
  const div = document.createElement("div");
  const div2 = document.createElement("div");
  const li = document.createElement("li");
  const h2 = document.createElement("h2");
  const p = document.createElement("p");
  const pCarb = document.createElement("p");
  const pProtein = document.createElement("p");
  const pFat = document.createElement("p");
  const deleteBtn = document.createElement("button");

  div.classList.add("item-container");
  li.classList.add("food-item");
  deleteBtn.classList.add("delete-button");

  //take the food Endpoint, the endpoint starts at index 59
  div.setAttribute("data-food-endpoint", item.name.slice(59));

  div.setAttribute("data-protein", item.fields.protein.integerValue);
  div.setAttribute("data-carb", item.fields.carb.integerValue);
  div.setAttribute("data-fat", item.fields.fat.integerValue);

  // this is for each card's calories
  let cardCalories =
    +item.fields.protein.integerValue * 4 +
    +item.fields.carb.integerValue * 4 +
    +item.fields.fat.integerValue * 9;

  h2.textContent = item.fields.name.stringValue;
  p.textContent = `${cardCalories} calories`;
  pCarb.textContent = `Carb: ${item.fields.carb.integerValue}g`;
  pProtein.textContent = `Protein: ${item.fields.protein.integerValue}g`;
  pFat.textContent = `Fat: ${item.fields.fat.integerValue}g`;

  // this is for total calories
  total += cardCalories;

  li.appendChild(h2);
  li.appendChild(p);
  li.appendChild(pCarb);
  li.appendChild(pProtein);
  li.appendChild(pFat);
  li.appendChild(deleteBtn);
  div2.appendChild(li);
  createImg(item, div2);
  div.appendChild(div2);

  ul.appendChild(div);

  totalCalories.innerHTML = `Total calories logged: <span>${total}</span>`;
  protein.value = "";
  carb.value = "";
  fat.value = "";
};
