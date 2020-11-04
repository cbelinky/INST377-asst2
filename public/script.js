// Here's everything from the video tutorial on making a type ahead

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data)); //promise chain, we don't want to do that

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        // Here we need to figure out if city or state that matches what has been searched
        const regex = new RegExp(wordToMatch, 'gi'); // g means global and i means insensitive
        return place.city.match(regex) || place.state.match(regex);
    })
}
function displaymatches(){
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        return `
        <li>
            <span class="name">${place.city}, ${place.state}</span>
            <span class="name">${place.population}</span>
        </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('keyup', displaymatches);

/* 
    - We will need a different event listener
    - We will also need to remove some of the fluff in this method
    - Otherwise I think this will work

document.body.addEventListener('submit', async (e) => {
    e.preventDefault(); // this stops whatever the browser wanted to do itself.
    const form = $(e.target).serializeArray();
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((fromServer) => fromServer.json())
      .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
      .catch((err) => {
        console.log(err);
      });
  });
  */