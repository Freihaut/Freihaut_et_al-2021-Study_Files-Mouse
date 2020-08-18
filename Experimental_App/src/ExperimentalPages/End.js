import React, { Component } from 'react';

export default class End extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return(
            <div>
                <div className="section">
                    <div className="content" style={{width: "900px"}}>
                        <h2>Herzlichen Dank für Ihre Teilnahme! Die Studie ist beendet. Ihre Daten wurden gespeichert,
                        und Sie können dieses Fenster schließen.</h2>
                    </div>
                </div>
            </div>
        );
    }

}