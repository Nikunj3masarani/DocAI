export type Item = {
    label: string | number;
    value: string | number;
};

export type IconType = {
    width: number;
    height: number;
    fill?: string;
    fill1?: string;
    fill2?: string;
    stroke?: string;
    opacity?: number | string;
    props?: any;
};


export interface FilesUpload {
    file: File;
    key: string;
}

export type OptionType = {
    value: number | string;
    label: string;
};

export interface Option {
    label: string;
    value: string | number;
}

export type HeaderAction = 'Create Brain' | 'Add Knowledge';
