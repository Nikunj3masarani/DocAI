//Import Third Party lib
import { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useNavigate, useParams } from 'react-router-dom';

import { CHIPS_OPTIONS } from '@docAi-app/utils/constants/common.constant';

//Import Storybook
import { AsyncSearchSelect, InputChips, InputField, Select, TextArea, Button } from '@docAi-app/stories';

//Import Component

//Import Page

//Import Hook

//Import Context

//Import Model Type
import { Validation } from '@docAi-app/types/validation.type';

//Import Util, Helper , Constant
import { removeEmptyField, validation } from '@docAi-app/utils/helper/validation.helper';

//Import Icon

//Import Api
import { modelApi, indexApi, promptApi } from '@docAi-app/api';

//Import Assets

//Import Style
import Styles from './CreateBrain.module.scss';
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

interface CreateBrainProps {
    close?: () => void;
    isBrainCreated?: () => void;
}

const statusOptions = [
    { label: 'Private', value: 'Private' },
    { label: 'Public', value: 'Public' },
];

export const getPromptList = async (searchString: string) => {
    const res = await promptApi.getPromptsList({
        search: searchString,
        page_number: 1,
        records_per_page: 10,
        show_all: false,
        sort_by: '',
        sort_order: '',
    });

    const payload = res?.payload ?? [];
    const options = (payload as unknown as PromptListData[]).map((data) => {
        return {
            label: data.title ?? '',
            value: data.prompt_uuid ?? '',
        };
    });

    if (res?.payload) {
        return { options: options, list: res.payload };
    } else
        return {
            options: options.length === 0 ? [] : options,
        };
};

const formControls = ['title', 'description'] as const;

type FieldValidation = {
    [P in (typeof formControls)[number]]: Partial<Validation>;
};

