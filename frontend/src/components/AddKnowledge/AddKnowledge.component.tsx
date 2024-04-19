//Import Third Party lib
import { useEffect, useRef, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useNavigate, useParams } from 'react-router-dom';
import { FileUploader } from 'react-drag-drop-files';

//Import Storybook
import { AsyncSearchSelect, Button } from '@docAi-app/stories';

//Import Component
import { FileListing } from '@docAi-app/components/FileListing';

//Import Page

//Import Hook

//Import Context

//Import Model Type
import { FilesUpload, Option } from '@docAi-app/types';

//Import Util, Helper , Constant
import { uuidGenerator } from '@docAi-app/utils/helper';

//Import Icon
//Import Api
import { indexApi, documentApi } from '@docAi-app/api';

//Import Assets

//Import Style
import Styles from './AddKnowledge.module.scss';
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';
import { getAlert } from '@docAi-app/hooks';
import { ALLOW_FILE_TYPES, MAX_FILE_SIZE } from '@docAi-app/utils/constants/common.constant';
import { FormApi } from 'final-form';

const indexList = async (searchString: string, loadOptions, { page }) => {
    const res = await indexApi.getAllIndex({
        search: searchString,
        page_number: page,
        records_per_page: 10,
        show_all: true,
    });

    const done = res.pager && res.pager.per_page * page < res.pager.total_records;
    const options = res?.payload.map((data) => {
        return {
            label: data.title,
            value: data.index_uuid,
        };
    });

    return {
        options: options.length === 0 ? [] : options,
        hasMore: done,
        additional: {
            page: searchString ? 1 : page + 1,
        },
    };
};
export interface ExistingFiles {
    title: string;
    key: string;
}

