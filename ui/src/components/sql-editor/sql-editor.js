
import { useState } from 'react';
import './sql-editor.css';

export function SqlEditor({value, selected=false, placeholder="Enter your SQL", createOnly = false, readOnly, onCreate = () => {}, onEdit = () => {}, onDelete = () => {}, onExecute = () => {}}) {

    const [inpValue, setInpValue] = useState(value)
    return <div className={selected ? 'sql-editor selected' : 'sql-editor'} onClick={(e) => {
        if (e.target.classList.contains('button')) {
            return;
        }
        onExecute();
    }} >
        <textarea placeholder={placeholder} readOnly={readOnly} className="editor" value={inpValue} onChange={(e) => {
            setInpValue(e.target.value);
        }}></textarea>
        <div className="bottom-actions">
            {createOnly ? 
            <button className="execute-button" onClick={
                inpValue ?
                onCreate.bind(this, inpValue) : () => { }
            }>Create</button> :
            <>
                <button className="button" onClick={onExecute.bind(this, true)}>Re-Execute</button>
                <button className="button delete-button" onClick={onDelete}>Delete</button>
            </> 
            
            }
        </div>
    </div>
}