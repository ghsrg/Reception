import IPassItem from "../models/IPassItem";

//import { IWebPartContext } from '@microsoft/sp-webpart-base';
//import IUserInfo from '../models/IUserInfo';
//import IMyProperties from '../models/IMyProperties';

interface IContextInfo {
  CityID?: {
    CityNameUa:string,
    Id:string
  };
  
  Period?:string;
  PassConfig?:IPassItem[];
}
export default IContextInfo;