const FILE_ERROR = {
    type: 0,
    size: 1,
} as const;
const AddKnowledge = () => {
    const [files, setFiles] = useState<FilesUpload[]>([]);
    const [existingFiles, setExistingFiles] = useState<ExistingFiles[]>([]);
    const [index, setIndex] = useState<Option>();
    const existingFilesToRemove = useRef<string[]>([]);
    const fileUploadRef = useRef<HTMLDivElement | null>(null);
    const [fileError, setFileError] = useState<keyof typeof FILE_ERROR>();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const indexUuid = params['index-id'] ?? null;
        if (indexUuid && indexUuid !== '') {
            documentApi.getDocuments({ index_uuid: indexUuid }).then(({ payload }: { payload: any }) => {
                setExistingFiles(() => {
                    return payload.documents.map((document) => {
                        return { title: document.file_name, key: document.document_uuid };
                    });
                });
            });
            indexApi.getIndex({ index_uuid: indexUuid }).then(({ payload }) => {
                setIndex({
                    label: payload.title,
                    value: payload.index_uuid,
                });
            });
        }
    }, [params['index-id']]);

    // event handlers
    const handleChange = (files: FileList) => {
        const fileArr = Array.from(files);

        const fileToUpload: FilesUpload[] = fileArr.map((file: File) => {
            return { file, key: uuidGenerator() };
        });
        setFiles((prevFiles) => {
            return prevFiles ? [...prevFiles, ...fileToUpload] : [...fileToUpload];
        });
        setFileError(undefined);
    };

    const deleteFiles = ({ files, fromExisting }: { files: FilesUpload | ExistingFiles; fromExisting: boolean }) => {
        if (fromExisting) {
            const { key } = files;
            const fileToRemove = key;
            existingFilesToRemove.current.push(fileToRemove);
            setExistingFiles((prevFiles) => prevFiles.filter(({ key }) => key !== fileToRemove));
        } else if (files) {
            setFiles((prevFiles) => prevFiles?.filter((prevFile) => prevFile.key !== files.key));
        }
    };

    const handleSubmit = async (v) => {
        if (fileUploadRef.current) {
            fileUploadRef.current.className = `${Styles.fileUploader} disable`;
        }

        const formData = new FormData();
        existingFilesToRemove.current.forEach(async (fileToRemove) => {
            await documentApi.deleteDocument({ document_uuid: fileToRemove });
        });
        existingFilesToRemove.current = [];

        if (files.length) {
            files?.forEach((file) => {
                formData.append('documents', file.file);
            });

            await documentApi
                .uploadDocuments({ requestBody: formData, requestParams: { index_uuid: v.index.value } })
                .then((res) => {
                    getAlert('info', res.message);
                })
                .then(() => {
                    if (!params[ROUTE.INDEX_ID]) navigate(`${ROUTE.ROOT}${ROUTE.INDEX_LIST}`);
                    const indexUuid = index?.value;
                    if (indexUuid) {
                        documentApi
                            .getDocuments({ index_uuid: indexUuid as string })
                            .then(({ payload }: { payload: any }) => {
                                setExistingFiles(() => {
                                    return payload.documents.map((document) => {
                                        return { title: document.file_name, key: document.document_uuid };
                                    });
                                });
                            })
                            .finally(() => {
                                setFiles([]);
                            });
                    }
                    if (fileUploadRef.current) {
                        fileUploadRef.current.className = `${Styles.fileUploader}`;
                    }
                });
        } else {
            if (fileUploadRef.current) {
                fileUploadRef.current.className = `${Styles.fileUploader}`;
            }
        }
    };

    // component logic
    return (
        <div ref={fileUploadRef} className={`${Styles.fileUploader}`}>
            <FileUploader
                name="file"
                multiple={true}
                label=""
                hoverTitle="Drop here"
                dropMessageStyle={{
                    zIndex: '100',
                    backgroundColor: 'white',
                    opacity: '1',
                    transition: 'all 2s ease-out',
                }}
                handleChange={handleChange}
                types={ALLOW_FILE_TYPES}
                maxSize={MAX_FILE_SIZE}
                onTypeError={() => {
                    setFileError('type');
                }}
                onSizeError={() => {
                    setFileError('size');
                }}
            >
                <div className={`${Styles.dropArea} ${fileError ? Styles.fileError : null}`}>
                    <p> Choose Files or Drag it Here </p>
                    <p> Files with .html , .pdf , .txt extension are allow</p>
                    <p>
                        {fileError
                            ? fileError === 'size'
                                ? 'Maximum allow file size is 10mb'
                                : 'Selected type of documents are not acceptable'
                            : null}
                    </p>
                </div>
            </FileUploader>
            <div className={Styles.fileListContainer}>
                <div>
                    <Form
                        initialValues={{
                            index: index ?? undefined,
                        }}
                        onSubmit={handleSubmit}
                        render={({ handleSubmit, form, submitting }) => {
                            return (
                                <form onSubmit={handleSubmit} className={Styles.formContainer}>
                                    <div className={Styles.field}>
                                        <Field
                                            name="index"
                                            render={({ input }) => {
                                                return (
                                                    <AsyncSearchSelect
                                                        {...input}
                                                        placeholder="Select Brain"
                                                        menuPlacement="auto"
                                                        debounceTimeout={1000}
                                                        isDisabled={params && params['index-id'] ? true : false}
                                                        loadOptions={(searchString, loadOptions, { page }) => {
                                                            return indexList(searchString, loadOptions, { page }).then(
                                                                (res) => {
                                                                    if (input.value === '' && !params[ROUTE.INDEX_ID]) {
                                                                        form.change('index', res.options[0]);
                                                                        documentApi
                                                                            .getDocuments({
                                                                                index_uuid: res.options[0].value,
                                                                            })
                                                                            .then(({ payload }: { payload: any }) => {
                                                                                setExistingFiles(() => {
                                                                                    return payload.documents.map(
                                                                                        (document) => {
                                                                                            return {
                                                                                                title: document.file_name,
                                                                                                key: document.document_uuid,
                                                                                            };
                                                                                        },
                                                                                    );
                                                                                });
                                                                            });
                                                                    }
                                                                    return res;
                                                                },
                                                            );
                                                        }}
                                                        additional={{ page: 1 }}
                                                        onChange={(v) => {
                                                            form.change('index', v);
                                                            if (v?.value) {
                                                                documentApi
                                                                    .getDocuments({ index_uuid: v.value })
                                                                    .then((res) => {
                                                                        const documents = res.payload.documents;
                                                                        setExistingFiles(() => {
                                                                            return documents.map((document) => {
                                                                                const { file_name, document_uuid } =
                                                                                    document;
                                                                                return {
                                                                                    title: file_name,
                                                                                    key: document_uuid,
                                                                                };
                                                                            });
                                                                        });
                                                                    });
                                                            }
                                                            existingFilesToRemove.current = [];
                                                            setFiles([]);
                                                        }}
                                                    />
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className={Styles.actionButton}>
                                        <div>{<p>Knowledge to Upload </p>}</div>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disabled={
                                                index?.value === '' || 
                                                submitting ||
                                                (files.length === 0 && existingFilesToRemove.current.length === 0)
                                            }
                                        >
                                            Update knowledge
                                        </Button>
                                    </div>
                                </form>
                            );
                        }}
                    />
                </div>

                <div className={Styles.fileList}>
                    {<FileListing existingFiles={existingFiles} files={files} deleteFiles={deleteFiles} />}
                </div>
            </div>
        </div>
    );
};

export { AddKnowledge };
