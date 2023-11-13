export type stateElement = {
  headerSetting: boolean,
  mainLanguage: 'УКР' | 'ENG',
  mainTheam: boolean,
  mainPageSlider: 0 | 1
  statusInstr: 'Власник ідеї' | 'Талант',
  loginOrSingUp: 'ВХІД' | 'РЕЄСТРАЦІЯ',
  loginRegistrationForm: boolean,
  counterLink: number,
  mainPreloader: boolean,
  errorStatus: null | number,
}

export type TUserProfile = {
    speciality: 
      {
        name: string
        id: string
      }[]
    ,
    stack: string[],
    description: string,
    is_talent: boolean,
    user: {
      email: string,
      first_name: string,
      last_name: string
    },
    is_military: boolean,
    is_vpo: boolean,
    ideas: string[],
    avatar: string,
    portfolio: string
}

export type TprofileChange = {
  speciality: [],
  stack: string[],
  avatar?: File | null,
  description: string,
  is_talent: false,
  is_military: false,
  is_vpo: false,
  ideas: [],
}

export type Talent = {
  id: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
};


export type userInfo = {
  // userId: null | string,
  userProfile: null | TUserProfile,
  typeUser: 'Я власник ідеї' | 'Я талант'
}

export type TValidatinForm = {
  errorStatus: boolean;
  message: string;
  class: string;
}
