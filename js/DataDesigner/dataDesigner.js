// example film table
let table = `
| id | film title                      |
|====|=================================|`;

let genres = ['Sci-Fi', 'Drama', 'Superhero'];

async function start() {
	let filePath = QuintOS.dir + '/films.json';
	let data = await fetch(filePath);
	let films = await data.json();
	let memberPath = QuintOS.dir + '/members.json';

	//let members = await .json();

	mainMenu();
}

async function mainMenu() {
	let choice = await prompt('1. View Member 2. View Film 3. Exit');
	if (choice == 1) {
		let memID = await prompt('Which member? Enter Id');
	}
}

function showFilms() {
	log(films);

	for (let film of films) {
		let title;

		if (film.title.length < 31) {
			title = film.title.padEnd(32);
		} else {
			title = film.title.slice(0, 28) + '... ';
		}

		table += '| ' + film.id + ' | ' + title + '|\n';

		table += '|----|---------------------------------|\n';
	}

	txt(table, 2, 0);
}
