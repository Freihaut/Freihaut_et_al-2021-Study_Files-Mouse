import React, { Component } from 'react';

import DragCircle from '../LayoutComponents/DragCircle';
import KeyboardMouseTracker from "../KeyboardMouseTracker";
import EndofPracticeModal from "../LayoutComponents/EndofPracticeModal";


export default class DragDropTask extends Component {

    constructor(props) {
        super(props);

        // initial targets are the practice targets
        const practiceTrials = [
            [35, 35], [860, 35], [860, 490], [35, 490]
        ];

        this.state = {
            circlesDragged: 0,
            targets: practiceTrials,
            modal: "modal is-active",
            dragging: false,
            startModal: "modal",
            practice: true,
            onTarget: false
        };

        this.getDragInfo = this.getDragInfo.bind(this);
        this.endTask = this.endTask.bind(this);
        this.initializeTask = this.initializeTask.bind(this);
        this.returnPositions = this.returnPositions.bind(this);
        this.renderDragCircle = this.renderDragCircle.bind(this);
        this.initializePractice = this.initializePractice.bind(this);
        this.onTarget = this.onTarget.bind(this);

        this.key = 0;
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

        // add is mounted bool to prevent set state attempts after the component is already unmounted
        this._isMounted = true;
    }

    componentWillUnmount() {

        this._isMounted = false;
    }

    initializePractice() {

        document.body.classList.remove("is-clipped");

        this.setState({
            modal: "modal",
        });
    }

    initializeTask() {

        this.trialStartTime = Date.now();
        this.key = 0;

        const trialTargets =  [
            [35, 490],
            [860, 490],
            [35, 35],
            [860, 35],
            [860, 490],
            [860, 35],
            [35, 490],
            [860, 35],
            [860, 490],
            [35, 35],
            [35, 490],
            [860, 35],
        ];

        document.body.classList.remove("is-clipped");

        this.setState({
            modal: "modal",
            startModal: "modal",
            practice: false,
            circlesDragged: 0,
            targets: trialTargets
        });
    }

    restart() {
        document.body.classList.add("is-clipped");
        this.setState({
            modal: "modal is-active",
            startModal: "modal",
            circlesDragged: 0,
            onTarget: false
        })

    }

    // Check if the Draggable Circle is dropped Inside the Target Circle
    returnPositions(xPos, yPos) {
        let targetX = this.state.targets[this.state.circlesDragged][0];
        let targetY = this.state.targets[this.state.circlesDragged][1];

        let distToCircleCenter = Math.pow(targetX - xPos, 2) + Math.pow(targetY - yPos, 2);
        if (distToCircleCenter < Math.pow(10, 2)) {
            if (this.state.circlesDragged < this.state.targets.length - 1) {
                this.key ++;
                this.setState({
                    circlesDragged: this.state.circlesDragged + 1,
                    onTarget: false
                })
            } else {
                if (this.state.practice) {
                    this.key ++;
                    document.body.classList.add("is-clipped");
                    this.setState({
                        startModal: "modal is-active",
                        onTarget: false
                    })
                } else {
                    this.endTask();
                }
            }
        } else {
            // Return the circle to its initial position
            this.key ++;
            this.setState(this.state);
        }
    }

    onTarget(x, y){

        let targetX = this.state.targets[this.state.circlesDragged][0];
        let targetY = this.state.targets[this.state.circlesDragged][1];

        let distToCircleCenter = Math.pow(targetX - x, 2) + Math.pow(targetY - y, 2);
        if (distToCircleCenter < Math.pow(10, 2)) {
            this.setState({
                onTarget: true
            })
        } else {
            this.setState({
                onTarget: false
            })
        }

    }

    getDragInfo(bool) {
        if (this._isMounted) {
            if (bool){
                this.setState({dragging: true})
            } else {
                this.setState({dragging: false})
            }
        }
    }

    onKeyboardMouseEvent(datapoint) {
        // save mouse data and add page relevant info before pushing it into the data array
        // Info about the trial number and if the circle is being dragged or not
        const pageInfo = {
            circlesDragged: this.state.circlesDragged,
            circleNumber: this.key,
            dragging: this.state.dragging,
            practice: this.state.practice,
            onTarget: this.state.onTarget
        };

        Object.assign(datapoint, pageInfo);
        // console.log(datapoint);
        this.mouseKeyboardData.push(datapoint);
    }

    renderDragCircle() {
        return(<DragCircle x="450" y="265"
                           dragging={this.getDragInfo}
                           key={this.key}
                           returnPositions={this.returnPositions}
                           onTarget={this.onTarget}
        />)

    }

    endTask(){

        const data = {"taskLoaded": this.startTime, "trialStarted": this.trialStartTime, "taskEnded": Date.now(),
            "TrackerData": this.mouseKeyboardData};

        this.props.proceedPhase(this.props.name, data);
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
                            <h3>Übungsaufgabe "Kreis ziehen"</h3><br/>
                            <p>
                                In dieser Aufgabe geht es darum, <strong>den Kreis in der Bildschirmmitte in ein quadratisches
                                Zielfeld zu ziehen und dort loszulassen </strong> (sog. Drag & Drop).
                            </p>
                            <p>
                                Sie ziehen den Kreis, indem Sie ihn mit der linken Maustaste anklicken und dann Ihre Maus
                                mit gedrückter linker Maustaste bewegen. Um den Kreis loszulassen, lassen Sie die linke
                                Maustaste los.
                            </p>
                            <p>
                                Das Zielfeld ändert seine <span style={{color:"LightBlue", fontWeight: "bold"}}>Farbe</span>, sobald Sie den Kreis dort loslassen können. Wenn Sie den
                                Kreis aus Versehen außerhalb des Zielfeldes loslassen, kehrt
                                er an seine Ausgangsposition zurück. Der Kreis kehrt auch dann an seine Ausgangsposition
                                zurück, wenn Sie ihn außerhalb des gekennzeichneten Spielfelds ziehen.
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
                    <strong>Ziehen Sie den Kreis in das Quadrat</strong>
                </p>
                <p style={{
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                    UserSelect: "none"
                }}>Verbleibende Durchgänge: {this.state.targets.length - this.state.circlesDragged} von {this.state.targets.length}</p>
                <svg style={ {height: "530px",
                    width: "900px",
                    border: "solid 3px black",
                    marginTop: "10px",
                    cursor: this.state.dragging ? "grabbing" : "grab",
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                    UserSelect: "none"}}>
                    <rect x={this.state.targets[this.state.circlesDragged][0]-25}
                          y={this.state.targets[this.state.circlesDragged][1]-25}
                          width="50" height="50" stroke="black" strokeWidth="5px" fill={this.state.onTarget ? "LightBlue" : "white"}
                    style={{ WebkitUserSelect: "none",
                        MozUserSelect: "none",
                        msUserSelect: "none",
                        UserSelect: "none"}}/>
                    {this.renderDragCircle()}
                </svg>
                {this.renderInstructionModal()}
                {this.renderStartModal()}
            </div>
        );
    }

}