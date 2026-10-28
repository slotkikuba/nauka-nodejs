# `async.js` — notatka

## Czym są `async` i `await`?

`async` i `await` ułatwiają pracę z kodem asynchronicznym w JavaScript. Pozwalają zapisywać kod korzystający z obietnic (`Promise`) w sposób przypominający kod wykonywany po kolei.

## Jak działa `Promise`?

`Promise` reprezentuje operację, która zakończy się w przyszłości. Może zostać:

- spełniona przez `resolve(...)`,
- odrzucona przez `reject(...)`.

Przykładowa obietnica może wyglądać tak:

```js
const uzytkownik = new Promise((resolve, reject) => {
	setTimeout(() => {
		if (id > 0) {
			resolve({ id: id, imie: 'Kuba' });
		} else {
			reject('Jest blad');
		}
	}, 2000);
});
```

W tym przykładzie `setTimeout` opóźnia zakończenie obietnicy o 2 sekundy. Jeśli `id` jest większe od zera, obietnica zwraca obiekt użytkownika. W przeciwnym razie kończy się błędem.

## Funkcja `async`

Funkcja oznaczona słowem `async` może używać `await`:

```js
async function pobierzUzytkownika(id) {
	// kod asynchroniczny
}
```

Funkcja `async` zawsze zwraca obietnicę, nawet jeśli w jej środku zwracamy zwykłą wartość.

## Słowo `await`

`await` czeka na zakończenie obietnicy i pozwala odebrać jej wynik:

```js
const wynik = await uzytkownik;
```

Jeśli obietnica zostanie spełniona, jej wynik trafi do zmiennej `wynik`. W tym przykładzie będzie to:

```js
{ id: 5, imie: 'Kuba' }
```

`await` można stosować wewnątrz funkcji oznaczonej jako `async`.

## Obsługa błędów przez `try...catch`

Kod oczekujący na wynik obietnicy umieszczamy w bloku `try`:

```js
try {
	const wynik = await uzytkownik;
	console.log('Sukces!', wynik);
} catch (blad) {
	console.log('Błąd', blad);
}
```

- **try** — wykonuje kod, który może zakończyć się błędem,
- **catch** — przechwytuje błąd odrzuconej obietnicy,
- **blad** — zawiera wartość przekazaną do `reject(...)`.

## Przykład — pobieranie użytkownika

```js
async function pobierzUzytkownika(id) {
	const uzytkownik = new Promise((resolve, reject) => {
		setTimeout(() => {
			if (id > 0) {
				resolve({ id: id, imie: 'Kuba' });
			} else {
				reject('Jest blad');
			}
		}, 2000);
	});

	try {
		const wynik = await uzytkownik;
		console.log('Sukces!', wynik);
	} catch (blad) {
		console.log('Błąd', blad);
	}
}

pobierzUzytkownika(5);
```

Po wywołaniu `pobierzUzytkownika(5)`:

1. tworzona jest obietnica,
2. program czeka 2 sekundy,
3. ponieważ `5 > 0`, wywoływane jest `resolve(...)`,
4. obiekt użytkownika trafia do zmiennej `wynik`,
5. w konsoli pojawia się komunikat sukcesu.

Gdyby funkcja została wywołana z `0` lub liczbą ujemną, zostałoby wywołane `reject(...)`, a błąd zostałby obsłużony w bloku `catch`.

## Najważniejsze informacje

- `async` oznacza funkcję asynchroniczną i pozwala używać w niej `await`.
- `await` czeka na wynik obietnicy, ale nie blokuje całego programu.
- Kod po `await` wykona się dopiero po zakończeniu obietnicy.
- Błędy obietnic warto obsługiwać za pomocą `try...catch`.
- W większych aplikacjach lepiej odrzucać obietnicę obiektem `Error`, np. `reject(new Error('Nieprawidłowe ID'))`, zamiast zwykłym tekstem.
