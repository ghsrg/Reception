import IUGroup from "../models/IUGroup";

//import { IWebPartContext } from '@microsoft/sp-webpart-base';
//import IUserInfo from '../models/IUserInfo';
//import IMyProperties from '../models/IMyProperties';

interface ISPInfo {
  Id?: string;
  AccountName?:string;
  LoginName?:string;
  DisplayName?:string;
  EMAIL?:string;
  PersonalUrl?:string;
  PictureUrl?:string;
  Title?:string;
  UserProfile_GUID?:string;
  SID?:string;
  FirstName?: string;
  LastName?: string;
  PreferredName?: string;
  OrganizationalStructure?: string;
  Department?: string;
  Manager?: string;
  UserName?: string;
  AboutMe?: string;
  WorkPhone?: string;
  IsSiteAdmin?:string;
  UserGroups?:IUGroup[];
}


export default ISPInfo;
