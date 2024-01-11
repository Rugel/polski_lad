
const Input = ({ content, method, plhld, name }) => <label>{content}<br /><input className="input" type="number" onChange={method} placeholder={plhld} name={name}></input><br /><br /></label>;

export default Input;