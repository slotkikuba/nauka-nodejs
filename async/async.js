
// // tworzymy obietnice
// const zamowieniePizzy = new Promise((resolve, reject) => {
//     let czyPizzaSieUdala = true;
//     setTimeout(() => {
//         if(czyPizzaSieUdala) {
//             resolve("oto twoja pizza");
//         }
//         else {
//             reject("Spalilismy ci pizze wariat");
//         }
//     }, 2000);
// })

// async function czekajNaPizze() {
//     try {
//         const wynik = await zamowieniePizzy;
//         console.log("Sukces!", wynik)
//     }
//     catch (blad) {
//         console.log("Błąd: ", blad);
//     }
// }

// czekajNaPizze();

async function pobierzUzytkownika(id) {
    const uzytkownik = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({id: id, imie: "Kuba"});
            }
            else {
                reject("Jest blad");
            }
            
        }, 2000);
    });

    try {
        const wynik = await uzytkownik;
        console.log("Sukces!", wynik)
    }
    catch (blad) {
        console.log("Błąd", blad);
    }

}

pobierzUzytkownika(-5)

