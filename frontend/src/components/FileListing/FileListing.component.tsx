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
import { FilesUpload } from '@docAi-app/types';

//Import Util, Helper , Constant

//Import Icon
import Delete from '@docAi-app/icons/Delete.icon';
//Import Api
import { indexApi } from '@docAi-app/api';

//Import Assets

//Import Style
import Style from './FileListing.module.scss';
import { ExistingFiles } from '../AddKnowledge/AddKnowledge.component';

const FileListing = ({
    files = [],
    existingFiles = [],
    deleteFiles,
}: {
    files: FilesUpload[] | undefined;
    deleteFiles: (fileToRemove: { files: FilesUpload | ExistingFiles; fromExisting: boolean }) => void;
    existingFiles: ExistingFiles[] | undefined;
}) => {
    // Your component logic here

    return !files ? (
        <>NO document uploded yet</>
    ) : (
        <>
            <ul className={`${Style.fileListContainer}`}>
                {existingFiles
                    ? existingFiles.map(({ title, key }: ExistingFiles) => {
                          return (
                              <li className={Style.fileListContainer__file} key={key}>
                                  <p> {title}</p>
                                  <IconButton
                                      onClick={() => {
                                          deleteFiles({ files: { title, key }, fromExisting: true });
                                      }}
                                  >
                                      <Delete />
                                  </IconButton>
                              </li>
                          );
                      })
                    : null}
                {files.map(({ file, key }: FilesUpload) => {
                    return (
                        <li className={Style.fileListContainer__file} key={key}>
                            <p> {file?.name}</p>
                            <IconButton
                                onClick={() => {
                                    deleteFiles({ files: { file, key }, fromExisting: false });
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
