//Import Third Party lib
import { useEffect, useRef, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useNavigate, useParams } from 'react-router-dom';
import { FileUploader } from 'react-drag-drop-files';
import { FormApi } from 'final-form';

//Import Storybook
import { AsyncSearchSelect, Button, InputField, IconButton } from '@docAi-app/stories';

//Import Component
import { FileListing } from '@docAi-app/components/FileListing';

//Import Page

//Import Hook
import { getAlert } from '@docAi-app/hooks';

//Import Context

//Import Model Type
import { FilesUpload, Option } from '@docAi-app/types';

//Import Util, Helper , Constant
import { removeEmptyField, uuidGenerator, validation } from '@docAi-app/utils/helper';
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';
import { ALLOW_FILE_TYPES, MAX_FILE_SIZE } from '@docAi-app/utils/constants/common.constant';
import { REGEX } from '@docAi-app/utils/constants/regex.constant';

//Import Icon
import Icons from '@docAi-app/icons';

//Import Api
import { indexApi, documentApi } from '@docAi-app/api';

//Import Assets

//Import Style
import Styles from './AddUpdateKnowledge.module.scss';

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

export interface UrlToUpload extends ExistingFiles {}

const FILE_ERROR = {
    type: 0,
    size: 1,
} as const;

const AddUpdateKnowledge = () => {
    const [filesToUpload, setFilesToUpload] = useState<FilesUpload[]>([]);
    const [existingFiles, setExistingFiles] = useState<ExistingFiles[]>([]);
    const [urlsToUpload, setUrlsToUpload] = useState<UrlToUpload[]>([]);
    const [index, setIndex] = useState<Option>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formRef = useRef<FormApi<any, Partial<any>>>();
    const formSubmittingRef = useRef<boolean>(false);
    const existingFilesToRemove = useRef<string[]>([]);
    const fileUploadRef = useRef<HTMLDivElement | null>(null);
    const [fileError, setFileError] = useState<keyof typeof FILE_ERROR>();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const indexUuid = params[ROUTE.INDEX_ID] ?? null;
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
    }, []);

    // event handlers
    const handleChange = (files: FileList) => {
        const fileArr = Array.from(files);

        const fileToUpload: FilesUpload[] = fileArr.map((file: File) => {
            return { file, key: uuidGenerator() };
        });
        setFilesToUpload((prevFiles) => {
            return prevFiles ? [...prevFiles, ...fileToUpload] : [...fileToUpload];
        });
        setFileError(undefined);
    };

    const deleteFiles = ({
        files,
        fromExisting,
    }: {
        files: FilesUpload | ExistingFiles | UrlToUpload;
        fromExisting: boolean;
    }) => {
        if (fromExisting) {
            const { key } = files;
            const fileToRemove = key;

            existingFilesToRemove.current.push(fileToRemove);

            setExistingFiles((prevFiles) => prevFiles.filter(({ key }) => key !== fileToRemove));
        } else if (files) {
            if ('file' in files) {
                setFilesToUpload((prevFiles) => prevFiles?.filter((prevFile) => prevFile.key !== files.key));
            } else {
                const { key } = files;
                setUrlsToUpload((prev) => {
                    return prev.filter((url) => url.key !== key);
                });
            }
        }
    };

    const handleSubmit = async (v) => {
        const formData = new FormData();
        if (fileUploadRef.current) {
            fileUploadRef.current.className = `${Styles.fileUploader} disable`;
        }
        let apiCount = 0;
        existingFilesToRemove.current.forEach(async (fileToRemove) => {
            apiCount++;
            await documentApi.deleteDocument({ document_uuid: fileToRemove }).then((res) => {
                apiCount--;
                if (apiCount == 0) {
                    if (fileUploadRef.current) {
                        fileUploadRef.current.className = `${Styles.fileUploader}`;
                    }
                }
            });
        });

        apiCount = 0;
        urlsToUpload.forEach(async (url) => {
            apiCount++;
            if (fileUploadRef.current) {
                fileUploadRef.current.className = `${Styles.fileUploader} disable`;
            }
            await documentApi
                .uploadCrawl({
                    requestParams: { index_uuid: (v.index.value as string) ?? '', url: url.title },
                })
                .then((res) => {
                    apiCount--;
                    if (apiCount === 0 && fileUploadRef.current) {
                        fileUploadRef.current.className = `${Styles.fileUploader}`;
                    }
                });
        });

        existingFilesToRemove.current = [];
        existingFiles;
        setUrlsToUpload([]);

        if (filesToUpload.length) {
            apiCount = 0;
            if (fileUploadRef.current) {
                fileUploadRef.current.className = `${Styles.fileUploader} disable`;
            }
            filesToUpload?.forEach((file) => {
                formData.append('documents', file.file);
            });
            if (fileUploadRef.current) {
                fileUploadRef.current.className = `${Styles.fileUploader} disable`;
            }

            await documentApi
                .uploadDocuments({ requestBody: formData, requestParams: { index_uuid: v.index.value } })
                .then((res) => {
                    getAlert('info', res.message);
                })
                .then(() => {
                    apiCount--;
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
                                setFilesToUpload([]);
                            });
                    }
                    if (apiCount === 0 && fileUploadRef.current) {
                        fileUploadRef.current.className = `${Styles.fileUploader}`;
                    }
                });
        } else {
            if (fileUploadRef.current) {
                fileUploadRef.current.className = `${Styles.fileUploader}`;
            }
        }
    };

    const handleAddWebUrl = (v) => {
        if (v['url'] && v['url'].length > 0) {
            setUrlsToUpload((prev) => {
                return prev.length
                    ? [...prev, { title: v['url'], key: uuidGenerator() }]
                    : [{ title: v['url'], key: uuidGenerator() }];
            });
        }
    };

    const handleValidateUrls = (val: { url: string }) => {
        const error = {
            url: '',
        };

        error['url'] = validation(
            {
                regex: {
                    regexPattern: REGEX.URL_VALID,
                    message: 'Please Enter valid URL',
                },
            },
            val['url'],
        );
        const errorObject = removeEmptyField(error) as object;
        return Object.keys(errorObject).length > 0 ? errorObject : {};
    };

    // component logic
    return (
        <div ref={fileUploadRef} className={`${Styles.fileUploader}`}>
            <div className={Styles.fileUploader__row}>
                <div className={Styles.fileUploader__child}>
                    <Form
                        initialValues={{
                            index: index ?? undefined,
                        }}
                        onSubmit={handleSubmit}
                        render={({ handleSubmit, form, submitting }) => {
                            formRef.current = form;
                            formSubmittingRef.current = submitting;
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
                                                        isDisabled={params && params[ROUTE.INDEX_ID] ? true : false}
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
                                                            setUrlsToUpload([]);
                                                            setFilesToUpload([]);
                                                        }}
                                                    />
                                                );
                                            }}
                                        />
                                    </div>
                                </form>
                            );
                        }}
                    />
                </div>
                <div className={Styles.fileUploader__child}>
                    <h4>Knowledge to Upload</h4>
                </div>
            </div>
            <div className={Styles.fileUploader__fileListRow}>
                <div className={Styles.fileUploader__child}>
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
                </div>
                <div className={Styles.fileUploader__child}>
                    <div className={Styles.fileList}>
                        {
                            <FileListing
                                urlsToUpload={urlsToUpload}
                                existingFiles={existingFiles}
                                files={filesToUpload}
                                deleteFiles={deleteFiles}
                            />
                        }
                    </div>
                </div>
            </div>

            <div className={Styles.fileUploader__row}>
                <div className={Styles.fileUploader__child}>
                    <Form
                        validate={handleValidateUrls}
                        onSubmit={handleAddWebUrl}
                        render={({ form, values, invalid }) => {
                            return (
                                <form className={Styles.formContainer}>
                                    <div className={Styles.field}>
                                        <Field
                                            name="url"
                                            render={({ input, meta }) => {
                                                return (
                                                    <InputField
                                                        fullWidth
                                                        {...input}
                                                        type="text"
                                                        placeholder="Enter the knowledge through url"
                                                        error={meta.touched && meta.error && true}
                                                        helperText={
                                                            meta.touched &&
                                                            meta.error && (
                                                                <span style={{ width: '100%' }}>{meta.error}</span>
                                                            )
                                                        }
                                                    />
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className={Styles.actionButtons}>
                                        <IconButton
                                            onClick={() => {
                                                handleAddWebUrl(values);
                                                form.restart();
                                            }}
                                            disabled={invalid || !values['url']}
                                        >
                                            {<Icons.ArrowCircleUp />}
                                        </IconButton>
                                    </div>
                                </form>
                            );
                        }}
                    />
                </div>
            </div>

            <div className={Styles.actionButton}>
                <Button
                    variant="contained"
                    onClick={() => {
                        formRef.current?.submit();
                    }}
                    disabled={
                        index?.value === '' ||
                        formSubmittingRef.current ||
                        (filesToUpload.length === 0 &&
                            existingFilesToRemove.current.length === 0 &&
                            urlsToUpload.length === 0)
                    }
                >
                    Upload Knowledge
                </Button>
            </div>
        </div>
    );
};

export { AddUpdateKnowledge };
