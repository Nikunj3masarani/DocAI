import {
    Accordion,
    AccordionProps,
    AccordionSummary,
    AccordionSummaryProps,
    AccordionDetails,
    AccordionDetailsProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';

type StyledAccordionProps = AccordionProps;
type StyledAccordionSummaryProps = AccordionSummaryProps;
type StyledAccordionDetailsProps = AccordionDetailsProps;

const StyledAccordion = styled(Accordion)<StyledAccordionProps>`
    min-height: unset;
    max-height: unset;
`;
const StyledAccordionSummary = styled(AccordionSummary)<StyledAccordionSummaryProps>`
    display: flex;
    justify-content: space-between !important;
    width: 100%;
    min-height: 100%;
    max-height: unset;
    &:hover {
        background-color: ${({ theme }) => theme.colors.mercury};
    }
    padding: 1.2rem 1.5rem !important;

    .MuiAccordionSummary-content,
    .Mui-expand {
        margin-block: 0 !important;
    }
`;
const StyledAccordionDetails = styled(AccordionDetails)<StyledAccordionDetailsProps>``;

export { StyledAccordion, StyledAccordionSummary, StyledAccordionDetails };
export type { StyledAccordionProps, StyledAccordionSummaryProps, StyledAccordionDetailsProps };
