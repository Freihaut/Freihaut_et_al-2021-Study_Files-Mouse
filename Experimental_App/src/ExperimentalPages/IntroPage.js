import React, { Component } from 'react';

import ProceedButton from '../LayoutComponents/ProceedButton';

export default class IntroPage extends Component {

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


    render() {
        return(
            <div>
                <div className={"section"}>
                    <div className="content" style={{width: "900px"}}>
                        <div style={{textAlign: "left"}}>
                            <p>
                                Sehr geehrte Teilnehmerin, sehr geehrter Teilnehmer,
                            </p>
                            <p>
                                herzlichen Dank für Ihre Bereitschaft, an dieser Studie teilzunehmen! Diese Studie untersucht
                                Personen bei der Bearbeitung verschiedener computerbasierter Aufgaben. Sie werden gebeten, verschiedene
                               Aufgaben zu bearbeiten sowie einige Fragen zu beantworten. Über das, was im Einzelnen zu tun ist, erhalten
                                Sie genaue Anleitungen. Lesen Sie diese bitte aufmerksam durch und bearbeiten Sie alle Aufgaben so gut Sie können.
                                Die Teilnahmedauer beträgt etwa 20 bis 25 Minuten. Für Ihre Teilnahme schreiben wir Ihnen
                                10 Treuepunkte (= 1 EUR) gut.
                            </p>
                            <p>
                                Paul Freihaut, M.Sc. <br/>
                                Prof. Dr. Anja Göritz
                            </p>
                            <br/>
                            <div style={{border: "solid 3px red", padding: "5px"}}>
                                <h5 style={{color: "red"}}>
                                    Wichtiger technischer Hinweis
                                </h5>
                                <h6>
                                    Bitte nutzen Sie für die Teilnahme an der Studie eine Computermaus und kein Trackpad, Touch oder andere Eingabegeräte.
                                    Eine Teilnahme am Smartphone oder Tablet ist nicht möglich.
                                </h6>
                            </div>
                            <br/>
                            <h5>
                                Informationen zur Teilnahme und den erhobenen Daten
                            </h5>
                            <p>
                                Ihre Teilnahme ist freiwillig und Sie haben das Recht, die Studie zu jedem Zeitpunkt ohne Angabe von Gründen
                                zu beenden.
                            </p>
                            <p>
                                In der Studie werden Fragebogendaten sowie Computermaus- und Tastaturdaten
                                erhoben. Die Sammlung von Daten erfolgt ausschließlich zu wissenschaftlichen Zwecken.
                                Die in der Studie erfassten Daten können über den Rahmen dieser Studie hinaus zur
                                Sekundäranalyse bzw. für eine anderweitige wissenschaftliche Fragestellung im Sinne der wissenschaftlichen
                                Transparenz und Replizierbarkeit verwendet werden.
                            </p>
                            <p>
                                Wenn Sie mehr Informationen zur Verarbeitung Ihrer Daten erhalten möchten, klicken Sie
                                bitte <a target="_blank" rel="noopener noreferrer" href={"https://www.wisopanel.net/datenschutz.php"}>hier</a>.
                            </p>
                            <br/>
                            <h5>
                                Wie Sie uns kontaktieren können:
                            </h5>
                            <p>
                                Paul Freihaut, M.Sc. <br/>
                                Universität Freiburg <br/>
                                Wirtschaftspsychologie <br/>
                                Engelbergerstraße 41 <br/>
                                D-79085 Freiburg <br/>
                                E-Mail: <a href={"mailto:paul.freihaut@psychologie.uni-freiburg.de"}>paul.freihaut@psychologie.uni-freiburg.de</a>
                            </p>
                        <label className="checkbox" style={{display: "flex", marginTop: "45px"}}>
                            <input type="checkbox" style={{marginRight: "15px", flex: "1", outline: "none"}} checked={this.state.checked} onChange={this.toggleCheckBox}/>
                            Ich habe die Informationen zur Teilnahme gelesen und erkläre mich mit der Teilnahme einverstanden.
                            Ich stimme der Datenerhebung und der Weiterverarbeitung zu.
                        </label>
                        </div>
                        <ProceedButton onClick={() => this.props.proceedPhase(this.props.name)} disabled={!this.state.checked}/>
                    </div>
                </div>
            </div>
        );
    }

}