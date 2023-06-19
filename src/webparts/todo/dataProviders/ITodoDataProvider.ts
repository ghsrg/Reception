import { IWebPartContext } from '@microsoft/sp-webpart-base';
import ITodoItem from '../models/ITodoItem';
import IUserItem from '../models/IUserItem';
import IUGroup from '../models/IUGroup';
import INotify from '../models/INotify';
import IEmpUserItem from '../models/IEmpUserItem';
import IVisitsTypesItem from '../models/IVisitsTypesItem';
import IVisitsItem from  '../models/IVisitsItem';
import ITodoTaskList from '../models/ISPList';
import IPassItem from '../models/IPassItem';
import ICityItem from '../models/ICityItem';
import IUserInfo from '../models/IUserInfo';
import IMyProperties from '../models/IMyProperties';
import ISendMail from '../models/ISendMail';
//import ITodoCount from '../models/ITodoCount';

interface ITodoDataProvider {

  selectedList: ITodoTaskList;

  webPartContext: IWebPartContext;

  getTaskLists(): Promise<ITodoTaskList[]>;

  getItems(filter?: string): Promise<ITodoItem[]>;
  
  getPassParams(filter?: string): Promise<IPassItem>;
  getAssistant(filter?: IUserItem): Promise<IUserItem>;
  getUserGroups(filter: IUGroup): Promise<IUGroup[]>
  getCities(filter: ICityItem): Promise<ICityItem[]> ;
  getPassConfig(filter: IPassItem): Promise<IPassItem[]> ;
  getBossUsers(uFilter: IUserItem): Promise<IUserItem>;
  getUserInfo(finter:IUserInfo): Promise<IUserInfo>; 
  getMyProperties(): Promise<IMyProperties>;
  getCurrentUserProperties(): Promise<IMyProperties>;
  getPass(numFilter: string,statusFilter: string,cityFilter: string,typeFilter: string,visitFilter:string, activeFilter:string): Promise<IPassItem[]>;
  clearPass(pass:IPassItem): Promise<string> ;
  clearVisit(visit:IVisitsItem): Promise<string> ;
  getUsers(filter?: string): Promise<IUserItem[]>;
  
  getEmpUsers(filter?: string): Promise<IEmpUserItem[]>;
  sendMail(params?:ISendMail ): Promise<string>;
  getNotifyParams(filter?:INotify ): Promise<INotify[]>;

  getVisitsTypes(filter?: string): Promise<IVisitsTypesItem[]>;

  getItemCount(filter?: string): Promise<string>;

  createItem(title: string): Promise<ITodoItem[]>;

  getVisits(VisitsTypeID: string, filter?: IVisitsItem): Promise<IVisitsItem[]>;

  createVisit(visit: IVisitsItem,pass: IPassItem, filter?: IVisitsItem): Promise<IVisitsItem[]>;
  updateVisit(visit: IVisitsItem,pass: IPassItem, filter?: IVisitsItem): Promise<IVisitsItem[]>;

  updateItem(itemUpdated: ITodoItem): Promise<ITodoItem[]>;

  deleteItem(itemDeleted: ITodoItem): Promise<ITodoItem[]>;
}

export default ITodoDataProvider;