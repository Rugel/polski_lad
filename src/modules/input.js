

const Input = ({content,method,plhld})=><label>{content}<br/><input className="input" type="number" onChange ={method} placeholder={plhld}></input><br/><br/></label>;

export default Input;