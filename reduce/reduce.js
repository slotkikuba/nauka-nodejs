const transakcje = [
    { kategoria: "jedzenie", kwota: 35 },
    { kategoria: "siłownia", kwota: 135 },
    { kategoria: "jedzenie", kwota: 15 },
    { kategoria: "paliwo", kwota: 100 },
    { kategoria: "jedzenie", kwota: 20 }
];

function podsumujWydatki(lista) {
    // Grupuje transakcje według kategorii i sumuje ich kwoty.
    return lista.reduce((acc, curr) => {
        if (!acc[curr.kategoria]) {
            acc[curr.kategoria] = 0; // Tworzy kategorię, jeśli pojawia się po raz pierwszy.
        }

        acc[curr.kategoria] += curr.kwota; // Dodaje kwotę do sumy danej kategorii.

        return acc
    }, {});
}

const wynik = podsumujWydatki(transakcje);

console.log(wynik)

