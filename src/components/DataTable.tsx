import { useState } from "react";
import { TableDataTypes, TableColumnTypes, BulkActionTypes, CheckedIds } from "../dataTypes";
import DataTableHead from "./DataTableHead";
import DataTableBody from "./DataTableBody";
import DataTableFilters from "./DataTableFilters";
import BulkActions from "./BulkActions";
import useSortableTable from "../hooks/useDataTable";
import AddData from "./AddData";

interface DataTableProps {
  tableData: TableDataTypes;
  tableColumns: TableColumnTypes;
}

export const DataTable = ({ tableData: data, tableColumns }: DataTableProps) => {
  const [sortedTableData, handleSort, handleFilter, handleBulkAction, handleAddEditTask] = useSortableTable(data);
  const [bulkActions, setBulkActions] = useState<BulkActionTypes>({
    checkedIds: [],
    tempId: null,
    action: "",
  });
  const [checkedIdArray, setCheckedIdArray] = useState<CheckedIds>({
    id: 0
  });
  const toggleCheckedState = (checked: boolean, value: number) => {
    setCheckedIdArray({ id: value });
    const checkedIdFinalArray = bulkActions.checkedIds;
    if(checked){
      checkedIdFinalArray.push(value);
    } else {
      const index = checkedIdFinalArray.indexOf(value);
      if(index > -1){
        checkedIdFinalArray.splice(index, 1);
      }
    }
    setBulkActions({ checkedIds: checkedIdFinalArray, tempId: value, action: "default" });
  }
  return (
      <div className="data-table">
        <div className="instructions">
        <ul>
          <li>Table headers are sticky. New items appear at the bottom of the list. Scroll inside table to view more.</li>
          <li>Click on the table headers to filter/sort the table in the order you wish.</li>
          <li>Use the dropdowns to filter the data.</li>
          <li>Click the checkboxes to select tasks for bulk actions.</li>
          <li>Click the buttons to view, edit, or delete a task.</li>
        </ul>
      </div>
        <DataTableFilters {...{ tableColumns, handleFilter, handleSort }} />
      <div className="table_holder">
        <table>
          <DataTableHead {...{ tableColumns, handleSort }} />
          <DataTableBody toggleCheckedState={(e, title) => toggleCheckedState(e, title)} {...{ tableColumns, data: sortedTableData, handleBulkAction, handleAddEditTask, bulkActions }} />
        </table>
      </div>
      <BulkActions {...{bulkActions, handleBulkAction, handleAddEditTask, data: sortedTableData}} />
      <AddData {...{bulkActions, handleBulkAction, handleAddEditTask}}/>
      </div>
    );
};
