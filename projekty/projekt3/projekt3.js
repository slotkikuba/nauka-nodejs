const fs = require("node:fs/promises");
const rl = require("readline-sync");
const path = require("node:path");

let transakcje = [];
const filePath = path.join(__dirname, 'transakcje.json');

async function dodajNowa() {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        transakcje = JSON.parse(data);
    } catch (error) {
        transakcje = [];
    }

    let kategoria = rl.question("Podaj nazwe kategorii: ");
    let kwota = parseFloat(rl.question("Podaj kwote: "));
    let opis = rl.question("Podaj opis: ");

    let transakcja = { kategoria, kwota, opis };
    transakcje.push(transakcja);

    await fs.writeFile(filePath, JSON.stringify(transakcje, null, 2), "utf-8");
    console.log("Transakcja została dodana pomyślnie!\n");
}

async function wyswietlTransakcje() {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        const transakcje = JSON.parse(data);
        if(transakcje.length == 0) {
            console.log("W bazie nie ma żadnych transakcji...");
            return;
        }

        console.table(transakcje);
    } catch (error) {
        console.log("brak pliku lub jest pusty");
        transakcje = [];
    }
    
}

async function menu() {

    let dziala = true;

    while(dziala) {
        console.log("Witaj w programie do zarządzania finansami!!");
        console.log("Wciśnij 1 aby wyświetlić historie transakcji: ");
        console.log("Wciśnij 2 aby dodać transakcje: ");
        console.log("Wciśnij 3 aby wyjść: ");
        const input = rl.question("Wybierz opcje: ");


        switch (input) {
            case "1":
                await wyswietlTransakcje();
                break;
        
            case "2":
                await dodajNowa();
                break;
            case "3":
                dziala = false;
        }
    }
}


menu();

