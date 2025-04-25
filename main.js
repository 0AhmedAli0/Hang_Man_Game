let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector(".letters");

// generate letters
lettersArray.forEach((letter) => {
  //create span
  let span = document.createElement("span");
  span.classList.add("letter-box");
  //append letter to span
  span.appendChild(document.createTextNode(letter));
  //append span to letters container
  lettersContainer.appendChild(span);
});

// Object Of Words + Categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

//get random category
let AllWordesProperites = Object.keys(words); //All keys
const randomPropertyNum = Math.floor(
  Math.random() * AllWordesProperites.length
);
let RandomPropertyValue = AllWordesProperites[randomPropertyNum];

document.querySelector(".game-info .category span").innerHTML =
  RandomPropertyValue;

// get random word from random category
let CategoryWords = words[RandomPropertyValue];
let RandomWordNum = Math.floor(Math.random() * CategoryWords.length);
let RandomWordValue = CategoryWords[RandomWordNum];

let RandomWordArray = Array.from(RandomWordValue);
RandomWordArray.forEach((letter) => {
  let genrateSpan = document.createElement("span");
  if (letter === " ") {
    genrateSpan.className = "with_space";
  }
  document.querySelector(".container .letters-guess").appendChild(genrateSpan);
});

let HangManDrow = document.querySelector(".row .hangman-draw");
let wrongsNUM = 0;
let sucNUM = 0;

// handel click on letters
document.addEventListener("click", (e) => {
  //set chose status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    //compare clicked letter with word letters
    let ClickedLetter = e.target.innerHTML.toLowerCase();
    RandomWordArray.forEach((Wordletter, index) => {
      if (ClickedLetter == Wordletter.toLowerCase()) {
        document.querySelectorAll(".container .letters-guess span")[
          index
        ].innerHTML = Wordletter;

        //set status correct
        theStatus = true;

        sucNUM++;
        if (sucNUM == RandomWordArray.length) {
          lettersContainer.classList.add("finshed");

          //add popup
          let popup = document.createElement("div");
          popup.classList.add("popup");
          popup.classList.add("suc");
          let popupText = document.createTextNode(
            `Very Good, The Word Is ${RandomWordValue}, and you do ${wrongsNUM} Mistakes`
          );
          popup.appendChild(popupText);

          document.body.appendChild(popup);
        }
      }
    });

    //add class to drow hangman
    if (theStatus !== true) {
      wrongsNUM++;
      HangManDrow.classList.add(`Wrong-${wrongsNUM}`);

      //run fail sound
      document.getElementById("fail").play();

      if (wrongsNUM === 8) {
        lettersContainer.classList.add("finshed");

        endGame();
      }
    } else {
      //run success sound
      document.getElementById("success").play();
    }
  }
});

function endGame() {
  //add popup
  let popup = document.createElement("div");
  popup.classList.add("popup");
  let popupText = document.createTextNode(
    `Game Over, The Word Is ${RandomWordValue}`
  );
  popup.appendChild(popupText);

  document.body.appendChild(popup);
}
