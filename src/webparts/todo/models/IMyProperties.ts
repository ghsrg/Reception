interface IMyProperties {
  Id?: string;
  AccountName ?: string;
  LoginName ?: string;
  DisplayName?: string;
  Email?: string;
  PictureUrl?: string;
  Title?: string; // должность
  ExtendedManagers?:{
    results?:string[]
  };
  ExtendedReports?:{
    results?:string[]
  };
  UserProfileProperties?:[
      {
      Key?: string;
      Value?: string;
      }
    ];
    UserProfile_GUID?:string;
    FirstName?: string;
    LastName?: string;
    PreferredName?: string;
    OrganizationalStructure?: string;
    Department?: string;
    Manager?: string;
    UserName?: string;
    AboutMe?: string;
    WorkPhone?: string;
    BranchName?:string;
    IsSiteAdmin?:string;
  
}

export default IMyProperties;