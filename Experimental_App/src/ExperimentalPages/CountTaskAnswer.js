import React, { Component } from 'react';
import Timer from "../LayoutComponents/Timer";

export default class CountTaskAnswer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            givenSolution: 0,
            validSolution: -99,
            origAns: null
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    // change value of the input field and save it in the state
    changeInputValue(evt) {
        const value = Number(evt.target.value);

        if (isNaN(value)) {
            this.setState({
                givenSolution: 0,
                validSolution: false,
                origAns: evt.target.value
            })
        } else if (value <= 0) {
            this.setState({
                validSolution: false,
                givenSolution: 0,
                origAns: evt.target.value
            })
        } else {
            this.setState({
                validSolution: true,
                givenSolution: value,
                origAns: evt.target.value
            })
        }
    }

    // check if the value in the input field is valid (when participant sends his answer), if so end task, if not, ask
    // participant to change the value in the input field to a number
    end(){

        const data = {
            Count_Task_Answer: this.state.givenSolution,
            Count_Task_Answer_Validity: this.state.validSolution,
            Count_Task_Answer_Literal: this.state.origAns
        };

        this.props.updateAns(this.state.givenSolution);
        this.props.proceedPhase(this.props.name, data)

    }

    render() {
        return(
            <div>
                <div className="section">
                    <div className="content" style={{width: "900px"}}>

                        <div>
                            <h3>Wie viele Quadrate haben Sie gezählt?</h3>
                            <h5>
                                Nächste Aufgabe startet in  <Timer time={10} end={()=> this.end()}/>
                            </h5>
                            <div className="field">
                                <div style={{textAlign: "center", marginTop: "35px"}} className="control">
                                    <input onChange={(evt) => this.changeInputValue(evt)}
                                           style={{maxWidth: "175px"}}
                                           className={(!this.state.validSolution) ? "input input is-medium is-danger" : "input is-medium"}
                                           type="text" placeholder="Ihre Antwort"/>
                                </div>
                                <p style={(!this.state.validSolution)
                                    ? {visibility: "visible"} : {visibility: "hidden"}} className="help is-danger">Bitte tragen Sie eine gültige Zahl ein</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}