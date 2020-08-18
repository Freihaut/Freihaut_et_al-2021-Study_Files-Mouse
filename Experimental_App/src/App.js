import React, {Component} from 'react';
import './App.css';

// firebase imports
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

// CSS Framework Import
import 'bulma/css/bulma.css';
import 'bulma-extensions/dist/css/bulma-extensions.min.css';

// Navbar for Debugging to skip and go back
import Navbar from './LayoutComponents/Navbar';

// Browser Logos when bad browsers are used
import Firefox_logo from './Images/firefox.png';
import Chro_logo from './Images/chrome.png';

//Experimental Pages Import

// Text (Instructions)
import IntroPage from './ExperimentalPages/IntroPage';
import TrialInstruction from './ExperimentalPages/TrialInstruction';
import TrialStart from "./ExperimentalPages/TrialStart";
import Debriefing from "./ExperimentalPages/Debriefing";
import DonationOption from "./ExperimentalPages/DonationOption";
import End from "./ExperimentalPages/End";
// Questions
import Soziodem from './ExperimentalPages/Soziodem';
import Mdbf from './ExperimentalPages/Mdbf';
import SamStress from './ExperimentalPages/Sam';
// Keyboard & Mouse Tasks
import DragDropTask from './ExperimentalPages/DragDropTask';
import FollowBoxTask from './ExperimentalPages/FollowBoxTask';
import PatternTyping from './ExperimentalPages/PatternTyping';
import Slider from './ExperimentalPages/Slider_Captcha';
import PointClickTask from './ExperimentalPages/PointClickTask';
// Stress manipulation
import CountTask from "./ExperimentalPages/CountTask";
import CountTaskAnswer from "./ExperimentalPages/CountTaskAnswer";

// trait stress questionnaire currently not used
// import PSS module


export default class App extends Component {

    constructor(props) {
        super(props);

        // get a random condition
        // draw a random condition: 0 = high stress; 1 = low stress
        let condition = Math.floor(Math.random() * 2);

        // Helper function that shuffles an array from
        // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array?page=1&tab=votes#tab-top
        const shuffleArray = function(array){
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        };

        // randomly shuffle the task order
        let taskOrder = [
            0, 1, 2, 3, 4
        ];

        // Randomly shuffle the Task Array
        shuffleArray(taskOrder);

        // initialize state
        this.state = {
            // keeps track of the page number
            phase: 0,
            // experimental condition
            condition: condition,
            //task order
            taskOrder: taskOrder,
            // start time of page
            pageTime: null,
            // Count Task Solution
            countTaskSolution: 0,
            // count task answer
            countTaskAns: 0,
            // hide mouse cursor during count task
            hideCursor: false,
            // if the user is on the last page, dont alert when closing the tab anymore
            lastPage: false,
            // firebase stuff
            uniqueId: true, //change to null in the production (firebase is setting the uniqueId)
            // media query check
            failsMediaCheck: false,
            // check if InternetExplorer or Edge is used as a browser
            isInternetExplorer: false,
            isEdge: false
        };

        this.proceedPhase = this.proceedPhase.bind(this);
        this.updateScore = this.updateScore.bind(this);
        this.updateAns = this.updateAns.bind(this);
        this.renderComponent = this.renderComponent.bind(this);
        this.renderSigningIn = this.renderSigningIn.bind(this);
        this.renderSmallScreen = this.renderSmallScreen.bind(this);
        this.renderIsInternetExplorer = this.renderIsInternetExplorer.bind(this);
        this.renderIsEdge = this.renderIsEdge.bind(this);
        this.restart = this.restart.bind(this);

    }

