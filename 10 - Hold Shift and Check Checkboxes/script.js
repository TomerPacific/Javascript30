var checkboxes = [];
let lastChecked;

const inputs = document.getElementsByTagName("input");
const inputsArray = Array.from(inputs);

inputsArray.forEach( element => {
	if(element.type === "checkbox"){
		checkboxes.push(element);
	}
});

checkboxes.forEach( checkbox => {
	checkbox.addEventListener("click", handleCheck);
});

function handleCheck(event){
	let inBetween = false;
	if(event.shiftKey && this.checked){
		checkboxes.forEach( checkbox => {
			if(checkbox === this || checkbox === lastChecked){
				inBetween = !inBetween;
			}
			if(inBetween){
				checkbox.checked = true;
			}
		});
	}

	lastChecked = this;
}