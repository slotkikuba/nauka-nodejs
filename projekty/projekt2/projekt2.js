const readline = require('node:readline/promises');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function pobierzTransakcje() {
    let dane = [];

    for (let i = 0; i < 3; i++) {
        let kategoria = await rl.question("Podaj nazwe kategorii: ");
        let kwota = parseFloat(await rl.question("Podaj kwote: "));
        let opis = await rl.question("Podaj opis: ");
        let transakcja = {
            kategoria,
            kwota,
            opis,
        };

        dane.push(transakcja);
    }
    
    rl.close()
    return new Promise((resolve, reject) => {
        let czyTransakcjaSieUdala = true;
        setTimeout(() => {
            if(czyTransakcjaSieUdala) {
                resolve(dane)
            }
            else {
                reject("jest blad");
            }
        }, 1500);
    });
}

async function uruchom() {
    try {
        const wynik = await pobierzTransakcje();
        const podsumowanie = wynik.reduce((acc, curr) => {
         if(!acc[curr.kategoria]) {
            acc[curr.kategoria] = 0;
        }   

        acc[curr.kategoria] += curr.kwota;

        return acc

        }, {});

        console.table(podsumowanie);
    }
    catch (blad) {
        console.log(blad)
    }
}

uruchom()