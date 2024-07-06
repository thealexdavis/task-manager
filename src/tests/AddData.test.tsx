import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AddData from "../components/AddData";

describe("AddData component", () => {
  it("Add Data component renders", () => {
    render(<AddData handleBulkAction={jest.fn()} handleAddEditTask={jest.fn()} bulkActions={{ checkedIds: [], tempId: 0, action: "" }} />);
  });

  it("Modal opens when Add Data button is clicked", () => {
    const { getByText } = render(<AddData handleBulkAction={jest.fn()} handleAddEditTask={jest.fn()} bulkActions={{ checkedIds: [], tempId: 0, action: "" }} />);
    const addButton = getByText("Add New Task");
    fireEvent.click(addButton);
  });

});