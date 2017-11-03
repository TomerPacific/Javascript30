const addItems = document.querySelector('.add-items');
var itemsList = document.querySelector('.plates');
var items = JSON.parse(localStorage.getItem('items')) || [];


function clearList(){
	items = [];
	itemsList.innerHTML = "";
	localStorage.removeItem('items');
}

function addItem(event){
	event.preventDefault(); //prevents page from reloading
	const text = (this.querySelector('[name=item]')).value;
	const item = {
		text,
		done : false
	};
	items.push(item);
	populateList(items, itemsList);
	localStorage.setItem('items', JSON.stringify(items));
	this.reset();	
}

function populateList(plates = [], platesList) {
	platesList.innerHTML = plates.map((plate, index) => {

		return `
			<li>
				<input type="checkbox" data-index=${index} id="item${index}" ${plate.done ? 'checked' : ''} />
				<label for="item${index}">${plate.text}</label>
			</li>
		`;
	}).join('');
}

function toggleDone(event) {
	if(!event.target.matches('input')){
		return;
	}

	const element = event.target;
	items[element.dataset.index].done = !items[element.dataset.index].done;
	localStorage.setItem('items', JSON.stringify(items));
	populateList(items, itemsList);
}


addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList);