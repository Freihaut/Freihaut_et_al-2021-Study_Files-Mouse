import React, {Component} from 'react';

import MatrixQuestion from '../LayoutComponents/MatrixQuestion';
import MatrixButtons from '../LayoutComponents/MatrixButton';
import ProceedButton from '../LayoutComponents/ProceedButton';


const scaleQuestions = [
    {question: "Ich fühle mich wohl", id: 'MDBF_wohl'},
    {question: "Ich fühle mich unglücklich", id: 'MDBF_ungluecklich'},
    {question: "Ich fühle mich unzufrieden", id: 'MDBF_unzufrieden'},
    {question: "Ich fühle mich gut", id: 'MDBF_gut'},
    {question: "Ich fühle mich schläfrig", id: 'MDBF_schlaefrig'},
    {question: "Ich fühle mich wach", id: 'MDBF_wach'},
    {question: "Ich fühle mich frisch", id: 'MDBF_frisch'},
    {question: "Ich fühle mich ermattet", id: 'MDBF_ermattet'},
    {question: "Ich fühle mich ausgeglichen", id: 'MDBF_ausgeglichen'},
    {question: "Ich fühle mich angespannt", id: 'MDBF_angespannt'},
    {question: "Ich fühle mich nervös", id: 'MDBF_nervoes'},
    {question: "Ich fühle mich ruhig", id: 'MDBF_ruhig'},
    {question: "Ich fühle mich nostalgisch", id: 'nostalgia'},
    {question: "Ich fühle mich gestresst", id: 'stress'},
];

const scaleAnchors = [
    {anchor: ""},
    {anchor: "überhaupt nicht"},
    {anchor: "kaum"},
    {anchor: "etwas"},
    {anchor: "sehr"},
    {anchor: "voll und ganz"}
];


export default class Mdbf extends Component {

    constructor(props) {
        super(props);

        let initialMdbf = {};
        scaleQuestions.forEach(item => {
            initialMdbf[item.id] = -99;
        });

        this.state = {MDBF: initialMdbf};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.isQuestionnaireComplete = this.isQuestionnaireComplete.bind(this);
    }

    componentDidMount() {

        window.scrollTo(0, 0);
    }
    
    isQuestionnaireComplete() {
        for (let property in this.state.MDBF) {
            if (this.state.MDBF.hasOwnProperty(property)) {
                //console.log(property + " = " + this.state[property]);
                if (this.state.MDBF[property] === -99) {
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

        let MDBF = {...this.state.MDBF};
        MDBF[name] = parseInt(value);
        this.setState({MDBF});
    }

    render() {
        return (
            <div className={"section"}>
            <div className="content">
                <div>
                    <h5>
                        Bitte geben Sie für jede Aussage an, wie sehr diese jetzt, d.h. in diesem Moment, auf Sie
                        zutrifft.
                    </h5>
                    <hr style={{margin: "0 0", height: "3px"}}/>
                </div>
                <div style={{marginTop: "40px"}}>
                    <table className="table is-hoverable">
                        <tbody>
                        <tr>
                            {scaleAnchors.map((tags, index) => (
                                <th style={{textAlign: "center", width: "70px"}} key={index}>{tags.anchor}</th>
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
                               onClick={() => this.props.proceedPhase(this.props.name, this.state.MDBF)}/>
            </div>
            </div>
        );
    }

}