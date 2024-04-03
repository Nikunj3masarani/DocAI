import { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { Button, InputChips, InputField, Select, TextArea, Tooltip } from '@patent-app/stories';
import { RatingTooltip } from '../RatingTooltip';
import { getAlert } from '@patent-app/hooks';
import { Prompt } from '@patent-app/types/Prompt.type';
import { removeValidField, validation } from '@patent-app/utils/helpers/validation.helper';
import { CHIPS_OPTIONS, SECTION_LIST, STATUS_CODE } from '@patent-app/utils/constants/common.constant';
import { addUpdateValidation } from './AddUpdatePrompt.validation';
import { PromptApi } from '@patent-app/apis';

interface AddUpdatePromptPros {
    selectedData: Prompt | undefined;
    onClose: (status: boolean) => void;
    description?: string;
}

const AddUpdatePrompt = ({ selectedData, onClose, description = '' }: AddUpdatePromptPros) => {
    // Hooks & Variables
    const [initialValue, setInitialValue] = useState<Omit<Prompt, 'id'>>({
        title: '',
        description,
        section: '',
        topic: '',
        tags: [],
        rating: 0,
    });

    useEffect(() => {
        if (selectedData?.id) {
            setInitialValue({
                title: selectedData.title,
                description: selectedData.description,
                tags: selectedData.tags?.length ? selectedData.tags : [],
                section: selectedData.section,
                topic: selectedData.topic,
                rating: selectedData?.rating && selectedData?.rating > 0 ? selectedData?.rating : 0,
            });
        }
    }, [selectedData]);

    // Api Calls

    const addUpdateProduct = (values: Prompt) => {
        const params = { ...values };

        if (values?.rating == initialValue?.rating) {
            delete params?.rating;
        }
        const apiCall = selectedData?.id ? PromptApi.update(params, selectedData?.id) : PromptApi.add(params);

        apiCall
            .then((res) => {
                if (res.status_code === STATUS_CODE[200]) {
                    onClose(true);
                } else if (res.status_code === STATUS_CODE[409] && res?.message) {
                    getAlert('error', res?.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Event Handlers

    const handleSubmit = (values: Prompt) => {
        addUpdateProduct(values);
    };

    // Helpers

    const validate = (values: Prompt) => {
        const validationObj = {
            title: validation(addUpdateValidation.title, values?.title),
            description: validation(addUpdateValidation.description, values?.description),
        };

        return removeValidField(validationObj);
    };

    // JSX Elements

    return (
        <div className="p-[3rem] pb-[0]">
            <Form
                onSubmit={handleSubmit}
                validate={validate}
                initialValues={initialValue}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <div>
                            <label>
                                <span className="text-error">*</span>Title
                            </label>
                            <div>
                                <Field
                                    name="title"
                                    render={({ input, meta }) => (
                                        <InputField
                                            {...input}
                                            fullWidth
                                            multiline
                                            placeholder="Enter title"
                                            required
                                            error={meta.touched && meta.error}
                                            helperText={meta.touched && meta.error && <span>{meta.error}</span>}
                                            maxRows={4}
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div>
                            <label>
                                <span className="text-error">*</span>Description
                            </label>
                            <div className="h-[17.8rem]">
                                <Field
                                    name="description"
                                    render={({ input, meta }) => (
                                        <TextArea
                                            rows={7}
                                            {...input}
                                            fullWidth
                                            multiline
                                            placeholder="Enter description"
                                            required
                                            error={meta.touched && meta.error}
                                            helperText={meta.touched && meta.error && <span>{meta.error}</span>}
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-[2rem]">
                            <div className="w-[70%]">
                                <label>Section</label>
                                <div className="h-[7.8rem]">
                                    <Field
                                        name="section"
                                        render={({ input }) => (
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                {...input}
                                                fullWidth
                                                placeholder="Section"
                                                options={SECTION_LIST}
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="w-[30%]">
                                <label>Ratings</label>
                                <div className="h-[7.8rem]">
                                    <Field
                                        name="rating"
                                        render={({ input }) => (
                                            <div className="flex gap-[1rem] items-center">
                                                <RatingTooltip {...input} className="mt-[1rem]" size="large" />
                                                {selectedData?.id ? (
                                                    <Tooltip title="No. of ratings received till now">
                                                        <span className="text-secondary mt-[7px]">
                                                            {selectedData?.ratings_count}
                                                        </span>
                                                    </Tooltip>
                                                ) : null}
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label>Topic</label>
                            <div>
                                <Field
                                    name="topic"
                                    render={({ input }) => (
                                        <InputField
                                            {...input}
                                            fullWidth
                                            multiline
                                            placeholder="Enter topic"
                                            maxRows={4}
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className="mt-[0.2rem]">
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

                        <div className="flex justify-end gap-[1rem] mt-[2rem]">
                            <Button type="button" variant="outlined" color="primary" onClick={() => onClose(false)}>
                                Cancel
                            </Button>

                            <Button type="submit" variant="contained" color="primary">
                                {selectedData?.id ? 'Update' : 'Save'}
                            </Button>
                        </div>
                    </form>
                )}
            />
        </div>
    );
};

export { AddUpdatePrompt };