    componentDidMount() {

        // track the number of times the study is restarted
        this.numOfRestarts = 0;

        // The App currently lacks some functions and does not log some data, because it would require that
        // the app is connected with a firebase project. If you want to use all functions of the app, please
        // create a firebase project, uncomment all firebase references in the App.js file (there are no other files
        // that require umcomments) and fill in your firebase credentials in the initializeApp object

        // // initialize the firebase web app: Put your firebase credentials here
        // firebase.initializeApp( {
        //     apiKey: "",
        //     authDomain: "",
        //     databaseURL: "",
        //     projectId: "",
        //     storageBucket: "",
        //     messagingSenderId: "",
        //     appId: "",
        //     measurementId: ""
        // });
        //
        // // if the firebase state changes (someone logs into the app)
        // firebase.auth().onAuthStateChanged(user => {
        //     // if the user successfully signed in
        //     if (user) {
        //
        //         // get some metadata about the experiment --> stringify it that page will still work even if
        //         // data to save contains null or NaN
        //         this.startTime = Date.now();
        //
        //         // get the url parameter with the participant panel id (fill in panel parameter)
        //         const urlParams = new URLSearchParams(window.location.search);
        //         const panelId = urlParams.has("a") ? urlParams.get("a") : "undefined";
        //
        //         // check if the browser is internet explorer or edge
        //         // Internet Explorer 6-11
        //         const isIE = /*@cc_on!@*/false || !!document.documentMode;
        //         // Edge 20+
        //         const isEdge = !isIE && !!window.StyleMedia;
        //
        //
        //         const ExperimentMetaData = JSON.parse(JSON.stringify({
        //             startTime: this.startTime,
        //             userAgent: navigator.userAgent,
        //             condition: this.state.condition,
        //             taskOrder: this.state.taskOrder,
        //             initScreenProps: {height: window.innerHeight, width: window.innerWidth},
        //             initZoom: window.devicePixelRatio * 100,
        //             panelId: panelId,
        //             isInternetExplorer: isIE,
        //             isEdge: isEdge
        //         }));
        //
        //         // Log the experiment metadata for debugging
        //         // console.log("User started experiment with id: ", user.uid);
        //         // for (let [key, value] of Object.entries(ExperimentMetaData)) {
        //         //     console.log(`${key}: ${value}`);
        //         // }
        //
        //         // start the experiment by setting the state and saving the meta data in the database
        //         this.setState({
        //                 uniqueId: user.uid,
        //                 pageTime: this.startTime
        //             }, function () {
        //                 // save the meta data in the database
        //                 firebase.database().ref(user.uid).set({
        //                     ExperimentMetaData
        //                 })
        //             }
        //         );
        //
        //         // use the css media query programmatically (check whether the screen size is smaller than allowed and whether
        //         // there is a pointer device and hover): if the test fails, don't allow the participant to continue and show
        //         // a message that the study requirements are not matched
        //         let mql = window.matchMedia('only screen and (max-width: 950px), screen and (max-height: 600px), not (pointer: fine), not (hover: hover)');
        //         // initially check the media query
        //         if (mql.matches) {
        //             this.setState({
        //                 failsMediaCheck: true
        //             }, function () {
        //                 firebase.database().ref(user.uid + "/ExperimentMetaData").update({
        //                     failsInitialMediaCheck: true
        //                 })
        //             })
        //         } else {
        //             this.setState({
        //                 failsMediaCheck: false
        //             })
        //         }
        //
        //         mql.addListener(ev => {
        //             if (ev.matches) {
        //                 this.setState({
        //                     failsMediaCheck: true
        //                 }, function () {
        //                     const time = Date.now();
        //                     firebase.database().ref(user.uid + "/ExperimentMetaData").update({
        //                         ["failsMediaCheck_" + time.toString()] : this.state.phase
        //                     })
        //                 })
        //             } else {
        //                 this.setState({
        //                     failsMediaCheck: false
        //                 })
        //             }
        //         });
        //
        //         // set state based on the used browser (IE and Edge are not allowed because they do not reliably work
        //         this.setState({
        //             isInternetExplorer: isIE,
        //             isEdge: isEdge
        //         })
        //
        //     }
        //
        // });
        //
        // // sign in anonymously as a new user whenever a new experiment tab is opened
        // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
        //     .then(function () {
        //         return firebase.auth().signInAnonymously();
        //     })
        //     .catch(function (error) {
        //         let errorCode = error.code;
        //         let errorMessage = error.message;
        //         console.log(errorCode, errorMessage)
        //     });

    }


    // go back a phase (only relevant for debugging)
    goBackPhase(){
        if (this.state.phase > 0) {
            this.setState({phase: this.state.phase - 1});
        }
    }

    // same as proceedPhase, just for debugging
    advancePhase(){
        this.setState({phase: this.state.phase + 1})
    }

