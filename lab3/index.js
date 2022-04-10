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


// Función que retorna cantidad de caractéres de una cadena

function checkTheString(strin){

var counts = {};

// Declaración de variables
var ch, i, len, count;

// Loop dependiendo la cantidad de string
for (i = 0, len = strin.length; i < len; ++i) {
    // obtener los caracteres 
    ch = strin.charAt(i); 
    count = counts[ch];
    counts[ch] = count ? count + 1 : 1;       
}
    for (ch in counts) {
        alert(ch + " count: " + counts[ch]);
    }
}

// Mensaje que le indica al usuario la cadena a colocar
const string = prompt('Coloque su cadena: ');

// Llama a la función mandando el número
const value_string = checkTheString(string);

console.log(value_string);