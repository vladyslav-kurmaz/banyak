const validationProfile = (value: string, name: string) => {
  switch (name) {
    case 'portfolio':
      const regexPortfolio = value.match(/^(https?):\/\//)
      if (value.length === 0) {
        return {
          errorStatus: false,
          message: '',
          class: '',
        }
      }
      if (regexPortfolio === null) {
        return {
          errorStatus: true,
          message: 'Посилання має починатись https://',
          class: 'error',
        }
      } else {
        return {
          errorStatus: false,
          message: '',
          class: '',
        }
      }
  }
}

export default validationProfile