    proceedPhase(phaseName, data){

        const pageEndTime = Date.now();
        const pageDuration = pageEndTime - this.state.pageTime;
        const screenProps = {height: window.innerHeight, width: window.innerWidth};
        const pageZoom = window.devicePixelRatio * 100;

        // log the page metadata for debugging
        // console.log("\n");
        // console.log("End of " + phaseName);
        // console.log("Timestamp", pageEndTime);
        // console.log("Page Duration: ", pageDuration);
        // console.log("End of Page Screen Props: ", screenProps);
        // console.log("End of Page Zoom: ", pageZoom);

        // // save page metadata (of all pages)
        // firebase.database().ref(this.state.uniqueId + "/" + phaseName + "/MetaData").update({
        //     pageEndTime: pageEndTime === undefined ? "undefined" : pageEndTime,
        //     pageDuration: pageDuration === undefined ? "undefined" : pageDuration,
        //     screenProps: screenProps,
        //     pageZoom: pageZoom === undefined ? "undefined" : pageZoom
        // });

        // // save the name of the completed page in the experiment meta data
        // firebase.database().ref(this.state.uniqueId + "/ExperimentMetaData").update({
        //    lastCompletedPage: phaseName
        // });

        // // save page data (if there is data on the page)
        // if (data) {
        //    // log the data for debugging
        //    //  console.log("Page Data: ", data);
        //
        //     firebase.database().ref(this.state.uniqueId + "/" + phaseName).update({
        //         data
        //     })
        // }

        if(phaseName === "DonationOption"){
            console.log((Date.now() - this.startTime) / 1000 / 60);
        }

        // if the last page is reached remove the unbeforeunload event listener (should be done through props and not here)
        if (phaseName === "Debriefing") {
            // // if the study finished, update MetaData with study finish information
            // firebase.database().ref(this.state.uniqueId + "/ExperimentMetaData").update({
            //     hasCompleted: true,
            //     studyDuration: Date.now() - this.startTime,
            // });
            // go to the final page
            this.setState({
                phase: this.state.phase + 1,
                pageTime: pageEndTime,
                lastPage: true
            });
        } else {
            // go to the next page
            this.setState({
                phase: this.state.phase + 1,
                pageTime: pageEndTime,
                lastPage: false
            });
        }
    }

    // if the participant doesnt use a mouse, but then numOfRestarts the study with a mouse
    restart(){
        // incremeant the number of numOfRestarts counter
        this.numOfRestarts ++;

        const dataToSave = this.numOfRestarts;

        // save the number of numOfRestarts
        // firebase.database().ref(this.state.uniqueId + "/ExperimentMetaData").update({
        //     restarts: dataToSave
        // });

        // restart the study by resetting the phase to 0
        this.setState({
            phase: 0
        })
    }

    // start the study with the edge browser after having read the edge notification
    startWithEdge(){
        // set the edge state to false in order to render the "real study". Edge information is logged in the Meta-Data
        this.setState({
            isEdge: false
        })
    }

    // Update score of count task after the task
    updateScore(taskNum) {
        this.setState({
            countTaskSolution: this.state.countTaskSolution + taskNum
        })
    }

    updateAns(ans) {
        this.setState({
            countTaskAns: this.state.countTaskAns + ans
        })
    }

    // hide the mouse cursor during the count task
    hideMouseCursor() {
        this.setState({
            hideCursor: true
        })
    }

    // show the mouse cursor again after the count task
    showMouseCursor() {
        this.setState({
            hideCursor: false
        })
    }

