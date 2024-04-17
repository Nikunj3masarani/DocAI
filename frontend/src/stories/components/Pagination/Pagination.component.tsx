import { PaginationProps, StyledPagination } from './Pagination.styled'

const Pagination = ({ ...props }: PaginationProps) => {
  return <StyledPagination {...props} />
}

export { Pagination }
