# `projekt2.js` — notatka

## Czym zajmuje się projekt?

Program pobiera od użytkownika trzy transakcje za pomocą konsoli, a następnie grupuje je według kategorii i sumuje kwoty.

W przykładzie wykorzystano:

- moduł `readline/promises` do pobierania danych z konsoli,
- `async` i `await` do obsługi operacji asynchronicznych,
- `Promise` do zwrócenia pobranych danych,
- `setTimeout()` do zasymulowania opóźnienia,
- `try...catch` do obsługi błędów,
- `reduce()` do zsumowania transakcji według kategorii,
- `console.table()` do czytelnego wyświetlenia wyniku.

## Moduł `readline/promises`

```js
const readline = require('node:readline/promises');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
```

Moduł `readline/promises` pozwala zadawać pytania użytkownikowi w terminalu. Metoda `rl.question()` zwraca obietnicę, dlatego można pobierać odpowiedzi za pomocą `await`.

- `process.stdin` — odbiera dane wpisywane przez użytkownika,
- `process.stdout` — wyświetla pytania i komunikaty w konsoli,
- `rl` — interfejs służący do komunikacji z terminalem.

## Funkcja `pobierzTransakcje()`

```js
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

	rl.close();
	// ...
}
```

Funkcja jest oznaczona słowem `async`, ponieważ korzysta z `await`. Pętla `for` wykonuje się trzy razy, więc użytkownik wprowadza dane dla trzech transakcji.

Każda transakcja zawiera:

- `kategoria` — nazwę kategorii,
- `kwota` — kwotę przekonwertowaną z tekstu na liczbę za pomocą `parseFloat()`,
- `opis` — opis transakcji.

Następnie obiekt transakcji jest dodawany do tablicy `dane` za pomocą `push()`.

## Konwersja kwoty przez `parseFloat()`

Odpowiedź pobrana przez `rl.question()` jest tekstem. Aby można było dodawać kwoty, jest ona zamieniana na liczbę:

```js
let kwota = parseFloat(await rl.question("Podaj kwote: "));
```

Na przykład tekst `"25.50"` zostanie zamieniony na liczbę `25.5`. Dzięki temu kwota może zostać poprawnie dodana podczas tworzenia podsumowania.

## Zamykanie interfejsu

```js
rl.close();
```

Po pobraniu trzech transakcji interfejs `readline` zostaje zamknięty. Program nie oczekuje wtedy na kolejne dane z konsoli.

## Zwracanie danych przez `Promise`

Po zamknięciu interfejsu funkcja zwraca obietnicę:

```js
return new Promise((resolve, reject) => {
	let czyTransakcjaSieUdala = true;

	setTimeout(() => {
		if (czyTransakcjaSieUdala) {
			resolve(dane);
		} else {
			reject("jest blad");
		}
	}, 1500);
});
```

`setTimeout()` opóźnia zwrócenie danych o 1,5 sekundy. W tym czasie program symuluje asynchroniczne pobieranie lub zapisywanie transakcji.

- `resolve(dane)` — kończy obietnicę sukcesem i zwraca tablicę transakcji,
- `reject("jest blad")` — kończy obietnicę błędem,
- `czyTransakcjaSieUdala` — określa, czy operacja ma zakończyć się powodzeniem.

W obecnej wersji zmienna `czyTransakcjaSieUdala` ma zawsze wartość `true`, dlatego wykonywana jest gałąź `resolve(dane)`.

## Funkcja `uruchom()`

```js
async function uruchom() {
	try {
		const wynik = await pobierzTransakcje();
		// dalsze przetwarzanie danych
	} catch (blad) {
		console.log(blad);
	}
}
```

Funkcja `uruchom()` również jest asynchroniczna. Instrukcja `await pobierzTransakcje()` czeka na:

1. wprowadzenie przez użytkownika trzech transakcji,
2. zamknięcie interfejsu `readline`,
3. zakończenie opóźnienia wynoszącego 1,5 sekundy.

Jeśli obietnica zostanie odrzucona, błąd zostanie przechwycony przez blok `catch` i wyświetlony w konsoli.

## Grupowanie transakcji przez `reduce()`

```js
const podsumowanie = wynik.reduce((acc, curr) => {
	if (!acc[curr.kategoria]) {
		acc[curr.kategoria] = 0;
	}

	acc[curr.kategoria] += curr.kwota;

	return acc;
}, {});
```

- `acc` — akumulator przechowujący sumy kategorii,
- `curr` — aktualnie przetwarzana transakcja,
- `curr.kategoria` — kategoria aktualnej transakcji,
- `curr.kwota` — kwota aktualnej transakcji,
- `{}` — początkowo pusty obiekt akumulatora.

Jeśli kategoria pojawia się pierwszy raz, otrzymuje wartość początkową `0`. Następnie kwota transakcji zostaje dodana do sumy tej kategorii.

## Przykład działania `reduce()`

Jeśli użytkownik poda:

```js
[
	{ kategoria: 'jedzenie', kwota: 35, opis: 'obiad' },
	{ kategoria: 'paliwo', kwota: 100, opis: 'tankowanie' },
	{ kategoria: 'jedzenie', kwota: 20, opis: 'zakupy' }
]
```

Podsumowanie będzie wyglądać następująco:

```js
{
	jedzenie: 55,
	paliwo: 100
}
```

Opis transakcji jest przechowywany w obiektach, ale nie jest używany podczas grupowania. Do obliczeń wykorzystywane są tylko `kategoria` i `kwota`.

## Wyświetlanie tabeli

```js
console.table(podsumowanie);
```

`console.table()` wyświetla obiekt w formie tabeli w konsoli. Każdy wiersz odpowiada jednej kategorii, a obok kategorii znajduje się suma jej kwot.

## Pełny przebieg programu

```js
async function uruchom() {
	try {
		const wynik = await pobierzTransakcje();
		const podsumowanie = wynik.reduce((acc, curr) => {
			if (!acc[curr.kategoria]) {
				acc[curr.kategoria] = 0;
			}

			acc[curr.kategoria] += curr.kwota;

			return acc;
		}, {});

		console.table(podsumowanie);
	} catch (blad) {
		console.log(blad);
	}
}

uruchom();
```

Po wywołaniu `uruchom()`:

1. tworzony jest interfejs do komunikacji z konsolą,
2. użytkownik podaje kategorię, kwotę i opis pierwszej transakcji,
3. te same dane są pobierane jeszcze dla dwóch kolejnych transakcji,
4. interfejs `readline` zostaje zamknięty,
5. program czeka 1,5 sekundy na zakończenie obietnicy,
6. `reduce()` grupuje transakcje i sumuje kwoty według kategorii,
7. `console.table()` wyświetla podsumowanie,
8. ewentualny błąd zostaje obsłużony przez `catch`.

## Najważniejsze informacje

- `readline/promises` umożliwia asynchroniczne pobieranie danych z terminala.
- `rl.question()` zwraca obietnicę z odpowiedzią użytkownika.
- `parseFloat()` zamienia tekstową kwotę na liczbę.
- `async` i `await` ułatwiają pracę z kodem asynchronicznym.
- `Promise` może zakończyć operację przez `resolve()` albo `reject()`.
- `setTimeout()` symuluje opóźnienie operacji asynchronicznej.
- `reduce()` buduje obiekt zawierający sumy dla poszczególnych kategorii.
- `console.table()` prezentuje wynik w czytelnej formie tabeli.