import React, { Component } from 'react';

// import instruction picture
import Keyboard from '../Images/Keyboard.png';
import KeyboardMouseTracker from "../KeyboardMouseTracker";
import EndofPracticeModal from "../LayoutComponents/EndofPracticeModal";

const cardStyle = {
    width: "700px",
    marginTop: "15px",
};

export default class PatternTyping extends Component {

    constructor(props) {
        super(props);

        const practiceText = ["12QW87", "5g8Ci3", "987bC"];

        this.inputRef = React.createRef();
        this.state = {
            textIsCorrect: true,
            textNumber: 0,
            text: practiceText,
            modal: "modal is-active",
            practice: true,
            startModal: "modal"
        };

        this.endTask = this.endTask.bind(this);
        this.checkIfEqual = this.checkIfEqual.bind(this);
        this.initializeTask = this.initializeTask.bind(this);
        this.checkInput = this.checkInput.bind(this);
        this.initializePractice = this.initializePractice.bind(this);
    }

    componentDidMount() {

        window.scrollTo(0, 0);

        document.body.classList.add("is-clipped");

        // setup variable to hold store mousekeyboard data
        this.mouseKeyboardData = [];
        // get the start time of the component
        this.startTime = Date.now();

        const phase = this.props.name.slice(0, 2);

        if (phase === "Co") {
            this.initializeTask();
        }
    }


    initializeTask() {

        this.trialStartTime = Date.now();

        // Test to retype
        const trialText = ["6a5CiM", "7cJhWs", "3Kzn1H", "Tz3j98", "3pkabE", "yEN3fD", "hf6GaS", "j27N7i"];

        document.body.classList.remove("is-clipped");

        this.setState({
            modal: "modal",
            startModal: "modal",
            practice: false,
            textNumber: 0,
            text: trialText,
        });

        this.inputRef.current.value = "";
        this.inputRef.current.focus();
    }

    initializePractice() {

        document.body.classList.remove("is-clipped");

        this.setState({
            modal: "modal",
        });
        this.inputRef.current.value = "";
        this.inputRef.current.focus();
    }

    restart() {

        document.body.classList.add("is-clipped");

        this.setState({
            modal: "modal is-active",
            startModal: "modal",
            textNumber: 0
        })

    }



    checkIfEqual (event) {
        // get the value and length of the written text in the text field
        let writtenText = event.target.value.trim();
        let textLen = writtenText.length;

        if (writtenText === this.state.text[this.state.textNumber]) {
            // if the written text is the same as the text to retype, show next text or end the task
            if (this.state.textNumber < this.state.text.length - 1) {
                this.setState({
                    textIsCorrect: true,
                    textNumber: this.state.textNumber + 1
                });
                event.target.value = "";
            } else {
                // if the last text was written down, end the practice or end the task
                if (this.state.practice) {
                    document.body.classList.add("is-clipped");
                    this.setState({
                        startModal: "modal is-active"
                    })
                } else {
                    this.endTask();
                }
            }
        } else if (this.state.text[this.state.textNumber].slice(0, textLen) !== writtenText) {
            // if the the text is the same as the sliced text to retype, show no error
            this.setState({
                textIsCorrect: false,
            })
        } else {
            // if the user makes a typing mistake, show error --> set state to incorrect
            this.setState({
                textIsCorrect: true,
            })
        }
    }

    // Only allows to type in numbers on the numpad and the backspace key
    checkInput(e) {
        // prevent numpad, arrow and delete key usage use
        if (e.location === 3 || (e.keyCode >= 33 && e.keyCode <= 47)) {
            e.preventDefault();
        }
    }

    // prevent clicking inside the input field
    preventClicking(e){
        e.preventDefault();
        this.inputRef.current.focus();
    }

    endTask(){

        const data = {"taskLoaded": this.startTime, "trialStarted": this.trialStartTime, "taskEnded": Date.now(),
        "TrackerData": this.mouseKeyboardData};

        clearTimeout(this.end);
        this.props.proceedPhase(this.props.name, data);
    }

