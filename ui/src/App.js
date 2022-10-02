// import logo from './logo.svg';
import { useState} from 'react';
import './App.css';
import { SqlEditor } from './components/sql-editor/sql-editor';
import { SqlEditorsProvider } from './scratchpad-state';



function App() {

  const [editors, setEditors] = useState([])

  return (
    <SqlEditorsProvider>
    <div className="App">
      <header className="App-header">
          <div className="heading">SQL Scratchpad</div>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div className="sql-list">
              <SqlEditor readOnly={false} onCreate={(newValue) => {
                console.log('newValue', newValue)
                setEditors([newValue, ...editors])
              }}></SqlEditor>
              {editors.map((x) => <SqlEditor value={x} key={x} readOnly={true} ></SqlEditor>)}
            </div>
            <div className="data-grid">Data Grid</div>
          </div>
        
      </header>
    </div>
    </SqlEditorsProvider>
  );
}

export default App;
