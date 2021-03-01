const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false; //Show quoteContainer
    loader.hidden = true;
  }
}

//Get Quote From API
async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = "https://desolate-citadel-14977.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    if (data.quoteAuthor === "") {
      authorText.innerText = "unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    removeLoadingSpinner();
  } catch (err) {
    getQuote();
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author} `;
  window.open(twitterUrl, "_blank");
}

newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

//On Load
getQuote();
