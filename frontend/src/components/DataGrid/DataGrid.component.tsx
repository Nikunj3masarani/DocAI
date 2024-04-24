//Import Third Party lib
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

//Import Storybook
import { Dialog, Pagination, SearchInput, NoDataFound, Select } from '@docAi-app/stories';

//Import Component
import { ActionButton } from '@docAi-app/components/ActionButton';

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant
import { PAGINATION_OPTIONS, TIMEOUT } from '@docAi-app/utils/constants/common.constant';

//Import Icon
import Icons from '@docAi-app/icons';

//Import Api
import { indexApi } from '@docAi-app/api';

//Import Assets

//Import Style
import Styles from './DataGrid.module.scss';
import { debounce } from 'lodash';
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';

// import { copyHandler, highlightSearchedWord } from '@patent-app/utils/helpers/common.helper';
// import { PromptApi } from '@patent-app/apis';

// const maxTags = 2;

type IndexListType = {
    index_uuid: string;
    title: string;
    description: string;
};

interface DataGripComp {
    isBrainChange: boolean;
    initialSearchValue: string;
}

const DataGridComp = ({ isBrainChange, initialSearchValue }: DataGripComp) => {
    // Hooks & Variables
    const [searchData, setSearchData] = useState(initialSearchValue);
    const [data, setData] = useState<IndexListType[]>([]);
    const [pager, setPager] = useState({ totalRecords: 0 });
    const [pagination, setPagination] = useState({ page: 1, size: 10 });
    const [selectedData, setSelectedData] = useState<IndexListType>();
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const promptIdRef = useRef('');
    const navigate = useNavigate();
    const columns: GridColDef[] = useMemo(
        () => [
            {
                field: 'title',
                headerName: 'Brains',
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

            {
                field: 'actions',
                headerName: 'Actions',
                sortable: false,
                filterable: false,
                width: 150,
                renderCell: (params) => {
                    return (
                        <div className={Styles.actionButtons}>
                            <ActionButton
                                icon={<Icons.Edit />}
                                onClick={() => updateDataHandler(params.row)}
                                title="Edit"
                            />

                            <ActionButton
                                icon={<Icons.Delete />}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleDeleteClick(params.row?.index_uuid);
                                }}
                                title="Delete"
                            />
                        </div>
                    );
                },
            },
        ],
        [searchData],
    );

    useEffect(() => {
        onApiCall();
    }, [pagination, searchData, isBrainChange]);

    // Api Calls
    const onApiCall = (data = '') => {
        const params = {
            search: data,
            page_number: pagination.page,
            records_per_page: pagination.size,
            sort_order: '',
            sort_by: '',
            show_all: true,
        };
        indexApi
            .getAllIndex(params)
            .then((res) => {
                setData((prev) => {
                    return res.payload.map((result) => {
                        return {
                            title: result.title,
                            description: result.description,
                            id: result.index_uuid,
                            created_at: result.created_at,
                        };
                    });
                });
                setData(res.payload);
                if (res.pager)
                    setPager({
                        totalRecords: res.pager.total_records,
                    });
            })
            .catch((err) => {
                console.log('Error =>', err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // Event Handlers

    const debounceSearch = useCallback(debounce(onApiCall, TIMEOUT.STANDARD), []);

    const deletePromptApiCall = (promptId: string) => {
        // if (promptId) {
        //     PromptApi.delete(promptId).then(() => {
        //         if (pagination.page !== 1) {
        //             setPagination((prev) => ({ ...prev, page: 1 }));
        //         } else {
        //             onApiCall();
        //         }
        //         handleCloseDeleteConfirmation();
        //     });
        // }
    };

    const onCloseDialog = (event: boolean) => {
        if (event) {
            onApiCall();
        }
        setIsOpenDialog(false);
    };

    const onSearchData = (data: string) => {
        if (pagination.page !== 1) {
            setPagination((prev) => ({ ...prev, page: 1 }));
        } else {
            debounceSearch(data);
        }
        setSearchData(data);
    };

    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPagination({ ...pagination, page: value });
    };

    const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
        setPagination({ page: 1, size: event.target.value as number });
    };

    const updateDataHandler = (data) => {
        // setSelectedData(data);
        // setIsOpenDialog(true);
        navigate(`${ROUTE.ROOT}${ROUTE.INDEX_LIST}/${data['index_uuid']}`, { state: { title: data.title } });
    };

    const handleDeleteClick = (id: string) => {
        indexApi.deleteIndex({ index_uuid: id }).then(() => {
            onApiCall();
        });
        // setIsDeleteConfirmationVisible(true);
    };

    const handleCloseDeleteConfirmation = () => {
        promptIdRef.current = '';
        setIsDeleteConfirmationVisible(false);
    };

    const handleConfirmDeleteConfirmation = () => {
        deletePromptApiCall(promptIdRef.current);
    };

    // Helpers

    // JSX Elements

    const renderNoRows = () => {
        return <NoDataFound message="No Brains were found based on your search" className={Styles.noDataFound} />;
    };

    return (
        <>
            <header className={Styles.header}>
                <div className={Styles['header__body']}>
                    <SearchInput
                        value={searchData}
                        placeholder="Search Brain"
                        onClearClick={() => {
                            onSearchData('');
                            setSearchData('');
                        }}
                        onChange={(e) => onSearchData(e.target.value)}
                    />
                </div>
            </header>
            <div className={Styles.dataGrid}>
                <DataGrid
                    disableColumnFilter={true}
                    disableColumnSelector={true}
                    disableColumnResize={true}
                    disableColumnMenu={true}
                    autosizeOptions={{
                        expand: false,
                    }}
                    getRowId={(row) => row.index_uuid}
                    rows={data}
                    columns={columns}
                    hideFooter={true}
                    slots={{
                        noRowsOverlay: renderNoRows,
                    }}
                    // onRowClick={(row, e) => {
                    //     console.log(e);
                    //     navigate(`${row.id}`);
                    // }}
                    loading={isLoading}
                />
            </div>
            {pager?.totalRecords >= 10 ? (
                <div className={Styles.pagination}>
                    <div>
                        <Select
                            options={PAGINATION_OPTIONS}
                            id="size-select"
                            value={pagination.size}
                            size="small"
                            onChange={handleSelectChange}
                        />
                    </div>
                    <div>
                        <Pagination
                            count={Math.ceil(pager.totalRecords / pagination.size)}
                            page={pagination.page}
                            color="primary"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            ) : null}

            <Dialog
                open={isOpenDialog}
                onClose={() => setIsOpenDialog(false)}
                title={selectedData?.id ? 'Update Prompt' : 'Create Prompt'}
            ></Dialog>

            {/* <ConfirmationPopup
                open={isDeleteConfirmationVisible}
                okayButtonLabel="Yes"
                cancelButtonLabel="No"
                title="Confirmation"
                question="This action can not be reverted. Are you sure you want to delete this model? "
                onCancelButtonClick={handleCloseDeleteConfirmation}
                onClose={handleCloseDeleteConfirmation}
                onConfirmButtonClick={handleConfirmDeleteConfirmation}
            /> */}
        </>
    );
};

export { DataGridComp };
