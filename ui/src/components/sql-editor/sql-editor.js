
import { useEffect, useRef, useState } from 'react';
import './sql-editor.css';

export function SqlEditor({value, readOnly, onCreate}) {

    const [inpValue, setInpValue] = useState(value)
    return <div className="sql-editor">
        <textarea readOnly={readOnly} className="editor" value={inpValue} onChange={(e) => {
            setInpValue(e.target.value);
        }}></textarea>
        <div className="bottom-actions">
            {readOnly ? <>
            <button className="execute-button">Play</button>
            <button className="execute-button">Edit</button>
            <button className="execute-button">Exec</button></> : 
            <button className="execute-button" onClick={ () =>
                inpValue ?
                onCreate.bind(this, inpValue) : () => { console.log(inpValue) }
            }>Create</button>
            }
        </div>
    </div>
}