import { useState } from "react";
import { TableColumnTypes } from "../dataTypes";

interface DataTableHeadProps {
    tableColumns: TableColumnTypes;
    handleSort: (slug: string, sortOrderName: string) => void;
}

function DataTableHead({ tableColumns, handleSort }: DataTableHeadProps) {
    const [sortSlug, setSortSlug] = useState("");
    const [columnDir, setColumnDir] = useState("asc");
    // Sorts columns if sorting is able to happen, based on clicking table header
    function sortColumn(slug: string) {
        const sortOrderName = sortSlug === slug && columnDir === "asc" ? "desc" : "asc";
        setSortSlug(slug);
        setColumnDir(sortOrderName);
        handleSort(slug, sortOrderName);
    }
    return (
        <thead>
            <tr>
                {/* Loops through all table headers and creates new table head for each item in data file */}
                {tableColumns.map(({slug, sortable, title, showTitle, showInOverview}) => {
                    const columnClass = sortable ? sortSlug === slug && columnDir === "asc" ? "up-arrow" : sortSlug === slug && columnDir === "desc" ? "down-arrow" : "" : "";
                    if(showInOverview){
                        return (
                            <th key={slug} className={columnClass} onClick={sortable ? () => sortColumn(slug) : () => null}>{showTitle ? title : ""}</th>
                        );
                    }
                    return null;
                })}
            </tr>
        </thead>
    )
}

export default DataTableHead;