/*toggling selected button */
let currentSelectedTipEl = document.querySelector('.app_tipRadio:checked');
let currentSelectedLablEl = null;
let tipPercentage = Number(currentSelectedTipEl?.value / 100) || null;
const customEl = document.querySelector('.app_customTip');

document.addEventListener('DOMContentLoaded', init);

function init() {
	const radioButtons = document.querySelectorAll('.app_tipRadio');

	const checkedRadio = document.querySelector('.app_tipRadio:checked');
	if (checkedRadio) {
		currentSelectedLablEl = checkedRadio.closest('.app__tip-option');
		currentSelectedLablEl?.classList.add('selected');
	}

	radioButtons.forEach(tipOptionsBtn => {
		tipOptionsBtn.addEventListener('change', tipSelectionListener);
	})

	customEl.addEventListener('input', calculateTip);

	calculateTip();
}

/* ===== Tip selection ==== */
function tipSelectionListener(e) {
	const labelEl = e.currentTarget.closest('.app__tip-option');
	currentSelectedLablEl?.classList.remove('selected');
	customEl.value = "";

	labelEl.classList.add('selected');
	currentSelectedLablEl = labelEl

	tipPercentage = Number(e.currentTarget.value / 100);
	calculateTip();
}

/* Custom tip */
function getCustomTip() {
	const value = Number(customEl.value);
	if (!value) {
		if (currentSelectedLablEl && !currentSelectedLablEl.classList.contains('selected')) {
			currentSelectedLablEl.classList.add('selected');
		}

		return true;
	}

	if (!customEl.validity.valid) {
		setErrorMessage(customEl, "Invalid input");
		return false;
	}

	if (value > 100 || value <= 0) {
		setErrorMessage(customEl, "Out of range!")
		return false;
	}

	if (currentSelectedLablEl && currentSelectedLablEl.classList.contains('selected')) {
		if (currentSelectedTipEl) {
			currentSelectedTipEl.checked = false;
		}

		currentSelectedLablEl.classList.remove('selected');
	}

	clearErrorMessage(customEl);
	tipPercentage = value / 100;
	return true;
}
/* ======================== Form validations =========================== */
/*
*  input.checkValidity()
*  input.validity.valid
*
* */
const inputPeopleEl = document.querySelector('.app__peopleInput');
const inputBillEl = document.querySelector('.app__billInput');

inputPeopleEl.addEventListener('input', calculateTip);
inputBillEl.addEventListener('input', calculateTip);

function inputValidation(currentInput) {

	if (!currentInput.value) {
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

	if (currentInput.classList.contains('app__peopleInput') && Number(currentInput.value) > 100) {
		setErrorMessage(currentInput, "Value out of range (Max. 100 people)");
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


/* ======================== Tip calculation =========================== */
/*
*
* */
const tipAmountEl = document.querySelector('.tip-per-person');
const totalPersonEl = document.querySelector('.total-per-person');

function calculateTip() {
	if (!inputValidation(inputBillEl) || !inputValidation(inputPeopleEl) || !getCustomTip()) {
		return;
	}

	const billAmount = Number(inputBillEl.value);
	const totalPersons = Number(inputPeopleEl.value);

	const tipAmount = (tipPercentage * billAmount) / totalPersons;
	const totalPerson = (billAmount / totalPersons) + tipAmount;

	tipAmountEl.textContent = `$${tipAmount.toFixed(2)}`;
	totalPersonEl.textContent = `$${totalPerson.toFixed(2)}`;
}

