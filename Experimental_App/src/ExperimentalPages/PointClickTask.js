import React, { Component } from 'react';

import '../StyleSheets/PointClickButtons.css';
import KeyboardMouseTracker from "../KeyboardMouseTracker";
import EndofPracticeModal from "../LayoutComponents/EndofPracticeModal";


const taskContainerStyle = {
    height: "530px",
    width: "900px",
    border: "solid 3px black",
    marginTop: "10px"
    // backgroundColor: "#4169E1"
};

export default class PointClickTask extends Component {

    constructor(props) {
        super(props);

        const practiceTargets = [
            "Middle",
            50,
            "Middle",
            250,
            "Middle"
        ];

        this.state = {
            circlesClicked: 0,
            targets: practiceTargets,
            modal: "modal is-active",
            startModal: "modal",
            practice: true
        };

        this.endTask = this.endTask.bind(this);
        this.renderCircle = this.renderCircle.bind(this);
        this.clicked = this.clicked.bind(this);
        this.initializeTask = this.initializeTask.bind(this);
        this.initializePractice = this.initializePractice.bind(this);
    }

    componentDidMount() {


        window.scrollTo(0, 0);

        document.body.classList.add("is-clipped");

        // setup variable to store tracker data
        this.mouseKeyboardData = [];
        // get the start time of the component
        this.startTime = Date.now();

        const phase = this.props.name.slice(0, 2);

        if (phase === "Co") {
            this.initializeTask();
        }
    }

    initializePractice() {
        document.body.classList.remove("is-clipped");
        this.setState({
            modal: "modal",
        });
    }


    initializeTask() {

        this.trialStartTime = Date.now();

        // Positions of the click circles
        const trialTargets = [
            "Middle",
            206,
            "Middle",
            92,
            "Middle",
            259,
            "Middle",
            192,
            "Middle",
            348,
            "Middle",
            207,
            "Middle",
            89,
            "Middle",
            148,
            "Middle",
        ];

        document.body.classList.remove("is-clipped");
        this.setState({
            modal: "modal",
            startModal: "modal",
            targets: trialTargets,
            practice: false,
            circlesClicked: 0
        });
    }

    restart() {
        document.body.classList.add("is-clipped");
        this.setState({
            modal: "modal is-active",
            startModal: "modal",
            circlesClicked: 0
        })

    }


    clicked () {

        if (this.state.circlesClicked < this.state.targets.length - 1) {
            this.setState({
                circlesClicked: this.state.circlesClicked + 1
            });
        } else {
            // if all remaining circles are clicked end the practice trial or the task
            if (this.state.practice) {
                document.body.classList.add("is-clipped");
                this.setState({
                    startModal: "modal is-active"
                });
            } else {
                this.endTask();
            }

        }
        // if the circle is clicked with the number one greater than the previous clicked circle, increase circlesClicked
        // by one, if all circles are clicked, end the task
    }

    renderCircle() {

        let x;
        let y;

        if (this.state.circlesClicked & 1) {
            // Get a point on a circle circumference given the circle radius, the circle center point and an angle
            x = Math.cos(this.state.targets[this.state.circlesClicked]) * 230 + 450;
            y = Math.sin(this.state.targets[this.state.circlesClicked]) * 230 + 275;
        } else {
            x = 450;
            y = 275;
        }

        return(<circle
            style={{cursor: "pointer"}}
            key={this.state.circlesClicked}
            cx={x}
            cy={y}
            r="12"
            stroke="black"
            strokeWidth="2px"
            fill={"hsl(0, 0%, 86%)"}
            onClick={() => this.clicked()}/>);

    }

    endTask(){
        const data = {"taskLoaded": this.startTime, "trialStarted": this.trialStartTime, "taskEnded": Date.now(),
            "TrackerData": this.mouseKeyboardData};

        this.props.proceedPhase(this.props.name, data);
    }

    onKeyboardMouseEvent(datapoint) {
        // save mouse data and add page relevant info before pushing it into the data array
        const pageInfo = {
            circlesClicked: this.state.circlesClicked,
            practice: this.state.practice
        };

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
                            <h3>Übungsaufgabe "Kreis anklicken"</h3><br/>
                            <p>
                                In dieser Aufgabe geht es darum, <strong>den angezeigten Kreis mit der linken Maustaste anzuklicken</strong>.
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
                <p style={{
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                    UserSelect: "none"
                }}>
                    <strong>Klicken Sie auf den Kreis</strong>
                </p>
                <p style={{
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                    UserSelect: "none"
                }}>Verbleibende Durchgänge: {this.state.targets.length - this.state.circlesClicked} von {this.state.targets.length}</p>
                <svg style={taskContainerStyle}>
                    {this.renderCircle()}
                </svg>
                {this.renderInstructionModal()}
                {this.renderStartModal()}
            </div>
        );
    }

}