const backgroundSelect = document.querySelector('[data-background-select]') as HTMLSelectElement;
const body = document.body;

// Background color change
backgroundSelect.addEventListener('change', () => {
    // Remove all background classes first
    body.classList.remove('bg-sunset', 'bg-ocean', 'bg-mint', 'bg-peach');

    // Add the selected background
    const selected = backgroundSelect.value;
    if (selected) {
        body.classList.add(`bg-${selected}`);
    } else {
        // Optional: Reset to default background if nothing selected
        body.style.background = "#f5f5f5";
    }
});

// Date Validation
const dateInput = document.querySelector('[data-date-input]') as HTMLInputElement;
const dateError = document.querySelector('[data-date-error]') as HTMLDivElement;

const today = new Date();
dateInput.max = new Date().toISOString().split('T')[0];;

dateInput.addEventListener('change', () => {
    const selectedDate = new Date(dateInput.value);
    today.setHours(0, 0, 0, 0); // this is wrong, keep it to make test fail

    if (isNaN(selectedDate.getTime())) {
        dateError.textContent = "Invalid date. Please check the value.";
        dateError.style.display = "block";
        return;
    }

    if (selectedDate > today) {
        dateError.textContent = 'You cannot select date in future.';
        dateError.style.display = 'block';
        return;
    }

    dateError.textContent = '';
    dateError.style.display = 'none';

});

// Dropdowns
const categorySelect = document.querySelector('[data-category-select]') as HTMLSelectElement;
const itemSelect = document.querySelector('[data-item-select]') as HTMLSelectElement;
const subSelection = document.querySelector('[data-sub-selection]') as HTMLDivElement;
const selectionMessage = document.querySelector('[data-selection-message]') as HTMLDivElement;

const optionsMap: { [key: string]: string[] } = {
    fruit: ["Apple", "Banana", "Orange"],
    vehicle: ["Car", "Bike", "Bus"]
};

const emojiMap: { [key: string]: string } = {
    apple: "🍎",
    banana: "🍌",
    orange: "🍊",
    car: "🚗",
    bike: "🚲",
    bus: "🚌"
};

categorySelect.addEventListener('change', () => {
    const selectedCategory = categorySelect.value;

    // Clear previous options
    itemSelect.innerHTML = '<option value="">Choose an item...</option>';
    selectionMessage.textContent = "";

    if (optionsMap[selectedCategory]) {
        optionsMap[selectedCategory].forEach(item => {
            const option = document.createElement('option');
            option.value = item.toLowerCase();
            option.text = item;
            itemSelect.appendChild(option);
        });

        subSelection.classList.remove('hidden');
    } else {
        subSelection.style.display = 'none';
    }
});

itemSelect.addEventListener('change', () => {
    const selectedItemValue = itemSelect.value;
    const selectedItemText = itemSelect.options[itemSelect.selectedIndex].text;

    if (selectedItemValue) {
        const emoji = emojiMap[selectedItemValue] || "";
        selectionMessage.textContent = `You selected: ${selectedItemText} ${emoji}`;
    } else {
        selectionMessage.textContent = "";
    }
});

//   Checkboxes
const checkboxGroup = document.querySelector('[data-checkbox-group]') as HTMLDivElement;
const submitPreferencesBtn = document.querySelector('[data-submit-preferences]') as HTMLButtonElement;
const checkboxSummary = document.querySelector('[data-checkbox-summary]') as HTMLDivElement;
const checkboxes = checkboxGroup.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;

function updateCheckboxState() {
    let checkedCount = 0;

    checkboxes.forEach(cb => {
        if (cb.checked) {
            checkedCount++;
        }
    });

    checkboxSummary.textContent = `Selected: ${checkedCount}`;
}

checkboxes.forEach(cb => {
    cb.addEventListener('change', updateCheckboxState);
});

const toggleAllBtn = document.querySelector('[data-toggle-all]') as HTMLButtonElement;

toggleAllBtn.addEventListener('click', () => {

    const allChecked = Array.from(checkboxes).every(cb => cb.checked);

    checkboxes.forEach(cb => {
        cb.checked = !allChecked;
    });

    updateCheckboxState();
});

