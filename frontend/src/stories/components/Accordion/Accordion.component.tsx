//Import Third Party lib

//Import Storybook

//Import Component
import {
    StyledAccordion,
    StyledAccordionDetails,
    StyledAccordionDetailsProps,
    StyledAccordionProps,
    StyledAccordionSummary,
    StyledAccordionSummaryProps,
} from './Accordion.styled';

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant

//Import Icon
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

//Import Api

//Import Assets

//Import Style


const AccordionSummary = (props: StyledAccordionSummaryProps) => {
    const { expandIcon, className, children } = props;

    return (
        <StyledAccordionSummary
            className={className}
            expandIcon={expandIcon ?? <ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
        >
            {children}
        </StyledAccordionSummary>
    );
};

const AccordionDetails = ({ children, className }: StyledAccordionDetailsProps) => {
    return <StyledAccordionDetails className={className}>{children}</StyledAccordionDetails>;
};

const Accordion = ({ children, className }: StyledAccordionProps) => {

    // Your component logic here
    return <StyledAccordion className={className}>{children}</StyledAccordion>;
};

export { Accordion, AccordionSummary, AccordionDetails };
