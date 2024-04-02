import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress from '@mui/material/LinearProgress'

interface ProgressPros {
  type?: 'linear' | 'circular'
}

const ProgressBar = ({ type = 'circular', ...props }: ProgressPros) => {
  return (
    <>
      {type === 'circular' ? (
        <CircularProgress {...props} />
      ) : (
        <LinearProgress {...props} />
      )}
    </>
  )
}

export { ProgressBar }
export type { ProgressPros }
