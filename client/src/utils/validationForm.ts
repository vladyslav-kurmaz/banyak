import { TValidationForm } from '../types/types'

const validationForm = (
  value: string,
  name: string
): TValidationForm | null => {
  switch (name) {
    case 'name':
      if (value.length <= 2) {
        return {
          errorStatus: true,
          message: 'Введіть більше 2 символів',
          class: 'error',
        }
      } else if (value.length > 2) {
        return {
          errorStatus: false,
          message: "Ім'я заповнено правильно",
          class: 'done',
        }
      } else {
        return {
          errorStatus: false,
          message: "Ім'я заповнено правильно",
          class: '',
        }
      }
    case 'surname':
      if (value.length <= 2) {
        return {
          errorStatus: true,
          message: 'Введіть більше 2 символів',
          class: 'error',
        }
      } else {
        return {
          errorStatus: false,
          message: 'Прізвище заповнено правильно',
          class: 'done',
        }
      }
    case 'email':
      // eslint-disable-next-line
      const validValueEmail = value.match(/^[\w\.-]+@[\w\.-]+\.\w+$/)
      const onlyLatiOrNumEmail = value.match(/^[a-zA-Z0-9@.\-_]+$/)

      if (onlyLatiOrNumEmail === null) {
        return {
          errorStatus: true,
          message: 'Пошта латиницею і цифрами',
          class: 'error',
        }
      } else if (validValueEmail === null) {
        return {
          errorStatus: true,
          message: 'Формат пошти mail@mail.com',
          class: 'error',
        }
      } else {
        return {
          errorStatus: false,
          message: 'Пошта заповнено правильно',
          class: 'done',
        }
      }
    case 'pass':
      const onlyLatiOrNumPass = value.match(/^[a-zA-Z0-9.\-_]+$/)
      if (onlyLatiOrNumPass === null) {
        return {
          errorStatus: true,
          message: 'Пароль доступно латиницею і цифрами',
          class: 'error',
        }
      } else if (value.length < 8) {
        return {
          errorStatus: true,
          message: 'Пароль мінімум 8 символів',
          class: 'error',
        }
      } else {
        return {
          errorStatus: false,
          message: 'Пароль заповнено правильно',
          class: 'done',
        }
      }
    default:
      return null
  }
}

export default validationForm
