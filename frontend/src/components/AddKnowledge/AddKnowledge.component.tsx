//Import Third Party lib
import { useEffect, useState, useMemo } from 'react';
import { Form, Field } from 'react-final-form';
import { useParams } from 'react-router-dom';
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

const fileTypes = ['PDF', 'TXT', 'HTML'];
const MAX_SIZE = 10101010;

export const indexList = async (searchString: string) => {
    const res = await indexApi
        .getAllIndex({
            search: searchString,
            page_number: 1,
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
    const options = res?.payload.map((data) => {
        return {
            label: data.title,
            value: data.index_uuid,
        };
    });
    return { options: options.length === 0 ? [] : options };
};

const AddKnowledge = () => {
    const [files, setFiles] = useState<FilesUpload[]>();
    const [index, setIndex] = useState<Option>();
    const params = useParams();

    useEffect(() => {
        const indexUuid = params['index-id'] ?? '';
        documentApi.getDocuments({ index_uuid: indexUuid }).then(({ payload }: { payload: any }) => {
            setFiles(payload.documents);
        });
        if (params['index-id'] !== undefined) {
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
    };

    const deleteFiles = (fileToRemove: FilesUpload) => {
        setFiles(
            files!.filter((file) => {
                return file.key !== fileToRemove.key;
            }),
        );
    };

    const handleSubmit = (v) => {};

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
            >
                <div className={Styles.dropArea}>
                    <p> Choose Files or Drag it Here </p>
                    <p> Files with .html , .pdf , .txt extension are allow</p>
                </div>
            </FileUploader>
            <div className={Styles.fileListContainer}>
                <div>
                    <Form
                        initialValues={useMemo(() => {
                            return {
                                index: index ?? undefined,
                            };
                        }, [])}
                        onSubmit={handleSubmit}
                        keepDirtyOnReinitialize={true}
                        render={({ handleSubmit, pristine }) => {
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
                                                        loadOptions={(searchString: string) => indexList(searchString)}
                                                    />
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className={Styles.actionButton}>
                                        <div>{<p>Knowledge to Upload </p>}</div>
                                        <Button type="submit" variant="contained" disabled={pristine}>
                                            Upload
                                        </Button>
                                    </div>
                                </form>
                            );
                        }}
                    />
                </div>

                <div className={Styles.fileList}>{<FileListing files={files} deleteFiles={deleteFiles} />}</div>
            </div>
        </div>
    );
};

export { AddKnowledge };