    // create the entire experimental flow and render the page the participant is on
    renderComponent(phase) {

        // if the last page has not been reached yet, alert participant that their data is lost on page unload, else
        // if the last page was reached, turn off the alert
        if (this.state.lastPage) {
            window.onbeforeunload = null;
        } else {
            // add a warning message to unloading that data is not saved
            window.onbeforeunload = function () {
                return "Sind Sie sicher, dass Sie diese Seite verlassen möchten? Das Verlassen der Seite beendet die" +
                    "Studie automatisch. Sie können die Studie nicht an dieser Stelle fortsetzen und Ihre Daten gehen verloren.";
            };
        }

        // Helper function that adds new items (of an array) to another array starting at a specific index
        const insert = (arr, index, newItems) => [
            // part of the array before the specified index
            ...arr.slice(0, index),
            // inserted items
            ...newItems,
            // part of the array after the specified index
            ...arr.slice(index)
        ];

        // TODO: There might be good optimizations in order to not call this heavy method each time a new component is rendered

        //store all Mouse and Keyboard Tasks
        // if changes to this array are made, the task order array in the constructor needs to be adapted, too!
        let mouseKeyboardTasks = [
            {name: "PointClick", page: <PointClickTask proceedPhase={this.proceedPhase}/>},
            {name: "FollowBox", page:  <FollowBoxTask proceedPhase={this.proceedPhase} />},
            {name: "DragDrop", page: <DragDropTask proceedPhase={this.proceedPhase}/>},
            {name: "Slider", page: <Slider proceedPhase={this.proceedPhase}/>},
            {name: "PatternTyping", page: <PatternTyping proceedPhase={this.proceedPhase}/>}
        ];

        // reorder the task array according to the randomized order created in the constructor
        mouseKeyboardTasks = this.state.taskOrder.map(i => mouseKeyboardTasks[i]);

        // Store all Condition pages
        const conditionTrial = [
            <TrialInstruction name={"Con_Instr"} condition={this.state.condition} proceedPhase={this.proceedPhase}/>,
            <CountTask name={"Pr_Count"} key={0} order={0} updateScore={this.updateScore} proceedPhase={this.proceedPhase}
                       condition={this.state.condition} showMouseCursor={() => this.showMouseCursor()} hideMouseCursor={() => this.hideMouseCursor()}/>,
            <TrialStart name={"TrialStart"} condition={this.state.condition} proceedPhase={this.proceedPhase}/>
        ];

        // store all paged of the Practice Trial
        const practiceTrial = [
           <TrialInstruction name={"Pr_Instruction"} condition={this.state.condition} proceedPhase={this.proceedPhase}/>,
        ];

        // fill the high and low stress condition arrays with trios of a Mental Arithmetic Task, a Mouse or Keyboard Task
        // and a SAM
        for (let i=0; i < mouseKeyboardTasks.length; i++) {
            // get the name of the phase
            let taskName = mouseKeyboardTasks[i].name;
            let task = mouseKeyboardTasks[i].page;

            // add tasks together with stressor and sam to the trial pages
            conditionTrial.push(
                <CountTask name={"Con_Count_" + taskName} key={i+1} order={i} updateScore={this.updateScore} proceedPhase={this.proceedPhase}
                           condition={this.state.condition} showMouseCursor={() => this.showMouseCursor()} hideMouseCursor={() => this.hideMouseCursor()}/>,
                <CountTaskAnswer name={"Con_CountAns_" + taskName} proceedPhase={this.proceedPhase} updateAns={this.updateAns}/>,
                React.cloneElement(task, {name: "Con_" + taskName}),
                <SamStress name={"Con_Sam_" + taskName} proceedPhase={this.proceedPhase}/>
            );

            // add tasks together with sam to the practice pages
            practiceTrial.push(
                React.cloneElement(task, {name: "Pr_" + taskName}),
                <SamStress name={"Pr_Sam_" + taskName} proceedPhase={this.proceedPhase}/>
            );
        }

        // Add the end pages to the End of the trial pages
        conditionTrial.push(
            <Mdbf name={"Con_Mdbf"} proceedPhase={this.proceedPhase}/>,
        );

        // add the end pages to the end of the practice pages
        practiceTrial.push(
            <Mdbf name={"Pr_Mdbf"} proceedPhase={this.proceedPhase}/>,

        );

        // Create arrays of "standard pages (that are not shuffled and dont depend on the condition)
        let startPages = [
            <IntroPage name={"Intro"} proceedPhase={this.proceedPhase}/>,
            <Soziodem name={"Soziodem"} proceedPhase={this.proceedPhase} restart={this.restart} uid={this.state.uniqueId}/>,
        ];

        let endPages = [
            <DonationOption name={"DonationOption"} proceedPhase={this.proceedPhase}/>,
            <Debriefing name={"Debriefing"} condition={this.state.condition} proceedPhase={this.proceedPhase}
                        ans={this.state.countTaskAns} solution={this.state.countTaskSolution}/>,
            <End name={"EndPage"}/>,
               ];

        // initialize the Experimental Flow (order of all pages)
        let expFlow;

        // add all arrays with experimental pages to the expFlow starting chronologically from the beginning of the experiment (order in array is order
        // of shown pages
        expFlow = startPages;

        // add the practice pages to the expFlow
        expFlow = insert(expFlow, expFlow.length, practiceTrial);
        // add the conditian trial pages
        expFlow = insert(expFlow, expFlow.length, conditionTrial);
        // add the end pages
        expFlow = insert(expFlow, expFlow.length, endPages);

        return (
           expFlow[phase]
        )
    }

