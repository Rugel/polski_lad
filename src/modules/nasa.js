import React from "react";
import nasa_logo from '../icons/nasa_logo.svg';


const API_KEY_NASA = process.env.REACT_APP_API_KEY_NASA;

class Nasa extends React.Component {
    state = {
        nasa: "",
        title: "",
        media_type: "",
        nasa_vid: "",
    }

    componentDidMount() {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY_NASA}`)
            .then(response => response.json())
            .then(dane => this.setState({ nasa: dane.url, title: dane.title, media_type: dane.media_type, nasa_vid: dane.url }));
    }
    render() {
        const Frame = () => {
            if (this.state.media_type === "video") {
                return (<iframe title="nasa" frameBorder="0" allowFullScreen="allowFullScreen" width="100%" height="100%"
                    src={this.state.nasa_vid}>
                </iframe>)
            } else { return (<img src={this.state.nasa} alt="FOTKA" style={{ width: "95%", height: "95%" }} />) }
        }
        return <><div style={{ textAlign: "right", marginRight: "2%" }}><em>Wrzutka Dnia od </em><img className="img" style={{ marginBottom: "-0.5em", width: "3.5em", height: "3.5em" }} src={nasa_logo} alt="NASA" /></div><label><Frame /><div style={{ color: "#00F", fontSize: "1em", textAlign: "left", marginLeft: "2.5%", marginTop: "-.5em" }}><em>{this.state.title}</em></div></label><br /></>
    }
}

export default Nasa;