import Chart from "chart.js/auto";
import { FetchWrapper } from "./fetchData.js";
import { createImg } from "./createImage.js";

const foodForm = document.querySelector("#food-form");
const carb = document.querySelector("#carb");
const protein = document.querySelector("#protein");
const fat = document.querySelector("#fat");
const ul = document.querySelector("#display-items");
const foodName = document.querySelector("#food-name");
const addButton = document.querySelector("#add-button");
const addContent = document.querySelector("#add-content");
const closeButton = document.querySelector("#close-button");
const displayFoodName = document.querySelector("#display-food-name");
const totalCalories = document.querySelector("#total-calories");

const API = new FetchWrapper(
  "https://firestore.googleapis.com/v1/projects/programmingjs-90a13/databases/(default)/documents/"
);

API.get("LinhLe").then((data) => createCard(data.documents));

const reloadPage = () => {
  window.location.reload();
};

let total = 0;
const createCard = (items) => {
  if (items) {
    const displayCard = items.map((item) => {
      if (item.fields) {
        // console.log(item.fields)
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
        p.textContent = cardCalories;
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
      }
    });
    totalCalories.textContent = `Total calories logged: ${total}`;
    protein.value = "";
    carb.value = "";
    fat.value = "";
    // chartForm.submit();
    // reloadPage();
  }
};

const postCardAPI = () => {
  API.post("LinhLe", {
    fields: {
      carb: {
        integerValue: carb.value,
      },
      fat: {
        integerValue: fat.value,
      },
      protein: {
        integerValue: protein.value,
      },
      name: {
        stringValue: foodName.value,
      },
    },
  });
};

const submitForm = (e) => {
  e.preventDefault();
  showChart(carb.value, protein.value, fat.value, foodName.value);
  postCardAPI();
  closeForm();
  // reloadPage();
  // foodForm.submit();
};

const showCard = (e) => {
  if (e.target.classList.contains("food-item")) {
    const itemContainer = e.target.parentElement.parentElement;
    API.get(itemContainer.dataset.foodEndpoint).then((data) => {
      // console.log(data);
      const currentProtein = data.fields.protein.integerValue;
      const currentCarb = data.fields.carb.integerValue;
      const currentFat = data.fields.fat.integerValue;
      const currentFoodName = data.fields.name.stringValue;
      showChart(currentCarb, currentProtein, currentFat, currentFoodName);
    });
  }
};

let currentChart;
const showChart = (
  currentCarb,
  currentProtein,
  currentFat,
  currentFoodName
) => {
  if (currentChart) {
    currentChart.destroy();
  }
  displayFoodName.textContent = `Food Name: ${currentFoodName}`;
  const ctx = document.getElementById("myChart");
  currentChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Carb", "Protein", "Fat"],
      datasets: [
        {
          label: "# of Votes",
          // data: [carb.value, protein.value, fat.value],
          data: [currentCarb, currentProtein, currentFat],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

const addForm = () => {
  addContent.style.visibility = "visible";
  addContent.style.zIndex = 1;
};

const closeForm = () => {
  addContent.style.visibility = "hidden";
};

const deleteItem = (e) => {
  if (e.target && e.target.classList.contains("delete-button")) {
    const wrapper = e.target.parentElement.parentElement;
    wrapper.parentElement.remove();

    // to take the div food Endpoint and delete it
    API.delete(wrapper.parentElement.dataset.foodEndpoint, {});
    total -=
      +wrapper.parentElement.dataset.protein * 4 +
      +wrapper.parentElement.dataset.carb * 4 +
      +wrapper.parentElement.dataset.fat * 9;
    totalCalories.textContent = `Total calories logged: ${total}`;
  }
};

addButton.addEventListener("click", addForm);
foodForm.addEventListener("submit", submitForm);
closeButton.addEventListener("click", closeForm);
ul.addEventListener("click", deleteItem);
ul.addEventListener("click", showCard);
