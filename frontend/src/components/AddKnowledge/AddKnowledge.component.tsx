//Import Third Party lib
import { useEffect, useState, useMemo } from 'react';
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
import { FilesUpload, Option } from '@docAi-app/types/common.type';

//Import Util, Helper , Constant
import { uuidGenerator } from '@docAi-app/utils/helper/common.helper';

//Import Icon
//Import Api
import { indexApi, documentApi } from '@docAi-app/api';

//Import Assets

//Import Style
import Styles from './AddKnowledge.module.scss';
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';

const fileTypes = ['PDF', 'TXT', 'HTML'];
const MAX_SIZE = 10;

export const indexList = async (searchString: string, loadOptions, { page }) => {
    const res = await indexApi
        .getAllIndex({
            search: searchString,
            page_number: page,
            records_per_page: 10,
            show_all: true,
        })
        .then((response) => {
            return response;
        })
        .catch(() => {
            return {
                payload: [],
            };
        });
    const done = res?.pager?.per_page * page < res?.pager?.total_records;
    const options = res?.payload.map((data) => {
        return {
            label: data.title,
            value: data.index_uuid,
        };
    });
    return {
        options: options.length === 0 ? [] : options,
        hasMore: done ?? false,
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
    const [files, setFiles] = useState<FilesUpload[]>();
    const [existingFiles, setExistingFiles] = useState<ExistingFiles[]>([]);
    const [index, setIndex] = useState<Option>();
    const [fileError, setFileError] = useState<keyof typeof FILE_ERROR>();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const indexUuid = params['index-id'] ?? '';
        if (indexUuid) {
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
            documentApi.deleteDocument({ document_uuid: key });
            const fileToRemove = key;
            setExistingFiles((prevFiles) => prevFiles.filter(({ key }) => key !== fileToRemove));
        } else if (files) {
            setFiles((prevFiles) => prevFiles?.filter((prevFile) => prevFile.key !== files.key));
        }
    };

    const handleSubmit = (v) => {
        const formData = new FormData();

        files?.forEach((file) => {
            formData.append('documents', file.file);
        });

        documentApi
            .uploadDocuments({ requestBody: formData, requestParams: { index_uuid: v.index.value } })
            .then((res) => {
                navigate(`${ROUTE.ROOT}${ROUTE.INDEX_LIST}`);
            });
    };

    // component logic
    return (
        <div className={Styles.fileUploader}>
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
                types={fileTypes}
                maxSize={MAX_SIZE}
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
                        keepDirtyOnReinitialize={true}
                        render={({ handleSubmit, pristine, form }) => {
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
                                                        loadOptions={indexList}
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
                                            disabled={pristine || files?.length === 0}
                                        >
                                            Upload
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
