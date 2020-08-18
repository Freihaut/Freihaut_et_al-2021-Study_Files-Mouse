import React, { Component } from 'react';

export default class Debriefing extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    end(){

        const data = {
            countTaskTotalAnswer: this.props.ans,
            countTaskTotalSolution: this.props.solution
        };

        this.props.proceedPhase(this.props.name, data)
    }

    render() {
        return(
            <div>
                <div className="section">
                    <div className="content" style={{width: "900px"}}>

                        <div style={{textAlign : "left"}}>
                            <h5>
                               Vielen Dank für die Angaben!
                            </h5>
                            <h5>
                                Sie haben insgesamt {this.props.ans} Quadrate gezählt, und insgesamt waren es {this.props.solution} Quadrate.
                            </h5>
                            <br/>
                            <p>
                                In dieser Studie war es nicht wichtig, ob die von Ihnen gezählten Quadrate mit der
                                gezeigten Zahl der Quadrate übereinstimmt. Es handelte sich also nicht um eine Testung
                                im klassischen Sinne.
                                Ziel dieser Studie war es, herauszufinden, ob die Nutzung
                                der Computermaus und Tastatur von Anspannung beeinflusst wird. Durch das Quadrate zählen
                                {this.props.condition === 0 ? " und die Ankündigung einer Leistungstestung" : ""} sollte bei einem Teil der Teilnehmenden Anspannung bewirkt werden. Wir bitten um Verständnis, falls diese
                                Studie für Sie anstrengend war. Falls Sie sich im Augenblick noch angespannt fühlen, nehmen
                                Sie sich bitte kurz Zeit für sich, um zu entspannen.
                            </p>
                            <p>
                                Falls Sie Anmerkungen oder Fragen zu dieser Studie oder zu dem Forschungsprojekt haben,
                                wenden Sie sich gerne an den unten stehenden Kontakt. Vielen Dank für Ihre Teilnahme und Mithilfe!
                            </p>
                            <br/>
                            <h5>
                                Kontakt für Rückfragen oder Anmerkungen:
                            </h5>
                            <p>
                                Paul Freihaut, M. Sc. <br/>
                                Universität Freiburg <br/>
                                Wirtschaftspsychologie <br/>
                                Engelbergerstraße 41 <br/>
                                D-79085 Freiburg <br/>
                                E-Mail: <a href={"mailto:paul.freihaut@psychologie.uni-freiburg.de"}>paul.freihaut@psychologie.uni-freiburg.de</a>
                            </p>
                            <div>
                            </div>
                            <div style={{marginTop: "50px", display: "flex", alignItems: "center", justifyContent: "center"}} className="control">
                                <button className="button is-link" onClick={() => this.end()}>Studie beenden</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}