    // render this while firebase is initializing
    renderSigningIn() {

        window.onbeforeunload = null;

        return (
            <div className="section">
                <div className="content">
                    <h1>Das Experiment wird geladen. Bitte warten.</h1>
                    <h3>
                        Falls Sie diese Nachricht länger als 5 Sekunden gesehen haben, kann es sein, dass
                        etwas beim Laden des Experiments schief gelaufen ist. Versuchen Sie bitte die Seite neu zu laden.
                    </h3>
                </div>
            </div>);
    }

    // if the participant uses a too small screen to view the study and has no mouse as an input device (smartphones
    // or tablets)
    renderSmallScreen() {

        window.onbeforeunload = null;

        return(
            <div className="small-screen">
                <div style={{margin: "auto"}}>
                    <div className="section">
                        <div className="content" style={{maxWidth: "600px"}}>
                            <h5 style={{color: "red"}}>Wichtiger Teilnahmehinweis</h5>
                            <p>
                                Sehr geehrte Teilnehmerin, sehr geehrter Teilnehmer,
                            </p>
                            <p>
                                vielen Dank für Ihr Interesse an dieser Studie. Leider kann Ihnen die Studie gerade nicht
                                angezeigt werden. Die Bearbeitung der Studie erfordert eine Bildschirmmindestgröße und die
                                Studie kann nur mit Computermaus und Tastatur, nicht aber mit Touch bearbeitet werden. Eine Teilnahme
                                am Smartphone oder Tablet ist daher nicht möglich.
                            </p>
                            <p>
                                Bitte versuchen Sie die Studie an einem größerem Bildschirm durchzuführen und verwenden Sie eine
                                Computermaus und Tastatur. Vielen Dank für Ihr Verständnis. Stellen Sie außerdem sicher, dass der
                                Zoom Ihres Webbrowsers auf 100% gestellt ist.
                            </p>
                            <p>
                                Falls Sie Fragen zu der Studie haben oder die genannten technischen Voraussetzungen erfüllen,
                                Ihnen die Studie aber dennoch nicht angezeigt wird, können Sie uns jederzeit kontaktieren.
                            </p>
                            <p>
                                Paul Freihaut, M.Sc. <br/>
                                Universität Freiburg <br/>
                                Wirtschaftspsychologie <br/>
                                Engelbergerstraße 41 <br/>
                                D-79085 Freiburg <br/>
                                E-Mail: <a href={"mailto:paul.freihaut@psychologie.uni-freiburg.de"}>paul.freihaut@psychologie.uni-freiburg.de</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // if the participant uses internet explorer as a webbrowser to view the study (study cant be used with internet
    // explorer
    renderIsInternetExplorer(){

        window.onbeforeunload = null;

        return(
            <div>
                <div style={{maxWidth: "900px", margin: "0px auto", fontSize: "x-large"}}>
                    <div className="section">
                        <div className="content">
                            <h5 style={{color: "red"}}>Wichtiger Teilnahmehinweis</h5>
                            <p>
                                Sehr geehrte Teilnehmerin, sehr geehrter Teilnehmer,
                            </p>
                            <p>
                                vielen Dank für Ihr Interesse an dieser Studie! Leider kann Ihnen die Studie nicht angezeigt werden.
                                Ihr Programm (Internet Browser) mit dem Sie diese Studie aufgerufen haben, unterstützt nicht alle Funktionen, die
                                notwendig sind, damit die Studie ordnungsgemäß durchgeführt werden kann.
                            </p>
                            <p>
                                Falls Sie dennoch an der Studie teilnehmen möchten, empfehlen wir, die Studie in einem
                                der beiden folgenden Internet Browser aufzurufen:
                            </p>
                            <ul style={{listStyleType: "none"}}>
                                <li><span style={{marginRight: "10px"}}><img style={{width: "32px", height: "32px"}} src={Firefox_logo} alt={"Firefox-Logo"}/></span><strong>Mozilla Firefox</strong></li>
                                <li><span style={{marginRight: "10px"}}><img style={{width: "32px", height: "32px"}} src={Chro_logo} alt={"Chrome-Logo"}/></span><strong>Google Chrome</strong></li>
                            </ul>
                            <p>
                                Vielen Dank für Ihr Verständnis! Bei Fragen können Sie uns gerne jederzeit kontaktieren.
                            </p>
                            <p>
                                Paul Freihaut, M.Sc. <br/>
                                Universität Freiburg <br/>
                                Wirtschaftspsychologie <br/>
                                Engelbergerstraße 41 <br/>
                                D-79085 Freiburg <br/>
                                E-Mail: <a href={"mailto:paul.freihaut@psychologie.uni-freiburg.de"}>paul.freihaut@psychologie.uni-freiburg.de</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // warning if the participant uses edge as the browser to view the study (the study might not be stable on edge)
    renderIsEdge(){

        window.onbeforeunload = null;

        return(
            <div style={{height: "100vh", display: "flex", flexDirection: "column", fontSize: "large"}}>
                <div style={{margin: "auto"}}>
                    <div className="section">
                        <div className="content" style={{maxWidth: "900px"}}>
                            <h5 style={{color: "red"}}>Wichtiger Teilnahmehinweis</h5>
                            <p>
                                Sehr geehrte Teilnehmerin, sehr geehrter Teilnehmer,
                            </p>
                            <p>
                                vielen Dank für Ihr Interesse an dieser Studie! Bevor Sie die Studie beginnen, möchten
                                wir Sie darauf hinweisen, dass Ihr Internet Browser, mit dem
                                Sie diese Studie gerade aufgerufen haben, unter Umständen nicht alle Funktionen der Studie
                                unterstützt.
                            </p>
                            <p>
                                Falls es Ihnen möglich ist, empfehlen wir, die Studie in einem der beiden folgenden Internet Browser
                                aufzurufen:
                            </p>
                            <ul style={{listStyleType: "none"}}>
                                <li><span style={{marginRight: "10px"}} className="icon"><img src={Firefox_logo} alt={"Firefox-Logo"}/></span><strong>Mozilla Firefox</strong></li>
                                <li><span style={{marginRight: "10px"}} className="icon"><img src={Chro_logo} alt={"Chrome-Logo"}/></span><strong>Google Chrome</strong></li>
                            </ul>
                            <p>
                                Falls es Ihnen nicht möglich ist, die Studie in einem anderen Internet Browser aufzurufen,
                                können Sie jetzt dennoch an der Studie teilnehmen, Sie sollten jedoch darauf gefasst sein, dass
                                eventuell nicht alles optimal dargestellt wird.
                            </p>
                            <p>
                               Bei Fragen können Sie uns gerne jederzeit kontaktieren.
                            </p>
                            <p>
                                Paul Freihaut, M.Sc. <br/>
                                Universität Freiburg <br/>
                                Institut für Psychologie <br/>
                                Wirtschaftspsychologie <br/>
                                Engelbergerstraße 41 <br/>
                                D-79085 Freiburg <br/>
                                E-Mail: <a href={"mailto:paul.freihaut@psychologie.uni-freiburg.de"}>paul.freihaut@psychologie.uni-freiburg.de</a>
                            </p>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: "58px",
                            }} className="control">
                                <button className="button is-link" onClick={() => this.startWithEdge()}
                                >An Studie teilnehmen</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    render() {

        return (

            <div style={this.state.hideCursor ? {cursor: "none"} : {}}>

                {this.state.failsMediaCheck ?
                    // render this when the screen is too small and no mouse was detected render this
                    this.renderSmallScreen()
                    :
                    !this.state.isInternetExplorer && !this.state.isEdge ?
                        // render the experiment if the media check does not fail and the user uses an allowed browser
                        <div className="outerContainer">
                            {/*Navbar is for debugging to be able to skip through the experimental pages*/}
                            {<Navbar proceedPhase={() => this.advancePhase()} goBackPhase={() => this.goBackPhase()}/>}
                            <div className="innerContainer">
                                <div style={{margin: "auto"}}>
                                    {this.state.uniqueId ?
                                        this.renderComponent(this.state.phase) :
                                        this.renderSigningIn()}
                                </div>
                            </div>
                        </div>
                        :
                        // render the Internet Exporer Message or the Edge Warning depending on the browser used
                        this.state.isInternetExplorer ?
                            this.renderIsInternetExplorer()
                            :
                            this.renderIsEdge()
                }
            </div>
        );
    }
}

