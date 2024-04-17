import { styled } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'

export const StyledToastContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container--top-center {
    left: 54%;
    @media (max-width: 767px) {
      left: 0;
    }
  }
  .Toastify {
    &__toast--main {
      width: 480px;
      right: 160px;
      border-radius: 4px;
      @media (max-width: 767px) {
        width: 320px;
        right: -48px;
        top: 21px;
      }
    }

    &__toast {
      min-height: 57px;
      padding: 5px 15px 5px 20px;
      font-size: 1.6rem;
      box-shadow: none;

      @media (max-width: 767px) {
        min-height: 60px;
        padding: 5px 10px 2px 15px;
      }
    }

    &__toast-body {
      padding: 0;

      .toast-body {
        display: flex;
        align-items: center;
        gap: 15px;
        min-height: 40px;

        &__icon {
          width: 24px;
          height: 24px;

          img {
            width: 24px;
            height: 24px;
          }
        }

        &__msg {
          width: calc(100% - 47px);

          h4 {
            margin: 0;
            font-size: 20px;
            font-weight: bold;
            line-height: 1.36;
          }

          p {
            font-weight: normal;
            margin: 0;
            font-size: 1.6rem;
          }
        }

        &__img {
          position: absolute;
          top: 40px;
          right: 7px;

          img {
            width: 30px;
          }
        }
      }
    }

    &--animate-icon {
      display: none;
    }

    &__close-button {
      opacity: none;
      padding: 2px 1px 0px 3px;
      border-radius: 4px;
      width: 28px;
      height: 28px;
      margin-top: 0;
      position: relative;
      right: -3px;
      opacity: 1;
      top: 14px;
      position: relative;

      @media (max-width: 767px) {
        top: 7px;
      }

      &:hover {
        & > svg {
        }
      }
      & > svg {
        height: 22px;
        width: 22px;
      }
    }

    &__toast--info {
    }

    &__toast--success {
    }

    &__toast--warning {
    }

    &__toast--error {
    }

    &__toast--default {
    }

    &__progress-bar {
      &--error {
      }

      &--warning {
      }

      &--success {
      }

      &--info {
      }
    }
  }
`

export const StyleCloseIconContainer = styled('div')`
  display: flex;
  align-items: center;

  .closeIcon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 34px;
    width: 34px;
    border-radius: 5px;
  }
`
