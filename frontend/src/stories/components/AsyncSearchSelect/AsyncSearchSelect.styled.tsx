import { styled } from '@mui/material/styles';
import { AsyncPaginate, AsyncPaginateProps, withAsyncPaginate } from 'react-select-async-paginate';
import CreatableSelect from 'react-select/creatable';
import { GroupBase } from 'react-select';

const AsyncCreatable = withAsyncPaginate(CreatableSelect);
interface AsyncCreatableStyledProps extends AsyncPaginateProps<unknown, GroupBase<unknown>, unknown, boolean> {
    formatCreateLabel: (userInput: string) => string;
}
const AsyncCreatableStyled = styled<React.ComponentType<AsyncCreatableStyledProps>>(AsyncCreatable)`
    & > div {
        box-shadow: 0 0 0 0px ${({ theme }) => theme.colors.secondary5};
        border: 0;
        &:hover {
            border: 0;
            border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
        }

        &:hover + div {
            border-bottom: 0px;
        }

        &:focus {
            border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
        }

        .css-qvco5b-CY,
        .css-1dmcmre-C7,
        .css-art2ul-ValueContainer2 {
            padding: 2px 0px;
        }

        .css-1jqq78o-placeholder {
        }
    }

    .css-13cymwt-control,
    .css-t3ipsp-control {
        border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};

        & > div {
            padding: 2px 0px;
        }

        .css-1p3m7a8-multiValue {
            border-radius: 0.4rem;
            background: ${({ theme }) => theme.colors.secondary};
            font-size: 1.8rem;
            font-weight: 400;
        }
    }
`;

const AsyncSearchSelectStyled = styled(AsyncPaginate)`
   
     & > div {
        width: 100%;
        font-size: 1.4rem;
        line-height: 1.2;
        letter-spacing: -0.02em;
        box-shadow: none;
        padding: 12.5px 12px;

        .css-qvco5b-CY,
        .css-1dmcmre-C7,
        .css-art2ul-ValueContainer2 {
            padding: 0px;
        }
    }

    .css-13cymwt-control,
    .css-t3ipsp-control {
    }
` as typeof AsyncPaginate;
const AsyncSearchSelectContainerStyled = styled('div')`
    position: relative;
`;
type StyledLabelProp = {
    isRequired: boolean | undefined;
};
const AsyncSearchSelectLabelStyled = styled('label')<StyledLabelProp>`
    color: ${({ theme }) => theme.colors.davyGrey}!important;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    text-align: left;
    display: inline-block;
    cursor: pointer;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.21;
    margin-bottom: 1.2rem;

    &&:after {
        content: ${(props) => `"${props.isRequired ? ' *' : ''}"`};
        color: ${({ theme }) => theme.colors.error};
    }
`;

const CustomOptionStyled = styled('div')`
    background-color: #fff;
    padding-block: 1rem 0.5rem;
    box-shadow:
        0px 5px 5px -3px rgba(0, 0, 0, 0.2),
        0px 8px 10px 1px rgba(0, 0, 0, 0.14),
        0px 3px 14px 2px rgba(0, 0, 0, 0.12);
    button {
        border: 0;
        border-bottom: 0.1rem solid #ececec;
        color: #565655;
        display: flex;
        justify-content: space-between;
        background-color: transparent;
        padding: 1rem;
        width: 100%;
        cursor: pointer;
        align-items: center;
        font-size: 1.6rem;
        font-weight: 400;
    }
`;

const CustomDropDownIcon = styled('div')`
    height: 0;
    width: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid rgba(0, 0, 0, 0.54);
`;
export {
    AsyncSearchSelectContainerStyled,
    AsyncSearchSelectLabelStyled,
    AsyncSearchSelectStyled,
    CustomOptionStyled,
    AsyncCreatableStyled,
    CustomDropDownIcon,
};
export type { AsyncPaginateProps };
