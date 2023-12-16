// example film table
let tableHeader = `
| id | film title                      |
|====|=================================|`;

let genres = ['Sci-Fi', 'Drama', 'Superhero'];

let allFilms;

async function start() {
	let filePath = QuintOS.dir + '/films.json';
	let data = await fetch(filePath);
	allFilms = await data.json();

	filePath = QuintOS.dir + '/members.json';
	data = await fetch(filePath);
	members = await data.json();

	//showMember('F2');

	mainMenu();
}

async function mainMenu() {
	let choice = await prompt('1: View Member 2: View Film 3: Exit', 10);
	if (choice == 1) {
		let memID = await prompt('Which member? Enter ID', 10);
		showMember(memID);
	}
	if (choice == 2) {
		await showFilm();
		erase();
		mainMenu();
	}
	if (choice == 3) {
		exit();
	}
}

async function showFilm() {
	let fID = await prompt('Which film? Enter ID', 20);
	let film;
	for (film of allFilms) {
		if (film.id == fID) {
			break;
		}
	}
	txt(
		'Film ID: ' +
			film.id +
			'\n\nFilm Name: ' +
			film.title +
			'\n\nGenre: ' +
			genres[film.genre] +
			'\n\nDescription: ' +
			film.description,
		2,
		2
	);

	await alert('Return to main menu', 20, 0);
}

async function showMember(mID) {
	let member;
	for (member of members) {
		if (member.id == mID) {
			break;
		}
	}

	log(member);

	txt('Member ID: ' + member.id + '\n\nName: ' + member.name, 2, 0);

	let films = [];
	for (let fID of member.rented) {
		for (let film of allFilms) {
			if (film.id == fID) {
				films.push(film);
				break;
			}
		}
	}

	showFilms(films, 6);

	let choice = await prompt('1: <- 2: View film 3: Rent 4: Return', 20, 0);

	if (choice == 1) {
		erase();
		mainMenu();
		return;
	}

	if (choice == 2) {
		await showFilm();
	}
	if (choice == 3) {
		let wantedFilm = await prompt('Which film would you like to rent? Enter ID', 19, 0);
		member.rented.push(wantedFilm);
	}
	if (choice == 4) {
		let deleteFilm = await prompt('Which film do you want to get rid of? Enter ID', 19, 0);
		for (let i = 0; i < member.rented.length; i++) {
			let fID = member.rented[i];
			if (fID == deleteFilm) {
				member.rented.splice(i, 1);
				break;
			}
		}
	}

	erase();
	showMember(member.id);
}

function showFilms(films, row) {
	log(films);

	let table = tableHeader;

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

	txt(table, row, 0);
}
