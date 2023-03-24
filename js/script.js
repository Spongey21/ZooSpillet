const ANIMALS = document.querySelector(".animals");
const FOOD = document.querySelector(".food");
const POINT = document.querySelector("#point");
const SCORE = document.querySelector('#score');

const obj = []; // animal array

SCORE.textContent = `Score: ${localStorage.getItem('score')}`

const pointSystem = function (target, event) {
  // Finds the animal that is attached to the textcontent of our event
  const animal = obj.find(function (animalObj) {
    return animalObj.name == event.target.textContent;
  })

  if (animal.food == target.textContent) {

    // Distributes values, to our point data-value and the localstorage
    POINT.dataset.value = parseInt(POINT.dataset.value) + 100;
    localStorage.setItem('score', POINT.dataset.value)

    // Plays the animal noise and stops after 6s
    const audio = new Audio(animal.sound);
    audio.play();

    setTimeout(function () {
      audio.pause();
    }, 4000);
  } else {

    // Distributes negative value upon failure to give correct food 
    POINT.dataset.value = parseInt(POINT.dataset.value) - 100;
  }

  // Displays the current points to the user
  POINT.textContent = `Point: ${POINT.dataset.value}`;

  // Game Failure detection
  if (parseInt(POINT.dataset.value) <= 0) {
    alert('You failed!')

    POINT.textContent = 'Point: 0';
    POINT.dataset.value = 0;
  }
};

let dragged = null;

// Applies all the nessecarry events to have the dragable elements and their targets work
for (const food of FOOD.children) {
  food.addEventListener("dragstart", function (event) {
    dragged = event.target;
  });
}

for (const animal of ANIMALS.children) {
  obj.push({
    name: animal.textContent,
    food: animal.dataset.food,
    sound: animal.dataset.sound,
  })

  animal.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  animal.addEventListener("drop", function (event) {
    event.preventDefault();
    pointSystem(dragged, event); // Invokes the pointsystem method
  });
}