    onKeyboardMouseEvent(datapoint) {

        let pageInfo;

        if (datapoint.eventType === "KeyDown" || datapoint.eventType === "KeyUp") {
            // if its a keyPress Event check if a valid key was pressed or not
            if (datapoint.location === 3 || (datapoint.keyCode >= 33 && datapoint.keyCode <= 47)) {
                pageInfo = {
                    isPractice: this.state.practice,
                    isCorrect: this.state.textIsCorrect,
                    taskNumber: this.state.textNumber,
                    validKey: false
                };
            } else {
                pageInfo = {
                    isPractice: this.state.practice,
                    isCorrect: this.state.textIsCorrect,
                    taskNumber: this.state.textNumber,
                    validKey: true
                }
            }
        } else {
            // if it was no keyevent, ignore if valid key was pushed
            pageInfo = {
                isPractice: this.state.practice,
                isCorrect: this.state.textIsCorrect,
                taskNumber: this.state.textNumber,
                validKey: null
            }
        }


        Object.assign(datapoint, pageInfo);
        this.mouseKeyboardData.push(datapoint);
    }

    renderInstructionModal(){
        return (
            <div className={this.state.modal} style={{textAlign: "left", fontSize: "18px"}}>
                <div className="modal-background">{null}</div>
                <div className="modal-content">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{null}</p>
                    </header>
                    <section className="modal-card-body">
                        <div className="content">
                            <h3>Übungsaufgabe "Abschreiben"</h3><br/>
                            <p>
                                In dieser Aufgabe geht es darum, <strong>Reihen aus Buchstaben und Zahlen korrekt
                                abzuschreiben</strong>.
                            </p>
                            <p>
                                Sie können Zahlen <strong>nur mit den Zifferntasten über den Buchstaben abschreiben und nicht mit dem NumPad (Nummernblock)</strong>.
                                Sie können Fehler <strong>nur mit der Backspace-Taste (Rücktaste) korrigieren</strong> (siehe Bild).
                            </p>
                            <figure className={"image"}>
                                <img src={Keyboard} alt={"Keyboard_Image"}/>
                            </figure>
                            <p>
                                Wenn Sie einen Fehler beim Abschreiben machen, wird Ihnen dies angezeigt.
                            </p>
                            <p>
                                Die Aufgabe endet nach einigen Durchgängen. Die verbleibende Anzahl an Durchgängen wird Ihnen
                                angezeigt.
                            </p>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-link" onClick={this.initializePractice}>Übungsaufgabe starten</button>
                    </footer>
                </div>
            </div>
        )
    }

    renderStartModal(){
        return(
            <EndofPracticeModal startModal={this.state.startModal} restart={() => this.restart()} initializeTask={this.initializeTask}/>
        )
    }

    render() {
        return(
            <div>
                <KeyboardMouseTracker onEvent={this.onKeyboardMouseEvent.bind(this)}/>
                <div className="card" style={cardStyle}>
                    <header className="card-header">
                        <p style={{padding: "0.75rem", flexGrow: "1"}}>
                            <strong>Schreiben Sie Reihen aus Buchstaben und Zahlen in das Textfeld ab</strong><br/>
                            Verbleibende Durchgänge: {this.state.text.length - this.state.textNumber} von {this.state.text.length}
                        </p>
                        {/*<p className="card-header-title">*/}
                        {/*    test <br/>*/}
                        {/*    Verbleibende Durchgänge: {this.state.text.length - this.state.textNumber} von {this.state.text.length}*/}
                        {/*</p>*/}
                    </header>
                    <div className="card-content" style={{marginTop: "30px"}}>
                        <div className="content">
                            <p style={{fontSize: "26px",
                                WebkitUserSelect: "none",
                                MozUserSelect: "none",
                                msUserSelect: "none",
                                UserSelect: "none"}}>
                                {this.state.text[this.state.textNumber]}
                            </p>
                        </div>
                        <div className="field">
                            <p style={{color: "hsl(348, 100%, 61%)",
                                visibility: this.state.textIsCorrect ? "hidden" : "visible"}}>
                                Bitte korrigieren Sie den Fehler.
                            </p>
                            <div className="control" style={{display: "flex", justifyContent: "center", marginBottom: "30px"}}>
                                <input style={{width: "115px", textAlign: "left"}}
                                       ref={this.inputRef}
                                       onMouseDown={(event) => this.preventClicking(event)}
                                       onKeyDown={this.checkInput}
                                       onKeyUp={this.checkIfEqual}
                                       className={this.state.textIsCorrect ? "input is-large is-link" : "input is-large is-danger"}
                                       spellCheck={false}/>
                            </div>
                        </div>
                    </div>
                </div>
                {this.renderInstructionModal()}
                {this.renderStartModal()}
            </div>
        );
    }

}