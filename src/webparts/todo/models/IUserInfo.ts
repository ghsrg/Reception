interface IUserInfo {
  Id?: string;
  CityID?:  {
    CityNameUa:string,
    Id:string
  };
  InActiveDate?: string;

  EmployeeID?:{
    HRID?: string;
    UserProfile_GUID?:string;
    FAMILYNAME?:string;
    FS?:string;
    EMAIL?:string;
    BOSSID?:string;
    AccountName?:string;
  };
   
  Session?:{
    CityID?: string;
    Period?:string;
  };
  
  Role?:string;
}

export default IUserInfo;