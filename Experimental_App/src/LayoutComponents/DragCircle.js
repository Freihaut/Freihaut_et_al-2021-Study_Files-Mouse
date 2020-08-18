import React from 'react';


export default class DragCircle extends React.Component {

    constructor(props) {
        super(props);

        this.getMousePosition = this.getMousePosition.bind(this);
        this.startDrag = this.startDrag.bind(this);
        this.drag = this.drag.bind(this);
        this.endDrag = this.endDrag.bind(this);
    }

    componentDidMount() {

        this.svg.addEventListener('mousedown', this.startDrag);

        this.selectedElement = false;
        this.offset = null;

    }

    componentWillUnmount(){
        this.svg.removeEventListener('mousedown', this.startDrag);
        window.removeEventListener('mousemove', this.drag);
        window.removeEventListener('mouseup', this.endDrag);

    }

    getMousePosition(evt) {
        let CTM =  this.svg.getScreenCTM();
        return {
            x: (evt.clientX - CTM.e) / CTM.a,
            y: (evt.clientY - CTM.f) / CTM.d
        };
    }

    startDrag(evt) {
        this.selectedElement = evt.target;
        this.offset = this.getMousePosition(evt);
        this.offset.x -= parseFloat(this.selectedElement.getAttributeNS(null, "cx"));
        this.offset.y -= parseFloat(this.selectedElement.getAttributeNS(null, "cy"));

        window.addEventListener('mousemove', this.drag);
        window.addEventListener('mouseup', this.endDrag);

        // Add info that object is dragged

        this.props.dragging(true);

    }

    drag(evt) {
        if (this.selectedElement) {
            evt.preventDefault();
            let coord = this.getMousePosition(evt);
            // if the circle is dragged outside of the svg, stop it
            // || circleX >= 880 || circleY <=15 || circleY >= 530
            if (coord.x <= -15) {
                //this.selectedElement.setAttributeNS(null, "cx", 15);
                this.endDrag();
            } else if (coord.x >= 915) {
                //this.selectedElement.setAttributeNS(null, "cx", 1080);
                this.endDrag();
            } else if (coord.y <= -15) {
                //this.selectedElement.setAttributeNS(null, "cy", 15);
                this.endDrag();
            } else if (coord.y >= 565) {
                //this.selectedElement.setAttributeNS(null, "cy", 610);
                this.endDrag();
            } else {
                this.selectedElement.setAttributeNS(null, "cx", coord.x - this.offset.x);
                this.selectedElement.setAttributeNS(null, "cy", coord.y - this.offset.y);
                this.props.onTarget(coord.x - this.offset.x,  coord.y - this.offset.y)
            }
        }
    }

    endDrag(evt) {
        // Hier Props mit "Endposition" geben um zu checken, ob es an der richtigen Stelle ist
        this.props.returnPositions(this.selectedElement.getAttributeNS(null, "cx"), this.selectedElement.getAttributeNS(null, "cy"));

        this.selectedElement = null;

        window.removeEventListener('mousemove', this.drag);
        window.removeEventListener('mouseup', this.endDrag);

        // Add info that dragging is stopped
        this.props.dragging(false);
    }

    render() {
        return <circle cx={this.props.x} cy={this.props.y}  stroke="black"
                       strokeWidth="2px" fill={"hsl(0, 0%, 86%)"} r="15" ref={ref => this.svg = ref}/>
    }
}
