//Import Third Party lib

import { CircularLoader, IconButton } from '@docAi-app/stories';
import { Divider } from '@mui/material';
import { Form } from 'react-final-form';

//Import Storybook

//Import Component

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant

//Import Icon
import { AsyncSearchSelect } from '@docAi-app/stories';
import SendIcon from '@mui/icons-material/Send';
import { StyledInputBase, StyledPaper } from './InputWithSelect.styled';
import { indexApi } from '@docAi-app/api';
import { onLoadReaders } from '@docAi-app/utils/helper/common.helper';
import { useEffect, useState } from 'react';
import { Option } from '@docAi-app/types/common.type';
//Import Api

//Import Assets

//Import Style
import Style from './InputWithSelect.module.scss';
import { Field } from 'react-final-form';

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
type InputWithSelectProps = {
    disable: boolean;
    handleSubmit: (v: any) => void;
};
const InputWithSelect = ({ disable, handleSubmit }: InputWithSelectProps) => {
    // useRef
    // useState
    const [index, setIndex] = useState<Option>();
    useEffect(() => {
        indexList('').then((res) => {
            setIndex(res.options[0]);
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
            }}
            render={({ handleSubmit, form }) => {
                return (
                    <form
                        onSubmit={(v: any) => {
                            handleSubmit(v);
                            form.change('message', '');
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
                                                loadOptions={(searchString: string) => indexList(searchString)}
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

export { InputWithSelect };
