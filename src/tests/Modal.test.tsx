import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Modal from "../components/Modal";

describe("Modal", () => {
  it("Modal renders correct if isOpen variable is set to true", () => {
    const toggle = jest.fn();
    const { getByText } = render(
      <Modal
        isOpen={true}
        toggle={toggle}
        message="Message Test"
        bulkActions={{ checkedIds: [], tempId: 0, action: "" }}
        tableData={[]}
        handleBulkAction={jest.fn()}
        formData={[]}
        handleAddEditTask={jest.fn()}
        confirmButton="Submit"
        formAction="add"
      />
    );
    expect(getByText("Submit")).toBeInTheDocument();
  });

  it("Modal closes when cancelled or outside boundary is clicked", () => {
    const toggle = jest.fn();
    const { getByTestId } = render(
      <Modal
        isOpen={true}
        toggle={toggle}
        message="Message"
        bulkActions={{ checkedIds: [], tempId: 0, action: "" }}
        tableData={[]}
        handleBulkAction={jest.fn()}
        formData={[]}
        handleAddEditTask={jest.fn()}
        confirmButton="Confirm"
        formAction="add"
      />
    );
    const elemToClick = document.querySelectorAll('.modal-overlay')[0];
    fireEvent.click(elemToClick);
    expect(toggle).toHaveBeenCalled();
  });

});