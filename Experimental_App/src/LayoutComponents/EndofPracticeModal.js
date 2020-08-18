// React Imports
import React from 'react';

// end of task modal
export default function (props) {

    return(
        <div className={props.startModal} style={{textAlign: "left", fontSize: "18px"}}>
            <div className="modal-background">{null}</div>
            <div className="modal-content">
                <header className="modal-card-head">
                    <p className="modal-card-title">{null}</p>
                </header>
                <section className="modal-card-body">
                    <div className="content">
                        <h3>Aufgabe klar?</h3><br/>
                        <p>
                            Falls Ihnen noch unklar ist, wie Sie die Aufgabe bearbeiten sollen, können Sie die Aufgabenanleitung erneut lesen, indem Sie
                            auf "Übungsaufgabe neu starten" klicken.
                        </p>
                        <p>
                            Falls Ihnen klar ist, wie Sie die Aufgabe bearbeiten sollen, klicken Sie auf "Übungsaufgabe weiter bearbeiten".
                        </p>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <div className={"field is-grouped"}>
                        <button className="button is-link" onClick={() => props.restart()}>Übungsaufgabe neu starten</button>
                        <button className="button is-link" onClick={() => props.initializeTask()}>Übungsaufgabe weiter bearbeiten</button>
                    </div>
                </footer>
            </div>
        </div>

    )
}