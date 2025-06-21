/*toggling selected button */
let currentSelectedTipEl = document.querySelector('.app_tipRadio:checked');
let tipPercentage = currentSelectedTipEl.value || null;
let currentSelectedLablEl = null;

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
}

function tipSelectionListener(e) {
	const labelEl = e.currentTarget.closest('.app__tip-option');
	currentSelectedLablEl?.classList.remove('selected');

	labelEl.classList.add('selected');
	currentSelectedLablEl = labelEl

	tipPercentage = e.currentTarget.value;
}

/* ======================== Form validations =========================== */
/*
*  input.checkValidity()
*  input.validity.valid
*
* */
const inputPeopleEl = document.querySelector('.app__peopleInput');
const inputBillEl = document.querySelector('.app__billInput');

inputPeopleEl.addEventListener('input', validationListener);
inputBillEl.addEventListener('input', validationListener);

function validationListener(e) {
	const currentInput = e.target;

	if (!currentInput.validity.valid) {
		setErrorMessage(currentInput, "Invalid input characters");
		return;
	}

	if (currentInput.value && Number(currentInput.value) === 0) {
		setErrorMessage(currentInput, "Value can't be zero nor empty");
		return;
	}

	if (currentInput.classList.contains('app__peopleInput') && Number(currentInput.value) > 100) {
		setErrorMessage(currentInput, "Value out of range (Max. 100 people)");
		return;
	}

	clearErrorMessage(currentInput);
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

