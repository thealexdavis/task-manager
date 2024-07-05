import React, { useState, ReactNode } from "react";
import useSortableTable from "../hooks/useDataTable";

import { BulkActionTypes, TableDataTypes } from "../dataTypes";

interface ModalType {
  isOpen: boolean;
  toggle: () => void;
  message: string;
  bulkActions: BulkActionTypes;
  tableData: any[];
  handleBulkAction: any;
  formData: any[];
  handleAddEditTask: any;
  confirmButton: string | null;
  formAction: string;
  id?: number;
}

function Modal({ isOpen, toggle, message, bulkActions, tableData, handleBulkAction, formData, handleAddEditTask, confirmButton, formAction, id }: ModalType) {
  const [sortedTableData] = useSortableTable(tableData);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  function modalFormSubmitHandler(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    if(formAction == "add" || formAction == "edit"){
      var thisFormData = new FormData(event.target as HTMLFormElement);
      let thisFormObject = Object.fromEntries(thisFormData.entries());
      handleAddEditTask(thisFormObject, formAction);
    }
    if(formAction == "delete"){
      handleBulkAction(bulkActions.checkedIds,4);
    }
    closeModal();
  }
  function deleteDataEntry(id: number = 0){
    setDeleteConfirm(true);
    setTaskTitle(tableData[searchDataForItem(tableData, id)].task_name);
  }
  function deleteAction(actionNum: number = 0){
    if(actionNum == 1){
      handleBulkAction([id],4);
      closeModal();
    } else {
      setDeleteConfirm(false);
    }
  }
  function closeModal(){
    setDeleteConfirm(false);
    toggle();
  }
  function searchDataForItem(array: any[], value: number = 0) {
    for (let index = 0; index < tableData.length; index++) {
      const row = tableData[index];
      if (row.id === value) {
        return index;
      }
    }
    return -1;
  }
  return (
      <>
        {isOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div onClick={(e) => e.stopPropagation()} className="modal-box">
              <form onSubmit={modalFormSubmitHandler}>
                <input type="hidden" name="id" defaultValue={id ? id : 0} />
                {(deleteConfirm || (formAction == "delete" && !deleteConfirm)) && 
              <div>
                <p>Are you sure you wish to delete the following task?</p>
                {deleteConfirm && <p className="normal"><b>Task Name: </b>{taskTitle}</p> }
              </div>
              }
              {formAction == "delete" && tableData.map((row: {[key: string]: string | number | null}, index) => {
                if(bulkActions.checkedIds.includes(tableData[index].id)){
                  return (
                    <p>
                      <b>Task Name:</b> {row.task_name}
                    </p>
                  );
                }
              })}
              {formData.length > 0 && formData.map((formElement: {type: string, name: string, label: string, default: string | number | boolean}, index) => {
                if(formElement.type === "text"){
                  return (
                    <div>
                      <label htmlFor={formElement.name}>{formElement.label}</label>
                      <input type="text" name={formElement.name} id={formElement.name} className={deleteConfirm ? "delete-preview" : ""} defaultValue={formElement.default ? formElement.default.toString() : ""} readOnly={deleteConfirm ? true : false} />
                    </div>
                  );
                }
                if(formElement.type === "textarea"){
                  return (
                    <div>
                      <label htmlFor={formElement.name}>{formElement.label}</label>
                      <textarea name={formElement.name} id={formElement.name} className={deleteConfirm ? "delete-preview" : ""} defaultValue={formElement.default ? formElement.default.toString() : ""} readOnly={deleteConfirm ? true : false}></textarea>
                    </div>
                  );
                }
                if(!deleteConfirm && formElement.type === "select"){
                  return (
                    <div>
                      <label htmlFor={formElement.name}>{formElement.label}</label>
                      <select name={formElement.name} id={formElement.name} defaultValue={formElement.default ? formElement.default.toString() : 0}>
                        <option value="1">Incomplete</option>
                        <option value="3">Pending</option>
                        <option value="2">Complete</option>
                      </select>
                    </div>
                  );
                }
              })}
              <div className="btns_row">
              {!deleteConfirm && <input type="submit" className={formAction == "delete" && !deleteConfirm ? "btn red" : "btn green"} value={confirmButton ? confirmButton.toString() : ""} />}
              {!deleteConfirm && formAction === "edit" && <button className="btn red" type="button" onClick={() => deleteDataEntry(id ? id : 0)}>Delete</button>}
              {!deleteConfirm && <button type="button" className="btn blue" onClick={toggle}>Cancel</button>}
              {deleteConfirm && <button type="button" className="btn red" onClick={() => deleteAction(1)}>Delete</button>}
              {deleteConfirm && <button type="button" className="btn blue" onClick={() => deleteAction(0)}>Cancel</button>}
              </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
}

export default Modal;