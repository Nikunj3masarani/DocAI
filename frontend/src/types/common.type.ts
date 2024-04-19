type Item = {
    label: string | number;
    value: string | number;
};

type IconType = {
    width?: number;
    height?: number;
    fill?: string;
    fill1?: string;
    fill2?: string;
    stroke?: string;
    opacity?: number | string;
    props?: any;
};

interface FilesUpload {
    file: File;
    key: string;
}

type OptionType = {
    value: number | string;
    label: string;
};

interface Option {
    label: string;
    value: string | number;
}

type HeaderAction = 'Create Brain' | 'Add Knowledge';

export type { Item, IconType, FilesUpload, OptionType, Option, HeaderAction };
