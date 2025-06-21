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

/* Form validations */
