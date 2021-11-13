import React from 'react';
import './App.css';

      class App extends React.Component
       {    
       state = {
        hours : 0,
        stawka : 0,
        workdays:21,
        satsun:0,
        hollydays:0,
        illnessworkdays:0,
        illnessweekenddays:0,
        avaragehours:168,
        avaragemoney:3309.6,
        add:0,
        isConfirmed:false,
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
        nasa:"",
        title:"",
        media_type:"",
        nasa_vid:"",
        }     
        
componentDidMount(){

fetch("https://api.nasa.gov/planetary/apod?api_key=TAIEBXrtT4oGNEobufjhEvUJg332acBbAmf9hKL3")
.then(response=>response.json())
.then(dane=>this.setState({nasa:dane.hdurl,title:dane.title,media_type:dane.media_type,nasa_vid:dane.url}));
 fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&lang=pl&appid=04a91b73b71a422b152e409612f46049`)
  .then(response=>response.json())
   .then(dane=>this.setState({temp:dane.main.temp, wiatr:dane.wind.speed, stan:dane.weather[0].description, cisnienie:dane.main.pressure, visibility:dane.visibility, clouds:dane.clouds.all, icon:dane.weather[0].icon, time:new Date(dane.dt*1000).toLocaleTimeString()})
   )

}

componentDidUpdate(prevProps,prevState){
if(prevState.active !== this.state.active||prevState.lat !==this.state.lat){
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&units=metric&lang=pl&appid=8cd238073b54d7ce90d3163bb612c7cb`)
  .then(response=>response.json())
   .then(dane=>this.setState({cityOk:dane.name,temp:dane.main.temp,wiatr:dane.wind.speed,stan:dane.weather[0].description,cisnienie:dane.main.pressure,visibility:dane.visibility,clouds:dane.clouds.all,icon:dane.weather[0].icon,time:new Date(dane.dt*1000).toLocaleTimeString(), country:dane.sys.country})
   )
}
else if(prevState.city !== this.state.city) {fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&lang=pl&appid=04a91b73b71a422b152e409612f46049`)
  .then(response=>response.json())
   .then(dane=>this.setState({temp:dane.main.temp, wiatr:dane.wind.speed, stan:dane.weather[0].description, cisnienie:dane.main.pressure,
visibility:dane.visibility, clouds:dane.clouds.all, icon:dane.weather[0].icon, time:new Date(dane.dt*1000).toLocaleTimeString(), cityOk:dane.name, country:dane.sys.country})
   )}
 
}
                   handleChangeGodziny=(e)=>{this.setState({hours:e.target.value})}  
                   
handleChangeStawka=(e)=>{this.setState({stawka:e.target.value})}

handleChangeWorkdays=(e)=>{if(e.target.value.length>0){this.setState ({workdays:e.target.value})}else{this.setState({workdays:21})}}

handleChangeSatsun=(e)=>{this.setState ({satsun:e.target.value})}

handleChangeUrlop =(e)=>{this.setState ({hollydays:e.target.value})}

handleChangeCh1 =(e)=>{this.setState ({illnessworkdays:e.target.value})}

handleChangeCh2 =(e)=>{this.setState ({illnessweekenddays:e.target.value})}

handleChangeSrGodz =(e)=>{if(e.target.value.length>0){this.setState({avaragehours:e.target.value})}else{this.setState({avaragehours:168})}}

handleChangeSrWyp =(e)=>{if(e.target.value.length>0){this.setState ({avaragemoney:e.target.value})}else{this.setState({avaragemoney:4500})}}

handleChangeAdd=(e)=>{this.setState({add:e.target.value})}

handleChangeConfirm =()=>{this.setState({isConfirmed :!this.state.isConfirmed})}

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
      const {hours, stawka, workdays, satsun, hollydays, illnessworkdays, illnessweekenddays, avaragehours, avaragemoney, add }=this.state;          
                
              let workd =workdays-hollydays-illnessworkdays;  
 let nadgodz=hours-workd*8;
 if(nadgodz<0){nadgodz=0};
 
 
 
 
                const wyliczenie =()=>{return (hours * stawka+nadgodz*stawka*0.5 + satsun *stawka*0.5+hollydays *8*avaragemoney/avaragehours+illnessworkdays*avaragemoney/30*0.8 + illnessweekenddays*avaragemoney/30*0.8+add*1);
 
         }
let brutto=Math.round(wyliczenie()*100)/100;
let ppk;
let ppk_bru;
if(this.state.isConfirmedPpk)
{ppk=0; ppk_bru=brutto}else
{ppk=Math.round(brutto*0.02*100)/100;
ppk_bru=Math.round(brutto*1.015*100)/100;}
if(brutto<0) {brutto=0};
const zus=Math.round(brutto*0.1371*100)/100;
const pod_zdr=brutto-zus;
const zdr=Math.round(pod_zdr*0.09*100)/100;
const kos_doch=250;
let pod_zal=ppk_bru-zus-kos_doch-2500;

if(ppk_bru>=5701&&ppk_bru<=8549){ 
pod_zal=pod_zal-(brutto*0.0668-380.5)/0.17
}else if(ppk_bru>8549&&ppk_bru<=11141){
    pod_zal=pod_zal-(brutto*-0.0735+819.08)
/0.17}


if(pod_zal<0) {pod_zal=0};
let zal_pod;

if(this.state.isConfirmed){zal_pod=Math.ceil(pod_zal*0.32)} else if(ppk_bru>8549&&!this.state.isConfirmedPpk){zal_pod=Math.ceil(pod_zal*0.17+brutto*0.015*0.15)}else {zal_pod=Math.ceil(pod_zal*0.17)};



const pod_ppk=Math.round((ppk_bru-brutto)*100)/100;
let netto=Math.round((brutto-zus-zdr-zal_pod-ppk)*100)/100;

netto=netto.toString();
netto=netto.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
netto=netto.replace('.',' , ');

const Nasa = ()=>{if(this.state.media_type==="video"){return (<iframe title="nasa" frameBorder="0" allowFullScreen="allowFullScreen" width="100%" height="100%"
src={this.state.nasa_vid}>
</iframe>)} else{return (<img src={this.state.nasa} alt="FOTKA" style={{width:"95%", height:"95%"}}/>)}}

            
                const Wynik = ()=> {return(<h3 className="wynik">Wynagrodzenie netto wynosi:<br/><span style={{color:'#FD5B35', fontSize:'1.5em',letterSpacing:'3px'}}>{netto}</span> PLN</h3>)}
                
const data=new Date();
const year=data.getFullYear();
let miesiac=data.getMonth();
const day=data.getDate();
switch(miesiac){
    default : miesiac="styczeń";
 break;
 
    case 1 : miesiac="luty";
 break;
 
 case 2 : miesiac="marzec";
 break;
 
 case 3 : miesiac="kwiecień";
 break;
 
 case 4 : miesiac="maj";
 break;
 
 case 5 : miesiac="czerwiec";
 break;
 
 case 6 : miesiac="lipiec";
 break;
 
 case 7 : miesiac="sierpień";
 break;
 
 case 8 : miesiac="wrzesień";
 break;
 
 case 9 : miesiac="październik";
 break;
 
 case 10 : miesiac="listopad";
 break;
 
 case 11 : miesiac="grudzień";
 break;
}

    
                 return <div>
                  
                 
            <Wynik/><br/><br/><br/>
                 <div id="tytul"><h2>Kalkulator Wynagrodzenia</h2><p>(z uwzg. standardowego uczestnictwa w PPK)</p></div>
                 <ol>
                     
                 <label><li>Podaj łączną liczbę przepracowanych godzin w danym miesiącu<br/><input className="input" type="number" onChange={this.handleChangeGodziny}/></li> <br/></label>
                     
                 <label><li>
 Podaj twoją stawkę godzinową brutto<br/><input className="input" type="number" onChange ={this.handleChangeStawka}/></li><br/></label>
 
  <label><li>Podaj liczbę dni roboczych danego miesiąca<br/><input className="input" type="number" placeholder="wst.21" onChange={this.handleChangeWorkdays}/></li><br/></label>   
  
    <label><li>Podaj łączną liczbę godzin przepracowanych w soboty, niedziele i święta<br/><input className="input" type="number" onChange={this.handleChangeSatsun}/></li><br/></label>
  
 <label><li>Podaj ilość dni przebytych na urlopie<br/><input className="input" type="number" onChange={this.handleChangeUrlop}/></li><br/></label>
 
 <label><li>Podaj ilość dni powszednich przebytych na zwolnieniu lekarskim<br/><input className="input" type="number" onChange={this.handleChangeCh1}/></li><br/>
</label>
 
 <label><li>Podaj ilość dni wolnych od pracy a przebytych na zwolnieniu lekarskim<br/><input className="input" type="number" onChange={this.handleChangeCh2}/></li><br/></label>
 
 <label><li>Podaj liczbę godzin uśrednioną z trzech ostatnich miesięcy<br/><input className="input" type="number" placeholder="wst.168" onChange={this.handleChangeSrGodz}/></li><br/></label>
 
  <label><li>Podaj kwotę wypłaty brutto uśrednioną z trzech ostatnich miesięcy<br/><input className="input" type="number" placeholder="wst.3309.6" onChange={this.handleChangeSrWyp}/></li><br/></label>
  
    <label><li>Podaj kwotę brutto ewentualnych dodatków typu: premia, mieszkaniówka<br/><input className="input" type="number" onChange={this.handleChangeAdd}/></li><br/></label>


   <label className="box"><input type='checkbox' id="box" onChange ={this.handleChangeConfirm} checked={this.state.isConfirmed}/>zaznacz jeśli "wpadłeś" w drugi próg podatkowy</label><br/>
       
   <label className="box"><input type='checkbox' id="ppk" onChange ={this.handleChangeConfirmPpk} checked={this.state.isConfirmedPpk}/>zaznacz jeśli nie uczestniczysz w PPK</label>
   
   <div className='facebook'><div  className="fb-share-button" data-href="https://overactive-applicat.000webhostapp.com/" data-layout="button" data-size="small" ><a rel="noreferrer" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Foveractive-applicat.000webhostapp.com%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Udostępnij
</a></div></div>

   </ol>

<div className="list"><h3>Dane szczegółowe:</h3><br/><table><tbody><tr><td>wysokość wynagrodzenia brutto:</td><td className="count">{brutto}</td><td>zł</td></tr><tr><td>składka na ubezpieczenie społeczne:</td><td className="count">{zus}</td><td>zł</td></tr><tr><td>składka na ubezpieczenie zdrowotne: </td><td className="count">{zdr}</td><td>zł</td></tr><tr><td>zaliczka na podatek dochodowy:</td><td className="count">{zal_pod}</td><td>zł</td></tr><tr><td>składka na PPK:</td><td className="count">{ppk}</td><td>zł</td></tr><tr><td>kwota wpłaty z funduszu pracodowcy na konto PPK pracownika:</td><td className="count">{pod_ppk}</td><td>zł</td></tr></tbody></table><br/><h6>* prezentowane kwoty składek na ubezpieczenie społeczne i zdrowotne wynikają jedynie z potrąceń wynagrodzenia brutto pracownika (pracodawca dodatkowo finansuje  składki pracownika zgodnie z obowiązującymi przepisami)</h6></div>
   
  <div id="footer">        
 <label><span style={{fontSize:"18px"}}>Pogoda w Twoim mieście: </span><br/><input className="input" type="text"     placeholder={this.state.cityOk} style={{width:"8em"}} onChange={this.handleChangeCity}></input></label><button onClick={this.handleClickLocal}     style={{width:"2em",height:"1.6em",fontSize:"1.7em",borderRadius:"50%",outline:"none"}}>🛰️</button>      
 
    <br/>Aktualna pogoda dla miasta <span style={{color:"#0000FF"}}>{this.state.cityOk} - {this.state.country}</span> (<span style={{color:"black", fontWeight:"100"}}>{this.state.time}</span>):<br/> 🌡️temp.: <span>{this.state.temp} &#176;C</span>     💨wiatr: <span>{this.state.wiatr} m/s</span><br/>⛱️stan: <span>{this.state.stan}</span> ⏲️ciśnienie: <span>{this.state.cisnienie} hPa</span><br/>👁️widoczność: <span>{this.state.visibility} m</span> ⛅zachmurzenie:  <span>{this.state.clouds} %</span><br/><img className="img" src={`https://openweathermap.org/img/wn/${this.state.icon}@2x.png`} alt="icon"/><br/><div style={{textAlign:"right",marginRight:"2%"}}><em>Wrzutka Dnia od </em><img className="img" style={{marginBottom:"-0.75em",width:"3.5em",height:"3.5em"}} src="https://drive.google.com/uc?id=1rwQwD3c8ppQ2p2ALj-PlOidJ3Sfo0_ro" alt="NASA"/></div><label><Nasa/><div style={{color:"#00F",fontSize:"1.3em",textAlign:"left",marginLeft:"2.5%"}}><em>{this.state.title}</em></div></label><br/>{day} {miesiac} {year} - &copy; Grzegorz Dychała</div>
</div>
                }  
              }   
export default App;
