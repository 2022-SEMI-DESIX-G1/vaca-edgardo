// Función del palindromo. Se envía (cadena y el exponente o la base)
function isPalindrome(cad, exp) {

    // Creación y asignación de cadenas a comparar
    var v1 = 0;
    var v2 = cad;

    // La cadena por lo menos debe tener un carácter
    while (cad > 0) {
        v1 = v1 * exp + cad % exp;
        cad = cad / exp | 0;
    }
    // Verifica si la cadena es un palindromo, es decir si de adelante para atrás es igual es porque lo es.
    return v1 === v2;
}

// Se retorna a ver si es base 2 o 10 el palindromo.
var isBaseTwoPalindrome = (t) => {
    parseInt(t);
    return isPalindrome(t, 2) && isPalindrome(t, 10);
}