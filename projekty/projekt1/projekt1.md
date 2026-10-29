# `projekt1.js` — notatka

## Czym zajmuje się projekt?

Program pobiera listę transakcji w sposób asynchroniczny, a następnie grupuje je według kategorii i sumuje kwoty.

W przykładzie wykorzystano:

- `Promise` do symulowania pobierania danych,
- `setTimeout()` do opóźnienia odpowiedzi,
- `async` i `await` do obsługi kodu asynchronicznego,
- `try...catch` do obsługi błędów,
- `reduce()` do zsumowania transakcji według kategorii.

## Jak działa funkcja `pobierzTransakcje()`?

Funkcja zwraca obietnicę:

```js
function pobierzTransakcje() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const transakcje = [
				{ kategoria: 'jedzenie', kwota: 35 },
				{ kategoria: 'siłownia', kwota: 135 },
				{ kategoria: 'jedzenie', kwota: 15 },
				{ kategoria: 'paliwo', kwota: 100 },
				{ kategoria: 'jedzenie', kwota: 20 }
			];

			if (transakcje !== null) {
				resolve(transakcje);
			} else {
				reject('Tablica jest pusta');
			}
		}, 2000);
	});
}
```

`setTimeout()` opóźnia wykonanie kodu o 2 sekundy. Następnie tworzona jest tablica transakcji.

- **resolve(transakcje)** — zwraca poprawnie pobraną tablicę,
- **reject('Tablica jest pusta')** — kończy obietnicę błędem.

W tym przykładzie warunek sprawdza, czy tablica nie ma wartości `null`.

## Funkcja `async`

Funkcja `uruchom()` została oznaczona słowem `async`, dlatego może korzystać z `await`:

```js
async function uruchom() {
	try {
		const tablicaTransakcji = await pobierzTransakcje();
		// dalsze przetwarzanie danych
	} catch (blad) {
		console.log('cos jest nie tak: ', blad);
	}
}
```

`await pobierzTransakcje()` czeka na zakończenie obietnicy. Po jej spełnieniu pobrana tablica zostaje zapisana w zmiennej `tablicaTransakcji`.

## Grupowanie transakcji przez `reduce()`

Pobrane transakcje są grupowane według kategorii:

```js
const wynik = tablicaTransakcji.reduce((acc, curr) => {
	if (!acc[curr.kategoria]) {
		acc[curr.kategoria] = 0;
	}

	acc[curr.kategoria] += curr.kwota;

	return acc;
}, {});
```

- **acc** — akumulator przechowujący sumy kategorii,
- **curr** — aktualna transakcja,
- **curr.kategoria** — nazwa kategorii aktualnej transakcji,
- **curr.kwota** — kwota aktualnej transakcji,
- **{}** — początkowo pusty obiekt akumulatora.

Jeśli dana kategoria pojawia się pierwszy raz, otrzymuje wartość początkową `0`. Następnie kwota transakcji zostaje dodana do sumy tej kategorii.

## Przykład — podsumowanie transakcji

```js
const transakcje = [
	{ kategoria: 'jedzenie', kwota: 35 },
	{ kategoria: 'siłownia', kwota: 135 },
	{ kategoria: 'jedzenie', kwota: 15 },
	{ kategoria: 'paliwo', kwota: 100 },
	{ kategoria: 'jedzenie', kwota: 20 }
];
```

Po przetworzeniu tablicy funkcja `reduce()` zwróci:

```js
{
	jedzenie: 70,
	siłownia: 135,
	paliwo: 100
}
```

Kategoria `jedzenie` występuje trzy razy, dlatego jej suma wynosi `35 + 15 + 20 = 70`.

## Pełny przebieg programu

```js
async function uruchom() {
	try {
		const tablicaTransakcji = await pobierzTransakcje();
		const wynik = tablicaTransakcji.reduce((acc, curr) => {
			if (!acc[curr.kategoria]) {
				acc[curr.kategoria] = 0;
			}

			acc[curr.kategoria] += curr.kwota;

			return acc;
		}, {});

		console.log(wynik);
	} catch (blad) {
		console.log('cos jest nie tak: ', blad);
	}
}

uruchom();
```

Po wywołaniu `uruchom()`:

1. rozpoczyna się pobieranie transakcji,
2. program czeka 2 sekundy,
3. obietnica zwraca tablicę transakcji,
4. `await` zapisuje tablicę w zmiennej `tablicaTransakcji`,
5. `reduce()` grupuje transakcje i sumuje ich kwoty,
6. wynik zostaje wyświetlony w konsoli.

Jeśli obietnica zostanie odrzucona, błąd zostanie przechwycony przez blok `catch`.

## Najważniejsze informacje

- `Promise` pozwala obsługiwać dane, które będą dostępne w przyszłości.
- `async` pozwala używać `await` wewnątrz funkcji.
- `await` czeka na wynik obietnicy bez blokowania całego programu.
- `try...catch` służy do obsługi błędów w kodzie asynchronicznym.
- `reduce()` może zbudować jeden obiekt zawierający sumy dla poszczególnych kategorii.
- Początkowa wartość `{}` sprawia, że akumulator zaczyna jako pusty obiekt.