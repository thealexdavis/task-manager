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
        const filteredData: any[] = filterData.filter((row: {[key: string]: string | number | null}) => {
            return row[slug] === value || value === 0;
        });
        setData(filteredData);
    }
    function handleBulkAction(itemIds: number[], action: number){
        const bulkData: any[] = [];
        const thisDate = new Date().toISOString().substr(0, 19).replace("T", " ");
        filterData.forEach((row: {[key: string]: string | number | null}, index: number) => {
            if(Number(action) === 4){
                if(!itemIds.includes(filterData[index].id)){
                    bulkData.push(row);
                }
            } else if(Number(action) >= 1){
                if(itemIds.includes(filterData[index].id)){
                    row.task_status = Number(action);
                    if(Number(action) === 1){
                        row.date_completed = thisDate;
                    } else {
                        row.date_completed = 0;
                    }
                }
                bulkData.push(row);
            }
        });
        setData(bulkData);
        setFilterData(bulkData);
        localStorage.setItem("taskData", JSON.stringify(bulkData));
    }
    function handleAddEditTask(formData : any, formAction: string){
        const dateCreated = new Date().toISOString().substr(0, 19).replace("T", " ");
        const dateCompleted = Number(formData.task_status) === 1 ? dateCreated : "";
        let newestId = 0;
        const newTableData: any[] = [];
        data.map((row: {[key: string]: string | number | null}) => {
            if(formAction === "add" && row.id && (row.id as number) > newestId){
                newestId = row.id as number;
            }
            if(formAction === "edit" && Number(row.id) === Number(formData.id)){
                row.task_name = formData.task_name && formData.task_name.replace(/ /g,'') !== "" && formData.task_name.replace(/ /g,'').length > 0 ? formData.task_name : "Task Item #"+row.id;
                row.task_description = formData.task_description;
                row.task_status = Number(formData.task_status);
                row.date_completed = Number(formData.task_status) === 1 ? dateCreated : "";
            }
            newTableData.push(row);
            return null;
        });
        if(formAction === "add"){
            const thisNewData = {
                id: newestId + 1,
                task_name: formData.task_name && formData.task_name.replace(/ /g,'') !== "" && formData.task_name.replace(/ /g,'').length > 0 ? formData.task_name : "Task Item #"+(newestId + 1),
                task_description: formData.task_description,
                task_status: Number(formData.task_status),
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