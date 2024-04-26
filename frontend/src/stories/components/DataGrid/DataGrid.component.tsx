//Import Third Party lib

import { Pagination, Select } from '@docAi-app/stories';
import { StyledDataGrid, StyledDataGridPagination, StyledDataGridProp } from './DataGrid.styled';
import { Item } from '@docAi-app/types';

//Import Storybook

//Import Component

//Import Page

//Import Hook

//Import Context

//Import Model Type
import { SelectProps as MuiSelectProps, PaginationProps } from '@mui/material';
//Import Util, Helper , Constant

//Import Icon

//Import Api

//Import Assets

//Import Style

interface DataGridPaginationProps {
    numberOfRowOptions: Item[];
    pageSelectorSize: MuiSelectProps['size'];
    pageInfo: { page: number; size: number };
    pager: { totalRecords: number };
    handlePageSizeChange: MuiSelectProps['onChange'];
    handlePageNumberChange: PaginationProps['onChange'];
}

interface DataGridProps extends StyledDataGridProp, DataGridPaginationProps {}

const DataGrid = ({
    disableColumnFilter = true,
    disableColumnSelector = true,
    disableColumnMenu = true,
    autosizeOptions = {
        expand: false,
    },
    hideFooter = true,
    numberOfRowOptions,
    pageSelectorSize: pageSizeSelector,
    pageInfo,
    pager,
    handlePageSizeChange,
    handlePageNumberChange,
    ...otherProps
}: DataGridProps) => {
    // Your component logic here

    return (
        <>
            <StyledDataGrid
                disableColumnFilter={disableColumnFilter}
                disableColumnSelector={disableColumnSelector}
                disableColumnMenu={disableColumnMenu}
                autosizeOptions={autosizeOptions}
                hideFooter={hideFooter}
                {...otherProps}
            />
            {pager?.totalRecords >= pageInfo.size ? (
                <StyledDataGridPagination>
                    <div>
                        <Select
                            options={numberOfRowOptions}
                            id="size-select"
                            value={pageInfo.size}
                            size={pageSizeSelector}
                            onChange={handlePageSizeChange}
                        />
                    </div>
                    <div>
                        <Pagination
                            count={Math.ceil(pager.totalRecords / pageInfo.size)}
                            page={pageInfo.page}
                            onChange={handlePageNumberChange}
                        />
                    </div>
                </StyledDataGridPagination>
            ) : null}
        </>
    );
};

export { DataGrid };
