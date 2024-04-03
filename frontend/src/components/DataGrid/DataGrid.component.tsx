import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { debounce } from 'lodash';
import {
    Button,
    Dialog,
    Pagination,
    SearchInput,
    Tooltip,
    NoDataFound,
    ConfirmationPopup,
    SortBy,
    Select,
    OverflowToolTip,
} from '@docAi-app/stories';
import { AddUpdatePrompt } from '../AddUpdatePrompt';
import { ActionButton } from '../ActionButton';
import { Item } from '@docAi-app/types/common.type';
// import { copyHandler, highlightSearchedWord } from '@patent-app/utils/helpers/common.helper';
import {
    PAGINATION_OPTIONS,
    PROMPT_SORT_BY_OPTIONS,
    PROMPT_SORT_BY_PARAMS,
    TIMEOUT,
} from '@docAi-app/utils/constants/common.constant';
import Icons from '@docAi-app/icons';
// import { PromptApi } from '@patent-app/apis';

const maxTags = 2;

const DataGridComp = () => {
    // Hooks & Variables
    const [searchData, setSearchData] = useState('');
    const [data, setData] = useState<Prompt[]>([]);
    const [pager, setPager] = useState({ totalRecords: 0, filteredRecords: 0 });
    const [pagination, setPagination] = useState({ page: 1, size: 10 });
    const [selectedData, setSelectedData] = useState<Prompt>();
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const promptIdRef = useRef('');
    const [sortBy, setSoryBy] = useState<Item>(PROMPT_SORT_BY_OPTIONS[0]);

    const columns: GridColDef[] = useMemo(
        () => [
            {
                field: 'title',
                headerName: 'PROMPT TITLE',
                sortable: false,
                width: 250,
                filterable: false,
            },
            {
                field: 'description',
                headerName: 'DESCRIPTION',
                width: 300,
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
                        <div className="flex gap-[1.5rem] action-btns">
                            <ActionButton
                                icon={<Icons.Edit />}
                                onClick={() => updateDataHandler(params.row)}
                                title="Edit"
                            />

                            <ActionButton
                                icon={<Icons.Delete />}
                                onClick={() => handleDeleteClick(params.row?.id)}
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
        // onApiCall();
    }, [pagination, sortBy]);

    // Api Calls

    const onApiCall = (data = '') => {
        // const sortByParams = PROMPT_SORT_BY_PARAMS[sortBy.value] || {};
        // const params = {
        //     search: data,
        //     pageNumber: pagination.page,
        //     recordsPerPage: pagination.size,
        //     showAll: false,
        //     ...sortByParams,
        // };
        // PromptApi.getList(params)
        //     .then((res) => {
        //         setData(res.payload);
        //         if (res.pager)
        //             setPager({
        //                 totalRecords: res.pager.totalRecords,
        //                 filteredRecords: res.pager.filteredRecords,
        //             });
        //     })
        //     .catch((err) => {
        //         console.log('Error =>', err);
        //     })
        //     .finally(() => {
        //         setIsLoading(false);
        //     });
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
        console.log(data);
    };

    const handleDeleteClick = (id: string) => {
        promptIdRef.current = id;
        setIsDeleteConfirmationVisible(true);
    };

    const handleCloseDeleteConfirmation = () => {
        promptIdRef.current = '';
        setIsDeleteConfirmationVisible(false);
    };

    const handleConfirmDeleteConfirmation = () => {
        deletePromptApiCall(promptIdRef.current);
    };
    const handleSortByClick = (item: Item) => {
        // setSoryBy(item);
    };
    // Helpers

    // JSX Elements

    const renderNoRows = () => {
        return <NoDataFound message="No prompts were found based on your search" />;
    };

    return (
        <>
            <header className="flex justify-between items-center mb-[1.4rem]">
                <h2 className="font-[600] text-[3rem] m-0">Manage Models</h2>
                <div className="flex items-center gap-[1rem]">
                    <SearchInput
                        value={searchData}
                        onClearClick={() => {
                            onSearchData('');
                            setSearchData('');
                        }}
                        onChange={(e) => onSearchData(e.target.value)}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setIsOpenDialog(true);
                                setSelectedData(undefined);
                            }}
                        >
                            <span className="mr-[0.5rem]">
                                <Icons.Plus />
                            </span>{' '}
                            Prompt
                        </Button>
                    </div>

                    <span className="w-[14rem] text-center font-medium text-[1.5rem]"> Sort By :</span>

                    <SortBy items={PROMPT_SORT_BY_OPTIONS} onItemClick={handleSortByClick} value={sortBy} />
                </div>
            </header>
            <div className="w-[100%] h-[calc(100vh-24rem)]">
                <DataGrid
                    rows={data}
                    columns={columns}
                    hideFooter={true}
                    slots={{
                        noRowsOverlay: renderNoRows,
                    }}
                    // loading={isLoading}
                />
            </div>
            {pager?.totalRecords >= 10 ? (
                <div className="flex justify-between w-[100%] mt-[1rem]">
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

            {/* <Dialog
                open={isOpenDialog}
                onClose={() => setIsOpenDialog(false)}
                title={selectedData?.id ? 'Update Prompt' : 'Create Prompt'}
            >
                <AddUpdatePrompt onClose={(e: boolean) => onCloseDialog(e)} selectedData={selectedData} />
            </Dialog>

            <ConfirmationPopup
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
