import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataTable } from '../components/DataTable';
import { tableColumns } from '../tableColumns';
import { tableData } from './tableDataTest'

test("Data table renders successfully", () => {
    render(<DataTable tableColumns={tableColumns} tableData={tableData} />);
})