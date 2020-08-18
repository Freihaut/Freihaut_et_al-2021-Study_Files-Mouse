import React, {Component} from 'react';

export default class TrialStart extends Component {


    componentDidMount() {
        window.scrollTo(0, 0);
    }



    render() {
        return (
            <div className="section">
                <div className="content">
                    <h3>
                        Start der {this.props.condition === 0 ? "Testung" : "Anwendung"}
                    </h3>
                    <h4>
                        Nachfolgend beginnt die {this.props.condition === 0 ? "Testung" : "Anwendung"}. Hierbei kommt
                        zu jeder davor geübten Aufgabe (z.B. "Kreis anklicken", "Dem Kreis folgen", "Abschreiben") jeweils die Aufgabe "Quadrate zählen" hinzu.
                    </h4>
                    <h4>
                        Nach jeder Aufgabe "Quadrate zählen" werden Sie gebeten anzugeben, wie viele Quadrate Sie
                        gezählt haben.
                    </h4>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "58px",
                    }} className="control">
                        <button className="button is-link" onClick={() => this.props.proceedPhase(this.props.name)}>
                            {this.props.condition === 0 ? "Testung" : "Anwendung"} starten
                        </button>
                    </div>
                </div>
            </div>
        );
    }

}