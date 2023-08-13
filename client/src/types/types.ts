export type stateElement = {
  headerSetting: boolean,
  mainLanguage: 'УКР' | 'ENG',
  mainTheam: boolean,
  mainPageSlider: 0 | 1
  statusInstr: 'Власник ідеї' | 'Талант',
  loginOrSingUp: 'ВХІД' | 'РЕЄСТРАЦІЯ',
  loginRegistrationForm: boolean
}

export type userInfo = {
  userId: null | string
}