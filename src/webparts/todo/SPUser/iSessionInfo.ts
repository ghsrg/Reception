import ICityItem from "../models/ICityItem";

//import { IWebPartContext } from '@microsoft/sp-webpart-base';
//import IUserInfo from '../models/IUserInfo';
//import IMyProperties from '../models/IMyProperties';


interface iSessionInfo {
  CityID?:  {
    CityNameUa:string,
    Id:string
  };
  Period?:string;
  DateFrom?:Date;
  DateTo?:Date;
  Cities:ICityItem[];
}


export default iSessionInfo;
