import React from 'react';
import './App.css';
import Input from './modules/input';
import Footer from './modules/footer';
import wind from './icons/wind.svg';
import temp from './icons/temperature.svg';
import clouds from './icons/clouds.svg';
import pressure from './icons/pressure.svg';
import summer from './icons/summer.svg';
import vision from './icons/vision.svg';
import Nasa from './modules/nasa';



const API_KEY_OW = process.env.REACT_APP_API_KEY_OW;

      class App extends React.Component
       {    
       state = {
        hours : 0,
        rate : 0,
        workdays:21,
        satsun:0,
        hollydays:0,
        illnessworkdays:0,
        illnessweekenddays:0,
        avaragehours:168,
        avaragemoney:3309.6,
        add:0,
        //isConfirmed:false,
        isConfirmedPpk:false,
        temp :"brak danych",
        wiatr:"brak danych",
        stan:"brak danych",
        cisnienie:"brak danych",
        clouds:"brak danych",
        visibility:"brak danych",
        icon:"",
        time:"brak danych",
        city:"Warszawa",
        cityOk:"Warszawa",
        country:"PL",
        lat:"",
        lon:"",
        active:false,
        
        }   
        
        
componentDidMount(){

 fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&lang=pl&appid=${API_KEY_OW}`)
  .then(response=>response.json())
   .then(dane=>this.setState({temp:dane.main.temp, wiatr:dane.wind.speed, stan:dane.weather[0].description, cisnienie:dane.main.pressure, visibility:dane.visibility, clouds:dane.clouds.all, icon:dane.weather[0].icon, time:new Date(dane.dt*1000).toLocaleTimeString()})
   )

}

componentDidUpdate(prevProps,prevState){
if(prevState.active !== this.state.active||prevState.lat !==this.state.lat){
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&units=metric&lang=pl&appid=${API_KEY_OW}`)
  .then(response=>response.json())
   .then(dane=>this.setState({cityOk:dane.name,temp:dane.main.temp,wiatr:dane.wind.speed,stan:dane.weather[0].description,cisnienie:dane.main.pressure,visibility:dane.visibility,clouds:dane.clouds.all,icon:dane.weather[0].icon,time:new Date(dane.dt*1000).toLocaleTimeString(), country:dane.sys.country})
   )
}
else if(prevState.city !== this.state.city) {fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&lang=pl&appid=${API_KEY_OW}`)
  .then(response=>response.json())
   .then(dane=>this.setState({temp:dane.main.temp, wiatr:dane.wind.speed, stan:dane.weather[0].description, cisnienie:dane.main.pressure,
visibility:dane.visibility, clouds:dane.clouds.all, icon:dane.weather[0].icon, time:new Date(dane.dt*1000).toLocaleTimeString(), cityOk:dane.name, country:dane.sys.country})
   )}
 
}
                   handleChangeGodziny=(e)=>{this.setState({hours:e.target.value})}  
                   
handleChangeStawka=(e)=>{this.setState({rate:e.target.value})}

handleChangeWorkdays=(e)=>{if(e.target.value.length>0){this.setState ({workdays:e.target.value})}else{this.setState({workdays:21})}}

handleChangeSatsun=(e)=>{this.setState ({satsun:e.target.value})}

handleChangeUrlop =(e)=>{this.setState ({hollydays:e.target.value})}

handleChangeCh1 =(e)=>{this.setState ({illnessworkdays:e.target.value})}

handleChangeCh2 =(e)=>{this.setState ({illnessweekenddays:e.target.value})}

handleChangeSrGodz =(e)=>{if(e.target.value.length>0){this.setState({avaragehours:e.target.value})}else{this.setState({avaragehours:168})}}

handleChangeSrWyp =(e)=>{if(e.target.value.length>0){this.setState ({avaragemoney:e.target.value})}else{this.setState({avaragemoney:4500})}}

handleChangeAdd=(e)=>{this.setState({add:e.target.value})}

//handleChangeConfirm =()=>{this.setState({isConfirmed :!this.state.isConfirmed})}

handleChangeConfirmPpk=()=>{this.setState({isConfirmedPpk :!this.state.isConfirmedPpk})}

handleChangeCity=(e)=>{if(e.target.value.length>0){this.setState({city:e.target.value,active:false})}else{this.setState({city:"Warszawa",active:true})}}

handleClickLocal=(e)=>{
  let showPosition=function(position){this.setState({lat:position.coords.latitude, lon:position.coords.longitude,active:true});
}
showPosition=showPosition.bind(this);
  if (navigator.geolocation) { navigator.geolocation.getCurrentPosition(showPosition);
  }

}


                        
                render() {
                  
      const {hours, rate, workdays, satsun, hollydays, illnessworkdays, illnessweekenddays, avaragehours, avaragemoney, add }=this.state;          
                
              let workd =workdays-hollydays-illnessworkdays;  
 let nadgodz=hours-workd*8;
 if(nadgodz<0){nadgodz=0};
 
 
 
//wyliczenie kwoty brutto z godzin
                const count =()=>{return (hours * rate+nadgodz*rate*0.5 + satsun *rate*0.5+hollydays *8*avaragemoney/avaragehours+illnessworkdays*avaragemoney/30*0.8 + illnessweekenddays*avaragemoney/30*0.8+add*1)};
                let brutto=Math.round(count()*100)/100;

//wyliczenie sk??adek
let ppk;
let ppk_bru;
if(this.state.isConfirmedPpk)
{ppk=0; ppk_bru=brutto}else
{ppk=Math.round(brutto*0.02*100)/100;
ppk_bru=Math.round(brutto*1.015*100)/100;}
if(brutto<0) {brutto=0};
let zus;
zus=Math.round(brutto*0.1371*100)/100;
let kos_doch;
if(brutto<250){kos_doch=brutto}else{kos_doch=250}
const pod_zdr=brutto-zus;
let zdr=Math.round(pod_zdr*0.09*100)/100;

//wyliczenie podstawy do zaliczki
let pod_zal=ppk_bru-zus-kos_doch-2500;

//wyliczenie zaliczki na podatek dochodowy
if(pod_zal<0) {pod_zal=0};
let zal_pod;
zal_pod=Math.round(pod_zal*0.12);



const pod_ppk=Math.round((ppk_bru-brutto)*100)/100;
let netto=Math.round((brutto-zus-zdr-zal_pod-ppk)*100)/100;

netto=netto.toString();
netto=netto.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
netto=netto.replace('.',' , ');
const Netto=()=>netto;


           
const Wynik = ()=> {return(<h3 className="wynik">Wynagrodzenie netto wynosi:<br/><span style={{color:'#FD5B35', fontSize:'1.5em',letterSpacing:'3px'}}><Netto/></span> PLN</h3>)}
    


    
                 return <div>
                  
                 
            <header><Wynik/></header><br/><br/><br/>
                 <nav><div id="tytul"><h1>Kalkulator Wynagrodzenia</h1><p>Polskiego ??adu (Nowego ??adu)</p><h5>aktualny od 1 lipca 2022r.<br/>(uwzgl??dnia zmiany przyj??te przez Rz??d 22 kwietnia 2022r.)</h5><br/><h5 id="info">* Kalkulator wylicza wynagrodzenie netto dla osoby kt??ra:<br/> - jest zatrudniona na umow?? o prac??<br/> - wykonuje prac?? w miejscu zamieszkania<br/> - ma powy??ej 26 lat<br/> - ma z??o??one o??wiadczenie PIT-2 </h5></div></nav>
                 <section><ol>

   <li><Input content='Podaj ????czn?? liczb?? przepracowanych godzin w danym miesi??cu' method={this.handleChangeGodziny}/></li>

   <li><Input content='Podaj twoj?? stawk?? godzinow?? brutto' method={this.handleChangeStawka}/></li>

   <li><Input content='Podaj liczb?? dni roboczych danego miesi??ca' method={this.handleChangeWorkdays} plhld='wstp.21'/></li>
                     
   <li><Input content='Podaj ????czn?? liczb?? godzin przepracowanych w soboty, niedziele i ??wi??ta' method={this.handleChangeSatsun}/></li>
  
   <li><Input content='Podaj ilo???? dni przebytych na urlopie' method={this.handleChangeUrlop}/></li>

   <li><Input content='Podaj ilo???? dni powszednich przebytych na zwolnieniu lekarskim' method={this.handleChangeCh1}/></li>
 
   <li><Input content='Podaj ilo???? dni wolnych od pracy a przebytych na zwolnieniu lekarskim' method={this.handleChangeCh2}/></li>
 
   <li><Input content='Podaj liczb?? godzin u??rednion?? z trzech ostatnich miesi??cy' method={this.handleChangeSrGodz} plhld='wstp.168'/></li>
 
   <li><Input content='Podaj kwot?? wyp??aty brutto u??rednion?? z trzech ostatnich miesi??cy' method={this.handleChangeSrWyp} plhld='wstp.3309,6'/></li>
 
   <li><Input content='Podaj kwot?? brutto ewentualnych dodatk??w typu: premia, mieszkani??wka' method={this.handleChangeAdd}/></li>
  
   {/*<label className="box"><input type='checkbox' id="box" onChange ={this.handleChangeConfirm} checked={this.state.isConfirmed}/>zaznacz je??li "wpad??e??" w drugi pr??g podatkowy</label><br/>*/}
       
   <label className="box"><input type='checkbox' id="ppk" onChange ={this.handleChangeConfirmPpk} checked={this.state.isConfirmedPpk}/>zaznacz je??li nie uczestniczysz w PPK</label>
   
   <div className='facebook'><div  className="fb-share-button" data-href="https://overactive-applicat.000webhostapp.com/" data-layout="button" data-size="small" ><a rel="noreferrer" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Foveractive-applicat.000webhostapp.com%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">Udost??pnij
</a></div></div>

   </ol>

  <div id='constInp'><Input content='Je??li wysoko???? Twojego wynagrodzenia jest ustalona jako STA??A KWOTA BRUTTO i chcesz wyliczy?? kwot?? "na r??k??" wyczy???? wszystkie poprzednie pola edycyjne i wpisz kwot?? brutto' method={this.handleChangeAdd}/></div>

<article><div className="list"><h3>Dane szczeg????owe:</h3><br/><table><tbody><tr><td>wysoko???? wynagrodzenia brutto:</td><td className="count">{brutto}</td><td>z??</td></tr><tr><td>sk??adka na ubezpieczenie spo??eczne:</td><td className="count">{zus}</td><td>z??</td></tr><tr><td>sk??adka na ubezpieczenie zdrowotne: </td><td className="count">{zdr}</td><td>z??</td></tr><tr><td>zaliczka na podatek dochodowy:</td><td className="count">{zal_pod}</td><td>z??</td></tr><tr><td>sk??adka na PPK:</td><td className="count">{ppk}</td><td>z??</td></tr><tr><td>kwota wp??aty finansowana przez pracodowc?? na konto PPK pracownika:</td><td className="count">{pod_ppk}</td><td>z??</td></tr></tbody></table><br/><h6>* prezentowane kwoty sk??adek na ubezpieczenie spo??eczne i zdrowotne wynikaj?? jedynie z potr??ce?? wynagrodzenia brutto pracownika - pracodawca dodatkowo finansuje  sk??adki pracownika zgodnie z obowi??zuj??cymi przepisami</h6></div></article></section>
   
  <footer><div><label><span style={{fontSize:"18px"}}>Pogoda w Twoim mie??cie: </span><br/><input className="input" type="text"     placeholder={this.state.cityOk} style={{width:"8em"}} onChange={this.handleChangeCity}></input></label><button onClick={this.handleClickLocal}     style={{width:"2em",height:"1.6em",fontSize:"1.7em",borderRadius:"50%",outline:"none"}}>???????</button>      
<br/>Aktualna pogoda dla miasta <span style={{color:"#0000FF"}}>{this.state.cityOk} - {this.state.country}</span> (<span style={{color:"black", fontWeight:"100"}}>{this.state.time}</span>):<br/> <img src={temp} alt=""/> temp.: <span>{this.state.temp} &#176;C</span><img src={wind} alt=""/>wiatr: <span>{this.state.wiatr} m/s</span><br/> <img src={summer} alt=""/> stan: <span>{this.state.stan}</span> <img src={pressure} alt=""/>  ci??nienie: <span>{this.state.cisnienie} hPa</span><br/> <img src={vision} alt=""/> widoczno????: <span>{this.state.visibility} m</span> <img src={clouds} alt=""/> zachmurzenie:  <span>{this.state.clouds} %</span><br/><img className="img" src={`https://openweathermap.org/img/wn/${this.state.icon}@2x.png`} alt="icon"/></div>     
 <br/><Nasa/><Footer/></footer>
    </div>
                }  
              }   
export default App;
