import { styled } from '@mui/material';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';

type StyledDataGridProp = DataGridProps;

const StyledDataGrid = styled(DataGrid)`
    font-size: 1.4rem;

    .MuiDataGrid-columnHeader,.MuiDataGrid-cell { 
        &:focus , &:focus-within {
        outline: none;
    }}

    .MuiDataGrid-row {
        cursor: pointer;
    }
`;

const StyledDataGridPagination = styled('div')`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 1rem;
`;

export {
    StyledDataGrid,
    StyledDataGridPagination,
    type StyledDataGridProp
};
