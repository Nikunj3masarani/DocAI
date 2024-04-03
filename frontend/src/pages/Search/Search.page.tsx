//Import Third Party lib
import { SearchInput, Select } from '@docAi-app/stories';
import { Form } from 'react-final-form';

//Import Storybook

//Import Component

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant

//Import Icon
import Logo from '@docAi-app/../public/assets/images/logo.svg';

//Import Api

//Import Assets

//Import Style
import Style from './Search.module.scss';
import { Field } from 'react-final-form';

const Search = () => {
    // useRef
    // useState
    // Variables Dependent upon State

    // Api Calls

    // Event Handlers

    // Helpers

    // JSX Methods

    // Your component logic here
    const handleSubmit = (val) => {
        console.log(val);
    };
    return (
        <div className={Style.container}>
            <div className={Style['container__header']}></div>
            <div className={Style['container__body']}>
                <div className={Style.content}>
                    <div className={Style.content__header}>
                        <img src={Logo} alt="basf logo" />
                        <h1>Talk to DocAi</h1>
                    </div>
                    <div className={Style.content__body}>
                        <Form
                            initialValues={{
                                query: '',
                                model: 'gpt',
                            }}
                            onSubmit={handleSubmit}
                            render={() => {
                                return (
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <Field
                                                name="query"
                                                render={({ input }) => {
                                                    return (
                                                        <SearchInput
                                                            onClearClick={() => {
                                                                console.log('being cll');
                                                            }}
                                                            {...input}
                                                            type="text"
                                                            fullWidth
                                                            placeholder="Search"
                                                            required
                                                        />
                                                    );
                                                }}
                                            />
                                        </div>
                                        <div className={Style.select}>
                                            <Field
                                                name="model"
                                                render={({ input }) => {
                                                    return (
                                                        <Select
                                                            {...input}
                                                            options={[
                                                                { label: 'gpt', value: 'gpt' },
                                                                { label: 'bard', value: 'bard' },
                                                            ]}
                                                            label="Select Model"
                                                            placeholder="Select Model bbb"
                                                        />
                                                    );
                                                }}
                                            />
                                        </div>
                                    </form>
                                );
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Search };
