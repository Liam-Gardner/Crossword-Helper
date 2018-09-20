window.addEventListener("DOMContentLoaded", function (event) {

	getData();
	createInputs();
	addEvents();
	
});


// Events
function addEvents() {

	document.getElementById('word-search').addEventListener('click', matchWord);
	document.getElementById('add-box').addEventListener('click', addInputBox);
	document.getElementById('remove-box').addEventListener('click', removeInputBox);

}


// create Inputs
function createInputs() {

	var formEl = document.getElementById('word-search-form');
	
	for(var i = 0; i < 5; i++){
		var inputBox = document.createElement('input');
		inputBox.setAttribute('type', 'text');
		inputBox.setAttribute('maxlength', '1');
		formEl.appendChild(inputBox);
	}

}


// request file from server
function getData() {

	var filename = [];
	words = [];
	
	// used to concatenate to filename
	alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

	for (var i = 0; i < alphabet.length; i++) {
		filename.push("data files/" + alphabet[i] + " Words.csv");
		
		// new instance of XMLHttpRequest
		xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				// on success put the object into an array
				response = this.responseText;
				wordArr = response.split("\n");
				// add the arrays together
				words = words.concat(wordArr);
			}
		}
		// open different filename on each loop iteration
		xhttp.open("GET", filename[i], true);
		xhttp.send();
	}
}


function matchWord() {
	
	// clear out any previous results
	document.getElementById('word-search-results').innerHTML = " ";
	// get all input boxes
	inputEl = document.getElementsByTagName('input');
	// blank array to deal with uppercase letters
	var elArr = []; 
	// stringPattern empty string needed for +=
	var stringPattern = '';
	
		// loop through all inputted letters and turn all to lowercase
		for(var k = 0; k < inputEl.length; k++) {
			elArr.push(inputEl[k].value.toLowerCase());
		}
			
		// loop through new array of inputted letters to store letters and position
		for(var j = 0; j < inputEl.length; j++) {
		// if array element is not empty
		if(elArr[j] !="") {
			// store letter positon 
			var letterPos = j;
			//  store letter
			var letter = elArr[j];
			// stringPattern is all(+=) letters with positions that passed the conditions
			stringPattern += "(?=^.{" + letterPos + "}[" + letter + "])";
		}
	}
	
	// new instance of RegExp
	var patt2 = new RegExp(stringPattern);
	// flag 
	var successufulMatch = false;
	
	// loop through all words to test for a match
	for(var i = 0; i < words.length; i++) {
		// only test for words that are the same length as amount of input boxes
		if (words[i].length == inputEl.length) {
			result = patt2.test(words[i]);
			// if a match is found output to the document
			if(result) {
				successufulMatch = true;	
				// this reveals the header element
				document.getElementById('word-search-header').style.display = 'block';
				// output all words
				document.getElementById('results-container').style.display = 'block';
				document.getElementById('word-search-results').innerHTML += words[i] + "<br>";
			}
		}
	} 	
	
	if (successufulMatch == false) {
			document.getElementById('results-container').style.display = 'block';
			document.getElementById('word-search-results').innerHTML = 'No matches found!'
		}
}


// add extra boxes for more letters
function addInputBox() {
	
	var formEl = document.getElementById('word-search-form');
	var inputBoxes = document.getElementsByTagName('input');
	var extraBox = document.createElement('input');
	extraBox.setAttribute('type', 'text');
	extraBox.setAttribute('maxlength', '1');
	// max word length is 10 in this dictionary
	if(inputBoxes.length <= 10) {
		formEl.appendChild(extraBox);
	}

}

// remove boxes for less letters
function removeInputBox() {
	
	var formEl = document.getElementById('word-search-form');
	var inputBoxes = document.getElementsByTagName('input');
	// limit to how many you can remove
	if(inputBoxes.length >= 3) {
		// remove the one at the end(-1 indicates last position)
		formEl.removeChild(inputBoxes[inputBoxes.length-1]);
	}

}