const passwordDisplay = document.getElementById('password');
const rangeInput = document.getElementById('charRange');
const rangeValueDisplay = document.getElementById('num');
const generateButton = document.getElementById('generate');
const strengthDivs = document.querySelectorAll('#strength_list .strength');
const strengthText = document.getElementById('strength'); // Az erősség megjelenítésére szolgáló elem

// Frissítjük a csúszka melletti számot, amikor a csúszka értéke változik
rangeInput.addEventListener('input', function () {
    rangeValueDisplay.textContent = rangeInput.value;
});

// Véletlenszerű jelszó generálása
function generatePassword(length, options) {
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    let characters = '';
    if (options.uppercase) characters += uppercaseLetters;
    if (options.lowercase) characters += lowercaseLetters;
    if (options.numbers) characters += numbers;
    if (options.symbols) characters += symbols;
    
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

// Jelszó erősségének kiszámítása
function calculateStrength(length, options) {
    let strength = 0;

    // Minden bekapcsolt opció 5 pontot ad hozzá az erősséghez
    if (options.uppercase) strength += 5;
    if (options.lowercase) strength += 5;
    if (options.numbers) strength += 5;
    if (options.symbols) strength += 5;

    // Jelszó hosszának hatása
    if (length < 5) {
        strength += 0; // 0 pont
    } else if (length < 10) {
        strength += 10; // Gyenge
    } else if (length < 15) {
        strength += 20; // Közepes
    } else if (length < 20) {
        strength += 30; // Erős
    } else {
        strength += 40; // Nagyon erős
    }

    return strength;
}

// Jelszó erősségének beállítása
function setPasswordStrength(strength) {
    // Alapértelmezés: eltávolítjuk az összes színt
    strengthDivs.forEach(div => {
        div.style.backgroundColor = 'transparent'; // Alaphelyzetben áttetsző
    });

    // Erősség szintjének vizuális megjelenítése
    if (strength <= 10) {
        strengthDivs[0].style.backgroundColor = 'red'; // Gyenge
    } else if (strength <= 20) {
        strengthDivs[0].style.backgroundColor = 'orange'; // Közepes
        strengthDivs[1].style.backgroundColor = 'orange';
    } else if (strength <= 30) {
        strengthDivs[0].style.backgroundColor = 'green'; // Erős
        strengthDivs[1].style.backgroundColor = 'green';
        strengthDivs[2].style.backgroundColor = 'green';
    } else {
        strengthDivs.forEach(div => {
            div.style.backgroundColor = 'white'; // Nagyon erős
        });
    }
}

// Jelszó generálás eseménykezelő
generateButton.addEventListener('click', function () {
    const length = parseInt(rangeInput.value);
    const options = {
        uppercase: document.getElementById('uppercase').checked,
        lowercase: document.getElementById('lowercase').checked,
        numbers: document.getElementById('numbers').checked,
        symbols: document.getElementById('symbols').checked
    };
    
    const newPassword = generatePassword(length, options);
    passwordDisplay.textContent = newPassword;
    
    // Jelszó erősségének frissítése
    const strength = calculateStrength(length, options);
    setPasswordStrength(strength);
});
