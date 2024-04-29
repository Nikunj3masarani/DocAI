import { Meta, StoryObj } from '@storybook/react';
import { DataGrid as DataGridComp } from './DataGrid.component';
import { NoDataFound } from '@docAi-app/stories';
import { PAGINATION_OPTIONS } from '@docAi-app/utils/constants/common.constant';

const columns = [
    {
        field: 'title',
        headerName: 'Titles',
        sortable: false,
        width: 300,
        filterable: false,
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 500,
        sortable: false,
        filterable: false,
    },
];

const meta: Meta<typeof DataGridComp> = {
    title: 'DataGrid/Table',
    component: DataGridComp,
    tags: ['autodocs'],
};

const renderNoRows = () => {
    return <NoDataFound message="No Brains were found based on your search" />;
};

export default meta;
type Story = StoryObj<typeof DataGridComp>;

export const DataGrid: Story = {
    render: (props) => {
        const rows = [];

        for (let i = 0; i < props.pageInfo.size; i++) {
            rows.push({ title: `Title One ${i + 1}`, description: `Description One ${i + 1}`, id: i });
        }
        return <DataGridComp {...props} rows={rows}  getRowId= {(row) => {
            return row.id;
        }}/>;
    },
    args: {
        
        columns: columns,
        hideFooter: true,
        slots: {
            noRowsOverlay: renderNoRows,
        },
        loading: false,
        pageSelectorSize: 'small',

        numberOfRowOptions: PAGINATION_OPTIONS,
        pageInfo: { page: 1, size: 10 },
        pager: { totalRecords: 50 },
        handlePageSizeChange: (v) => {
            console.log(v);
        },
        handlePageNumberChange: (v) => {
            console.log(v);
        },
    },
};
