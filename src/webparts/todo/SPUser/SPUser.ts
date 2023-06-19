
import ISPUser from './ISPUser';
//import IUserInfo from '../models/IUserInfo';
//import IMyProperties from '../models/IMyProperties';
import IContextInfo from "./IContextInfo";
import IHRInfo from "./IHRInfo";
import iSessionInfo from "./iSessionInfo";
import ISPInfo from "./ISPInfo";

export default class SPUser implements ISPUser {

  
  private _SPInfo:ISPInfo ={
    Id: '',
    AccountName: '',
    DisplayName: '',
    EMAIL: '',
    PersonalUrl: '',
    PictureUrl: '',
    Title: '',
    UserProfile_GUID: '',
    SID: '',
    FirstName:  '',
    LastName:  '',
    PreferredName:  '',
    OrganizationalStructure:  '',
    Department:  '',
    Manager:  '',
    UserName:  '',
    AboutMe:  '',
    WorkPhone:  '',
    IsSiteAdmin:  '',
    LoginName:  '',
    UserGroups:[]
  };

  private _SessionInfo:iSessionInfo = {
    CityID:  {  
      CityNameUa:'',
      Id:''      
    },
    Period:'',
    DateFrom:new Date(),
    DateTo:new Date(),
    Cities:[]
  };

  private _HRInfo:IHRInfo = {
    HRID: '',
    FAMILYNAME: '',
    FS: '',
    BOSSID: ''
  };

  private _ContextInfo:IContextInfo ={
    CityID: {
      Id:'',
      CityNameUa:''
      
    },
    Period: ''
  };

  public set ContextInfo(value: IContextInfo) {
    typeof value.CityID == 'object'?this._ContextInfo.CityID = value.CityID:null;
    typeof value.Period == 'string'?this._ContextInfo.Period = value.Period:null;
   
  }

  public get ContextInfo(): IContextInfo {
    return this._ContextInfo;
  }



  public set HRInfo(value: IHRInfo) {
    typeof value.HRID == 'string'?this._HRInfo.HRID = value.HRID:null;
    typeof value.FAMILYNAME == 'string'?this._HRInfo.FAMILYNAME = value.FAMILYNAME:null;
    typeof value.FS == 'string'?this._HRInfo.FS = value.FS:null;
    typeof value.BOSSID == 'string'?this._HRInfo.BOSSID = value.BOSSID:null;
  }

  public get HRInfo(): IHRInfo {
    return this._HRInfo;
  }

  public set SessionInfo(value: iSessionInfo) {
    typeof value.CityID == 'object'?this._SessionInfo.CityID = value.CityID :null;
    typeof value.Period == 'string'?this._SessionInfo.Period = value.Period:null;
    typeof value.DateFrom == 'object'?this._SessionInfo.DateFrom = value.DateFrom:null;
    typeof value.DateTo == 'object'?this._SessionInfo.DateTo = value.DateTo:null;
   
    typeof value.Cities == 'object'?this._SessionInfo.Cities = value.Cities:null;

  }

  public get SessionInfo(): iSessionInfo {
    return this._SessionInfo;
  }
  

  public set SPInfo(value: ISPInfo) {
    typeof value.AboutMe == 'string'?this._SPInfo.AboutMe = value.AboutMe:null;
    typeof value.AccountName == 'string'?this._SPInfo.AccountName=value.AccountName:null;
    typeof value.Department == 'string'?this._SPInfo.Department=value.Department:null;
    typeof value.DisplayName == 'string'?this._SPInfo.DisplayName=value.DisplayName:null;
    typeof value.EMAIL == 'string'?this._SPInfo.EMAIL=value.EMAIL:null;
    typeof value.FirstName == 'string'?this._SPInfo.FirstName=value.FirstName:null;
    typeof value.Id == 'string'?this._SPInfo.Id=value.Id:null;
    typeof value.LastName == 'string'?this._SPInfo.LastName=value.LastName:null;
    typeof value.LoginName == 'string'?this._SPInfo.LoginName=value.LoginName:null;
    typeof value.Manager == 'string'?this._SPInfo.Manager=value.Manager:null;
    typeof value.OrganizationalStructure == 'string'?this._SPInfo.OrganizationalStructure=value.OrganizationalStructure:null;
    typeof value.PersonalUrl == 'string'?this._SPInfo.PersonalUrl=value.PersonalUrl:null;
    typeof value.PictureUrl == 'string'?this._SPInfo.PictureUrl=value.PictureUrl:null;
    typeof value.PreferredName == 'string'?this._SPInfo.PreferredName=value.PreferredName:null;
    typeof value.SID == 'string'?this._SPInfo.SID=value.SID:null;
    typeof value.Title == 'string'?this._SPInfo.Title=value.Title:null;
    typeof value.UserName == 'string'?this._SPInfo.UserName=value.UserName:null;
    typeof value.UserProfile_GUID == 'string'?this._SPInfo.UserProfile_GUID=value.UserProfile_GUID:null;
    typeof value.WorkPhone == 'string'?this._SPInfo.WorkPhone=value.WorkPhone:null;
    typeof value.IsSiteAdmin == 'string'?this._SPInfo.IsSiteAdmin=value.IsSiteAdmin:null;
    typeof value.UserGroups == 'object'?this._SPInfo.UserGroups=value.UserGroups:[];

  }

  public get SPInfo(): ISPInfo {
    return this._SPInfo;
  }

  public ChekUserGroups(group:string): boolean {
  //  console.log(this._SPInfo);
    return  this._SPInfo.UserGroups.some((item)=> {return item.Title==group})
  }

  public ChekUserRights(action:string): boolean {
    //  console.log(this._SPInfo);
    const rightsConfig = 
      {
        'add':[
          'KS_Reception Members',
          'KS_Reception Owners',
          'KS_Reception_Contribute'
        ],
        'clear':[
          'KS_Reception Members',
          'KS_Reception Owners',
          'KS_Reception_Contribute'
        ],
        'view':[
          'KS_Reception Visitors',
          'KS_Reception Members',
          'KS_Reception Owners',
          'KS_Reception_Contribute'
        ],
        'changeCity':[
          'KS_Reception Owners',
          'KS_Reception Visitors'
        ],
        'reports':[
          'KS_Reception Owners',
          'KS_Reception Visitors'
        ]
      }
      return rightsConfig[action].some((item)=> {return this.ChekUserGroups(item)})
      
      
    }
  

//  public getItems(filter: string): string {
   
  //  return "1";
 // }

  
}