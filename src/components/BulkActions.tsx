import React from "react";
import { BulkActionTypes, TableDataTypes } from "../dataTypes";
import Modal from "./Modal";
import useModal from "../hooks/useModal";

interface BulkActionProps {
    bulkActions: BulkActionTypes;
    handleBulkAction: any;
    handleAddEditTask: any;
    data: TableDataTypes;
}

function BulkActions({ bulkActions, handleBulkAction, handleAddEditTask, data }: BulkActionProps) {
    const { isOpen, toggle } = useModal();
      function bulkActionSubmitHandler(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const bulkActionForm = event.currentTarget;
        const bulkFormElements = bulkActionForm.elements as typeof bulkActionForm.elements & {
            bulk_action: {value: string}
        }
        if(Number(bulkFormElements.bulk_action.value) > 0 && Number(bulkActions.checkedIds.length) > 0){
          if(parseInt(bulkFormElements.bulk_action.value) === 4){
              toggle();
          } else {
              handleBulkAction(bulkActions.checkedIds, bulkFormElements.bulk_action.value);
          }
        } else if(Number(bulkFormElements.bulk_action.value) === 0){
          alert("Please select a bulk action to perform.");
        } else if(Number(bulkActions.checkedIds.length) === 0){
          alert("Check select at least one task by the checkmark in the first column to perform a bulk action.");
        }
      }
    return (
      <div className="bulk_actions_row">
        {/* Future updates would be to move modal to the DataTable component, only needing to include it once. */}
        <Modal confirmButton={"Delete"} formAction={"delete"} isOpen={isOpen} toggle={toggle} handleBulkAction={handleBulkAction} handleAddEditTask={handleAddEditTask} bulkActions={bulkActions} message="Are you sure you want to delete the following tasks?" tableData={data} formData={[]}></Modal>
        <form className="bulk_action_form" id="bulk_action_form" onSubmit={bulkActionSubmitHandler}>
            <label htmlFor="bulk_action">Bulk Action:</label>
            <select name="bulk_action" id="bulk_action">
                <option value="0">Select Bulk Action</option>
                <option value="2">Mark Incomplete</option>
                <option value="1">Mark Complete</option>
                <option value="3">Mark Pending</option>
                <option value="4">Delete</option>
            </select>
            <input type="submit" value="Apply" className="btn blue" />
        </form>
      </div>
    );
  };

export default BulkActions;