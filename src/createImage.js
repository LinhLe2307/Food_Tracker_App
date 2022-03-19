export const createImg = (item, div2) => {
    const img = document.createElement("img");
    if (item.fields.name.stringValue === "Apple") {
      img.setAttribute(
        "src",
        "https://free3dicon.com/wp-content/uploads/2022/01/red_apple_balloon_perspective_matte_s-300x300.png.webp"
      );
    } else if (item.fields.name.stringValue === "Avocado") {
      img.setAttribute(
        "src",
        "https://free3dicon.com/wp-content/uploads/2022/02/avocado-300x300.png.webp"
      );
    } else if (item.fields.name.stringValue === "Beef") {
      img.setAttribute(
        "src",
        "https://free3dicon.com/wp-content/uploads/2022/03/meat-300x300.png.webp"
      );
    } else if (item.fields.name.stringValue === "Beer") {
      img.setAttribute(
        "src",
        "https://free3dicon.com/wp-content/uploads/2022/02/beer-300x300.png.webp"
      );
    } else if (item.fields.name.stringValue === "Pizza") {
      img.setAttribute(
        "src",
        "https://free3dicon.com/wp-content/uploads/2021/03/pizza_perspective_matte_s-1-300x300.png.webp"
      );
    } else if (item.fields.name.stringValue === "Blue Berry") {
      img.setAttribute(
        "src",
        "https://free3dicon.com/wp-content/uploads/2022/02/blueberry-300x300.png.webp"
      );
    } else if (item.fields.name.stringValue === "Burger") {
      img.setAttribute(
        "src",
        "https://free3dicon.com/wp-content/uploads/2021/04/burger_perspective_matte_s-1-300x300.png.webp"
      );
    } else if (item.fields.name.stringValue === "Cake") {
      img.setAttribute(
        "src",
        "https://free3dicon.com/wp-content/uploads/2021/11/cake_perspective_matte_s-2-300x300.png.webp"
      );
    } else if (item.fields.name.stringValue === "Cheese") {
      img.setAttribute(
        "src",
        "https://free3dicon.com/wp-content/uploads/2022/02/cheese-300x300.png.webp"
      );
    } else if (item.fields.name.stringValue === "Coffe") {
      img.setAttribute(
        "src",
        "https://free3dicon.com/wp-content/uploads/2021/03/coffee_perspective_matte_s-1-300x300.png.webp"
      );
    } else if (item.fields.name.stringValue === "Doughnut") {
      img.setAttribute(
        "src",
        "https://free3dicon.com/wp-content/uploads/2021/09/donut_perspective_matte_s-2-300x300.png.webp"
      );
    } else if (item.fields.name.stringValue === "Egg") {
      img.setAttribute(
        "src",
        "https://free3dicon.com/wp-content/uploads/2022/02/egg-300x300.png.webp"
      );
    } else if (item.fields.name.stringValue === "French Fried") {
      img.setAttribute(
        "src",
        "https://free3dicon.com/wp-content/uploads/2021/09/french_fries_perspective_matte_s-2-300x300.png.webp"
      );
    } else if (item.fields.name.stringValue === "Ice Cream") {
      img.setAttribute(
        "src",
        "https://free3dicon.com/wp-content/uploads/2022/01/ice_cream_perspective_matte_s-300x300.png.webp"
      );
    } else if (item.fields.name.stringValue === "Juice") {
      img.setAttribute(
        "src",
        "https://free3dicon.com/wp-content/uploads/2022/02/juice-300x300.png.webp"
      );
    } else if (item.fields.name.stringValue === "Melon") {
      img.setAttribute(
        "src",
        "https://free3dicon.com/wp-content/uploads/2022/03/melon-300x300.png.webp"
      );
    } else if (item.fields.name.stringValue === "Pizza") {
      img.setAttribute(
        "src",
        "https://free3dicon.com/wp-content/uploads/2021/03/pizza_perspective_matte_s-1-300x300.png.webp"
      );
    } else if (item.fields.name.stringValue === "Salad") {
      img.setAttribute(
        "src",
        "https://free3dicon.com/wp-content/uploads/2022/02/broccol-300x300.png.webp"
      );
    } else {
      img.setAttribute(
        "src",
        "https://free3dicon.com/wp-content/uploads/2021/09/donut_perspective_matte_s-2-300x300.png.webp"
      );
    }
  
    return div2.appendChild(img);
  };