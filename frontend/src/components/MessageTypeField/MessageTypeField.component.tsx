//Import Third Party lib
import { Form, Field } from 'react-final-form';
import { useEffect, useState } from 'react';

//Import Storybook
import { CircularLoader, IconButton, Select, AsyncSearchSelect } from '@docAi-app/stories';

//Import Component

//Import Page

//Import Hook

//Import Context

//Import Model Type
import { Option } from '@docAi-app/types';

//Import Util, Helper , Constant

//Import Icon
import { Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

//Import Api
import { modelApi, indexApi } from '@docAi-app/api';

//Import Assets

//Import Style
import Style from './MessageTypeField.module.scss';
import { StyledInputBase, StyledPaper } from './MessageTypeField.styled';

export const indexList = async (searchString: string, loadOptions, { page }) => {
    const res = await indexApi.getAllIndex({
        search: searchString,
        page_number: page,
        records_per_page: 10,
        show_all: true,
    });
    const options = res.payload.map((data) => {
        return {
            label: data.title,
            value: data.index_uuid,
        };
    });
    const done = res?.pager?.per_page * page < res?.pager?.total_records;

    return {
        options: options.length === 0 ? [] : options,
        hasMore: done ?? false,
        additional: {
            page: searchString ? 1 : page + 1,
        },
    };
};
type MessageTypeFieldProps = {
    initialIndex?: Option;
    disable: boolean;
    handleSubmit: (v: any) => void;
};
const MessageTypeField = ({ disable, handleSubmit, initialIndex }: MessageTypeFieldProps) => {
    // useRef
    // useState
    const [index, setIndex] = useState<Option>(initialIndex ?? { label: '', value: '' });
    const [modelOption, setModelOption] = useState<Option[]>([]);
    useEffect(() => {
        console.log(index);
        if (index.value === '') {
            indexList('', undefined, { page: 1 }).then((res) => {
                setIndex(res.options[0]);
            });
        }

        modelApi.getModelsList().then((res) => {
            let models = res.payload.models;
            models = models.map((model) => {
                return { label: model.display_name, value: model.model_uuid };
            });
            setModelOption(models);
        });
    }, []);
    // Variables Dependent upon State

    // Api Calls

    // Event Handlers

    // Helpers

    // JSX Methods

    // Your component logic here

    return (
        <Form
            className={Style.formContainer}
            onSubmit={handleSubmit}
            initialValues={{
                index: index,
                model: (modelOption && modelOption?.at(0)?.value) ?? '',
            }}
            render={({ handleSubmit, form }) => {
                return (
                    <form
                        onSubmit={(v: any) => {
                            handleSubmit(v);
                            form.reset();
                        }}
                        className={Style.formContainer}
                    >
                        <StyledPaper elevation={3} component="div" width={'100%'}>
                            <div className={Style.asyncSelect}>
                                <Field
                                    name="index"
                                    render={({ input }) => {
                                        return (
                                            <AsyncSearchSelect
                                                {...input}
                                                label=""
                                                placeholder="Select Brain"
                                                menuPlacement="auto"
                                                debounceTimeout={1000}
                                                onChange={(v) => {
                                                    setIndex(v as Option);
                                                }}
                                                loadOptions={indexList}
                                                additional={{ page: 1 }}
                                            />
                                        );
                                    }}
                                />
                            </div>
                            <Divider sx={{ height: 50, m: 0.5 }} orientation="vertical" />
                            <div className={Style.models}>
                                <Field
                                    name="model"
                                    subscription={{ touched: true, value: true, error: true }}
                                    render={({ input }) => {
                                        return (
                                            <Select
                                                {...input}
                                                disabled={true}
                                                options={modelOption}
                                                placeholder="Select Model"
                                            />
                                        );
                                    }}
                                />
                            </div>
                            <Divider sx={{ height: 50, m: 0.5 }} orientation="vertical" />
                            <div className={Style.textField}>
                                <Field
                                    name="message"
                                    render={({ input }) => {
                                        return (
                                            <StyledInputBase
                                                width="100%"
                                                fullWidth
                                                {...input}
                                                disabled={disable}
                                                sx={{ ml: 1, flex: 1 }}
                                                placeholder="Ask a Question"
                                                inputProps={{ 'aria-label': 'ask a question' }}
                                            />
                                        );
                                    }}
                                />
                            </div>
                            <div>
                                {disable ? (
                                    <CircularLoader color="red" height="2rem" size={10} />
                                ) : (
                                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                        <SendIcon />
                                    </IconButton>
                                )}
                            </div>
                        </StyledPaper>
                    </form>
                );
            }}
        />
    );
};

export { MessageTypeField };
