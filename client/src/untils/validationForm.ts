type TValidatinForm = {
  errorStatus: boolean;
  error: string;
  message: string;
}

// e: React.ChangeEvent<HTMLInputElement>

const validationForm = (value: string, name: string): TValidatinForm | null => {
  // const value = e.target.value.trim();
  // const name = e.target.name;
  // const target = e.target

  switch(name) {
    case 'name':
      if (value.length < 3) {

        // target.classList.add('error');
        // target.classList.remove('good');
        // target.nextElementSibling?.classList.add('error');
        // target.nextElementSibling?.classList.remove('good');


        return {
          errorStatus: true,
          error: '',
          message: 'Введіть більше 3 символів'
        }
      } else if (value.length > 2) {

        // target.classList.add('good');
        // target.classList.remove('error');
        // target.nextElementSibling?.classList.add('good');
        // target.nextElementSibling?.classList.remove('error');


        return {
          errorStatus: false,
          error: '',
          message: 'Це поле заповнено правильно'
        }
      } else {
        return {
          errorStatus: false,
          error: '',
          message: ''
        }
      }
      break;
    // case 'surname':
    //   if (value) {
    //     return {
    //       error: '',
    //       message: ''
    //     }
    //   } else {
    //     return {
    //       error: '',
    //       message: ''
    //     }
    //   }
    //   break;
    // case 'email':
    //   if (value) {
    //     return {
    //       error: '',
    //       message: ''
    //     }
    //   } else {
    //     return {
    //       error: '',
    //       message: ''
    //     }
    //   }
    //   break;
    // case 'pass':
    //   if (value) {
    //     return {
    //       error: '',
    //       message: ''
    //     }
    //   } else {
    //     return {
    //       error: '',
    //       message: ''
    //     }
    //   }
    //   break;
    default:
      return null;
  }

  
}

export default validationForm;