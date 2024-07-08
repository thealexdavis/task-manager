import { useState } from "react";
import { TableDataTypes, TableColumnTypes, BulkActionTypes } from "../dataTypes";
import Modal from "./Modal";
import useModal from "../hooks/useModal";

interface DataTableBodyProps {
    tableColumns: TableColumnTypes;
    data: TableDataTypes;
    toggleCheckedState: (checked: boolean, value: number) => void;
    bulkActions: BulkActionTypes;
    handleBulkAction: any;
    handleAddEditTask: any;
}

function DataTableBody({ tableColumns, data, toggleCheckedState, bulkActions, handleBulkAction, handleAddEditTask }: DataTableBodyProps) {
    const { isOpen, toggle, targetId } = useModal();
    const [defaultData, setDefaultData] = useState<{ id: number; task_name: string; task_description: string; task_status: number; date_created: string; date_completed: string | number; } | null>(null);
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
    function openRowDetails(id: number){
        toggle(id);
        const indexToFind = searchDataForItem(data, id);
        setDefaultData(data[indexToFind]);
    }
    return (
        <tbody>
                {/* Future updates would be to move modal to the DataTable component, only needing to include it once. Lint error having div inside table. This would fix that. */}
                <Modal confirmButton={"Save"} id={targetId} formAction={"edit"} isOpen={isOpen} toggle={toggle} handleBulkAction={handleBulkAction} handleAddEditTask={handleAddEditTask} bulkActions={bulkActions} message="View and edit any details you'd like. Click Save to save changes." tableData={data} formData={[{type: "text",name: "task_name",label: "Task Name (if left empty, will default to the newest index number)", default: defaultData ? defaultData.task_name : ""},{type: "textarea",name: "task_description",label: "Task Description", default: defaultData ? defaultData.task_description : ""},{type: "select",name: "task_status",label: "Status", default: defaultData ? defaultData.task_status : ""},{type: "date",name: "date_created",label: "Task Created On:", default: defaultData ? defaultData.date_created : ""},{type: "date",name: "dated_completed",label: "Task Completed On:", default: defaultData ? defaultData.date_completed : ""}]}></Modal>
                {data.map((row: {[key: string]: string | number | null}, index) => {
                    return (
                        <tr key={row.id}>
                            {tableColumns.map((column) => {
                                const cellData = column.slug === "task_status" || (column.slug === "task_status" && !row[column.slug]) ? (row[column.slug] === 1 ? "Complete" : row[column.slug] === 3 ? "Pending" : "Incomplete") : row[column.slug] || "";
                                const cellActionValue = data[index].id;
                                if(column.showInOverview){
                                    if(column.slug === "action"){
                                        return <td key={column.slug}><input type="checkbox" id={column.slug+cellActionValue} name={column.slug+cellActionValue} value={cellActionValue} onChange={(e) => toggleCheckedState(e?.target?.checked, parseInt(e?.target?.value))} /><label htmlFor={column.slug+cellActionValue}></label></td>;
                                    } else if(column.slug === "modal_btns"){
                                        return <td key={column.slug}><button onClick={() => openRowDetails(cellActionValue)} className="btn wider blue">Details, Edit, or Delete</button></td>;
                                    } else {
                                        return <td key={column.slug}>{cellData}</td>;
                                    }
                                }
                                return null;
                            })}
                        </tr>
                    )
                })}
            </tbody>
    )
}

export default DataTableBody;