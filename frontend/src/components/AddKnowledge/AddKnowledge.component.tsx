//Import Third Party lib

import { useEffect, useRef, useState } from 'react';

//Import Storybook

//Import Component

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant

//Import Icon
//Import Api

//Import Assets

//Import Style
import { FileUploader } from 'react-drag-drop-files';
import Styles from './AddKnowledge.module.scss';
import { onLoadReaders, uuidGenerator } from '@docAi-app/utils/helper/common.helper';
import { FileListing } from '@docAi-app/components/FileListing';
import { useLocation, useParams } from 'react-router-dom';
import { DocumentAPi } from '@docAi-app/api/documents.api';
import { AsyncSearchSelect } from '@docAi-app/stories';
import { indexApi } from '@docAi-app/api';
import { Option } from '@docAi-app/types/common.type';
import { Form } from 'react-final-form';
import { Field } from 'react-final-form';
import { isArray } from 'lodash';

const fileTypes = ['PDF', 'TXT', 'HTML'];
const MAX_SIZE = 10;

interface FilesUpload extends FileList {
    key: string;
}
export const indexList = async (searchString: string) => {
    const res = await indexApi.getAllIndex({
        search: searchString,
        page_number: 1,
        records_per_page: 10,
        show_all: true,
    });
    const options = res.payload.map((data) => {
        return {
            label: data.title,
            value: data.index_uuid,
        };
    });
    return onLoadReaders(searchString, options);
};

const AddKnowledge = () => {
    const [files, setFiles] = useState<FilesUpload[]>();
    const [index, setIndex] = useState<Option>();
    const handleChange = (file: FileList) => {
        const fileToUpload: FilesUpload = { ...file, key: uuidGenerator() };

        setFiles((prevFiles) => {
            return prevFiles ? [...prevFiles, fileToUpload] : [fileToUpload];
        });
    };
    const location = useLocation();
    const deleteFiles = (fileToRemove: FilesUpload) => {
        setFiles(
            files!.filter((file) => {
                return file.key !== fileToRemove.key;
            }),
        );
    };
    const params = useParams();

    useEffect(() => {
        const indexUuid = params['index-id'] ?? '';
        DocumentAPi.getDocuments({ index_uuid: indexUuid }).then(({ payload }: { payload: any }) => {
            setFiles(payload.documents);
        });
        console.log(params['index-id'] !== undefined);
        if (params['index-id'] !== undefined) {
            indexApi.getIndex({ index_uuid: indexUuid }).then(({ payload }) => {
                setIndex({
                    label: payload.title,
                    value: payload.index_uuid,
                });
            });
        }
    }, [params['index-id']]);

    useEffect(() => {}, []);
    const handleSubmit = (v) => {
        console.log(v);
    };
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
                <div className={Styles.formContainer}>
                    <Form
                        initialValues={{
                            index: index ?? undefined,
                        }}
                        onSubmit={handleSubmit}
                        render={({ handleSubmit }) => {
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <Field
                                            name="index"
                                            render={({ input }) => {
                                                return (
                                                    <AsyncSearchSelect
                                                        {...input}
                                                        value={index}
                                                        label="Select Brain"
                                                        placeholder="Select Brain"
                                                        menuPlacement="auto"
                                                        debounceTimeout={1000}
                                                        onChange={(v) => {
                                                            console.log(v);
                                                            setIndex(v as Option);
                                                        }}
                                                        required={true}
                                                        isDisabled={params && params['index-id'] ? true : false}
                                                        loadOptions={(searchString: string) => indexList(searchString)}
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
                <div className={Styles.fileList}>{<FileListing files={files} deleteFiles={deleteFiles} />}</div>
            </div>
        </div>
    );
};

export { AddKnowledge };
