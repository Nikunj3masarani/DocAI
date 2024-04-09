//Import Third Party lib
import { indexApi } from '@docAi-app/api';
import { PromptsApi } from '@docAi-app/api/prompts.api';
import { CreateBrain } from '@docAi-app/components';
import { CreateBrainProps } from '@docAi-app/types/Brain.type';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

const BrainSettings = () => {
    // useRef
    // useState
    // Variables Dependent upon State

    // Api Calls

    // Event Handlers

    // Helpers

    // JSX Methods

    // Your component logic here
    const params = useParams<{ 'index-id': string }>();
    const [createBrainArgs, setCreateBrainArgs] = useState<CreateBrainProps>({
        title: '',
        description: '',
        model: '',
        status: '',
        tags: [],
        prompt_uuid: '',
        promptName: '',
        promptDescription: '',
        promptStatus: '',
    });

    useEffect(() => {
        const index_uuid = params['index-id'] ?? '';
        indexApi.getIndex({ index_uuid: index_uuid }).then(({ payload }) => {
            const initPayload = payload;
            if (payload.prompt_uuid) {
                PromptsApi.getPrompt({ prompt_uuid: payload.prompt_uuid }).then(({ payload }) => {
                    setCreateBrainArgs((prev) => {
                        const prompt = {
                            promptName: payload.Prompt.title,
                            promptDescription: payload.Prompt.content,
                            promptStatus: payload.Prompt.status,
                        };
                        return { initPayload, ...prompt };
                    });
                });
            } else {
                setCreateBrainArgs(initPayload);
            }
        });
    }, [params]);
    console.log(createBrainArgs);
    return (
        <>
            <CreateBrain {...createBrainArgs} />
        </>
    );
};

export { BrainSettings };
