import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BulkActions from "../components/BulkActions";
import { BulkActionTypes } from "../dataTypes";
import { tableData } from './tableDataTest'

describe("BulkActions", () => {
  const bulkActions: BulkActionTypes = {
    checkedIds: [1, 2, 3],
    tempId: 1,
    action: "",
  };
  const handleBulkAction = jest.fn();
  const handleAddEditTask = jest.fn();
  const data = [
    { id: 1, name: "Task 1" },
    { id: 2, name: "Task 2" },
    { id: 3, name: "Task 3" },
  ];

  it("Bulk Action Component Renders", () => {
    render(
      <BulkActions
        bulkActions={bulkActions}
        handleBulkAction={handleBulkAction}
        handleAddEditTask={handleAddEditTask}
        data={tableData}
      />
    );
  });

  it("Bulk Action Trigger Submit Handler Fires", () => {
    const { getByLabelText, getByText } = render(
      <BulkActions
        bulkActions={bulkActions}
        handleBulkAction={handleBulkAction}
        handleAddEditTask={handleAddEditTask}
        data={tableData}
      />
    );

    const bulkActionSelect = getByLabelText("Bulk Action:");
    const applyButton = getByText("Apply");

    fireEvent.change(bulkActionSelect, { target: { value: "1" } });
    fireEvent.click(applyButton);

  });
});