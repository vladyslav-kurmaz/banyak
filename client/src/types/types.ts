export type stateElement = {
  headerSetting: boolean;
  mainLanguage: "УКР" | "ENG";
  mainTheam: boolean;
  mainPageSlider: 0 | 1;
  statusInstr: "Власник ідеї" | "Талант";
  loginOrSingUp: "ВХІД" | "РЕЄСТРАЦІЯ";
  loginRegistrationForm: boolean;
  counterLink: number;
  mainPreloader: boolean;
  errorStatus: null | number;
};

export type TUserProfile = {

  speciality: { name: string }[];
  stack: { name: string }[];
  description: string;
  is_talent: boolean;
  user: {
    email: string;
    first_name: string;
    last_name: string;
  };
  is_military: boolean;
  is_vpo: boolean;
  ideas: string[];
  avatar: TUpdateAvatar;
  portfolio: string;
};

export type TUpdateAvatar = {
  avatar_profile: string;
  created_at: string;
  id: string;
  updated_at: string;
  user: string;
};

export type TprofileChange = {
  speciality: { name: string }[];
  stack: { name: string }[];
  // avatar?: File | null | string,
  description: string;
  is_talent?: boolean;
  // is_military: boolean,
  // is_vpo: boolean,
  // ideas: string[],
  portfolio: string;
  name?: string;
};


export type TIdeasChange = {
  speciality: { name: string }[];
  stack: { name: string }[];
  description: string;
  portfolio: string;
};

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

  userProfile: null | TUserProfile;
  typeUser: boolean;
  allStack: TGetAllStack | [];
};

export type TGetAllStack = [name: string];

export type TValidatinForm = {
  errorStatus: boolean;
  message: string;
  class: string;
};

// Tania's types
export type IdeaRespType = {
  avatar: string | null
  created_at: string
  description: string
  id: string
  idea_views: number
  is_published: boolean
  slug: string
  specialization: { name: string }[]
  stack: { name: string }[]
  title: string
  updated_at: string
  user: { email: string; first_name: string; id: string; last_name: string }
}

export type TalentRespType = {
  avatar: string | null
  created_at: string
  description: string
  id: string
  is_military: boolean
  is_vpo: boolean
  is_talent: boolean
  portfolio: string
  profile_view: number
  slug: string
  speciality: { name: string }[]
  stack: { name: string }[]
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

export type ServerResForTalents = {
  count: number
  next: string | number
  previous: string | number
  results: TalentRespType[]
}

export type ServerResForIdeas = {
  count: number
  next: string | number
  previous: string | number
  results: IdeaRespType[]
}
