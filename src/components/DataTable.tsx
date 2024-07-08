import { useState } from "react";
import { TableDataTypes, TableColumnTypes, BulkActionTypes } from "../dataTypes";
import DataTableHead from "./DataTableHead";
import DataTableBody from "./DataTableBody";
import DataTableFilters from "./DataTableFilters";
import BulkActions from "./BulkActions";
import useSortableTable from "../hooks/useDataTable";
import AddData from "./AddData";
import Modal from "./Modal";
import useModal from "../hooks/useModal";

interface DataTableProps {
  tableData: TableDataTypes;
  tableColumns: TableColumnTypes;
}

export const DataTable = ({ tableData: data, tableColumns }: DataTableProps) => {
  const [sortedTableData, handleSort, handleFilter, handleBulkAction, handleAddEditTask] = useSortableTable(data);
  const { isOpen, toggle, targetId } = useModal();
  const [defaultData, setDefaultData] = useState<{ id: number; task_name: string; task_description: string; task_status: number; date_created: string; date_completed: string | number; } | null>(null);
  const [bulkActions, setBulkActions] = useState<BulkActionTypes>({
    checkedIds: [],
    tempId: null,
    action: "",
  });
  const toggleCheckedState = (checked: boolean, value: number) => {
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
  // Searches for the correct item within the default data for editing and reference
  function searchDataForItem(array: any[], value: number = 0) {
    for (let index = 0; index < data.length; index++) {
      const row = data[index];
      if (row.id === value) {
        return index;
      }
    }
    return -1;
  }
// If table data button is clicked, modal appears
  const openRowDetails = (id: number = 0) => {
      toggle(id);
      const indexToFind = searchDataForItem(data, id);
      setDefaultData(data[indexToFind]);
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
        <Modal confirmButton={"Save"} id={targetId} formAction={"edit"} isOpen={isOpen} toggle={toggle} handleBulkAction={handleBulkAction} handleAddEditTask={handleAddEditTask} bulkActions={bulkActions} message="View and edit any details you'd like. Click Save to save changes." tableData={data} formData={[{type: "text",name: "task_name",label: "Task Name (if left empty, will default to the newest index number)", default: defaultData ? defaultData.task_name : ""},{type: "textarea",name: "task_description",label: "Task Description", default: defaultData ? defaultData.task_description : ""},{type: "select",name: "task_status",label: "Status", default: defaultData ? defaultData.task_status : ""},{type: "date",name: "date_created",label: "Task Created On:", default: defaultData ? defaultData.date_created : ""},{type: "date",name: "dated_completed",label: "Task Completed On:", default: defaultData ? defaultData.date_completed : ""}]}></Modal>
        <table>
          <DataTableHead {...{ tableColumns, handleSort }} />
          <DataTableBody toggleCheckedState={(e, title) => toggleCheckedState(e, title)} openRowDetails={(id) => openRowDetails(id)} {...{ tableColumns, data: sortedTableData, handleBulkAction, handleAddEditTask, bulkActions }} />
        </table>
      </div>
      <BulkActions {...{bulkActions, handleBulkAction, handleAddEditTask, data: sortedTableData}} />
      <AddData {...{bulkActions, handleBulkAction, handleAddEditTask}}/>
      </div>
    );
};
