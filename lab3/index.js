// Función que verífica si un número es palíndromo o no
function checkPalindrome(num) {

    // Verífica la longitud del número
    const len = num.length;

    // Uso de loop 
    for (let i = 0; i < len / 2; i++) {

        // Verífica si el primer y el último número son iguales
        if (num[i] !== num[len - 1 - i]) {
            return alert('El número ' + num + ' no es un palíndromo.');
        }
    }
    return alert('El número ' + num + ' es un palíndromo.');
}

// Mensaje que le indica al usuario el número a colocar
const number = prompt('Coloca tu número: ');

// Llama a la función mandando el número
const value = checkPalindrome(number);

console.log(value);