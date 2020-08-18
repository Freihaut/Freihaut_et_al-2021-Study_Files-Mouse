// React Imports
import React from 'react';

export default function Navbar(props) {
        return(
            <nav className="navbar is-link" style={{width: "100%"}}>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <button className="button is-light" onClick={() => props.goBackPhase()}>
                                <strong>Vorherige Seite</strong>
                            </button>
                            <button className="button is-light" onClick={() => props.proceedPhase()}>
                                <strong>Nächste Seite</strong>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        )
}