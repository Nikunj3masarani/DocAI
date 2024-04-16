//Import Third Party lib
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

//Import Storybook
import { IconButton } from '@docAi-app/stories';

//Import Component

//Import Page

//Import Hook

//Import Context

//Import Model Type
import { FilesUpload } from '@docAi-app/types/common.type';

//Import Util, Helper , Constant

//Import Icon
import Delete from '@docAi-app/icons/Delete.icon';
//Import Api
import { indexApi } from '@docAi-app/api';

//Import Assets

//Import Style
import Style from './FileListing.module.scss';

const FileListing = ({
    files = [],
    deleteFiles,
    handleSubmit,
}: {
    files: FilesUpload[] | undefined;
    deleteFiles: (file: FilesUpload) => void;
}) => {
    const [indexName, setIndexName] = useState<string>('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const indexUuid = params['index-id'] ?? '';
        indexApi.getIndex({ index_uuid: indexUuid }).then(({ payload }: { payload: any }) => {
            setIndexName(payload['title']);
        });
    }, [params['index-id']]);

    // Your component logic here

    return !files ? (
        <>NO document uploded yet</>
    ) : (
        <>
            <ul className={`${Style.fileListContainer}`}>
                {files.map(({ file, key }: FilesUpload) => {
                    return (
                        <li className={Style.fileListContainer__file} key={key}>
                            <p> {file?.name}</p>
                            <IconButton
                                onClick={() => {
                                    deleteFiles({ file, key });
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
