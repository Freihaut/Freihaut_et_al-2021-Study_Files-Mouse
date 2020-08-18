import React, { Component } from 'react';

/*
Slider-Captcha Component
Inspired by a Captcha offered by geetest.com
 */

import EndofPracticeModal from "../LayoutComponents/EndofPracticeModal";
import '../StyleSheets/Slider.css';
import KeyboardMouseTracker from "../KeyboardMouseTracker";

export default class Slider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pos: 0,
            taskNumber: 0,
            targets: [50, 60, 70],
            draggable: true,
            isDragging: false,
            modal: "modal is-active",
            practice: true,
            startModal: "modal"
        };

        this.endTask = this.endTask.bind(this);
        this.handleSlideEnd = this.handleSlideEnd.bind(this);
        this.slide = this.slide.bind(this);
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
        document.body.classList.remove("is-clipped");
        this.setState({
            modal: "modal",
            taskNumber: 0,
            targets: [68, 53, 87, 76, 92, 43, 70, 85, 59, 34, 66, 90],
            pos: 0,
            practice: false,
            startModal: "modal"
        });
    }

    restart() {
        document.body.classList.add("is-clipped");
        this.setState({
            modal: "modal is-active",
            startModal: "modal",
            taskNumber: 0,
            pos: 0
        })

    }

    endTask(){

        const data = {"taskLoaded": this.startTime, "trialStarted": this.trialStartTime, "taskEnded": Date.now(),
            "TrackerData": this.mouseKeyboardData};

        this.props.proceedPhase(this.props.name, data);
    }

    handleSlideEnd(event) {

        let value = parseInt(event.target.value);

        if (value === this.state.targets[this.state.taskNumber]) {

            if (this.state.taskNumber < this.state.targets.length - 1) {
                this.setState({
                    taskNumber: this.state.taskNumber + 1,
                    pos: 0,
                    draggable: false,
                    isDragged: false
                });

            } else {
                // if its the practice task
                if (this.state.practice) {
                    document.body.classList.add("is-clipped");
                    this.setState({
                        startModal: "modal is-active",
                        isDragged: false
                    });
                } else {
                    // if its no actual task
                    this.endTask();
                }

            }
        } else {
            // if the user released the slider, but it is not on the target
            this.setState({
                isDragged: false
            })
        }
    }

    slide(event) {

        if (this.state.draggable) {
            let value = parseFloat(event.target.value);
            this.setState(
                {pos: value,
                }
            )
        } else {
            this.setState(
                {
                    draggable: true,
                    isDragging: true
                }
            )
        }

    }

    // Function for saving the mouse and keyboard usage data
    onKeyboardMouseEvent(datapoint) {

        // save tracker datapoint and add page information to it before pushing it into the data array
        // Info about the trial and whether the participant is canDraw or not
        const pageInfo = {
            sliderNum: this.state.taskNumber,
            draggable: this.state.draggable,
            isDragging: this.state.isDragging,
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
                            <h3>Übungsaufgabe "Quadrat verschieben"</h3><br/>
                            <p>
                                <strong>Verschieben Sie den schwarzen Regler so, sodass das weiße Quadrat das graue Quadrat vollständig überdeckt</strong>.
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

        const slideBox = {
            backgroundColor: 'white',
            border: "solid 0.1px grey",
            width: 50,
            height: 50,
            transform: 'translateX(-65px)',
            float: "left"
        };

        const targetBox = {
            backgroundColor: 'black',
            opacity: "0.5",
            width: 50,
            height: 50,
            transform: "translateX(-15px) translateX(" + (-this.state.targets[this.state.taskNumber] / 100 * 20) + "px)",
            float: "left"
        };

        return(
            <div>
                <KeyboardMouseTracker onEvent={this.onKeyboardMouseEvent.bind(this)}/>
                    <p style={{
                        WebkitUserSelect: "none",
                        MozUserSelect: "none",
                        msUserSelect: "none",
                        UserSelect: "none"
                    }}>
                        <strong>Ziehen Sie das weiße Quadrat auf das graue Quadrat</strong>
                    </p>
                    <p style={{
                        WebkitUserSelect: "none",
                        MozUserSelect: "none",
                        msUserSelect: "none",
                        UserSelect: "none"
                    }}>Verbleibende Durchgänge: {this.state.targets.length - this.state.taskNumber} von {this.state.targets.length}</p>

                    <div id="task_container" style={{
                        width: "900px",
                        height: "530px",
                        backgroundColor: "white",
                        opacity: "0.7",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        border: "3px solid black",
                        marginTop: "10px"
                    }}>

                        <div id="box_slider" style={{
                            width: "700px",
                            height: "50px",
                            margin: "0 auto"
                        }}>

                            <div style={{width: "100%", transform: "translateX(" + this.state.targets[this.state.taskNumber] + "%)"}}>
                                <div style={targetBox}></div>
                            </div>
                            <div style={{width: "100%",
                                transform: "translateX(" + this.state.pos + "%) translateX(" + (-this.state.pos / 100 * 20) + "px)"
                            }}>
                                <div style={slideBox}></div>
                            </div>

                        </div>

                        <label style={{justifyContent: "center", display: "flex", alignItems: "flex-end", height:"50px"}}>
                            <input
                                style={{width: "700px"}}
                                className="custom_slider"
                                step="1" min="0" max="100"
                                // defaultValue="0"
                                value={this.state.pos}
                                type="range"
                                name="effort"
                                onChange={this.slide}
                                onMouseUp={this.handleSlideEnd}
                                onKeyDown={(event) => {event.preventDefault()}}
                            />
                        </label>
                    </div>
                {this.renderInstructionModal()}
                {this.renderStartModal()}
            </div>
        )
    }

}
