import { TableDataTypes, TableColumnTypes, BulkActionTypes } from "../dataTypes";

interface DataTableBodyProps {
    tableColumns: TableColumnTypes;
    data: TableDataTypes;
    toggleCheckedState: (checked: boolean, value: number) => void;
    openRowDetails: (id: number) => void;
    bulkActions: BulkActionTypes;
    handleBulkAction: any;
    handleAddEditTask: any;
}

function DataTableBody({ tableColumns, data, toggleCheckedState, openRowDetails, bulkActions, handleBulkAction, handleAddEditTask }: DataTableBodyProps) {
    return (
        <tbody>
                {/* Future updates would be to move modal to the DataTable component, only needing to include it once. Lint error having div inside table. This would fix that. */}
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