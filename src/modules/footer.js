const data = new Date();
const year = data.getFullYear();
let miesiac = data.getMonth();
const day = data.getDate();
switch (miesiac) {
   default: miesiac = "styczeń";
      break;

   case 1: miesiac = "luty";
      break;

   case 2: miesiac = "marzec";
      break;

   case 3: miesiac = "kwiecień";
      break;

   case 4: miesiac = "maj";
      break;

   case 5: miesiac = "czerwiec";
      break;

   case 6: miesiac = "lipiec";
      break;

   case 7: miesiac = "sierpień";
      break;

   case 8: miesiac = "wrzesień";
      break;

   case 9: miesiac = "październik";
      break;

   case 10: miesiac = "listopad";
      break;

   case 11: miesiac = "grudzień";
      break;
}

const Footer = () => <div>{day} {miesiac} {year} - &copy; Grzegorz Dychała</div>;

export default Footer;