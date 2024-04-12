type Required = {
    message: string;
};

type MinMax = {
    message: string;
    length: number;
};

type Between = {
    message: string;
    minLength: number;
    maxLength: number;
};

type Regex = {
    message: string;
    regexPattern: RegExp;
};

type Custom = {
    message: string;
    condition: boolean;
};

export type Validation = Partial<{
    required: Required;
    min: MinMax;
    max: MinMax;
    between: Between;
    regex: Regex;
    custom: Custom;
}>;
