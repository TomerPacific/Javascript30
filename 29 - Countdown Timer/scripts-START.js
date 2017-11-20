let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
	clearInterval(countDown);
	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(then);

	countDown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		if(secondsLeft < 0){
			clearInterval(countDown);
			return;
		}
		displayTimeLeft(secondsLeft);
	}, 1000);
}

function displayTimeLeft(seconds){
	const minutes = Math.floor(seconds / 60);
	let remainingSeconds = seconds % 60
	remainingSeconds = remainingSeconds < 10 ? '0'+remainingSeconds : remainingSeconds;
	const display = `${minutes}:${remainingSeconds}`;
	timerDisplay.textContent = display;
	document.title = display;
}

function displayEndTime(timeStamp){
	const end = new Date(timeStamp);
	const hours = end.getHours();
	let minutes = end.getMinutes();
	minutes = minutes < 10 ? '0'+minutes : minutes;
	endTime.textContent = `Be Back At ${hours}:${minutes}`;
}

function startTimer() {
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}

buttons.forEach( button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(event){
	event.preventDefault();
	const mins = this.minutes.value;
	timer(mins * 60);
	this.reset();
});