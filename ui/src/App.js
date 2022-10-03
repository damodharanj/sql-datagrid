import { useState} from 'react';
import './App.css';
import { SqlEditor } from './components/sql-editor/sql-editor';
import { generateMetaData, generateID, createEditor, generateRowData } from './utils';
import { DataEditor, GridCellKind  } from '@glideapps/glide-data-grid';
import { ToastContainer, toast } from 'react-toastify';

import "@glideapps/glide-data-grid/dist/index.css";
import 'react-toastify/dist/ReactToastify.css';

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

  const duplicateValidation = (newValue) =>
    editors.reduce((acc, x, i) => {
      if (x.query === newValue.trim()) {
        return i;
      }
      return acc;
    }, -1);

  return (
    <div className="App">
      <header className="App-header">
          <div className="heading">SQL Scratchpad</div>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div className="sql-list">
              <SqlEditor createOnly={true} onCreate={(newValue) => {
                newValue = newValue.trim();
                const index = duplicateValidation(newValue);
                if (index > -1) {
                  toast.info('Query already present, navigated')
                  setSelectedEditor(index);
                  return;
                }
                toast.info('Created a new query')
                setEditors([createEditor(newValue), ...editors])
                setSelectedEditor(0);
              }}></SqlEditor>
              <div class="sql-editors">
              {editors.map((x, i) => <SqlEditor 
                createOnly={false}
                onChange={(query, setValue) => {
                  const index = duplicateValidation(query);
                  if (index === -1) {
                    setEditors([
                      ...editors.slice(0, i),
                      {...editors[selectedEditor], query},
                      ...editors.slice(i + 1, editors.length)
                    ])
                    setValue(query);
                    toast.info('Updated query');
                  } else {
                    toast.error('Query already present, navigated & resetting')
                    setSelectedEditor(index);
                    setTimeout(() => {
                      setValue(editors[selectedEditor].query);
                    }, 2000);
                  }
                }}
                onDelete={() => {
                  setEditors([
                    ...editors.slice(0, i),
                    ...editors.slice(i + 1, editors.length)
                  ])
                  toast.info('Deleted query')
                }}
                onExecute={(reExecute = false) => {
                  if (reExecute) {
                    setEditors([
                      ...editors.slice(0, i),
                      {...editors[selectedEditor], data: generateRowData(500, editors[selectedEditor].metaInfo.length)},
                      ...editors.slice(i + 1, editors.length)
                    ])
                    toast.info('Re-executed query')
                  }
                  setSelectedEditor(i);
                }}
                selected={i === selectedEditor}
                value={x.query} 
                key={x.id} 
                readOnly={false}
                ></SqlEditor>)}
              </div>
            </div>
            <div className="data-grid">
              {editors[selectedEditor] ? <DataEditor height="100%" getCellContent={generateData} columns={editors[selectedEditor].metaInfo} rows={100}/> : <></>}
            </div>
          </div>
      </header>
      <ToastContainer autoClose={500}></ToastContainer>
    </div>
  );
}

export default App;
