import React/*, { lazy, Suspense }*/ from 'react';
import './App.css';
import Input from './modules/input';
import Footer from './modules/footer';
import wind from './icons/wind.svg';
import temp from './icons/temperature.svg';
import clouds from './icons/clouds.svg';
import pressure from './icons/pressure.svg';
import summer from './icons/summer.svg';
import vision from './icons/vision.svg';
//import Nasa from './modules/nasa';

//const Nasa = lazy(() => import('./modules/nasa'))

const API_KEY_OW = process.env.REACT_APP_API_KEY_OW;

class App extends React.Component {
  state = {
    hours: 0,
    rate: 0,
    workdays: 21,
    satsun: 0,
    hollydays: 0,
    illnessworkdays: 0,
    illnessweekenddays: 0,
    avaragehours: 168,
    avaragemoney: 3490,
    add: 0,
    isConfirmed: false,
    isConfirmedPpk: false,
    temp: "brak danych",
    wiatr: "brak danych",
    stan: "brak danych",
    cisnienie: "brak danych",
    clouds: "brak danych",
    visibility: "brak danych",
    // icon: "",
    time: "brak danych",
    city: "Warszawa",
    cityOk: "Warszawa",
    country: "PL",
    lat: "",
    lon: "",
    active: false,

  }


  componentDidMount() {



    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&lang=pl&appid=${API_KEY_OW}`)
      .then(response => response.json())
      .then(dane => this.setState({ temp: dane.main.temp, wiatr: dane.wind.speed, stan: dane.weather[0].description, cisnienie: dane.main.pressure, visibility: dane.visibility, clouds: dane.clouds.all, /*icon: dane.weather[0].icon,*/time: new Date(dane.dt * 1000).toLocaleTimeString() })
      )
  }

  componentDidUpdate(prevProps, prevState) {
    const apiWork = dane => this.setState({ cityOk: dane.name, temp: dane.main.temp, wiatr: dane.wind.speed, stan: dane.weather[0].description, cisnienie: dane.main.pressure, visibility: dane.visibility, clouds: dane.clouds.all, /*icon: dane.weather[0].icon, */time: new Date(dane.dt * 1000).toLocaleTimeString(), country: dane.sys.country });

    if (prevState.active !== this.state.active || prevState.lat !== this.state.lat) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&units=metric&lang=pl&appid=${API_KEY_OW}`)
        .then(response => response.json())
        .then(apiWork)
    }
    else if (prevState.city !== this.state.city) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&lang=pl&appid=${API_KEY_OW}`)
        .then(response => response.json())
        .then(apiWork)
    }
  }



  handleChangeGodziny = (e) => { this.setState({ hours: e.target.value }) }

  handleChangeStawka = (e) => { this.setState({ rate: e.target.value }) }

  handleChangeWorkdays = (e) => { if (e.target.value.length > 0) { this.setState({ workdays: e.target.value }) } else { this.setState({ workdays: 21 }) } }

  handleChangeSatsun = (e) => { this.setState({ satsun: e.target.value }) }

  handleChangeUrlop = (e) => { this.setState({ hollydays: e.target.value }) }

  handleChangeCh1 = (e) => { this.setState({ illnessworkdays: e.target.value }) }

  handleChangeCh2 = (e) => { this.setState({ illnessweekenddays: e.target.value }) }

  handleChangeSrGodz = (e) => { if (e.target.value.length > 0) { this.setState({ avaragehours: e.target.value }) } else { this.setState({ avaragehours: 168 }) } }

  handleChangeSrWyp = (e) => { if (e.target.value.length > 0) { this.setState({ avaragemoney: e.target.value }) } else { this.setState({ avaragemoney: 4500 }) } }

  handleChangeAdd = (e) => { this.setState({ add: e.target.value }) }

  handleChangeConfirm = () => { this.setState({ isConfirmed: !this.state.isConfirmed }) }

  handleChangeConfirmPpk = () => { this.setState({ isConfirmedPpk: !this.state.isConfirmedPpk }) }

  handleChangeCity = (e) => { if (e.target.value.length > 0) { this.setState({ city: e.target.value, active: false }) } else { this.setState({ city: "Warszawa", active: true }) } }

  handleClickLocal = (e) => {
    let showPosition = function (position) {
      this.setState({ lat: position.coords.latitude, lon: position.coords.longitude, active: true });
      document.getElementById('town').value = null;
    }
    showPosition = showPosition.bind(this);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }

  render() {
    const { hours, rate, workdays, satsun, hollydays, illnessworkdays, illnessweekenddays, avaragehours, avaragemoney, add } = this.state;

    let workd = workdays - hollydays - illnessworkdays;
    let nadgodz = hours - workd * 8;
    if (nadgodz < 0) { nadgodz = 0 };

    //wyliczenie kwoty brutto z godzin
    const count = () => { return (hours * rate + nadgodz * rate * 0.5 + satsun * rate * 0.5 + hollydays * 8 * avaragemoney / avaragehours + illnessworkdays * avaragemoney / 30 * 0.8 + illnessweekenddays * avaragemoney / 30 * 0.8 + add * 1) };
    let brutto = Math.round(count() * 100) / 100;

    //wyliczenie składek
    let ppk;
    let ppk_bru;
    if (this.state.isConfirmedPpk) { ppk = 0; ppk_bru = brutto } else {
      ppk = Math.round(brutto * 0.02 * 100) / 100;
      ppk_bru = Math.round(brutto * 1.015 * 100) / 100;
    }
    if (brutto < 0) { brutto = 0 };
    let zus;
    zus = Math.round(brutto * 0.1371 * 100) / 100;
    let kos_doch;
    if (brutto < 250) { kos_doch = brutto } else { kos_doch = 250 }
    const pod_zdr = brutto - zus;
    let zdr = Math.round(pod_zdr * 0.09 * 100) / 100;

    //wyliczenie podstawy do zaliczki
    let pod_zal = ppk_bru - zus - kos_doch - 2500;

    //wyliczenie zaliczki na podatek dochodowy
    if (pod_zal < 0) { pod_zal = 0 };
    let zal_pod;
    if (this.state.isConfirmed) { zal_pod = Math.round(pod_zal * 0.32) }
    else { zal_pod = Math.round(pod_zal * 0.12) };

    const pod_ppk = Math.round((ppk_bru - brutto) * 100) / 100;
    let netto = Math.round((brutto - zus - zdr - zal_pod - ppk) * 100) / 100;
    netto = netto.toString();
    netto = netto.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    netto = netto.replace('.', ',');
    const Netto = () => netto;

    const Wynik = () => { return (<p className="wynik">Wynagrodzenie netto wynosi:<br /><span style={{ color: '#FD5B35', fontSize: '1.5em', letterSpacing: '2px' }}><Netto /></span> PLN</p>) }

    return <div>
      <header><Wynik />
      <nav><div id="tytul"><h1>Kalkulator Wynagrodzenia</h1><p>aktualny od 1 lipca 2022r.<br />(uwzględnia    zmiany przyjęte przez Rząd 22 kwietnia 2022r.)</p><br />
      </div>
      </nav>
      </header>
      <section className = 'desc'><div>
      <strong>Przedstawiony tutaj Kalkulator służy do wyliczenia kwoty wynagrodzenia netto, czyli „na rękę'' dla pracownika, który:<br/>
 — jest zatrudniony na umowę o pracę,<br/>
 — wykonuje pracę w miejscu zamieszkania,<br/>
 — jego wiek jest powyżej 26 lat,<br/>
 — ma złożone oświadczenie PIT-2.
</strong><p>
To, co odróżnia go od innych kalkulatorów to możliwość uwzględnienia m.in. takich informacji jak: stawka godzinowa, liczba przepracowanych godzin czy liczba dni spędzonych na urlopie.
</p><p>
Aby Kalkulator prawidłowo obliczył kwotę wynagrodzenia, musi otrzymać prawidłowe dane, które użytkownik wpisze do pól edycyjnych.
</p><p>
<u><i><b>Szczegóły poprawności wprowadzanych danych:</b></i></u><br/>
— w poz.1 należy wpisać łączną liczbę przepracowanych godzin w danym miesiącu,<br/>
— w poz.2 należy wpisać obecną stawkę godzinową brutto ustaloną dla obliczania wynagrodzenia,<br/>
— w poz.3 podajemy liczbę dni roboczych w danym miesiącu — bez względu na to ile dni pracownik był w pracy (liczba dni minus liczba sobót minus liczba niedziel minus liczba świąt) — domyślnie ustawiona na 21,<br/>
— w poz.4 wpisujemy sumę godzin przepracowanych w soboty, niedziele i święta (służy to obliczeniu dodatkowej kwoty wynikającej z płatności tzw. setek)<br/>
— jeśli korzystaliśmy z urlopu wypoczynkowego, na żądanie czy okolicznościowego wpisujemy ilość dni w poz.5<br/>
— poz.6 służy uwzględnieniu pobytu pracownika na tzw. zwolnieniu lekarskim — wpisujemy liczbę dni, ale tylko tych, które były robocze,<br/>
— poz. 7 ma podobne przeznaczenie — chodzi o pobyt na „zwolnieniu” w dni wolne od pracy,<br/>
— poz.8 i 9 służy do obliczenia średniego wynagrodzenia do celów naliczenia kwot za urlop lub „zwolnienie lekarskie” - jeśli nie korzystałeś z powyższych, możesz nic nie wpisywać <br/>
— w poz.10 wpisujemy sumę kwot brutto ewentualnych dodatków typu premia, mieszkaniówka — jeśli takowych nie ma — pole pozostaje puste.
</p><p>
Dodatkowo należy zwrócić uwagę na właściwe zaznaczenie pól związanych z tematem przekroczenia drugiego progu dochodowego oraz opcją braku uczestnictwa w Pracowniczych Planach Kapitałowych (PPK).
</p><p>
Kalkulator uwzględnia najnowsze przepisy podatkowe i regulacje dotyczące wynagrodzeń. Jeśli potrzebujesz dokładniejszych informacji, zawsze warto skonsultować się z ekspertem finansowym lub działem kadr.
</p><p>
Kalkulator Wynagrodzenia to z założenia prosty i szybki sposób, abyś mógł się zorientować, ile faktycznie dostaniesz na konto za swoją pracę.</p>
        </div></section><hr/>
      <section><ol>

        <li><Input content='Podaj łączną liczbę przepracowanych godzin w danym miesiącu' method={this.handleChangeGodziny} /></li>

        <li><Input content='Podaj twoją stawkę godzinową brutto' method={this.handleChangeStawka} /></li>

        <li><Input content='Podaj liczbę dni roboczych danego miesiąca' method={this.handleChangeWorkdays} plhld='wstp.21' /></li>

        <li><Input content='Podaj łączną liczbę godzin przepracowanych w soboty, niedziele i święta' method={this.handleChangeSatsun} /></li>

        <li><Input content='Podaj ilość dni przebytych na urlopie' method={this.handleChangeUrlop} /></li>

        <li><Input content='Podaj ilość dni powszednich przebytych na zwolnieniu lekarskim' method={this.handleChangeCh1} /></li>

        <li><Input content='Podaj ilość dni wolnych od pracy a przebytych na zwolnieniu lekarskim' method={this.handleChangeCh2} /></li>

        <li><Input content='Podaj liczbę godzin uśrednioną z trzech ostatnich miesięcy' method={this.handleChangeSrGodz} plhld='wstp.168' /></li>

        <li><Input content='Podaj kwotę wypłaty brutto uśrednioną z trzech ostatnich miesięcy' method={this.handleChangeSrWyp} plhld='wstp.3490' /></li>

        <li><Input content='Podaj kwotę brutto ewentualnych dodatków typu: premia, mieszkaniówka' method={this.handleChangeAdd} /></li>

        <div><div className="box"><label><input type='checkbox' id="box" onChange={this.handleChangeConfirm} checked={this.state.isConfirmed} />zaznacz jeśli "wpadłeś" w drugi próg podatkowy</label></div>

          <div className="box"><label><input type='checkbox' id="ppk" onChange={this.handleChangeConfirmPpk} checked={this.state.isConfirmedPpk} />zaznacz jeśli nie uczestniczysz w PPK</label></div></div>
      </ol>

        <div id='constInp'><Input content='Jeśli wysokość Twojego wynagrodzenia jest ustalona jako STAŁA KWOTA BRUTTO i chcesz wyliczyć kwotę "na rękę" wyczyść wszystkie poprzednie pola edycyjne i wpisz kwotę brutto' method={this.handleChangeAdd} /></div>

        <article><div className="list"><p><b>Dane szczegółowe:</b></p><br /><table><tbody><tr><td>wysokość wynagrodzenia brutto:</td><td className="count">{brutto}</td><td>zł</td></tr><tr><td>składka na ubezpieczenie społeczne:</td><td className="count">{zus}</td><td>zł</td></tr><tr><td>składka na ubezpieczenie zdrowotne: </td><td className="count">{zdr}</td><td>zł</td></tr><tr><td>zaliczka na podatek dochodowy:</td><td className="count">{zal_pod}</td><td>zł</td></tr><tr><td>składka na PPK:</td><td className="count">{ppk}</td><td>zł</td></tr><tr><td>kwota wpłaty finansowana przez pracodowcę na konto PPK pracownika:</td><td className="count">{pod_ppk}</td><td>zł</td></tr></tbody></table><br /><p className="small"><i>* prezentowane kwoty składek na ubezpieczenie społeczne i zdrowotne wynikają jedynie z potrąceń wynagrodzenia brutto pracownika - pracodawca dodatkowo finansuje  składki pracownika zgodnie z obowiązującymi przepisami</i></p></div></article></section>

      <footer><div><label><span style={{ fontSize: "18px" }}>Pogoda w Twoim mieście: </span><br /><input id='town' className="input" type="text" placeholder={this.state.cityOk} autoComplete="off" style={{ width: "8em" }} onChange={this.handleChangeCity}></input></label><button onClick={this.handleClickLocal} style={{ width: "2em", height: "1.6em", fontSize: "1.7em", borderRadius: "15%", outline: "none" }}>🛰️</button><br /><br />Aktualna pogoda dla miasta <span>{this.state.cityOk} - {this.state.country}</span> <span style={{fontWeight: "300" }}>({this.state.time})</span>:<br /><img className='icon' src={temp} alt="temperature" /> temp.: <span>{this.state.temp} &#176;C</span><img className='icon' src={wind} alt="wind" /> wiatr: <span>{this.state.wiatr} m/s</span><br /> <img className='icon' src={summer} alt="summer" /> stan: <span>{this.state.stan}</span> <img className='icon' src={pressure} alt="pressure" />  ciśnienie: <span>{this.state.cisnienie} hPa</span><br /> <img className='icon' src={vision} alt="visibillity" /> widoczność: <span>{this.state.visibility} m</span> <img className='icon' src={clouds} alt="clouds" /> zachmurzenie:  <span>{this.state.clouds} %</span><br />{/*<img className="img" src={`https://openweathermap.org/img/wn/${this.state.icon}@2x.png`} alt="icon" />*/}</div><br />{/*<Suspense fallback={<div>Ładowanie...</div>}><Nasa /></Suspense>*/}<Footer /></footer>
    </div>
  }
}
export default App;
