import { render, screen, fireEvent } from "@testing-library/react";
import DataTableFilters from "../components/DataTableFilters";
import { tableColumns } from '../tableColumns';
import { TableDataTypes, TableColumnTypes } from "../dataTypes";

describe("DataTableFilters", () => {

    interface DataTableProps {
        tableData: TableDataTypes;
        tableColumns: TableColumnTypes;
      }

  const handleFilter = jest.fn();

  beforeEach(() => {
    render(<DataTableFilters tableColumns={tableColumns} handleFilter={handleFilter} />);
  });

  test("Filter Options are Rendered", () => {
    const filterOptions = screen.getAllByRole("option");
    expect(filterOptions).toHaveLength(4);
  });

  test("HandleFilter is called when filters applied", () => {
    const selectElement = screen.getByLabelText("Filter by Status");
    fireEvent.change(selectElement, { target: { value: "1" } });
    expect(handleFilter).toHaveBeenCalledWith("task_status", 1);
  });
});