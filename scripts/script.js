/* 1. Input elements */
const inputPeopleEl = document.querySelector('.app__peopleInput');
const inputBillEl = document.querySelector('.app__billInput');
const customEl = document.querySelector('.app_customTip');
const radioButtons = document.querySelectorAll('.app_tipRadio');

/* 2. Display elements */
const tipAmountEl = document.querySelector('.tip-per-person');
const totalPersonEl = document.querySelector('.total-per-person');

/* 3. Reset button */
const resetButton = document.querySelector('.app__reset');

/* 4. Default tip */
const defaultTip = document.querySelector('.app_tipRadio.default');

const tipContentObj = {
	selectedEl: defaultTip,
	selectedTip: 0,
	customTip: 0,
	useCustomTip: false
}

document.addEventListener('DOMContentLoaded', init);

function init() {
	/* Add event listeners */
	inputPeopleEl.addEventListener('input', calculateTip);
	inputBillEl.addEventListener('input', calculateTip);
	radioButtons.forEach(radioButton => {
		radioButton.addEventListener('click', tipSelectionListener);
	})
	customEl.addEventListener('input', customTipListener);

	selectTipPercentage();

	if (tipContentObj.useCustomTip) {
		tipContentObj.customTip = Number(customEl.value) / 100;
	}

	calculateTip();
}

/* Tip Selection radio Buttons */
function tipSelectionListener() {
	customEl.value = "";
	removeSelectedClass();
	selectTipPercentage();
	calculateTip();
}

function selectTipPercentage() {
	const checkedElement = document.querySelector('.app_tipRadio:checked');
	if (checkedElement) {
		const currentSelectedLablEl = checkedElement.closest('.app__tip-option');
		currentSelectedLablEl?.classList.add('selected');
		tipContentObj.selectedEl = checkedElement;
		tipContentObj.selectedTip = Number(checkedElement.value) / 100;
		tipContentObj.useCustomTip = false;
	} else {
		tipContentObj.useCustomTip = true;
	}
}

/* Custom tip listener */
function customTipListener() {
	const customValue = Number(customEl.value);

	if (!customValue) {
		tipContentObj.selectedEl.checked = true;
		clearErrorMessage(customEl);
		tipSelectionListener();
		return;
	}

	if (customValue <= 0 || customValue > 100) {
		setErrorMessage(customEl, "Value is out of range");
		return;
	}

	if (!customEl.validity.valid) {
		setErrorMessage(customEl, "Invalid input");
		return;
	}

	clearErrorMessage(customEl);
	removeSelectedClass();
	tipContentObj.selectedEl.checked = false;

	tipContentObj.useCustomTip = true;
	tipContentObj.customTip = customValue / 100;

	calculateTip();
}

function removeSelectedClass() {
	const currentSelected = document.querySelector('.selected');
	currentSelected?.classList.remove('selected');
}

/* Calculate tip */
function calculateTip() {
	/* 1. Validate all inputs */
	const validInputBill = inputValidation(inputBillEl);
	const validInputPeople = inputValidation(inputPeopleEl);

	if (!validInputBill || !validInputPeople) return;

	/* Get the tip percentage */
	const tip = tipContentObj.useCustomTip ? tipContentObj.customTip : tipContentObj.selectedTip;

	/* 3. Calculate tip */
	const billAmount = Number(inputBillEl.value);
	const totalPersons = Number(inputPeopleEl.value);

	const tipAmount = (tip * billAmount) / totalPersons;
	const totalPerson = (billAmount / totalPersons) + tipAmount;

	/* 4. Update the DOM with the tip value */
	tipAmountEl.textContent = `$${tipAmount.toFixed(2)}`;
	totalPersonEl.textContent = `$${totalPerson.toFixed(2)}`;

	if (resetButton.classList.contains('disabled')) {
		resetButton.classList.remove('disabled');
		resetButton.addEventListener('click', resetListener);
	}
}

/* Input number validations and error handling */
function inputValidation(currentInput) {
	if (!currentInput.value) {
		clearErrorMessage(currentInput);
		return false;
	}

	if (!currentInput.validity.valid) {
		setErrorMessage(currentInput, "Invalid input characters");
		return false;
	}

	if (currentInput.value && Number(currentInput.value) <= 0) {
		setErrorMessage(currentInput, "Value can't be zero nor empty");
		return false;
	}

	if (
		(currentInput.classList.contains('app__peopleInput')
			|| currentInput.classList.contains('app_customTip'))
			&& Number(currentInput.value) > 100
	) {
		setErrorMessage(currentInput, "Value out of range (Max. 100)");
		return false;
	}

	clearErrorMessage(currentInput);
	return true;
}

function setErrorMessage(element, message) {
	element.classList.add('invalid');
	const parentBox = element.closest('.inputBox');

	if(!parentBox) return;

	const errorMsgEl = parentBox.querySelector('.app__error-message');

	if (errorMsgEl.classList.contains('hidden')) {
		errorMsgEl.textContent = message;
		errorMsgEl.classList.remove('hidden');
	}
}

function clearErrorMessage(element) {
	element.classList.remove('invalid');
	const parentBox = element.closest('.inputBox');

	if(!parentBox) return;

	const errorMsgEl = parentBox.querySelector('.app__error-message');
	if (!errorMsgEl.classList.contains('hidden'))
		errorMsgEl.classList.add('hidden');
}

/* Reset button */
function resetListener() {
	tipAmountEl.textContent = '$0.00'
	totalPersonEl.textContent = '$0.00'

	inputPeopleEl.value = "";
	inputBillEl.value = "";
	customEl.value = "";

	if (tipContentObj.selectedEl) {
		tipContentObj.selectedEl.checked = false;
	}

	tipContentObj.selectedEl = defaultTip;
	tipContentObj.selectedEl.checked = tru|e;
	tipSelectionListener();
	clearErrorMessage(customEl);

	resetButton.classList.add('disabled');
	resetButton.removeEventListener('click', resetListener);
}



