import React, {Component} from 'react';


import ProceedButton from '../LayoutComponents/ProceedButton';

export default class TrialInstruction extends Component {


    componentDidMount() {
        window.scrollTo(0, 0);
    }


    renderInstruction() {

        let phase = this.props.name.slice(0, 2);
        // Return the Correct Instruction Text
        if (phase === "Pr") {
            // if its the practice phase
            return(
                <div className="content">
                    <h3>Übung</h3><br/>
                    <h4>
                        Im Folgenden geht es darum, dass Sie sich mit den Aufgaben vertraut machen.
                    </h4>
                    <h4>
                        Vor jeder Aufgabe erhalten Sie Informationen darüber, wie Sie die
                        jeweilige Aufgabe bearbeiten sollen. Bitte lesen Sie sich diese Informationen aufmerksam durch.
                    </h4>
                    <br/>
                    <h4>
                        Sobald Sie bereit sind, mit der Übung zu beginnen, drücken Sie bitte auf "Weiter".
                    </h4>
                    <ProceedButton onClick={() => this.props.proceedPhase(this.props.name)}/>
                </div>
            )
        } else if (phase === "Co") {
            // if its the condition phase render an instruction based on the condition
            if (this.props.condition === 0) {
                // if its the high-stress condition
                return (
                    <div className="content">
                        <h3>
                            Testung
                        </h3>
                        <br/>
                        <h4>
                            Nun erfolgt eine Leistungstestung.
                        </h4>
                        <h4>
                            Die in dem Test gemachten Fehler ermöglichen die Einschätzung einer Facette des Standes Ihrer
                            Intelligenz. Nach Abschluss der Testung wird Ihre Leistung angezeigt.
                        </h4>
                        <h4>
                            Zu den bereits geübten Aufgaben kommt eine Aufgabe hinzu,
                            die jetzt gleich vorgestellt wird. Während des Tests
                            starten die Aufgaben sofort ohne nochmalige Anleitung.
                        </h4>
                        <h4>
                            Bitte bearbeiten Sie alle Aufgaben so schnell und so korrekt wie möglich.
                        </h4>
                        <ProceedButton onClick={() => this.props.proceedPhase(this.props.name)}/>
                    </div>
                )
            } else if (this.props.condition === 1) {
                // if its the low-stress condition
                return (
                    <div className="content">
                        <h3>
                            Anwendung
                        </h3>
                        <br/>
                        <h4>
                            Nun erfolgt die Anwendung.
                        </h4>
                        <h4>
                            Die in der Anwendung gewonnenen Erfahrungen können Ihnen nützen für die
                            Bearbeitung von computerbasierten Aufgaben im Alltag. Nach Abschluss der
                            Anwendung erhalten Sie eine Rückmeldung.
                        </h4>
                        <h4>
                            Zu den bereits geübten Aufgaben kommt eine Aufgabe hinzu,
                            die jetzt gleich vorgestellt wird. Während der Anwendung
                            starten die Aufgaben sofort ohne nochmalige Anleitung.
                        </h4>
                        <h4>
                            Bitte bearbeiten Sie alle Aufgaben so schnell und so korrekt wie möglich.
                        </h4>
                        <ProceedButton onClick={() => this.props.proceedPhase(this.props.name)}/>
                    </div>
                )
            }
        }
    }

    render() {
        return (
            <div className="section">
                {this.renderInstruction()}
            </div>
        );
    }

}