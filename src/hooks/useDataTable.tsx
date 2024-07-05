import { useState } from "react";

function useDataTable(initData: any){
    const [data, setData] = useState(initData);
    const [filterData, setFilterData] = useState(data);
    function handleSort(slug: string, sortOrderName: string) {
        if(sortOrderName){
            const sortedData = [...data].sort((a,b) => {
                if((a as any)[slug] === null && (b as any)[slug] === null) return 0;
                if((a as any)[slug] === null) return 1;
                if((b as any)[slug] === null) return -1;
                return (
                    (a as any)[slug].toString().toLowerCase().localeCompare((b as any)[slug].toString().toLowerCase(), undefined, {numeric: true}) * (sortOrderName === "desc" ? -1 : 1)
                );
            });
            setData(sortedData);
        }
    }
    function handleFilter(slug: string, value: number){
        const filteredData: any[] = [];
        {filterData.map((row: {[key: string]: string | number | null}) => {
            if(row[slug] === value || value === 0){
                filteredData.push(row);
            }
        })}
        setData(filteredData);
    }
    function handleBulkAction(itemIds: number[], action: number){
        const bulkData: any[] = [];
        const thisDate = new Date().toISOString().substr(0, 19).replace("T", " ");
        {data.map((row: {[key: string]: string | number | null}, index: number) => {
            if(action === 4){
                if(!itemIds.includes(data[index].id)){
                    bulkData.push(row);
                }
            } else if(action >= 1){
                if(itemIds.includes(data[index].id)){
                    row.task_status = action;
                    if(action == 2){
                        row.date_completed = thisDate;
                    } else {
                        row.date_completed = 0;
                    }
                }
                bulkData.push(row);
            }
        })}
        setData(bulkData);
        setFilterData(bulkData);
        localStorage.setItem("taskData", JSON.stringify(bulkData));
    }
    function handleAddEditTask(formData : any, formAction: string){
        const dateCreated = new Date().toISOString().substr(0, 19).replace("T", " ");
        const dateCompleted = parseInt(formData.task_status) === 2 ? dateCreated : "";
        let newestId = 0;
        const newTableData: any[] = [];
        {data.map((row: {[key: string]: string | number | null}) => {
            if(formAction == "add"){
                if(row.id && (row.id as number) > newestId){
                    newestId = row.id as number;
                }
            }
            if(formAction == "edit" && row.id == formData.id){
                row.task_name = formData.task_name;
                row.task_description = formData.task_description;
                row.task_status = parseInt(formData.task_status);
                row.date_completed = parseInt(formData.task_status) === 2 ? dateCreated : "";
            }
            newTableData.push(row);
        })}
        if(formAction == "add"){
            const thisNewData = {
                id: newestId + 1,
                task_name: formData.task_name,
                task_description: formData.task_description,
                task_status: parseInt(formData.task_status),
                date_created: dateCreated,
                date_completed: dateCompleted
            };
            data.push(thisNewData);
            newTableData.push(thisNewData);
            setFilterData(data);
            setData(data);
            setData(newTableData);
        } else {
            setFilterData(data);
            setData(data);
        }
        localStorage.setItem("taskData", JSON.stringify(data));
    }
    return [data, handleSort, handleFilter, handleBulkAction, handleAddEditTask];
}

export default useDataTable;