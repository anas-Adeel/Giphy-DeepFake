const APIKey = "NDAkRT01gCR4QHYf2mOjsCHH7Xr1OsjJ";
const url = "https://api.giphy.com/v1/gifs/search?q=";
let LIMIT = 24;
const noResults = ["https://media.giphy.com/media/zLCiUWVfex7ji/giphy.gif", "https://media.giphy.com/media/9J7tdYltWyXIY/giphy.gif", "https://media.giphy.com/media/9SJazLPHLS8roFZMwZ/giphy.gif", "https://media.giphy.com/media/26xBIygOcC3bAWg3S/giphy.gif"]
document.getElementById('userInput').addEventListener('keydown', handleEnter);
document.getElementById('GIFCountSlider').addEventListener('input', updateLimit);
document.getElementById('name').onclick = () => location.reload();


function handleEnter(e) {
	if (e.keyCode === 13) {
		clearGrid();
		handleClick();
	}
}


function updateLimit() {
	const range = document.getElementById("GIFCountSlider");
	const counter = document.getElementById("GIFCount");
	counter.textContent = range.value;
	LIMIT = Number(range.value);
}



function changeLimit (val) {
	const range = document.getElementById("GIFCountSlider");
	range.value = Number(range.value) + Number(val);
	updateLimit();
}



function handleClick () {
	clearGrid();
	let input = document.getElementById("userInput").value;
	for (let i = 0; i < 10; i++) {
		input = sanitizeInput(input);
	}
 	API(constructURL(input));
}


function clearGrid () {
	const grid = document.getElementById("grid");
	while (grid.firstElementChild) {
		grid.removeChild(grid.lastElementChild);
	}
}


function sanitizeInput (searchTerm) {
	return searchTerm.replace(' ', '+');
}


function API (url) {
	fetch(url)
  .then(res  => res.json())
  .then(json => createNewGifs(json.data))
  .catch();
}


function createNewGifs (data) {
	const grid = document.getElementById("grid");
	for (let i = LIMIT-1; i >= 0; i--) {
		try {
			const elt = data[i].images.original;
			// const elt = data[i].images.fixed_height;
			const gif = document.createElement("img");
			gif.src = elt.url;
			gif.className = 'GIF';
			grid.insertBefore(gif, grid.firstElementChild);
		}
		catch (err){
			console.log(err);
			const newGif = document.createElement('img');
			const index = Math.floor(Math.random() * noResults.length);
			newGif.src = noResults[index];
			newGif.className = 'GIF';
			grid.insertBefore(newGif, grid.firstElementChild);
		}
	}
}


function getInput (element) {
	return element.value;
}


function changeSrc (element, src) {
	element.src = src;
	return;
}


function constructURL (searchTerm) {
	return url + searchTerm + "&api_key=" + APIKey + "&limit=" + LIMIT;
}