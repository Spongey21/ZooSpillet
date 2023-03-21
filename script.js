const ANIMALS = document.querySelector(".animals");
const FOOD = document.querySelector(".food");
const POINT = document.querySelector("#point");

const obj = [
  { animal: '🐵', food: '🍎', sound: './Sounds/Monkey.mp3' },
  { animal: '🦍', food: '🍌', sound: './Sounds/Gorilla.mp3' },
  { animal: '🐯', food: '🍍', sound: './Sounds/Tiger.mp3' }
];

let dragged = null;
let point = 0;

const pointSystem = (target, event) => {
  const animal = obj.find(function(objAnimal) {
    objAnimal.animal == event.target.innerText;
  })

  if (animal.food === target.innerText) {
    point += 100;

    const audio = new Audio(animal.sound);
    audio.play();

    setTimeout(function() {
      audio.pause();
    }, 4000);
  } else {
    point -= 100;
  }

  POINT.dataset.value = point;
  POINT.innerText = `Point: ${point}`;

  if (point <= 0) {
    alert('You failed!');

    point = 0;
    POINT.dataset.value = 0;
  }
};

for (const food of FOOD.children) {
  food.addEventListener("dragstart", (event) => {
    dragged = event.target;
  });
}

for (const animal of ANIMALS.children) {
  animal.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  animal.addEventListener("drop", (event) => {
    event.preventDefault();
    pointSystem(dragged, event);
  });
}