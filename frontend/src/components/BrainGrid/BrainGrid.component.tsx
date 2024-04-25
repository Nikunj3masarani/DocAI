//Import Third Party lib
import { useCallback, useEffect, useRef, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

//Import Storybook
import { Dialog, SearchInput, NoDataFound, DataGrid } from '@docAi-app/stories';

//Import Component
import { ActionButton } from '@docAi-app/components/ActionButton';

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant
import { PAGINATION_OPTIONS, TIMEOUT } from '@docAi-app/utils/constants/common.constant';
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';


//Import Icon
import Icons from '@docAi-app/icons';

//Import Api
import { indexApi } from '@docAi-app/api';

//Import Assets

//Import Style
import Styles from './BrainGrid.module.scss';


type IndexListType = {
    index_uuid: string;
    title: string;
    description: string;
};

interface DataGripComp {
    isBrainChange: boolean;
    initialSearchValue: string;
}

const renderNoRows = () => {
    return <NoDataFound message="No Brains were found based on your search" className={Styles.noDataFound} />;
};

const BrainGrid = ({ isBrainChange, initialSearchValue }: DataGripComp) => {
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
    const columns: GridColDef[] = [
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
    ];

    useEffect(() => {
        onApiCall({});
    }, [pagination, isBrainChange]);

    // Api Calls
    const onApiCall = ({ pageNumber = pagination.page, data = '' }: { pageNumber?: number, data?: string }) => {
        const params = {
            search: data,
            page_number: pageNumber,
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
            onApiCall({});
        }
        setIsOpenDialog(false);
    };

    const onSearchData = (data: string) => {

        debounceSearch({ data, pageNumber: 1 });
        // setSearchData(data);
    };

    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPagination({ ...pagination, page: value });
    };

    const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
        setPagination({ page: 1, size: event.target.value as number });
    };

    const updateDataHandler = (data: IndexListType) => {
        // setSelectedData(data);
        // setIsOpenDialog(true);
        navigate(`${ROUTE.ROOT}${ROUTE.INDEX_LIST}/${data['index_uuid']}`, { state: { title: data.title } });
    };

    const handleDeleteClick = (id: string) => {
        indexApi.deleteIndex({ index_uuid: id }).then(() => {
            onApiCall({});
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
                        onChange={(e) => {
                            onSearchData(e.target.value);
                            setSearchData(e.target.value);
                        }}
                    />
                </div>
            </header>
            <div className={Styles.dataGrid}>
                <DataGrid
                    getRowId={(row) => row.index_uuid}
                    rows={data}
                    columns={columns}
                    hideFooter={true}
                    slots={{
                        noRowsOverlay: renderNoRows,
                    }}
                    loading={isLoading}
                    pageSelectorSize="small"
                    pageInfo={pagination}
                    pager={pager}
                    handlePageSizeChange={handleSelectChange}
                    handlePageNumberChange={handleChange}
                    numberOfRowOptions={PAGINATION_OPTIONS}
                    onRowSelectionModelChange={(v) => {
                        const selectedRow = data.filter((row) => row.index_uuid === v[0]);
                        updateDataHandler(selectedRow[0]);
                    }}
                />
            </div>

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

export { BrainGrid };
