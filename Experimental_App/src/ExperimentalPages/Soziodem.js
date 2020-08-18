import React, { Component } from 'react';
import ProceedButton from "../LayoutComponents/ProceedButton";

import firebase from "firebase/app";
import 'firebase/database';

const divStyle = {
    marginTop: "40px",
};

const questionTextStyle = {
    textAlign: "left",
    fontWeight: "bold"
};


export default class Soziodem extends Component {

    constructor(props) {
        super(props);
        // set a state for each questionnaire item
        this.state = {
            noMouse: -99,
            socioDemographics: {
                mouse: -99,
                mouse_hand: -99,
                keyboard: -99
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.isQuestionnaireComplete = this.isQuestionnaireComplete.bind(this);
        this.renderAskIfMouse = this.renderAskIfMouse.bind(this);
        this.renderHasMouse = this.renderHasMouse.bind(this);
        this.renderHasNoMouse = this.renderHasNoMouse.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    };

    isQuestionnaireComplete() {
        // check if all questions have a value other than -99 --> each question is answered, if yes, enable proceedphase button
        for (let property in this.state.socioDemographics) {
            if (this.state.socioDemographics.hasOwnProperty(property)) {
                //console.log(property + " = " + this.state[property]);
                if (this.state.socioDemographics[property] === -99) {
                    return false;
                }
            }
        }

        return true;
    }

    handleInputChange(event) {
        // Get the name and value of the clicked radio button and save it to the corresponding question state
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let socioDemographics = {...this.state.socioDemographics};
        socioDemographics[name] = parseInt(value);

        this.setState({socioDemographics})

    }

    evalMouse(mouseState){
        if(mouseState === 0) {
            this.setState({
                noMouse: false
            })
        } else if(mouseState === 1) {
            this.setState({
                noMouse: true
            }, function () {
                firebase.database().ref(this.props.uid + "/ExperimentMetaData").update({
                    hasNoMouse: true
                })
            })
        }
    }

    // ask the partipant wether he is using a mouse
    renderAskIfMouse(){
        return(
            <div>
                <div>
                    <h4>Bevor es losgeht:</h4>
                    <hr style={{margin: "0 0", height: "3px"}}/>
                </div>

                <div className="field" style={divStyle}>
                    <span>
                        <p style={questionTextStyle}>Benutzen Sie jetzt gerade eine Computermaus zur Bearbeitung dieser Studie?
                        (Das Trackpad eines Laptops entspricht in dieser Studie nicht einer Computermaus)</p>
                        <div className="control">
                            <label className="radio">
                                <input
                                    style={{marginRight: 5}}
                                    key={0}
                                    type="radio"
                                    name="mouse"
                                    value="0"
                                    onChange={this.handleInputChange}
                                />Ja
                            </label>
                            <label className="radio" style={{marginLeft: 25}}>
                                <input
                                    style={{marginRight: 5}}
                                    key={1}
                                    type="radio"
                                    name="mouse"
                                    value="1"
                                    onChange={this.handleInputChange}
                                />Nein
                            </label>
                        </div>
                    </span>
                </div>

                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "58px",
                }} className="control">
                    <button className="button is-link" onClick={() => this.evalMouse(this.state.socioDemographics.mouse)}
                            disabled={this.state.socioDemographics.mouse === -99}>Weiter</button>
                </div>
            </div>
        )
    }

    // if the participant uses a mouse, ask with which hand the mouse is operated with
    renderHasMouse(){
        return(
            <div>

                <div>
                    <h4>Bevor es losgeht:</h4>
                    <hr style={{margin: "0 0", height: "3px"}}/>
                </div>

                <div className="field" style={divStyle}>
                    <span>
                        <p style={questionTextStyle}>Mit welcher Hand bedienen Sie die Computermaus?</p>
                        <div className="control">
                            <label className="radio">
                                <input
                                    style={{marginRight: 5}}
                                    type="radio"
                                    key={2}
                                    name="mouse_hand"
                                    value="0"
                                    onChange={this.handleInputChange}
                                />Rechts
                            </label>
                            <label className="radio" style={{marginLeft: 25}}>
                                <input
                                    style={{marginRight: 5}}
                                    type="radio"
                                    key={3}
                                    name="mouse_hand"
                                    value="1"
                                    onChange={this.handleInputChange}
                                />Links
                            </label>
                        </div>
                    </span>
                </div>

                <div className="field" style={divStyle}>
                    <span>
                        <p style={questionTextStyle}>Benutzen Sie jetzt gerade die Tastatur eines Laptops/Notebooks zur Bearbeitung dieser Studie?</p>
                        <div className="control">
                            <label className="radio">
                                <input
                                    style={{marginRight: 5}}
                                    type="radio"
                                    key={4}
                                    name="keyboard"
                                    value="0"
                                    onChange={this.handleInputChange}
                                />Ja
                            </label>
                            <label className="radio" style={{marginLeft: 25}}>
                                <input
                                    style={{marginRight: 5}}
                                    type="radio"
                                    key={5}
                                    name="keyboard"
                                    value="1"
                                    onChange={this.handleInputChange}
                                />Nein
                            </label>
                        </div>
                    </span>
                </div>

                <ProceedButton onClick={() => this.props.proceedPhase(this.props.name, this.state.socioDemographics)}
                               disabled={!this.isQuestionnaireComplete()}/>
            </div>
        )
    }

    // if no mouse is used show info that it is not possible to do the study without a mouse and ask to restart the study
    // with a mouse (or close the study).
    renderHasNoMouse(){

        window.onbeforeunload = null;

        return(
            <div style={{textAlign: "left"}}>
                <h5 style={{color: "red"}}>
                    Wichtiger Teilnahmehinweis
                </h5>
                <p>
                    Vielen Dank für Ihre Auskunft, dass Sie keine Computermaus benutzen. Damit die Studie
                    ordnungsgemäß bearbeitet werden kann, ist aber tatsächlich eine Computermaus notwendig.
                </p>
                <p>
                    Falls Sie die Möglichkeit haben, die Studie doch mit einer Computermaus durchzuführen (indem Sie
                    eine Maus anschließen oder sich an einen Computer mit Maus begeben), können
                    Sie die Studie neu starten. Falls es Ihnen nicht möglich ist, die Studie mit einer Computermaus durchzuführen,
                    können Sie jetzt dieses Fenster schließen.
                </p>
                <p>
                    Vielen Dank für Ihr Verständnis!
                </p>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "58px",
                }} className="control">
                    <button className="button is-link" onClick={() => this.props.restart()}
                    >Studie neu starten</button>
                </div>
            </div>

        )
    }

    render() {

        return(
            <div className="section">
                <div className="content">
                    {this.state.noMouse === -99 ?
                        this.renderAskIfMouse() :
                        this.state.noMouse ?
                            this.renderHasNoMouse() :
                            this.renderHasMouse()}
                </div>
            </div>
        );
    }

}