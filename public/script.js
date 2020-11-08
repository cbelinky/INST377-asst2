fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(blob => blob.json())
    .then(data => food.push(...data));

const searchInput = document.querySelector(".textInput");
const suggestions = document.querySelector(".suggestions");
searchInput.addEventListener('keyup', displaymatches);

const food = [];

function findMatches(wordToMatch, food) {
  return food.filter((place) => {
    // Here we need to figure out if name or category that matches what has been searched
    const regex = new RegExp(wordToMatch, "gi"); // g means global and i means insensitive
    return place.name.match(regex) || place.category.match(regex);
  });
}

function displaymatches(){
    const matchArray = findMatches(this.value, food);
    const html = matchArray.map(place => {
        return `
        <li>
            <span class="name">${place.name}</span>
            <span class="category">${place.category}</span>
            <address><p>
                ${place.address_line_1}<br>
                ${place.city}, ${place.state} ${place.zip}<br>
            </p></address>
        </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

