import IContextInfo from "./IContextInfo";
import IHRInfo from "./IHRInfo";
import iSessionInfo from "./iSessionInfo";
import ISPInfo from "./ISPInfo";

//import { IWebPartContext } from '@microsoft/sp-webpart-base';
//import IUserInfo from '../models/IUserInfo';
//import IMyProperties from '../models/IMyProperties';

interface ISPUser {
  ContextInfo:IContextInfo;
  HRInfo:IHRInfo;
  SessionInfo:iSessionInfo;
  SPInfo:ISPInfo;
  ChekUserGroups(groupnAME:string): boolean;
  ChekUserRights(rightName:string): boolean;
}


export default ISPUser;
