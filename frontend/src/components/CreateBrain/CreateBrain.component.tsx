//Import Third Party lib
import { AsyncSearchSelect, InputChips, InputField, Select, TextArea } from '@docAi-app/stories';
import { CHIPS_OPTIONS } from '@docAi-app/utils/constants/common.constant';
import { Form } from 'react-final-form';
import { Field } from 'react-final-form';
import { Button } from '@docAi-app/stories';

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
import Styles from './CreateBrain.module.scss';
import { useEffect, useReducer, useState } from 'react';
import { ModelApi, indexApi } from '@docAi-app/api';
import { PromptsApi } from '@docAi-app/api/prompts.api';
import { CreateIndexRequestBody } from '@docAi-app/types/index.type';
import { Validation } from '@docAi-app/types/validation.type';
import { removeEmptyField, validation } from '@docAi-app/utils/helper/validation.helper';
import { CreateBrainProps } from '@docAi-app/types/Brain.type';
import { useNavigate, useParams } from 'react-router-dom';
import { onLoadReaders } from '@docAi-app/utils/helper/common.helper';
import { Option } from '@docAi-app/types/common.type';
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';

interface ModelOption {
    model_uuid: string;
    display_name: string;
}

export interface PromptListData {
    prompt_uuid: string;
    title: string;
    status: string;
    content: string;
    created_at: string;
}
interface CustomPrompts {
    promptName: string;
    promptDescription: string;
    promptStatus: string;
}

const statusOptions = [
    { label: 'Private', value: 'Private' },
    { label: 'Public', value: 'Public' },
];
export const getPromptList = async (searchString: string) => {
    const res = await PromptsApi.getPromptsList({
        search: searchString,
        page_number: 1,
        records_per_page: 10,
        show_all: false,
        sort_by: '',
        sort_order: '',
    });
    const options = (res.payload as unknown as PromptListData[]).map((data) => {
        return {
            label: data.title,
            value: data.prompt_uuid,
        };
    });
    return { options: onLoadReaders(searchString, options), list: res.payload };
};

