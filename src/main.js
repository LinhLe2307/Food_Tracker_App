import Chart from "chart.js/auto";
import { FetchWrapper } from "./fetchData.js";
import { createCard } from "./createCard.js";
import { postCardAPI } from "./postCardAPI";

import snackbar from "snackbar";
import "snackbar/dist/snackbar.min.css";

const foodForm = document.querySelector("#food-form");
const carb = document.querySelector("#carb");
const protein = document.querySelector("#protein");
const fat = document.querySelector("#fat");
const ul = document.querySelector("#display-cards");
const foodName = document.querySelector("#food-name");
const addButton = document.querySelector("#add-button");
const addContent = document.querySelector("#add-content");
const closeButton = document.querySelector("#close-button");
const displayPieChart = document.querySelector("#display-pie-chart");
const totalCalories = document.querySelector("#total-calories");
const alertMessage = document.querySelector("#alert-message");

const API = new FetchWrapper(
  "https://firestore.googleapis.com/v1/projects/programmingjs-90a13/databases/(default)/documents/"
);

API.get("LinhLe").then((data) => fetchCards(data.documents));

// to hide the message
const hideAlertMessage = () => {
  alertMessage.style.visibility = "hidden";
};

// total calories
let total = 0;

const fetchCards = (items) => {
  if (items) {
    // console.log("before post", items);
    const displayCard = items.map((item) => {
      if (item.fields) {
        createCard(item, protein, carb, fat);
      }
    });
  }
};

// to post the data to API
postCardAPI();

// to display pie chart, fetch the current item after posting it using promise. Otherwise, it will run synchronous => no data to fetch
const getCurrentItem = () => {
  // get the endpoint of the last item after posting it to API. Waiting for 50 milisseconds before fetch it => will have the endpoint
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(API.get("LinhLe")), 50);
  });
  promise.then((data) => {
    // console.log("after post", data);
    fetchCards(data.documents);
  });
};

const submitForm = (e) => {
  e.preventDefault();

  ul.textContent = "";
  total = 0;

  // post the data to API
  postCardAPI();

  //get current item's endpoint
  getCurrentItem();

  //to hide the alert message
  hideAlertMessage();

  // to display the chart to the browser
  showChart(carb.value, protein.value, fat.value, foodName.value);

  // to close the add form
  closeForm();

  // have snackbar
  snackbar.show("Food added successfully");
};

const showCard = (e) => {
  if (e.target.classList.contains("food-item")) {
    hideAlertMessage();
    const itemContainer = e.target.parentElement.parentElement;

    // display individual card using its food endpoint
    API.get(itemContainer.dataset.foodEndpoint).then((data) => {
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
  // destroy the id of current chart
  if (currentChart) {
    currentChart.destroy();
  }

  displayPieChart.innerHTML = `Food Name: <span>${currentFoodName}</span>`;

  // update the current one
  const ctx = document.getElementById("myChart");
  currentChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Carb", "Protein", "Fat"],
      datasets: [
        {
          label: "# of Votes",
          data: [currentCarb, currentProtein, currentFat],
          backgroundColor: ["#b388eb", "#f7aef8", "#8093f1"],
          borderColor: ["#826aed", "#fb6376", "#33658a"],
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

// display the form when clicking the add button
const addForm = () => {
  addContent.style.visibility = "visible";
};

// hide the form when clicking the back button
const closeForm = () => {
  addContent.style.visibility = "hidden";
};

const deleteItem = (e) => {
  if (e.target && e.target.classList.contains("delete-button")) {
    const wrapper = e.target.parentElement.parentElement;
    wrapper.parentElement.remove();

    // to take the div food Endpoint and delete it
    API.delete(wrapper.parentElement.dataset.foodEndpoint, {});

    //update total calories by minusing the calories of the deleted item
    total -=
      +wrapper.parentElement.dataset.protein * 4 +
      +wrapper.parentElement.dataset.carb * 4 +
      +wrapper.parentElement.dataset.fat * 9;

    // display the total
    totalCalories.innerHTML = `Total calories logged: <span>${total}</span>`;
    snackbar.show("Food removed successfully");
  }
};

addButton.addEventListener("click", addForm);
foodForm.addEventListener("submit", submitForm);
closeButton.addEventListener("click", closeForm);
ul.addEventListener("click", deleteItem);
ul.addEventListener("click", showCard);
