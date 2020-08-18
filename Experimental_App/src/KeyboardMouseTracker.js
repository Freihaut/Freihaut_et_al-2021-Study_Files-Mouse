import React, {Component} from 'react';


// Keyboard mouse tracker component for react

export default class KeyboardMouseTracker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            eventListener: null
        };

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseClick = this.onMouseClick.bind(this);
        this.onMouseScroll = this.onMouseScroll.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    // get mouse movement info and set object value to "undefined" if the browser return undefined
    onMouseMove(e) {

        // if (e.x === undefined || e.y === undefined || e.pageX === undefined || e.pageY === undefined) {
        //     console.log("undefined move");
        // }

        this.props.onEvent({
            eventType: "MousePositionChanged",
            time: Date.now(),
            x: e.x === undefined ? "undefined" : e.x,
            y: e.y === undefined ? "undefined" : e.y,
            pageX: e.pageX === undefined ? "undefined" : e.pageX,
            pageY: e.pageY === undefined ? "undefined" : e.pageY,
        });
    }

    // get mouse click info and set object value to "undefined" if the browser return undefined
    onMouseClick (e) {

        // if (e.x === undefined || e.y === undefined || e.pageX === undefined || e.pageY === undefined) {
        //     console.log("undefined click");
        // }

        this.props.onEvent({
            eventType: "MouseClick",
            time: Date.now(),
            x: e.x === undefined ? "undefined" : e.x,
            y: e.y === undefined ? "undefined" : e.y,
            pageX: e.pageX === undefined ? "undefined" : e.pageX,
            pageY: e.pageY === undefined ? "undefined" : e.pageY
        });
    }

    // get mouse scroll info and set object value to "undefined" if the browser return undefined
    onMouseScroll (e) {

        // if (window.scrollX === undefined || window.scrollY === undefined) {
        //     console.log("undefined scroll")
        // }

        this.props.onEvent({
            eventType: "MouseScroll",
            time: Date.now(),
            pageX: window.scrollX === undefined ? "undefined" : window.scrollX,
            pageY: window.scrollY === undefined ? "undefined" : window.scrollY
        });
    }

    // get keyboard down info and set object value to "undefined" if the browser return undefined
    onKeyDown (e) {

        // if (e.code === undefined || e.key === undefined || e.ctrlKey === undefined || e.shiftKey === undefined) {
        //     console.log("undefinded keydown")
        // }

        this.props.onEvent({
            eventType: "KeyDown",
            time: Date.now(),
            code: e.code === undefined ? "undefined" : e.code,
            key: e.key === undefined ? "undefined" : e.key,
            keyCode: e.keyCode === undefined ? "undefined" : e.keyCode,
            ctrlPressed: e.ctrlKey === undefined ? "undefined" : e.ctrlKey,
            shiftPressed: e.shiftKey === undefined ? "undefined" : e.shiftKey
        });
    }

    // get keyboard up info and set object value to "undefined" if the browser return undefined
    onKeyUp (e) {

        // if (e.code === undefined || e.key === undefined || e.ctrlKey === undefined || e.shiftKey === undefined) {
        //     console.log("undefinded keyup")
        // }

        this.props.onEvent({
            eventType: "KeyUp",
            time: Date.now(),
            code: e.code === undefined ? "undefined" : e.code,
            key: e.key === undefined ? "undefined" : e.key,
            keyCode: e.keyCode === undefined ? "undefined" : e.keyCode,
            ctrlPressed: e.ctrlKey === undefined ? "undefined" : e.ctrlKey,
            shiftPressed: e.shiftKey === undefined ? "undefined" : e.shiftKey
        });
    }

    componentDidMount() {

        // initialize event listeners
        let listener = [];

        // Init our event listeners
        document.addEventListener("mousemove", this.onMouseMove);
        document.addEventListener("click", this.onMouseClick);
        document.addEventListener("scroll", this.onMouseScroll);
        document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("keyup", this.onKeyUp);

        this.setState({eventListener: listener});

        // console.log("Tracker mounted");
    }


    componentWillUnmount() {

        // remove event listeners
        document.removeEventListener("mousemove", this.onMouseMove);
        document.removeEventListener("click", this.onMouseClick);
        document.removeEventListener("scroll", this.onMouseScroll);
        document.removeEventListener("keydown", this.onKeyDown);
        document.removeEventListener("keyup", this.onKeyUp);

        // console.log("Tracker unmounted");
    }


    render() {
        return (<div/>)
    }
}

