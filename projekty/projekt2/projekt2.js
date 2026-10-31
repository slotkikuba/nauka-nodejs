const fs = require('node:fs/promises');
const path = require("node:path");

const filePath = path.join(__dirname, 'transakcje.json');

async function pobierzTransakcje() {


    const file = await fs.readFile(filePath, 'utf-8');
    const transakcje = JSON.parse(file);
    
    return new Promise((resolve, reject) => {
        let czyTransakcjaSieUdala = true;
        setTimeout(() => {
            if(czyTransakcjaSieUdala) {
                resolve(transakcje)
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