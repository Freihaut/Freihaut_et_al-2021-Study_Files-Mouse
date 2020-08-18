import React, { Component } from 'react';

// import the SAM pictures
import Valence1 from '../Images/SAM-1.png';
import Valence2 from '../Images/SAM-2.gif';
import Valence3 from '../Images/SAM-3.gif';
import Valence4 from '../Images/SAM-4.gif';
import Valence5 from '../Images/SAM-5.png';

import Arousal1 from '../Images/Arousal_1.png';
import Arousal2 from '../Images/Arousal_2.png';
import Arousal3 from '../Images/Arousal_3.png';
import Arousal4 from '../Images/Arousal_4.png'
import Arousal5 from '../Images/Arousal_5.png'

import ProceedButton from '../LayoutComponents/ProceedButton';

const tdStyle = {
   flex: "auto",
    width: "175px",
    display: "flex",
    justifyContent: "center",
};

const questionTextStyle = {
    fontWeight: "bold"
};


const samPicturesValence = [
    {ref: Valence1},
    {ref: Valence2},
    {ref: Valence3},
    {ref: Valence4},
    {ref: Valence5}
];

const samPicturesArousal = [
    {ref: Arousal1},
    {ref: Arousal2},
    {ref: Arousal3},
    {ref: Arousal4},
    {ref: Arousal5}
];

export default class StressAndSamPre extends Component {

    constructor(props) {
        super(props);
        // set a state for each questionnaire item
        this.state = {
            questions: {
                samArousal: -99,
                samValence: -99,
            },
            // set a state to indicate which image was clicked
            activeSamValenceImage: -1,
            activeSamArousalImage: -1
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.isQuestionnaireComplete = this.isQuestionnaireComplete.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    isQuestionnaireComplete() {
        // check if all questions have a value other than -99 --> each question is answered, if yes, enable proceedphase button
        for (let property in this.state.questions) {
            if (this.state.questions.hasOwnProperty(property)) {
                //console.log(property + " = " + this.state[property]);
                if (this.state.questions[property] === -99) {
                    return false;
                }
            }
        }

        return true;
    }

    handleInputChange(event) {
        // Get the name and value of the clicked radio button and save it to the corresponding question state
        const target = event.target;
        const value = target.type === "image" ? target.alt : target.value;
        const name = target.name;

        let sam = {...this.state.questions};
        sam[name] = parseInt(value);
        this.setState({questions: sam});
    }

    render() {
        return(
            <div className="section" style={{width: "100%"}}>
                <div className="content">

                    <div>
                        <p style={questionTextStyle}>Bitte klicken Sie auf das Bild, das Ihrem aktuellen Befinden am besten entspricht</p>
                        <div className="row" style={{display: "flex"}}>
                            {samPicturesValence.map((pic, index) => (
                                <div key={index} className="ColumnRow" style={tdStyle}>
                                    <figure className="image">
                                        <input
                                            type="image"
                                            alt={index.toString()}
                                            src={pic.ref}
                                            style={
                                                {borderStyle: "solid", borderWidth: "5px",
                                                    borderColor: this.state.activeSamValenceImage === index ? "hsl(217, 71%,  53%)" : "white"}}
                                            key={index}
                                            name="samValence"
                                            onClick={(e) => {
                                                this.setState({activeSamValenceImage: index});
                                                this.handleInputChange(e)
                                            }}
                                        />
                                    </figure>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{marginTop: "50px"}}>
                        <p style={questionTextStyle}>Bitte klicken Sie auf das Bild, das Ihrem aktuellen Befinden am besten entspricht</p>
                        <div className="row" style={{display: "flex"}}>
                            {samPicturesArousal.map((pic, index) => (
                                <div key={index} className="ColumnRow" style={tdStyle}>
                                    <figure
                                        className="image">
                                        <input
                                            type="image"
                                            name="samArousal"
                                            alt={index.toString()}
                                            src={pic.ref}
                                            style={{borderStyle: "solid", borderWidth: "5px",
                                                borderColor: this.state.activeSamArousalImage === index ? "hsl(217, 71%, 53%)" : "white"}}
                                            onClick={(e) => {
                                                this.setState({activeSamArousalImage: index});
                                                this.handleInputChange(e)
                                            }}
                                        />
                                    </figure>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{marginTop: "50px"}}>
                    <ProceedButton disabled={!this.isQuestionnaireComplete()} onClick={() => this.props.proceedPhase(this.props.name, this.state.questions)}/>

                    </div>
                    </div>
            </div>
        );

    }
}