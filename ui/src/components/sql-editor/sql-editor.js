import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import './sql-editor.css';

export function SqlEditor({value, selected=false, placeholder="Enter your SQL", createOnly = false, readOnly, onCreate = () => {}, onEdit = () => {}, onDelete = () => {}, onExecute = () => {},  onChange = () => {}}) {

    const [inpValue, setInpValue] = useState(value)

    const ref = useRef();

    useEffect(() => {
        if(selected) {
            ref.current.scrollIntoView({behavior: 'smooth'});
        }
    });

    return <div ref={ref} className={selected ? 'sql-editor selected' : 'sql-editor'} onClick={(e) => {
        if (e.target.classList.contains('button')) {
            return;
        }
        onExecute();
    }} >
        <textarea placeholder={placeholder} readOnly={readOnly} className="editor" value={inpValue} onChange={(e) => {
            if (createOnly) {
                setInpValue(e.target.value);
            }
            onChange.bind(this, e.target.value, setInpValue)();
        }}></textarea>
        <div className="bottom-actions">
            {createOnly ? 
            <button className="execute-button" onClick={ () => {
                inpValue ?
                onCreate.bind(this, inpValue)() :
                toast.error('Invalid Query');
            }
            }>Create</button> :
            <>
                <button className="button" onClick={onExecute.bind(this, true)}>Re-Execute</button>
                <button className="button delete-button" onClick={onDelete}>Delete</button>
            </> 
            
            }
        </div>
    </div>
}