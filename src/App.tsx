import React from 'react';
import { DataTable } from './components/DataTable';
import { tableColumns } from './tableColumns';
import { tableData } from './tableData';
import './App.scss';

function App() {
  return (
    <div>
      <DataTable
      tableColumns={tableColumns}
      tableData={tableData}
      />
    </div>
  );
}

export default App;
