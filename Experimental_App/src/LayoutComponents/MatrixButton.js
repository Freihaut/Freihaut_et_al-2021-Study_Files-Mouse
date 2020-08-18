import React from 'react';

export default function MatrixButtons(props) {
    return (
        <td style={{textAlign: "center"}}>
            <label className="radio">
                <input
                    type="radio"
                    onChange={props.onChange}
                    name={props.name}
                    value={props.value}
                />
            </label>
        </td>);
}