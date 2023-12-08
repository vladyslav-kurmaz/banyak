

const translateErrorStatus = (error: number) => {

  switch(error) {
    case 500:
      return 'Щось пішло не так, спробуйте пізніше';
    case 409:
      return 'Акаунт з цим емейлом вже зареєстровано';
    case 400:
      return 'Введіть правильний пароль' 
    case 404:
      return 'Акаунт з таким емейлом та паролем ще незареєстровано'
    
    default:
      return '';
  }

}

export default translateErrorStatus;