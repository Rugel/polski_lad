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
import geo from './icons/geo-alt.svg';
import swal from '@sweetalert/with-react';
import Abount from './modules/descryption';
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
    avaragemoney: 7005.76,
    add: 0,
    BaN: 0,
    isConfirmed: false,
    isConfirmedPpk: false,
    isConfirmedU26: false,
    isConfirmeWorkplace: false,
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



  handleChangeGodziny = (e) => { if (e.target.value >= 0 && e.target.value <= 744) { this.setState({ hours: e.target.value }) } else { this.setState({ hours: 168 }) } if (e.target.value < 0 || e.target.value > 744) { swal("Liczba musi się mieścić w przedziale 0 - 744") } }

  handleChangeStawka = (e) => { if(e.target.value>=0){this.setState({ rate: e.target.value })}else{this.setState({rate:0}); swal('Liczba nie może być ujemna')} }

  handleChangeWorkdays = (e) => { if (e.target.value >= 19 && e.target.value < 24) { this.setState({ workdays: e.target.value }) } else { this.setState({ workdays: 21 }) } if ((e.target.value > 2 && e.target.value < 19) || e.target.value > 23 || e.target.value < 0) { swal('Liczba musi się mieścić w przedziale 19 - 23') } }

  handleChangeSatsun = (e) => { if (e.target.value > 0 && e.target.value <= 288) { this.setState({ satsun: e.target.value }) } else { this.setState({ satsun: 0 }) } if (e.target.value < 0 || e.target.value > 288) { swal('Liczba musi się mieścić w przedziale 0 - 288') } }

  handleChangeUrlop = (e) => { if (e.target.value > 0 && e.target.value <= this.state.workdays) { this.setState({ hollydays: e.target.value }) } else { this.setState({ hollydays: 0 }) } if (e.target.value < 0 || e.target.value > this.state.workdays) { swal('Liczba nie może być większa od liczby dni roboczych') } }

  handleChangeCh1 = (e) => { if (e.target.value > 0 && e.target.value <= this.state.workdays) { this.setState({ illnessworkdays: e.target.value }) } else { this.setState({ illnessworkdays: 0 }) } if (e.target.value < 0 || e.target.value > this.state.workdays) { swal('Liczba nie może być większa od liczby dni roboczych') } }

  handleChangeCh2 = (e) => { if (e.target.value > 0 && e.target.value <= 12) { this.setState({ illnessweekenddays: e.target.value }) } else { this.setState({ illnessweekenddays: 0 }) } if (e.target.value < 0 || e.target.value > 12) { swal('Liczba musi się mieścić w przedziale 0 - 12') } }

  handleChangeSrGodz = (e) => { if (e.target.value > 0 && e.target.value <= 744) { this.setState({ avaragehours: e.target.value }) } else { this.setState({ avaragehours: 168 }) } if (e.target.value < 0 || e.target.value > 744) { swal('Liczba musi się mieścić w przedziale 0 - 744') } }

  handleChangeSrWyp = (e) => { if (e.target.value > 0) { this.setState({ avaragemoney: e.target.value }) } else { this.setState({ avaragemoney: 7005.76 }) } if (e.target.value < 0) { swal('Kwota nie może być ujemna') } }

  handleChangeAdd = (e) => { if (e.target.value >= 0) { this.setState({ add: e.target.value }) } else if (e.target.value < 0) { this.setState({ add: 0 }); swal('Kwota nie może być ujemna') } }

  handleChangeBaN = (e) => { if (e.target.value >= 0) { this.setState({ BaN: e.target.value }) } else if (e.target.value < 0) { this.setState({ BaN: 0 }); swal('Kwota nie może być ujemna') } }

  handleChangeConfirm = () => { this.setState({ isConfirmed: !this.state.isConfirmed }) }

  handleChangeConfirmPpk = () => { this.setState({ isConfirmedPpk: !this.state.isConfirmedPpk }) }

  handleChangeConfirmU26 = () => { this.setState({ isConfirmedU26: !this.state.isConfirmedU26 }) }

  handleChangeConfirmWorkplace = () => { this.setState({ isConfirmeWorkplace: !this.state.isConfirmeWorkplace }) }
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

    //warunek dla przelicznika Brutto na Netto
    if(this.state.BaN) { brutto = this.state.BaN };

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
    let kos_doch = 250;
    if (brutto < 250) { kos_doch = brutto }
    if (this.state.isConfirmeWorkplace) { kos_doch = 300 }
    const pod_zdr = brutto - zus;
    let zdr = Math.round(pod_zdr * 0.09 * 100) / 100;

    //wyliczenie podstawy do zaliczki
    let pod_zal = ppk_bru - zus - kos_doch;

    //wyliczenie zaliczki na podatek dochodowy
    if (pod_zal < 0) { pod_zal = 0 };
    let zal_pod;
    if (this.state.isConfirmed) { zal_pod = Math.round(pod_zal * 0.32) - 300 }
    else { zal_pod = Math.round(pod_zal * 0.12) - 300 };
    if (zal_pod < 0 || (this.state.isConfirmedU26 && brutto <= 85528 && !this.state.isConfirmed)) { zal_pod = 0 };
    const pod_ppk = Math.round((ppk_bru - brutto) * 100) / 100;
    let netto = Math.round((brutto - zus - zdr - zal_pod - ppk) * 100) / 100;
    netto = netto.toString();
    netto = netto.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    netto = netto.replace('.', ',');
    const Netto = () => netto;

    const Wynik = () => { return (<p className="wynik">Miesięczne wynagrodzenie netto:<br /><span style={{ color: '#FD5B35', fontSize: '1.5em', letterSpacing: '2px' }}><Netto /></span> PLN</p>) }

    return (
      <div>
      <header><Wynik />
        <nav><div id="tytul">
        <div className="fb-share-button" data-href="https://stawka-godzinowa.pl/" data-layout="" data-size=""><a target="blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fstawka-godzinowa.pl%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">Udostępnij</a></div>
          <u><h1>Kalkulator Wynagrodzeń</h1></u><br /><div className='box'><strong><p>- dla pracowników zatrudnionych na umowę o pracę rozliczanych za pomocą stawki godzinowej</p><p>- przelicznik BRUTTO na NETTO</p></strong></div>
        </div>
        </nav>
      </header>
      <fieldset><legend><strong><u>wstępne opcje</u></strong></legend>
        <div className='box'>
          <label><input type='checkbox' id="ppk" onChange={this.handleChangeConfirmPpk} checked={this.state.isConfirmedPpk} />brak uczestnictwa w PPK</label><br /><br />
          <label><input type='checkbox' id="u26" onChange={this.handleChangeConfirmU26} checked={this.state.isConfirmedU26} />wiek poniżej 26 lat</label><br /><br />
          <label><input type='checkbox' id="workplace" onChange={this.handleChangeConfirmWorkplace} checked={this.state.isConfirmeWorkplace} />zakład pracy znajduje się poza miejscowością zamieszkania</label><br /><br />
          <label><input type='checkbox' id="box" onChange={this.handleChangeConfirm} checked={this.state.isConfirmed} />zaliczka na podatek dochodowy jest pobierana wg drugiego progu skali podatkowej</label>
        </div>
      </fieldset>

      <section><ol id="list">

        <li><Input name='hours' content='Podaj łączną liczbę przepracowanych godzin w danym miesiącu' method={this.handleChangeGodziny} /></li>

        <li><Input name='rate' content='Podaj twoją stawkę godzinową brutto' method={this.handleChangeStawka} /></li>

        <li><Input name='workdays' content='Podaj liczbę dni roboczych danego miesiąca' method={this.handleChangeWorkdays} plhld={this.state.workdays} /></li>

        <li><Input name='sunsat' content='Podaj łączną liczbę godzin przepracowanych w soboty, niedziele i święta' method={this.handleChangeSatsun} /></li>

        <li><Input name='hollydays'  content='Podaj ilość dni przebytych na urlopie' method={this.handleChangeUrlop} /></li>

        <li><Input name='illworkdays' content='Podaj ilość dni powszednich przebytych na zwolnieniu lekarskim' method={this.handleChangeCh1} /></li>

        <li><Input name='illfreedays' content='Podaj ilość dni wolnych od pracy a przebytych na zwolnieniu lekarskim' method={this.handleChangeCh2} /></li>

        <li><Input name='avaragehours' content='Podaj liczbę godzin uśrednioną z trzech ostatnich miesięcy' method={this.handleChangeSrGodz} plhld={this.state.workdays * 8} /></li>

        <li><Input name='avaragemoney' content='Podaj kwotę wypłaty brutto uśrednioną z trzech ostatnich miesięcy' method={this.handleChangeSrWyp} plhld={this.state.avaragemoney} /></li>

        <li><Input name='addmoney' content='Podaj kwotę brutto ewentualnych dodatków typu: premia, mieszkaniówka' method={this.handleChangeAdd} /></li>
      </ol>

        <div id='constInp'><u><Input name='BnN' content="przelicznik BRUTTO na NETTO" method={this.handleChangeBaN} /></u></div>

        <article>
          <div className="list"><p><i><b><u>tabela kwot:</u></b></i></p>
            <table>
              <thead>
                <tr>
                  <th scope="col">Nazwa</th>
                  <th scope="col">Wartość</th>
                  <th scope="col">Waluta</th>
                </tr>
              </thead>
              <tbody><tr><td>wysokość wynagrodzenia brutto:</td><td className="count">{brutto}</td><td>zł</td></tr>
                <tr><td>składka na ubezpieczenie społeczne:</td><td className="count">{zus}</td><td>zł</td></tr>
                <tr><td>składka na ubezpieczenie zdrowotne: </td><td className="count">{zdr}</td><td>zł</td></tr>
                <tr><td>zaliczka na podatek dochodowy:</td><td className="count">{zal_pod}</td><td>zł</td></tr>
                <tr><td>składka na PPK:</td><td className="count">{ppk}</td><td>zł</td></tr>
                <tr><td>kwota wpłaty finansowana przez pracodowcę na konto PPK pracownika:</td><td className="count">{pod_ppk}</td><td>zł</td></tr>
              </tbody>
            </table>
            <br /><p className="small"><i>* prezentowane kwoty składek na ubezpieczenie społeczne i zdrowotne wynikają jedynie z potrąceń wynagrodzenia brutto pracownika - pracodawca dodatkowo finansuje  składki pracownika zgodnie z obowiązującymi przepisami</i></p>
          </div></article></section>
      <hr />
      <Abount/>
      <footer><div><label><span style={{ fontSize: "18px", color: "#ffffff" }}>Pogoda w Twoim mieście: </span><br /><input id='town' className="input" type="text" placeholder={this.state.cityOk} autoComplete="off" style={{ width: "8em", height: "2.3em" }} onChange={this.handleChangeCity}></input></label><button type='button' aria-label='gps_local' onClick={this.handleClickLocal} style={{ width: "2.7em", height: "3.0em", borderRadius: "15%", outline: "none", marginLeft: "1em", backgroundImage: `url(${geo})`, backgroundRepeat: "no-repeat", position: "relative", top: "1em" }} /><br /><br />Aktualna pogoda dla miasta <span className='span'>{this.state.cityOk} - {this.state.country}</span> <span className='span' style={{ fontWeight: "300" }}>({this.state.time})</span>:<br /><img className='icon' src={temp} alt="temperature" /> temp.: <span className='span'>{this.state.temp} &#176;C</span><img className='icon' src={wind} alt="wind" /> wiatr: <span className='span'>{this.state.wiatr} m/s</span><br /> <img className='icon' src={summer} alt="summer" /> stan: <span className='span'>{this.state.stan}</span> <img className='icon' src={pressure} alt="pressure" />  ciśnienie: <span className='span'>{this.state.cisnienie} hPa</span><br /> <img className='icon' src={vision} alt="visibillity" /> widoczność: <span className='span'>{this.state.visibility} m</span> <img className='icon' src={clouds} alt="clouds" /> zachmurzenie:  <span className='span'>{this.state.clouds} %</span><br />{/*<img className="img" src={`https://openweathermap.org/img/wn/${this.state.icon}@2x.png`} alt="icon" />*/}</div><br />{/*<Suspense fallback={<div>Ładowanie...</div>}><Nasa /></Suspense>*/}<Footer /></footer>
    </div>
    )
  }
}
export default App;
