//Import Third Party lib
import { useEffect, useRef, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { FormApi } from 'final-form';
import { useNavigate, useParams } from 'react-router-dom';


//Import Storybook
import { AsyncSearchSelect, InputChips, InputField, Select, TextArea, Button } from '@docAi-app/stories';

//Import Component

//Import Page

//Import Hook

//Import Context

//Import Model Type
import { Validation } from '@docAi-app/types';

//Import Util, Helper , Constant
import { removeEmptyField, validation } from '@docAi-app/utils/helper';
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';
import { CHIPS_OPTIONS } from '@docAi-app/utils/constants/common.constant';

//Import Icon

//Import Api
import { modelApi, indexApi, promptApi } from '@docAi-app/api';

//Import Assets

//Import Style
import Styles from './CreateUpdateBrain.module.scss';

interface Model {
    model_uuid: string;
    display_name: string;
}

interface Prompt {
    prompt_uuid: string;
    title: string;
    status: string;
    content: string;
    created_at: string;
}

interface CreateUpdateBrainProps {
    close?: () => void;
    isBrainCreated?: () => void;
}

interface BrainInfo {
    title: string;
    description: string;
    status: string;
    tags: string[];
    model: string;
    promptUuid: {
        label: string;
        value: string;
    };
    promptTitle: string;
    promptContent: string;
    promptStatus: string;
}

type FieldValidation = {
    [P in (typeof FORM_CONTROLS)[number]]: Partial<Validation>;
};

const STATUS_OPTIONS = [
    { label: 'Private', value: 'Private' },
    { label: 'Public', value: 'Public' },
];

const FORM_CONTROLS = ['title', 'description'] as const;

const FIELD_VALIDATION: FieldValidation = {
    title: { required: { message: 'Name is required' } },
    description: { required: { message: 'Description is required' } },
};

const BRAIN_INITIAL_INFO: BrainInfo = {
    title: '',
    description: '',
    status: '',
    tags: [],
    model: '',
    promptTitle: '',
    promptContent: '',
    promptUuid: {
        label: '',
        value: '',
    },
    promptStatus: '',
};

const CreateUpdateBrain = ({ close, isBrainCreated }: CreateUpdateBrainProps) => {
    const params = useParams();
    const navigate = useNavigate();

    const [modelOption, setModelOption] = useState<Model[]>([]);

    const [promptList, setPromptList] = useState<Partial<Prompt[]>>();

    const [initialBrainInfo, setInitialBrainInfo] = useState<BrainInfo>(BRAIN_INITIAL_INFO);

    const formRef = useRef<FormApi<BrainInfo, Partial<BrainInfo>>>();

    useEffect(() => {
        getIndexDetails();
    }, []);

    const getIndexDetails = () => {
        const indexUuid = params[ROUTE.INDEX_ID] ?? null;

        modelApi.getModelsList().then(({ payload }) => {
            setModelOption(payload.models);
        });

        if (indexUuid) {
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
                        setInitialBrainInfo({
                            title: initPayload.title,
                            description: initPayload.description,
                            tags: initPayload.tags,
                            status: initPayload.status,
                            model: initPayload.model_uuid,
                            promptUuid: {
                                label: promptDetails.promptTitle,
                                value: initPayload.prompt_uuid,
                            },
                            ...promptDetails,
                        });
                    });
                } else {
                    setInitialBrainInfo({
                        title: initPayload.title,
                        description: initPayload.description,
                        tags: payload.tags,
                        status: payload.status,
                        promptUuid: {
                            value: payload.prompt_uuid,
                            label: '',
                        },
                        model: initPayload.model_uuid,
                        ...promptDetails,
                    });
                }
            });
        }
    };
    const getPromptList = async (searchString: string, loadOptions, { page }) => {
        const res = await promptApi.getPromptsList({
            search: searchString,
            page_number: page,
            records_per_page: 10,
            show_all: true,
            sort_by: '',
            sort_order: '',
        });
        const done = res.pager && res.pager.per_page * page < res.pager.total_records;

        const payload = res?.payload ?? [];
        const options = payload.map((data) => {
            return {
                label: data.title ?? '',
                value: data.prompt_uuid ?? '',
            };
        });

        setPromptList((prev) => {
            return prev ? [...prev, ...payload] : [...payload];
        });

        return {
            options: options.length === 0 ? [] : options,
            hasMore: done,
            additional: {
                page: searchString ? 1 : page + 1,
            },
        };
    };

    const createUpdateIndex = (brainInfo: BrainInfo) => {
        const indexUuid = params[ROUTE.INDEX_ID];
        //update index
        if (indexUuid) {
            indexApi.updateIndex({
                requestBody: {
                    description: brainInfo.description,
                    model: brainInfo.model,
                    prompt_uuid: brainInfo.promptUuid.value,
                    status: brainInfo.status,
                    tags: brainInfo.tags,
                },
                requestParams: { index_uuid: indexUuid },
            });
        } else {
            //create index
            indexApi
                .createIndex({
                    title: brainInfo.title,
                    description: brainInfo.description,
                    model: brainInfo.model,
                    prompt_uuid: brainInfo.promptUuid.value,
                    status: brainInfo.status,
                    tags: brainInfo.tags,
                })
                .then(() => {
                    if (close) close();
                    if (isBrainCreated) isBrainCreated();
                });
        }
    };

    const createUpdatePrompt = async ({
        promptContent,
        promptTitle,
        promptUuid,
        promptStatus,
    }: Pick<BrainInfo, 'promptTitle' | 'promptContent' | 'promptUuid' | 'promptStatus'>) => {
        let isPromptCreated = promptTitle !== '';
        let isPromptUpdated = false;

        if (promptUuid.value && promptUuid.value !== '') {
            const availablePrompt = await promptApi.getPrompt({ prompt_uuid: promptUuid.value });

            isPromptCreated = availablePrompt.payload.Prompt.title !== promptTitle;
            isPromptUpdated =
                availablePrompt.payload.Prompt.content !== promptContent &&
                availablePrompt.payload.Prompt.title === promptTitle;
        }
        let promptResponse = { prompt_uuid: promptUuid.value };
        if (isPromptCreated) {
            promptResponse = await promptApi
                .createPrompt({
                    description: promptContent,
                    title: promptTitle,
                    status: promptStatus,
                })
                .then(({ payload }) => {
                    return { prompt_uuid: payload.prompt_uuid };
                });
        } else if (isPromptUpdated) {
            promptResponse = await promptApi
                .updatePrompt({
                    requestParams: {
                        prompt_uuid: promptUuid.value,
                    },
                    requestBody: {
                        description: promptContent,
                        title: promptTitle,
                        status: promptStatus,
                    },
                })
                .then(({ payload }) => {
                    return { prompt_uuid: payload.prompt_uuid };
                });
        }

        return promptResponse;
    };

    // Event Handlers
    const validate = (formValues: BrainInfo) => {
        const errors = {
            title: '',
            description: '',
            promptContent: '',
            promptTitle: '',
        };

        FORM_CONTROLS.forEach((controlName) => {
            errors[controlName] = validation(FIELD_VALIDATION[controlName], formValues[controlName]);
        });

        if (
            formValues['promptTitle']?.length > 0 &&
            !(formValues['promptContent'] && formValues['promptContent'].length > 0)
        ) {
            errors.promptContent = 'Prompt Description is required';
        } else if (
            formValues['promptContent']?.length > 0 &&
            !(formValues['promptTitle'] && formValues['promptTitle'].length > 0)
        ) {
            errors.promptTitle = 'Prompt Name is required';
        }

        const errorObject = removeEmptyField(errors) as object;
        return Object.keys(errorObject).length > 0 ? errorObject : undefined;
    };

    const handleSubmit = async (formValues: BrainInfo) => {
        //formvalues ar not being changes
        const createUpdatePromptResponse = await createUpdatePrompt({
            promptTitle: formValues.promptTitle ?? '',
            promptContent: formValues.promptContent ?? '',
            promptStatus: formValues.promptStatus ?? '',
            promptUuid: formValues.promptUuid ?? { label: '', value: '' },
        });
        formValues.promptUuid.value = createUpdatePromptResponse.prompt_uuid;
        formRef.current?.restart(formValues);
        const response = await createUpdateIndex(formValues);
        if (!close) {
            getIndexDetails();
        }
    };

    // Your component logic here
    return (
        <div>
            <Form
                subscription={{ submitting: true, dirty: true, dirtySinceLastSubmit: true, modified: true }}
                initialValues={{
                    title: initialBrainInfo.title,
                    description: initialBrainInfo.description,
                    status: initialBrainInfo.status,
                    tags: initialBrainInfo.tags,
                    model: initialBrainInfo.model && initialBrainInfo.model !== '' ? initialBrainInfo.model : modelOption.length > 0 ? modelOption[0].model_uuid : '',
                    promptUuid: initialBrainInfo.promptUuid,
                    promptTitle: initialBrainInfo.promptTitle,
                    promptContent: initialBrainInfo.promptContent,
                    promptStatus: initialBrainInfo.promptStatus,
                }}
                validate={validate}
                onSubmit={handleSubmit}
                render={({ handleSubmit, form, dirty, submitting }) => {
                    formRef.current = form;
                    return (
                        <form onSubmit={handleSubmit} className={Styles.formContainer}>
                            <div className={Styles['formContainer__field']}>
                                <Field
                                    name="title"
                                    // subscription={{ touched: true, value: true, error: true }}
                                    render={({ input, meta }) => {
                                        return (
                                            <InputField
                                                {...input}
                                                type="text"
                                                fullWidth
                                                label="Name"
                                                disabled={params[ROUTE.INDEX_ID] ? true : false}
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
                                    // subscription={{ touched: true, value: true, error: true }}
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
                                    // subscription={{ touched: true, value: true, error: true }}
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
                                    // subscription={{ touched: true, value: true, error: true }}
                                    render={({ input }) => {
                                        return (
                                            <Select
                                                {...input}
                                                options={STATUS_OPTIONS}
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
                                    // subscription={{ touched: true, value: true, error: true }}
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
                                    name="promptUuid"
                                    // subscription={{ touched: true, value: true, error: true }}
                                    render={({ input }) => {
                                        return (
                                            <AsyncSearchSelect
                                                {...input}
                                                additional={{
                                                    page: 1,
                                                }}
                                                label="Select Prompt"
                                                placeholder="Select Prompt"
                                                menuPlacement="bottom"
                                                loadOptions={getPromptList}
                                                debounceTimeout={1000}
                                                onChange={(v) => {
                                                    const newPromptValue: BrainInfo['promptUuid'] =
                                                        v as BrainInfo['promptUuid'];
                                                    form.change('promptUuid', newPromptValue);
                                                    const tempPrompt = promptList?.filter(
                                                        (prompt) => prompt?.prompt_uuid === newPromptValue.value,
                                                    );
                                                    form.change('promptTitle', newPromptValue.label);
                                                    if (tempPrompt)
                                                        form.change('promptContent', tempPrompt[0]?.content);
                                                }}
                                            />
                                        );
                                    }}
                                />
                            </div>

                            <div className={Styles['formContainer__field']}>
                                <Field
                                    name="promptTitle"
                                    // subscription={{ touched: true, value: true, error: true }}
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
                                    name="promptContent"
                                    // subscription={{ touched: true, value: true, error: true }}
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
                                                options={STATUS_OPTIONS}
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

                                <Button type="submit" variant="contained" disabled={!dirty || submitting}>
                                    {params[ROUTE.INDEX_ID] ? 'Update' : 'Create'}
                                </Button>
                            </div>
                        </form>
                    );
                }}
            />
        </div>
    );
};

export { CreateUpdateBrain };
