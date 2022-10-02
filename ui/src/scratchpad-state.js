import { createContext, useState } from 'react';

export const sqlEditorsContext = createContext();

export const SqlEditorsProvider = (props) => {
    const [sqlEditors, setSqlEditors] = useState([1,2,34]);

    return (
        <sqlEditorsContext.Provider value={[sqlEditors, setSqlEditors]}>
            {props.children}
        </sqlEditorsContext.Provider>
    );
};

