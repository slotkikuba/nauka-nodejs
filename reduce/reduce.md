```markdown
# `reduce.js` — notatka

## Czym jest `reduce()`?

`reduce()` to metoda tablicy w JavaScript, która przetwarza wszystkie elementy tablicy i zwraca jedną końcową wartość. Może to być na przykład suma liczb, iloczyn, pojedynczy obiekt albo nowa tablica.

## Jak działa?

Metoda przyjmuje funkcję zwrotną oraz opcjonalną wartość początkową:

```js
tablica.reduce((akumulator, element, indeks, tablica) => {
	// obliczenia
	return nowaWartoscAkumulatora;
}, wartoscPoczatkowa);
```

- **akumulator** — przechowuje wynik z poprzedniego obrotu pętli,
- **element** — aktualny element tablicy,
- **indeks** — indeks aktualnego elementu,
- **tablica** — tablica, po której iterujemy,
- **wartość początkowa** — początkowa wartość akumulatora.

W każdej iteracji funkcja musi zwrócić nową wartość akumulatora. Po przejściu przez całą tablicę `reduce()` zwraca końcowy akumulator.

## Przykład — suma liczb

```js
const liczby = [1, 2, 3, 4];

const suma = liczby.reduce((akumulator, liczba) => {
	return akumulator + liczba;
}, 0);

console.log(suma); // 10
```

W tym przykładzie akumulator zaczyna od `0`. Do niego kolejno dodawane są liczby: `0 + 1 + 2 + 3 + 4`, dlatego wynik wynosi `10`.

## Przykład — grupowanie elementów

```js
const osoby = [
	{ imie: 'Ania', dzial: 'IT' },
	{ imie: 'Jan', dzial: 'HR' },
	{ imie: 'Ola', dzial: 'IT' }
];

const wedlugDzialu = osoby.reduce((grupy, osoba) => {
	if (!grupy[osoba.dzial]) {
		grupy[osoba.dzial] = [];
	}

	grupy[osoba.dzial].push(osoba);
	return grupy;
}, {});
```

Wynikiem jest obiekt, którego właściwościami są nazwy działów, a wartościami — tablice osób należących do tych działów.

## Najważniejsze informacje

- `reduce()` nie zmienia oryginalnej tablicy, chyba że celowo modyfikujemy jej elementy w funkcji zwrotnej.
- Podanie wartości początkowej jest dobrą praktyką — kod jest wtedy bezpieczniejszy także dla pustej tablicy.
- `reduce()` zastępuje wiele zastosowań pętli `for`, ale powinien być używany wtedy, gdy rzeczywiście budujemy jeden wynik.
- Dla prostych operacji, takich jak samo wyświetlenie elementów lub filtrowanie, czytelniejsze mogą być odpowiednio `forEach()` albo `filter()`.
```
