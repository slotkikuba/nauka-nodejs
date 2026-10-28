# `api.js` — notatka

## Czym jest API?

API (Application Programming Interface) to sposób komunikacji pomiędzy różnymi programami. Dzięki API aplikacja może wysłać żądanie do zewnętrznego serwera i otrzymać od niego dane.

W tym przykładzie program korzysta z publicznego API Chuck Norris Jokes:

```text
https://api.chucknorris.io/jokes/random
```

Adres ten zwraca losowy żart w formacie JSON.

## Funkcja `fetch()`

Do wysłania żądania HTTP służy funkcja `fetch()`:

```js
const odpowiedz = await fetch("https://api.chucknorris.io/jokes/random");
```

`fetch()` zwraca obietnicę (`Promise`). Dlatego trzeba użyć `await`, aby zaczekać na odpowiedź serwera.

Po zakończeniu żądania zmienna `odpowiedz` zawiera obiekt odpowiedzi HTTP. Nie są to jeszcze właściwe dane żartu, tylko informacje o odpowiedzi, takie jak jej status i nagłówki.

## Odczytywanie danych JSON

Odpowiedź serwera trzeba zamienić na obiekt JavaScript:

```js
const dane = await odpowiedz.json();
```

Metoda `json()` również zwraca obietnicę, dlatego także poprzedzamy ją słowem `await`.

Po wykonaniu tej instrukcji zmienna `dane` zawiera obiekt podobny do tego:

```js
{
	"categories": [],
	"created_at": "2020-01-05 13:42:19.576875",
	"icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
	"id": "abc123",
	"updated_at": "2020-01-05 13:42:19.576875",
	"url": "https://api.chucknorris.io/jokes/abc123",
	"value": "Chuck Norris can divide by zero."
}
```

Interesujący nas tekst znajduje się we właściwości `value`, dlatego funkcja zwraca:

```js
return dane.value;
```

## Funkcja `pobierzZart()`

Całe pobieranie żartu zostało umieszczone w funkcji asynchronicznej:

```js
async function pobierzZart() {
	try {
		const odpowiedz = await fetch(
			"https://api.chucknorris.io/jokes/random"
		);
		const dane = await odpowiedz.json();

		return dane.value;
	} catch (blad) {
		console.log("cos sie zjebalo", blad);
	}
}
```

Słowo `async` oznacza, że funkcja działa asynchronicznie i zawsze zwraca obietnicę. Instrukcja `await fetch(...)` zatrzymuje wykonywanie tej funkcji do czasu otrzymania odpowiedzi, ale nie blokuje całego programu.

Następnie `await odpowiedz.json()` odczytuje i parsuje treść odpowiedzi. Po zakończeniu funkcja zwraca sam tekst żartu, a nie cały obiekt JSON.

## Obsługa błędów przez `try...catch`

Operacje mogące zakończyć się błędem znajdują się w bloku `try`:

```js
try {
	const odpowiedz = await fetch("https://api.chucknorris.io/jokes/random");
	const dane = await odpowiedz.json();
	return dane.value;
} catch (blad) {
	console.log("cos sie zjebalo", blad);
}
```

Blok `catch` przechwytuje między innymi błędy połączenia z serwerem oraz błędy podczas odczytywania niepoprawnego formatu JSON.

Samo `fetch()` nie odrzuca obietnicy dla każdego statusu HTTP, na przykład `404` lub `500`. Jeżeli aplikacja ma traktować takie statusy jako błędy, trzeba sprawdzić `odpowiedz.ok`:

```js
if (!odpowiedz.ok) {
	throw new Error(`Błąd HTTP: ${odpowiedz.status}`);
}
```

## Wywołanie funkcji

Po zdefiniowaniu funkcji program pobiera żart i wyświetla go w konsoli:

```js
const wynik = await pobierzZart();
console.log(wynik);
```

`await` poza funkcją `async` jest możliwe w plikach uruchamianych jako moduły ES (z obsługą top-level `await`). Dzięki temu nie trzeba tworzyć dodatkowej funkcji tylko po to, aby oczekiwać na wynik `pobierzZart()`.

## Pełny przebieg programu

```js
async function pobierzZart() {
	try {
		const odpowiedz = await fetch(
			"https://api.chucknorris.io/jokes/random"
		);
		const dane = await odpowiedz.json();

		return dane.value;
	} catch (blad) {
		console.log("cos sie zjebalo", blad);
	}
}

const wynik = await pobierzZart();
console.log(wynik);
```

Po uruchomieniu programu:

1. wywoływana jest funkcja `pobierzZart()`,
2. `fetch()` wysyła żądanie do zewnętrznego API,
3. `await` czeka na odpowiedź serwera,
4. `response.json()` odczytuje dane w formacie JSON,
5. funkcja zwraca wartość z właściwości `value`,
6. żart zostaje zapisany w zmiennej `wynik`,
7. `console.log()` wyświetla żart w konsoli.

Jeżeli pobieranie lub odczytywanie danych zakończy się błędem, wykonany zostanie blok `catch`.

## Najważniejsze informacje

- API pozwala komunikować się z zewnętrznym serwerem i pobierać z niego dane.
- `fetch()` wysyła żądanie HTTP i zwraca obietnicę z odpowiedzią serwera.
- `response.json()` zamienia dane JSON na obiekt JavaScript.
- `async` pozwala używać `await` wewnątrz funkcji.
- `await` czeka na zakończenie operacji asynchronicznej.
- `try...catch` służy do obsługi błędów połączenia i przetwarzania danych.
- `fetch()` nie uznaje automatycznie statusów HTTP `4xx` i `5xx` za błędy — w razie potrzeby trzeba sprawdzić `response.ok`.