const CreateBrain = ({ close, isBrainCreated }: CreateBrainProps) => {
    const params = useParams<{ 'index-id': string }>();
    const navigate = useNavigate();

    const [modelOption, setModelOption] = useState<ModelOption[]>([]);

    const [promptList, setPromptList] = useState<Partial<PromptListData[]>>();

    const [indexInfo, setIndexInfo] = useState<{
        title: string;
        description: string;
        status: string;
        tags: string[];
        model: string;
        promptTitle: string;
        promptContent: string;
        promptValue: string;
        promptStatus: string;
    }>({
        title: '',
        description: '',
        status: '',
        tags: [],
        model: '',
        promptTitle: '',
        promptContent: '',
        promptValue: '',
        promptStatus: '',
    });

    useEffect(() => {
        const indexUuid = params['index-id'] ?? '';
        modelApi.getModelsList().then(({ payload }) => {
            setModelOption(payload.models);
        });

        if (indexUuid !== '') {
            indexApi.getIndex({ index_uuid: indexUuid }).then(({ payload }) => {
                const initPayload = payload;
                let promptDetails = {
                    promptTitle: '',
                    promptContent: '',
                    promptStatus: '',
                };

                if (payload.prompt_uuid) {
                    promptApi.getPrompt({ prompt_uuid: payload.prompt_uuid }).then(({ payload }) => {
                        promptDetails = {
                            promptTitle: payload.Prompt.title,
                            promptContent: payload.Prompt.content,
                            promptStatus: payload.Prompt.status,
                        };
                        setIndexInfo({
                            title: initPayload.title,
                            description: initPayload.description,
                            tags: initPayload.tags,
                            status: initPayload.status,
                            promptValue: initPayload.prompt_uuid,
                            model: initPayload.model_uuid,
                            ...promptDetails,
                        });
                    });
                } else {
                    setIndexInfo({
                        title: initPayload.title,
                        description: initPayload.description,
                        tags: payload.tags,
                        status: payload.status,
                        promptValue: payload.prompt_uuid,
                        model: initPayload.model_uuid,
                        ...promptDetails,
                    });
                }
            });
        }
    }, [params]);

    // Event Handlers

    const fieldValidation: FieldValidation = {
        title: { required: { message: 'Name is required' } },
        description: { required: { message: 'Description is required' } },
    };

    const validate = (val) => {
        let errors = {
            title: '',
            description: '',
            promptDescription: '',
            promptName: '',
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

    const handleSubmit = (v) => {
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
            prompt_uuid: v.prompt_uuid.value,
            model: v.model,
        };

        const isCustomPrompt = !promptList?.filter((prompt) => {
            return prompt?.title === customPrompt.title;
        }).length;

        const isPromptUpdated = promptList?.filter((prompt) => {
            return prompt?.title === customPrompt.title && prompt?.content !== customPrompt.description;
        }).length;

        if (isPromptUpdated) {
            promptApi.updatePrompt({
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
            promptApi.createPrompt(customPrompt).then(({ payload }) => {
                indexDetails.prompt_uuid = payload.prompt_uuid;
                indexApi.createIndex(indexDetails).then(() => {
                    if (close) close();
                    if (isBrainCreated) isBrainCreated();
                });
            });
        } else {
            if (params['index-id']) {
                indexApi
                    .updateIndex({ requestBody: indexDetails, requestParams: { index_uuid: params['index-id'] } })
                    .then(() => {
                        if (close) close();
                        if (isBrainCreated) isBrainCreated();
                    });
            } else {
                indexApi.createIndex(indexDetails).then(() => {
                    if (close) close();
                    if (isBrainCreated) isBrainCreated();
                });
            }
        }
    };

    // Your component logic here
    return (
        <div>
            <Form
                keepDirtyOnReinitialize={true}
                subscription={{ submitting: true }}
                initialValues={{
                    title: indexInfo.title,
                    description: indexInfo.description,
                    status: indexInfo.status,
                    tags: indexInfo.tags,
                    model: indexInfo.model ?? modelOption.length > 0 ? modelOption[0].model_uuid : '',
                    prompt_uuid: { label: indexInfo.promptTitle, value: indexInfo.promptValue },
                    promptName: indexInfo.promptTitle,
                    promptDescription: indexInfo.promptContent,
                    promptStatus: indexInfo.promptStatus,
                }}
                validate={validate}
                onSubmit={handleSubmit}
                render={({ handleSubmit, form, values }) => {
                    return (
                        <form onSubmit={handleSubmit} className={Styles.formContainer}>
                            <div className={Styles['formContainer__field']}>
                                <Field
                                    name="title"
                                    subscription={{ touched: true, value: true, error: true }}
                                    render={({ input, meta }) => {
                                        return (
                                            <InputField
                                                {...input}
                                                type="text"
                                                fullWidth
                                                label="Name"
                                                disabled={params['index-id'] ? true : false}
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
                                    subscription={{ touched: true, value: true, error: true }}
                                    render={({ input, meta }) => {
                                        return (
                                            <TextArea
                                                {...input}
                                                rows={4}
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
                                    subscription={{ touched: true, value: true, error: true }}
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
                                    subscription={{ touched: true, value: true, error: true }}
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
                                    subscription={{ touched: true, value: true, error: true }}
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
                                    subscription={{ touched: true, value: true, error: true }}
                                    render={({ input }) => {
                                        const label = indexInfo.promptTitle;
                                        return (
                                            <AsyncSearchSelect
                                                {...input}
                                                label="Select Prompt"
                                                placeholder="Select Prompt"
                                                menuPlacement="bottom"
                                                // value={{ label: label, value: input.value }}
                                                loadOptions={async (searchString: string) => {
                                                    const res = await getPromptList(searchString);
                                                    setPromptList(res?.list);
                                                    return { options: [], hasMore: false };
                                                }}
                                                debounceTimeout={1000}
                                                onChange={(v) => {
                                                    const promptUuid = v.value;
                                                    form.change('prompt_uuid', v);
                                                    const tempPrompt = promptList?.filter(
                                                        (prompt) => prompt?.prompt_uuid === promptUuid,
                                                    );
                                                    form.change('promptName', v.label);
                                                    form.change('promptDescription', tempPrompt[0]?.content);
                                                }}
                                            />
                                        );
                                    }}
                                />
                            </div>

                            <div className={Styles['formContainer__field']}>
                                <Field
                                    name="promptName"
                                    subscription={{ touched: true, value: true, error: true }}
                                    render={({ input, meta }) => {
                                        return (
                                            <InputField
                                                {...input}
                                                // value={indexInfo.promptTitle}
                                                type="text"
                                                fullWidth
                                                label="Prompt Name"
                                                placeholder="Enter your Prompt name"
                                                error={meta.touched && meta.error && true}
                                                helperText={
                                                    meta.touched &&
                                                    meta.error && <span style={{ width: '100%' }}>{meta.error}</span>
                                                }
                                                // onChange={(v) => {
                                                //     input.onChange(v);
                                                //     setIndexInfo((prev) => ({ ...prev, promptTitle: v.target.value }));
                                                // }}
                                            />
                                        );
                                    }}
                                />
                            </div>

                            <div className={Styles['formContainer__field']}>
                                <Field
                                    name="promptDescription"
                                    subscription={{ touched: true, value: true, error: true }}
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
                                                // onChange={(v) => {
                                                //     setIndexInfo((prev) => ({
                                                //         ...prev,
                                                //         promptContent: v.target.value,
                                                //     }));
                                                // }}
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
                                    variant="outlined"
                                    type="button"
                                    onClick={() => {
                                        if (close) {
                                            close();
                                        }
                                        navigate(`${ROUTE.ROOT}${ROUTE.INDEX_LIST}`);
                                    }}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    variant="contained"
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
