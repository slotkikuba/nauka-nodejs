function pobierzTransakcje() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
           const transakcje = [
                { kategoria: "jedzenie", kwota: 35 },
                { kategoria: "siłownia", kwota: 135 },
                { kategoria: "jedzenie", kwota: 15 },
                { kategoria: "paliwo", kwota: 100 },
                { kategoria: "jedzenie", kwota: 20 }
           ];

           if(transakcje !== null) {
                resolve(transakcje)
           }
           else {
            reject("Tablica jest pusta")
           }

        }, 2000);
    });
}

async function uruchom() {
    try {
        const tablicaTransakcji = await pobierzTransakcje();    
        const wynik = tablicaTransakcji.reduce((acc, curr) => {
            if (!acc[curr.kategoria]) {
                acc[curr.kategoria] = 0;
            }

            acc[curr.kategoria] += curr.kwota

            return acc

        }, {});

        console.log(wynik);
    }
    catch (blad) {
        console.log("cos jest nie tak: ", blad);
    }
}

uruchom();