const CreateBrain = () => {
    const navigate = useNavigate();
    const params = useParams<{ 'index-id': string }>();

    // useRef
    const [modelOption, setModelOption] = useState<ModelOption[]>([]);

    const [promptList, setPromptList] = useState<Partial<PromptListData[]>>();
    const [customPrompt, setCustomPrompt] = useState<Partial<PromptListData>>({
        title: '',
        content: '',
        status: '',
    });

    const [prompt, setPrompt] = useState<Option>({
        label: '',
        value: '',
    });
    const [indexInfo, setIndexInfo] = useState({
        title: '',
        description: '',
        status: '',
        tags: [],
    });
    // useState

    // Variables Dependent upon State

    // Api Calls

    // Event Handlers

    useEffect(() => {}, []);

    useEffect(() => {
        const index_uuid = params['index-id'] ?? '';
        ModelApi.getModelsList().then(({ payload }) => {
            setModelOption(payload.models);
        });

        indexApi.getIndex({ index_uuid: index_uuid }).then(({ payload }) => {
            const initPayload = payload;
            setIndexInfo({
                title: initPayload.title,
                description: initPayload.description,
                tags: payload.tags,
                status: payload.status,
            });
            if (payload.prompt_uuid) {
                PromptsApi.getPrompt({ prompt_uuid: payload.prompt_uuid }).then(({ payload }) => {
                    setPrompt({ label: payload.Prompt.title, value: initPayload.prompt_uuid });
                    setCustomPrompt(payload.Prompt);
                });
            }
        });
    }, [params]);
    // Helpers

    // JSX Methods
    const formControls = ['title', 'description'] as const;

    type FieldValidation = {
        [P in (typeof formControls)[number]]: Partial<Validation>;
    };

    const fieldValidation: FieldValidation = {
        title: { required: { message: 'Name is required' } },
        description: { required: { message: 'Description is required' } },
    };

    const validate = (val) => {
        let errors = {
            title: '',
            description: '',
        };
        formControls.forEach((controlName) => {
            errors[controlName] = validation(fieldValidation[controlName], val[controlName]);
        });

        if (val['promptName']?.length > 0 && !(val['promptDescription'] && val['promptDescription'].length > 0)) {
            errors.promptDescription = 'Prompt Description is required';
        } else if (val['promptDescription']?.length > 0 && !(val['promptName'] && val['promptName'].length > 0)) {
            errors.promptName = 'Prompt Name is required';
        }

        const errorObject = removeEmptyField(errors) as object;
        return Object.keys(errorObject).length > 0 ? errorObject : {};
    };

    // Your component logic here

    const handleSubmit = (v: CustomPrompts & CreateIndexRequestBody) => {
        const customPrompt = {
            title: v.promptName,
            description: v.promptDescription,
            status: v.promptStatus,
        };

        const indexDetails = {
            title: v.title.toLowerCase(),
            description: v.description,
            status: v.status,
            tags: v.tags ?? [],
            prompt_uuid: prompt?.value,
            model: v.model,
        };

        const isCustomPrompt = promptList?.filter((prompt) => {
            return prompt?.title !== customPrompt.title;
        }).length;

        const isPromptUpdated = promptList?.filter((prompt) => {
            return prompt?.title === customPrompt.title && prompt?.content !== customPrompt.description;
        }).length;

        if (isPromptUpdated) {
            PromptsApi.updatePrompt({
                params: {
                    prompt_uuid: indexDetails.prompt_uuid,
                },
                requestBody: {
                    title: customPrompt.title,
                    description: customPrompt.description,
                    status: customPrompt.status,
                },
            });
        } else if (isCustomPrompt) {
            PromptsApi.createPrompt(customPrompt).then(({ payload }) => {
                console.log(payload);
                indexDetails.prompt_uuid = payload.prompt_uuid;
                indexApi.createIndex(indexDetails).then(() => {
                    navigate(`${ROUTE.ROOT}${ROUTE.INDEX_LIST}`);
                });
            });
        } else {
            indexApi.createIndex(indexDetails).then(() => {
                navigate(`${ROUTE.ROOT}${ROUTE.INDEX_LIST}`);
            });
        }
    };

    return (
        <div>
            <Form
                initialValues={{
                    title: indexInfo.title,
                    description: indexInfo.description,
                    status: indexInfo.status,
                    tags: indexInfo.tags,
                    model: modelOption.length > 0 ? modelOption[0].model_uuid : '',
                    prompt_uuid: prompt,
                    promptName: customPrompt.title,
                    promptDescription: customPrompt.content,
                    promptStatus: customPrompt.status,
                }}
                validate={validate}
                onSubmit={handleSubmit}
                render={({ handleSubmit, form }) => {
                    return (
                        <form onSubmit={handleSubmit} className={Styles.formContainer}>
                            <div className={Styles['formContainer__field']}>
                                <Field
                                    name="title"
                                    render={({ input, meta }) => {
                                        return (
                                            <InputField
                                                {...input}
                                                type="text"
                                                fullWidth
                                                onChange={(v) => {
                                                    setIndexInfo((prev) => {
                                                        return { ...prev, title: v.target.value };
                                                    });
                                                }}
                                                label="Name"
                                                placeholder="Enter your brain name"
                                                required
                                                error={meta.touched && meta.error && true}
                                                helperText={
                                                    meta.touched &&
                                                    meta.error && <span style={{ width: '100%' }}>{meta.error}</span>
                                                }
                                            />
                                        );
                                    }}
                                />
                            </div>

                            <div className={Styles['formContainer__field']}>
                                <Field
                                    name="description"
                                    render={({ input, meta }) => {
                                        return (
                                            <TextArea
                                                {...input}
                                                rows={4}
                                                onChange={(v) => {
                                                    setIndexInfo((prev) => {
                                                        return { ...prev, description: v.target.value };
                                                    });
                                                }}
                                                multiline
                                                type="text"
                                                fullWidth
                                                label="Description"
                                                placeholder="Enter your brain nae"
                                                required
                                                error={meta.touched && meta.error && true}
                                                helperText={
                                                    meta.touched &&
                                                    meta.error && <span style={{ width: '100%' }}>{meta.error}</span>
                                                }
                                            />
                                        );
                                    }}
                                />
                            </div>

                            <div className={Styles['formContainer__field']}>
                                <Field
                                    name="model"
                                    render={({ input }) => {
                                        return (
                                            <Select
                                                variant="outlined"
                                                {...input}
                                                options={modelOption.map((option) => {
                                                    return { label: option.display_name, value: option.model_uuid };
                                                })}
                                                label="Select Model"
                                            />
                                        );
                                    }}
                                />
                            </div>

                            <div className={Styles['formContainer__field']}>
                                <Field
                                    name="status"
                                    render={({ input }) => {
                                        return (
                                            <Select
                                                {...input}
                                                options={statusOptions}
                                                label="Select Status"
                                                placeholder="Select Status"
                                            />
                                        );
                                    }}
                                />
                            </div>
                            <div className={Styles['formContainer__field']}>
                                <label>Tags</label>
                                <Field
                                    name="tags"
                                    render={({ input, meta }) => (
                                        <InputChips
                                            {...input}
                                            fullWidth
                                            variant={'outlined'}
                                            label=""
                                            placeholder="Enter tags"
                                            error={meta.touched && meta.error}
                                            helperText={meta.touched && meta.error && <span>Parent {meta.error}</span>}
                                            addOnWhichKey={CHIPS_OPTIONS}
                                            hideClearAll={true}
                                            addOnBlur
                                        />
                                    )}
                                />
                            </div>

                            <div className={Styles['formContainer__field']}>
                                <Field
                                    name="prompt_uuid"
                                    render={({ input }) => {
                                        return (
                                            <AsyncSearchSelect
                                                {...input}
                                                label="Select Prompt"
                                                placeholder="Select Prompt"
                                                menuPlacement="bottom"
                                                loadOptions={(searchString: string) => {
                                                    return getPromptList(searchString).then((res) => {
                                                        setPromptList(res.list);
                                                        return res.options;
                                                    });
                                                }}
                                                debounceTimeout={1000}
                                                onChange={(v) => {
                                                    setPrompt(v as Option);
                                                    setCustomPrompt({
                                                        title: v.label,
                                                        content: promptList?.filter(
                                                            (prompt) => prompt.title === v.label,
                                                        )[0]?.content,
                                                    });
                                                }}
                                                required={true}
                                            />
                                        );
                                    }}
                                />
                            </div>

                            <div className={Styles['formContainer__field']}>
                                <Field
                                    name="promptName"
                                    render={({ input, meta }) => {
                                        return (
                                            <InputField
                                                {...input}
                                                type="text"
                                                fullWidth
                                                label="Prompt Name"
                                                placeholder="Enter your Prompt name"
                                                error={meta.touched && meta.error && true}
                                                helperText={
                                                    meta.touched &&
                                                    meta.error && <span style={{ width: '100%' }}>{meta.error}</span>
                                                }
                                            />
                                        );
                                    }}
                                />
                            </div>

                            <div className={Styles['formContainer__field']}>
                                <Field
                                    name="promptDescription"
                                    render={({ input, meta }) => {
                                        return (
                                            <TextArea
                                                {...input}
                                                rows={4}
                                                multiline
                                                type="text"
                                                fullWidth
                                                label="Prompt Description"
                                                placeholder="Enter your prompt description"
                                                error={meta.touched && meta.error && true}
                                                helperText={
                                                    meta.touched &&
                                                    meta.error && <span style={{ width: '100%' }}>{meta.error}</span>
                                                }
                                            />
                                        );
                                    }}
                                />
                            </div>

                            <div className={Styles['formContainer__field']}>
                                <Field
                                    name="promptStatus"
                                    render={({ input }) => {
                                        return (
                                            <Select
                                                {...input}
                                                options={statusOptions}
                                                label="Select Prompt Status"
                                                placeholder="Select Prompt Status"
                                            />
                                        );
                                    }}
                                />
                            </div>

                            <div className={Styles.formContainer__actionButton}>
                                <Button
                                    type="button"
                                    variant="contained"
                                    onClick={() => {
                                        form.reset();
                                    }}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    variant="outlined"
                                    onClick={() => {
                                        form.submit();
                                    }}
                                >
                                    {params['index-id'] ? 'Update' : 'Create'}
                                </Button>
                            </div>
                        </form>
                    );
                }}
            />
        </div>
    );
};

export { CreateBrain };
