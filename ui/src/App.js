import { useState} from 'react';
import './App.css';
import { SqlEditor } from './components/sql-editor/sql-editor';
import { generateMetaData, generateID, createEditor, generateRowData } from './utils';
import { DataEditor, GridCellKind  } from '@glideapps/glide-data-grid';

import "@glideapps/glide-data-grid/dist/index.css";

function App() {

  const [editors, setEditors] = useState([{
    id: generateID(),
    query: 'select * from country',
    metaInfo: generateMetaData(),
    data: generateRowData()
  }])

  const [selectedEditor, setSelectedEditor] = useState(0)

  const generateData = ([col, row]) => {
    
    const data = editors[selectedEditor].data[row][col]
    return {
        kind: GridCellKind.Text,
        data: data,
        allowOverlay: true,
        displayData: data,
    }
  }

  return (
    <div className="App">
      <header className="App-header">
          <div className="heading">SQL Scratchpad</div>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div className="sql-list">
              <SqlEditor createOnly={true} onCreate={(newValue) => {
                setEditors([createEditor(newValue), ...editors])
                setSelectedEditor(0);
              }}></SqlEditor>
              {editors.map((x, i) => <SqlEditor 
                createOnly={false}
                onDelete={() => {
                  setEditors([
                    ...editors.slice(0, i),
                    ...editors.slice(i + 1, editors.length)
                  ])
                }}
                onExecute={(reExecute = false) => {
                  if (reExecute) {
                    setEditors([
                      ...editors.slice(0, i),
                      {...editors[selectedEditor], data: generateRowData(500, editors[selectedEditor].metaInfo.length)},
                      ...editors.slice(i + 1, editors.length)
                    ])
                    console.log(
                      {...editors[selectedEditor], data: generateRowData(500, editors[selectedEditor].metaInfo.length)}
                    );
                  }
                  setSelectedEditor(i);
                }}
                selected={i === selectedEditor}
                value={x.query} 
                key={x.id} 
                readOnly={false}
                ></SqlEditor>)}
            </div>
            <div className="data-grid">
              {editors[selectedEditor] ? <DataEditor height="100%" getCellContent={generateData} columns={editors[selectedEditor].metaInfo} rows={100}/> : <></>}
            </div>
          </div>
      </header>
    </div>
  );
}

export default App;
