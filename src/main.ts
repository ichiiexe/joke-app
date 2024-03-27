import "./index.css";

// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
import { type Category, type SingleJoke, type TwoPartJoke } from "./types";
import { fetchJoke } from "./utils";

// https://www.typescripttutorial.net/typescript-tutorial/type-casting/
const jokeElement = document.getElementById("joke") as HTMLElement;
const categoryForm = document.getElementById("categoryForm") as HTMLElement;

categoryForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Retrieve selected categories
  const selectedCategories: Category[] = [];

  const checkedBox = document.getElementsByName("category") as HTMLElement;
  for (let markedBox of checkedBox) {
    if (markedBox.checked) {
      selectedCategories.push(markedBox.value);
    }
  }
  const joke = await fetchJoke(selectedCategories);

  displayJoke(joke);
});

// Function to display joke
function displayJoke(joke: SingleJoke | TwoPartJoke) {
  if (joke.type === "single") {
    jokeElement.textContent = joke.joke;
    blur(joke);
  } else {
    jokeElement.textContent = joke.setup;
    blur(joke);
    setTimeout(() => {
      jokeElement.textContent = joke.delivery;
    }, 6000);
  }
  console.log(joke);
  // TODO: Implement a feature to blur flagged jokes and provide a button to unblur them.
}

function blur(joke: any) {
  if (joke.safe === false) {
    jokeElement.classList.add("blur");

    const revealBTN = document.createElement("button");
    revealBTN.textContent = "Reveal";
    revealBTN.addEventListener("click", () => {
      jokeElement.classList.toggle("blur");
    });

    jokeElement.appendChild(revealBTN);
  }
}
