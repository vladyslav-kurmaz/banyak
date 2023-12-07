export type stateElement = {
  headerSetting: boolean
  mainLanguage: 'УКР' | 'ENG'
  mainTheam: boolean
  mainPageSlider: 0 | 1
  statusInstr: 'Власник ідеї' | 'Талант'
  loginOrSingUp: 'ВХІД' | 'РЕЄСТРАЦІЯ'
  loginRegistrationForm: boolean
  counterLink: number
  mainPreloader: boolean
  errorStatus: null | number
}

export type TUserProfile = {
  speciality: {
    name: string
    id: string
  }[]
  stack: string[]
  description: string
  is_talent: boolean
  user: {
    email: string
    first_name: string
    last_name: string
  }
  is_military: boolean
  is_vpo: boolean
  ideas: string[]
  avatar: string
  portfolio: string
}

export type TprofileChange = {
  speciality: []
  stack: string[]
  avatar?: File | null
  description: string
  is_talent: false
  is_military: false
  is_vpo: false
  ideas: []
}

export type Talent = {
  id: string
  user: {
    id: string
    first_name: string
    last_name: string
    email: string
  }
}

export type userInfo = {
  // userId: null | string,
  userProfile: null | TUserProfile
  typeUser: 'Я власник ідеї' | 'Я талант'
}

export type TValidatinForm = {
  errorStatus: boolean
  message: string
  class: string
}

// Tania's types
export type IdeaRespType = {
  avatar: string
  created_at: string
  description: string
  id: string
  idea_views: number
  is_published: boolean
  slug: string
  specialization: { name: string }[]
  title: string
  updated_at: string
  user: { email: string; first_name: string; id: string; last_name: string }
}

export type TalentRespType = {
  avatar: string
  created_at: string
  description: string
  id: string
  is_military: boolean
  is_talent: boolean
  is_vpo: boolean
  portfolio: string
  speciality: string[]
  stack: string[]
  // speciality: { name: string }[]
  // stack: { name: string }[]
  updated_at: string
  upload_military: null
  upload_vpo: null
  user: {
    id: string
    first_name: string
    last_name: string
    email: string
  }
}
