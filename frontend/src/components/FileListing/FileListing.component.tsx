//Import Third Party lib

import { Button, IconButton } from '@docAi-app/stories';
import { FilesUpload } from '@docAi-app/types/common.type';

//Import Storybook

//Import Component

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant

//Import Icon
import Delete from '@docAi-app/icons/Delete.icon';
//Import Api

//Import Assets

//Import Style
import Style from './FileListing.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { indexApi } from '@docAi-app/api';

const FileListing = ({
    files = [],
    deleteFiles,
}: {
    files: FilesUpload[] | undefined;
    deleteFiles: (file: FilesUpload) => void;
}) => {
    // useRef
    // useState
    // Variables Dependent upon State

    // Api Calls

    // Event Handlers

    // Helpers

    // JSX Methods

    // Your component logic here
    const [indexName, setIndexName] = useState<string>('');
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const indexUuid = params['index-id'] ?? '';
        indexApi.getIndex({ index_uuid: indexUuid }).then(({ payload }: { payload: any }) => {
            setIndexName(payload['title']);
        });
    }, [params['index-id']]);
    return !files ? (
        <>NO document uploded yet</>
    ) : (
        <>
            <div className={Style.header}>
                <div>{<p>Knowledge to Upload </p>}</div>
                <Button variant="contained">Upload</Button>
            </div>
            <ul className={`${Style.fileListContainer}`}>
                {files.map((file: FilesUpload) => {
                    return (
                        <li className={Style.fileListContainer__file} key={file.key}>
                            <p> {file[0].name}</p>
                            <IconButton
                                onClick={() => {
                                    deleteFiles(file);
                                }}
                            >
                                <Delete />
                            </IconButton>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export { FileListing };
