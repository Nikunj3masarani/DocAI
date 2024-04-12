import type { Meta, StoryObj } from '@storybook/react';
import type { GroupBase, OptionsOrGroups } from 'react-select';
import { AsyncSearchSelect } from './AsyncSearchSelect.component';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'Form Controls/AsyncSearchSelect',
    component: AsyncSearchSelect,
    tags: ['autodocs'],
} satisfies Meta<typeof AsyncSearchSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
    render: (props) => {
        type OptionType = {
            value: number;
            label: string;
        };

        const options: OptionType[] = [];
        for (let i = 0; i < 50; ++i) {
            options.push({
                value: i + 1,
                label: `Option ${i + 1}`,
            });
        }

        const sleep = (ms: number) =>
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve(undefined);
                }, ms);
            });

        const loadOptions = async (search: string, prevOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>) => {
            await sleep(1000);

            let filteredOptions: OptionType[];
            if (!search) {
                filteredOptions = options;
            } else {
                const searchLower = search.toLowerCase();

                filteredOptions = options.filter(({ label }) => label.toLowerCase().includes(searchLower));
            }

            const hasMore = filteredOptions.length > prevOptions.length + 10;
            const slicedOptions = filteredOptions.slice(prevOptions.length, prevOptions.length + 10);

            return {
                options: slicedOptions,
                hasMore,
            };
        };

        return <AsyncSearchSelect {...props} loadOptions={loadOptions} />;
    },
    args: {
        placeholder: 'Select data  111',
        tooltip: 'This is select tooltip',
    },
};

export const Multi: Story = {
    render: (props) => {
        type OptionType = {
            value: number;
            label: string;
        };

        const options: OptionType[] = [];
        for (let i = 0; i < 50; ++i) {
            options.push({
                value: i + 1,
                label: `Option ${i + 1}`,
            });
        }

        const sleep = (ms: number) =>
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve(undefined);
                }, ms);
            });

        const loadOptions = async (search: string, prevOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>) => {
            await sleep(1000);

            let filteredOptions: OptionType[];
            if (!search) {
                filteredOptions = options;
            } else {
                const searchLower = search.toLowerCase();

                filteredOptions = options.filter(({ label }) => label.toLowerCase().includes(searchLower));
            }

            const hasMore = filteredOptions.length > prevOptions.length + 10;
            const slicedOptions = filteredOptions.slice(prevOptions.length, prevOptions.length + 10);

            return {
                options: slicedOptions,
                hasMore,
            };
        };

        return <AsyncSearchSelect {...props} loadOptions={loadOptions} />;
    },
    args: {
        placeholder: 'Choose option',
        isMulti: true,
        menuPlacement: 'top',
        tooltip: 'This is select tooltip',
    },
};

export const CustomOption: Story = {
    render: (props) => {
        type OptionType = {
            value: number;
            label: string;
        };

        const options: OptionType[] = [];
        for (let i = 0; i < 50; ++i) {
            options.push({
                value: i + 1,
                label: `Option ${i + 1}`,
            });
        }

        const sleep = (ms: number) =>
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve(undefined);
                }, ms);
            });

        const loadOptions = async (search: string, prevOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>) => {
            await sleep(1000);

            let filteredOptions: OptionType[];
            if (!search) {
                filteredOptions = options;
            } else {
                const searchLower = search.toLowerCase();

                filteredOptions = options.filter(({ label }) => label.toLowerCase().includes(searchLower));
            }

            const hasMore = filteredOptions.length > prevOptions.length + 10;
            const slicedOptions = filteredOptions.slice(prevOptions.length, prevOptions.length + 10);

            return {
                options: slicedOptions,
                hasMore,
            };
        };

        return <AsyncSearchSelect {...props} loadOptions={loadOptions} />;
    },
    args: {
        placeholder: 'Choose option',
        isMulti: true,
        menuPlacement: 'top',
        isCustomOption: true,
        onCustomHandler: () => console.log('Test'),
        tooltip: 'This is select tooltip',
    },
};

export const CustomCreation: Story = {
    render: (props) => {
        type OptionType = {
            value: number;
            label: string;
        };

        const options: OptionType[] = [];
        for (let i = 0; i < 50; ++i) {
            options.push({
                value: i + 1,
                label: `Option ${i + 1}`,
            });
        }

        const sleep = (ms: number) =>
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve(undefined);
                }, ms);
            });

        const loadOptions = async (search: string, prevOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>) => {
            await sleep(1000);

            let filteredOptions: OptionType[];
            if (!search) {
                filteredOptions = options;
            } else {
                const searchLower = search.toLowerCase();

                filteredOptions = options.filter(({ label }) => label.toLowerCase().includes(searchLower));
            }

            const hasMore = filteredOptions.length > prevOptions.length + 10;
            const slicedOptions = filteredOptions.slice(prevOptions.length, prevOptions.length + 10);

            return {
                options: slicedOptions,
                hasMore,
            };
        };

        return <AsyncSearchSelect {...props} loadOptions={loadOptions} />;
    },
    args: {
        placeholder: 'Choose option',
        isMulti: true,
        menuPlacement: 'top',
        isCustomOption: true,
        onCustomHandler: () => console.log('Test'),
        isCreation: true,
        tooltip: 'This is select tooltip',
    },
};
