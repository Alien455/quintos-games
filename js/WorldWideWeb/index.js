let screen = document.getElementById('screen');

let buttons = document.getElementsByTagName('button');

for (let button of buttons) {
	button.addEventListener('click', handleButtonPress);
}

function handleButtonPress(event) {
	let button = event.target;

	let val = button.innerText;

	if (val == '<') {
		screen.value = screen.value.slice(0, -1);
	} else if (val == '=') {
		let eq = screen.value.replaceAll('x', '*');
		screen.value = eval(eq);
	} else {
		screen.value += val;
	}
}
