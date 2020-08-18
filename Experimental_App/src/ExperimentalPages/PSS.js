import React, {Component} from 'react';

import MatrixQuestion from '../LayoutComponents/MatrixQuestion';
import MatrixButtons from '../LayoutComponents/MatrixButton';
import ProceedButton from '../LayoutComponents/ProceedButton';

// This questionnaire is currently not used and captures trait stress
// citation: Klein, E. M., Brähler, E., Dreier, M., Reinecke, L., Müller, K. W., Schmutzer, G., ... & Beutel, M. E. (2016).
// The German version of the Perceived Stress Scale–psychometric characteristics in a representative German community sample. BMC psychiatry, 16(1), 159.

const scaleQuestions = [
    {question: "Wie oft wurden Sie im letzten Monat von unerwarteten Ereignissen überrascht?", id: 'PSS_01'},
    {question: "Wie oft hatten Sie im letzten Monat das Gefühl, dass es Ihnen nicht möglich ist, " +
            "wichtige Dinge in Ihrem Leben zu kontrollieren?", id: 'PSS_02'},
    {question: 'Wie oft haben Sie sich im letzten Monat nervös oder "gestresst" gefühlt?', id: 'PSS_03'},
    {question: "Wie oft haben Sie sich im letzten Monat zuversichtlich gefühlt, dass Sie in der Lage sind, " +
            "persönliche Dinge zu regeln?", id: 'PSS_04'},
    {question: "Wie oft hatten Sie im letzten Monat das Gefühl, dass die Dinge in Ihrem Leben genauso laufen, wie " +
            "Sie es wollen?", id: 'PSS_05'},
    {question: "Wie oft hatten Sie im letzten Monat das Gefühl, dass Sie mit anfallenden Aufgaben nicht zu Rande kommen?", id: 'PSS_06'},
    {question: "Wie oft waren Sie in der Lage mit Widrigkeiten des Lebens kontrolliert umzugehen?", id: 'PSS_07'},
    {question: "Wie oft fühlten Sie sich Herr der Lage?", id: 'PSS_08'},
    {question: "Wie oft haben Sie sich über Dinge geärgert, die außerhalb Ihrer Kontrolle lagen?", id: 'PSS_09'},
    {question: "Wie oft hatten Sie das Gefühl, dass sich Schwierigkeiten so sehr auftürmen, dass sie Ihnen über den Kopf wachsen?", id: 'PSS_10'},
];

const scaleAnchors = [
    {anchor: ""},
    {anchor: "nie"},
    {anchor: "fast nie"},
    {anchor: "manch- mal"},
    {anchor: "ziemlich oft"},
    {anchor: "sehr oft"}
];


export default class PSS extends Component {

    constructor(props) {
        super(props);

        let initialPSS = {};
        scaleQuestions.forEach(item => {
            initialPSS[item.id] = -99;
        });

        this.state = {PSS: initialPSS};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.isQuestionnaireComplete = this.isQuestionnaireComplete.bind(this);
    }

    componentDidMount() {

        window.scrollTo(0, 0);
    }

    isQuestionnaireComplete() {
        for (let property in this.state.PSS) {
            if (this.state.PSS.hasOwnProperty(property)) {
                //console.log(property + " = " + this.state[property]);
                if (this.state.PSS[property] === -99) {
                    return false;
                }
            }
        }

        return true;
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let PSS = {...this.state.PSS};
        PSS[name] = parseInt(value);
        this.setState({PSS});
    }

    render() {
        return (
            <div className={"section"}>
            <div className="content">
                <div>
                    <h4>
                        Kreuzen Sie hier bitte das Kästchen an, das Ihrer Zustimmung am besten entspricht.
                    </h4>
                    <hr style={{margin: "0 0", height: "3px"}}/>
                </div>
                <div style={{marginTop: "40px"}}>
                    <table className="table is-hoverable">
                        <tbody>
                        <tr>
                            {scaleAnchors.map((tags, index) => (
                                <th style={{textAlign: "center", width: "100%"}} key={index}>{tags.anchor}</th>
                            ))}
                        </tr>
                        {
                            scaleQuestions.map(question => (
                                <tr key={question.question}>
                                    <MatrixQuestion question={question.question}/>
                                    {scaleAnchors.slice(1).map((tags, index) => (
                                        <MatrixButtons
                                            key={index}
                                            name={question.id}
                                            value={index}
                                            onChange={this.handleInputChange}
                                        />
                                    ))}
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
                <ProceedButton disabled={!this.isQuestionnaireComplete()}
                               onClick={() => this.props.proceedPhase(this.props.name, this.state.PSS)}/>
            </div>
            </div>
        );
    }

}