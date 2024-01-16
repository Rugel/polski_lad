const Desc = () => { return( <section className='desc'><div>
<strong>Przedstawiony tutaj Kalkulator służy do wyliczenia kwoty wynagrodzenia netto, czyli „na rękę'' dla pracownika, który jest zatrudniony w oparciu o umowę o pracę.
</strong><p>
  To, co odróżnia go od innych kalkulatorów to możliwość uwzględnienia m.in. takich informacji jak: stawka godzinowa, liczba przepracowanych godzin czy liczba dni spędzonych na urlopie.
</p><p>
  Aby Kalkulator prawidłowo obliczył kwotę wynagrodzenia, musi otrzymać prawidłowe dane, które użytkownik wpisze do pól edycyjnych.
</p><p>
  <u><i><b>Jak poprawnie wprowadzić dane?</b></i></u><br />
  — w poz.1 należy wpisać łączną liczbę przepracowanych godzin w danym miesiącu,<br />
  — w poz.2 należy wpisać obecną stawkę godzinową brutto ustaloną dla obliczania wynagrodzenia,<br />
  — w poz.3 podajemy liczbę dni roboczych w danym miesiącu — bez względu na to ile dni pracownik był w pracy (liczba dni minus liczba sobót minus liczba niedziel minus liczba świąt) — domyślnie ustawiona na 21,<br />
  — w poz.4 wpisujemy sumę godzin przepracowanych w soboty, niedziele i święta (służy to obliczeniu dodatkowej kwoty wynikającej z płatności tzw. setek)<br />
  — jeśli korzystaliśmy z urlopu wypoczynkowego, na żądanie czy okolicznościowego wpisujemy ilość dni w poz.5<br />
  — poz.6 służy uwzględnieniu pobytu pracownika na tzw. zwolnieniu lekarskim — wpisujemy liczbę dni, ale tylko tych, które były robocze,<br />
  — poz. 7 ma podobne przeznaczenie — chodzi o pobyt na „zwolnieniu” w dni wolne od pracy,<br />
  — poz.8 i 9 służy do obliczenia średniego wynagrodzenia do celów naliczenia kwot za urlop lub „zwolnienie lekarskie” - jeśli nie korzystałeś z powyższych, możesz nic nie wpisywać <br />
  — w poz.10 wpisujemy sumę kwot brutto ewentualnych dodatków typu premia, mieszkaniówka — jeśli takowych nie ma — pole pozostaje puste.
</p><p>
  Pozatym należy zwrócić uwagę na właściwe zaznaczenie we "stępnych opcjach" pól związanych z tematem braku uczestnictwa w Pracowniczych Planach Kapitałowych, wieku podatnika, pracą poza miejscowością zamieszkania oraz przekroczenia drugiego progu podatkowego.
</p>
<p>Użycie <strong>przelicznika BRUTTO na NETTO</strong> wymaga zaznaczenia odpowiednich pozycji we "wstępnych opcjach" oraz wpisania żądanej do przeliczenia kwoty brutto.</p>
<p>
  Od 1 stycznia 2023 roku obowiązuje nowy wzór <strong>PIT-2</strong>. Formularz ten składa się raz w roku, w celu upoważnienia płatnika (np. pracodawcy, zleceniodawcy) do zmniejszania zaliczki na podatek dochodowy o kwotę zmniejszającą podatek. Najważniejsze zmiany w nowym PIT-2 to:</p>
  <p>- możliwość dzielenia kwoty zmniejszającej podatek między maksymalnie 3 płatników - do tej pory kwota zmniejszająca podatek mogła być stosowana tylko przez jednego płatnika. Nowy PIT-2 pozwala na podzielenie kwoty zmniejszającej podatek między trzech płatników, w tym między pracodawcę, zleceniodawcę i ZUS</p>
  <p>- zawiera wszystkie wnioski i oświadczenia wpływające na ustalenie zaliczki na podatek dochodowy - do tej pory na formularzu PIT-2 składało się tylko oświadczenie o stosowaniu kwoty zmniejszającej podatek wynikającej z kwoty wolnej od podatku.</p>
  <p>Nowy PIT-2 można złożyć w dowolnym momencie roku, jednak najlepiej zrobić to zaraz po podjęciu pracy.<br /><a href="https://www.gov.pl/attachment/7d32c2f6-e428-4824-80fc-bd2f6c07bb0f">PIT-2(9)</a> - link do pobrania formularza PIT-2
</p><p>
  Kalkulator uwzględnia najnowsze przepisy podatkowe i regulacje dotyczące wynagrodzeń. Jeśli potrzebujesz dokładniejszych informacji, zawsze warto skonsultować się z ekspertem finansowym lub działem kadr.
</p><p>
  Kalkulator Wynagrodzeń to z założenia prosty i szybki sposób, abyś mógł się zorientować, ile faktycznie dostaniesz na konto za swoją pracę.</p>
</div></section> )}

export default Desc;