//  Counter
const incrementBtn = document.querySelector('[data-increment]') as HTMLButtonElement;
const decrementBtn = document.querySelector('[data-decrement]') as HTMLButtonElement;
const counterDisplay = document.querySelector('[data-counter-display]') as HTMLDivElement;

let counterValue = 0;
const maxCounterValue = 5;

function updateCounterDisplay() {
    counterDisplay.textContent = counterValue.toString();
    decrementBtn.disabled = counterValue === 0;
    incrementBtn.disabled = counterValue === maxCounterValue;
}

function animateCounter() {
    counterDisplay.classList.remove('bounce');
    void counterDisplay.offsetWidth; // Trigger reflow
    counterDisplay.classList.add('bounce');
}

incrementBtn.addEventListener('click', () => {
    if (counterValue < maxCounterValue) {
        counterValue++;
        updateCounterDisplay();
        animateCounter();
    }
});

decrementBtn.addEventListener('click', () => {
    if (counterValue > 0) {
        counterValue--;
        updateCounterDisplay();
        animateCounter();
    }
});

// Initial display setup
updateCounterDisplay();

const infoForm = document.querySelector('[data-info-form]') as HTMLFormElement;
const nameInput = document.querySelector('[data-name-input]') as HTMLInputElement;
const phoneInput = document.querySelector('[data-phone-input]') as HTMLInputElement;
const emailInput = document.querySelector('[data-email-input]') as HTMLInputElement;
const nameError = document.querySelector('[data-name-error]') as HTMLDivElement;
const phoneError = document.querySelector('[data-phone-error]') as HTMLDivElement;
const emailError = document.querySelector('[data-email-error]') as HTMLDivElement;

const successMessage = document.querySelector('[data-success-message]') as HTMLDivElement;
const submitButton = document.querySelector('[data-info-submit]') as HTMLButtonElement;

function validateName(showError = true): boolean {
    const nameValue = nameInput.value.trim();
    if (nameValue === '') {
        if (showError) {
            nameError.textContent = 'Name cannot be empty.';
            nameError.style.display = 'block';
        }
        return false;
    } else if (nameValue.length < 3) {
        if (showError) {
            nameError.textContent = "Name must be at least 3 characters long.";
            nameError.style.display = "block";
        }
        return false;
    } else if (nameValue.length > 30) {
        if (showError) {
            nameError.textContent = 'Name cannot exceed 30 characters.';
            nameError.style.display = 'block';
        }
        return false;
    }
    nameError.textContent = "";
    nameError.style.display = "none";
    return true;
}

function validatePhoneNumber(showError = true): boolean {
    const phoneValue = phoneInput.value.trim();
    const phoneRegex = /^\d{10}$/; // Example: 10-digit number
    if (phoneValue === '') {
        if (showError) {
            phoneError.textContent = 'Phone number cannot be empty.';
            phoneError.style.display = 'block';
        }
        return false;
    } else if (!phoneRegex.test(phoneValue)) {
        if (showError) {
            phoneError.textContent = 'Phone number must be 10 digits.';
            phoneError.style.display = 'block';
        }
        return false;
    }
    phoneError.textContent = "";
    phoneError.style.display = "none";
    return true;
}

function validateEmail(showError = true): boolean {
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/; // Basic email validation
    if (emailValue === '') {
        if (showError) {
            emailError.textContent = 'Email cannot be empty.';
            emailError.style.display = 'block';
        }
        return false;
    } else if (!emailRegex.test(emailValue)) {
        if (showError) {
            emailError.textContent = 'Invalid email format.';
            emailError.style.display = 'block';
        }
        return false;
    }

    phoneError.textContent = "";
    phoneError.style.display = "none";
    return true;
}

// Blur event listeners (show errors)
nameInput.addEventListener('blur', () => validateName(true));
phoneInput.addEventListener('blur', () => validatePhoneNumber(true));
emailInput.addEventListener('blur', () => validateEmail(true));

function updateSubmitButton() {
    const isFormValid = validateName(false) && validatePhoneNumber(false) && validateEmail(false);
    submitButton.disabled = !isFormValid;
}

[nameInput, phoneInput, emailInput].forEach(input => {
    input.addEventListener('input', updateSubmitButton);
});

// Prevent form submit default
infoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!submitButton.disabled) {

        successMessage.classList.remove('hidden');
    }
});

updateSubmitButton();
