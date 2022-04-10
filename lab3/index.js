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
        alert(ch + ": " + counts[ch]);
    }
}

// Mensaje que le indica al usuario la cadena a colocar
const string = prompt('Coloque su cadena: ');

// Llama a la función mandando el número
const value_string = checkTheString(string);

console.log(value_string);


// Verifica si un año es bisiesto o no
function isLeapYear() {
    var year= document.getElementById("year").value;
      
    document.getElementById("verify").innerHTML 
        = (year % 100 === 0) ? (year % 400 === 0)
                             : (year % 4 === 0);
}

// Retornar el total de la suma de los números primos, en base al número dado por el usuario.

function isPrime(value){

    // Verificar si un número es primo
    for(var i=2; i < value; i++){
      if(value % i === 0){
        return false;
      }
    }
    return true;
  }


  // Función para sumar los números primos
  function sumPrimes(num) {
    var ans = 0;
  
    // Loop 

    for(var i=2; i <= num; i++){   
  
      // Sumar solo números primos
      if(isPrime(i)){
        ans += i;
      }
      var anst = ans + 1;
    }
    return alert('Dado el número ' + num + ', el total es: ' + anst);
  }

  // Mensaje que le indica al usuario número a colocar
const nump = prompt('Coloque su número a verificar: ');

// Llama a la función mandando el número
const val = sumPrimes(nump);

console.log(val);