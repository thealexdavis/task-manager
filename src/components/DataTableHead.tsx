import { useState } from "react";
import { TableDataTypes, TableColumnTypes } from "../dataTypes";

interface DataTableHeadProps {
    tableColumns: TableColumnTypes;
    handleSort: (slug: string, sortOrderName: string) => void;
}

function DataTableHead({ tableColumns, handleSort }: DataTableHeadProps) {
    const [sortSlug, setSortSlug] = useState("");
    const [columnDir, setColumnDir] = useState("asc");
    function sortColumn(slug: string) {
        const sortOrderName = sortSlug === slug && columnDir === "asc" ? "desc" : "asc";
        setSortSlug(slug);
        setColumnDir(sortOrderName);
        handleSort(slug, sortOrderName);
    }
    return (
        <thead>
            <tr>
                {tableColumns.map(({slug, sortable, title, showTitle, showInOverview}) => {
                    const columnClass = sortable ? sortSlug == slug && columnDir == "asc" ? "up-arrow" : sortSlug == slug && columnDir == "desc" ? "down-arrow" : "" : "";
                    if(showInOverview){
                        return (
                            <th key={slug} className={columnClass} onClick={sortable ? () => sortColumn(slug) : () => null}>{showTitle ? title : ""}</th>
                        );
                    }
                })}
            </tr>
        </thead>
    )
}

export default DataTableHead;