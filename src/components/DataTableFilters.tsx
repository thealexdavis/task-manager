import { TableColumnTypes } from "../dataTypes";

interface DataTableFiltersProps {
  tableColumns: TableColumnTypes;
  handleFilter: (slug: string, value: number) => void;
}

function DataTableFilters({ tableColumns, handleFilter }: DataTableFiltersProps) {
    // Goes back to useDataTable hooks file
    function filterChange(slug: string, value: number){
        handleFilter(slug, value);
    }
  return (
    <ul>
      {/* If filters exist within table data being retrieved, will render out below in unordered list. */}
      {tableColumns.map(({ title, slug, sortable, filterable, filterVals }, index) => {
        if (filterable) {
          return (
            <li key={slug+"_row"}>
              <label key={slug+"_label"} htmlFor={slug}>Filter by {title}</label>
              <select key={slug+"_filter"} name={slug} id={slug} onChange={(e) => filterChange(slug, parseInt(e.target.value))}>
                {filterVals.map((filterVal: string, index: number) => (
                  <option key={slug+"_value_"+index} value={index}>{filterVal}</option>
                ))}
              </select>
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
}

export default DataTableFilters;
