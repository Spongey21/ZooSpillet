const ANIMALS = document.querySelector(".animals");
const FOOD = document.querySelector(".food");
const POINT = document.querySelector("#point");
const SCORE = document.querySelector('#score');

const obj = [
  { animal: '🐵', food: '🍎', sound: './Sounds/Monkey.mp3' },
  { animal: '🦍', food: '🍌', sound: './Sounds/Gorilla.mp3' },
  { animal: '🐯', food: '🍍', sound: './Sounds/Tiger.mp3' }
];

SCORE.textContent = `Score: ${localStorage.getItem('score')}` 

const pointSystem = function (target, event) {
  const animal = obj.find(function (animalObj) {
    return animalObj.animal == event.target.textContent;
  })

  if (animal.food == target.textContent) {
    POINT.dataset.value = parseInt(POINT.dataset.value) + 100;
    localStorage.setItem('score', POINT.dataset.value)

    const audio = new Audio(animal.sound);
    audio.play();

    setTimeout(function () {
      audio.pause();
    }, 4000);
  } else {
    POINT.dataset.value = parseInt(POINT.dataset.value) - 100;
  }

  POINT.textContent = `Point: ${POINT.dataset.value}`;
  
  if (parseInt(POINT.dataset.value) <= 0) {
    alert('You failed!');

    POINT.dataset.value = 0;
  }
};

let dragged = null;

for (const food of FOOD.children) {
  food.addEventListener("dragstart", function (event) {
    dragged = event.target;
  });
}

for (const animal of ANIMALS.children) {
  animal.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  animal.addEventListener("drop", function (event) {
    event.preventDefault();
    pointSystem(dragged, event);
  });
}