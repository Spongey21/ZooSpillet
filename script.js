const ANIMALS = document.querySelector(".animals");
const FOOD = document.querySelector(".food");
const POINT = document.querySelector("#point");

let dragged = null;
let point = 0;

function pointSystem(target, event) { // Point-based game checker

  switch (target.innerText) {
    case "🍎":
      if (event.target.innerText == "🐵") {
        point += 100;
      } else {
        point -= 100;
      }
      break;
    case "🍌":
      if (event.target.innerText == "🦍") {
        point += 100;
      } else {
        point -= 100;
      }
      break;
    case "🍍":
      if (event.target.innerText == "🐯") {
        point += 100;
      } else {
        point -= 100;
      }
      break;
  }

  if (point <= 0) {
    alert('You failed!')

    point = 0;
    POINT.dataset.value = 0;
  } else {
    POINT.dataset.value = point;
  }

  POINT.innerText = `Point: ${point}`;
}

for (let i = 0; i <= FOOD.children.length - 1; i++) { // static EventListener to all elements that require it, adds the draggable events
  FOOD.children[i].addEventListener("dragstart", function (event) {
    dragged = event.target;
  });
}

for (let i = 0; i < ANIMALS.children.length; i++) {
  ANIMALS.children[i].addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  ANIMALS.children[i].addEventListener("drop", function (event) {
    event.preventDefault();

    pointSystem(dragged, event);
  });
}