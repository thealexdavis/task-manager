import React from "react";
import Modal from "./Modal";
import useModal from "../hooks/useModal";
import { BulkActionTypes } from "../dataTypes";

interface BulkActionProps {
    handleBulkAction: any;
    handleAddEditTask: any;
    bulkActions: BulkActionTypes;
}
function AddData({ handleBulkAction, handleAddEditTask, bulkActions }: BulkActionProps) {
    const { isOpen, toggle } = useModal();
    function addTask(){
        toggle();
    }
    return(
        <div className="btns_row">
        {/* Button opens up modal for new task creation */}
        <button className="btn wider blue" onClick={addTask}>Add New Task</button>
        {/* Future updates would be to move modal to the DataTable component, only needing to include it once. */}
        <Modal confirmButton={"Add Task"} formAction={"add"} isOpen={isOpen} toggle={toggle} handleBulkAction={handleBulkAction} handleAddEditTask={handleAddEditTask} bulkActions={bulkActions} message="Please fill out the form below to add a new task." tableData={[]} formData={[{type: "text",name: "task_name",label: "Task Name (if left empty, will default to the newest index number)", default: ""},{type: "textarea",name: "task_description",label: "Task Description", default: ""},{type: "select",name: "task_status",label: "Status", default: 2}]}></Modal>
        </div>
    )
}

export default AddData;