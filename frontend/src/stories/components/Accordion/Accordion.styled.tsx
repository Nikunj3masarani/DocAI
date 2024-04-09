import {
    Accordion,
    AccordionProps,
    AccordionSummary,
    AccordionSummaryProps,
    AccordionDetails,
    AccordionDetailsProps,
} from '@mui/material';
import styled from 'styled-components';

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
    padding-inline : 0 !important;
    
    .MuiAccordionSummary-content,
    .Mui-expand {
        margin-block: 0 !important;
    }
`;
const StyledAccordionDetails = styled(AccordionDetails)<StyledAccordionDetailsProps>``;

export { StyledAccordion, StyledAccordionSummary, StyledAccordionDetails };
export type { StyledAccordionProps, StyledAccordionSummaryProps, StyledAccordionDetailsProps };
