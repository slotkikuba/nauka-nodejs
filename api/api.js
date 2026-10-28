async function pobierzZart() {
    try {

        const odpowiedz = await fetch("https://api.chucknorris.io/jokes/random");
        const dane = await odpowiedz.json();

        return dane.value;

    }
    catch (blad) {
        console.log("cos sie zjebalo", blad)
    }
}

const wynik = await pobierzZart();
console.log(wynik);