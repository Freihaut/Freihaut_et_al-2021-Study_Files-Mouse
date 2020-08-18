import React, { Component } from 'react';

import ProceedButton from '../LayoutComponents/ProceedButton';


export default class DonationOption extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        };

        this.toggleCheckBox = this.toggleCheckBox.bind(this);
    }

    componentDidMount() {

        window.scrollTo(0, 0);
    }

    toggleCheckBox() {
        this.state.checked ? this.setState({checked: false}) : this.setState({checked: true})
    }

    endPhase() {
        const data = {
            isDonating: this.state.checked
        };

        this.props.proceedPhase(this.props.name, data)
    }

    render(){
        return(
            <div>
                <div className={"section"}>
                    <div className="content" style={{width: "900px"}}>
                        <div>
                            <h5>
                                Geschafft!
                            </h5>
                            <h5>
                                Für Ihre Teilnahme an dieser Studie schreiben wir Ihnen nach Abschluss
                                der Datenerhebung 10 Treuepunkte (= 1 EUR) gut.
                            </h5>
                                <label className="checkbox" style={{marginTop: "45px"}}>
                                    <input type="checkbox" style={{marginRight: "15px", outline: "none"}} checked={this.state.checked} onChange={this.toggleCheckBox}/>
                                    Ich verzichte auf die Treuepunkte und spende sie an WiSoPanel zurück.
                                </label>
                        </div>
                        <ProceedButton onClick={() => this.endPhase()}/>
                    </div>
                </div>
            </div>
        );
    }

}