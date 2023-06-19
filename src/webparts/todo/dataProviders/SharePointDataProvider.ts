import {
  SPHttpClient,
  SPHttpClientBatch,
  SPHttpClientResponse
} from '@microsoft/sp-http';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import ITodoDataProvider from '../dataProviders/ITodoDataProvider';
import ITodoItem from '../models/ITodoItem';
import IUserItem from '../models/IUserItem';
import INotify from '../models/INotify';
import IUGroup from '../models/IUGroup';
import IEmpUserItem from '../models/IEmpUserItem';
import IUserItem2 from '../models/IUserItem2';
import IVisitsTypesItem from '../models/IVisitsTypesItem';
//import IVisitsTypesItem2 from '../models/IVisitsTypesItem2';
import IVisitsItem from '../models/IVisitsItem';
//import IVisitsItem2 from '../models/IVisitsItem2';
import IPassItem from '../models/IPassItem';
//import ITodoCount from '../models/ITodoCount';
import ISPList from '../models/ISPList';
import IPassItem2 from '../models/IPassItem2';
import ICityItem from '../models/ICityItem';
import IUserInfo from '../models/IUserInfo';
import IMyProperties from '../models/IMyProperties';
import ISendMail from '../models/ISendMail';
//import IHRInfo from '../SPUser/IHRInfo';

export default class SharePointDataProvider implements ITodoDataProvider {

  private _selectedList: ISPList;
  private _taskLists: ISPList[];
  private _listVisitsParam: ISPList;
  private _listPersonalPassParam: ISPList;
  private _listNotifyParam: ISPList;
  private _listPassTypeParam: ISPList;
  private _listMyPropertiesParam: ISPList;
  private _listCurrentUserParam: ISPList;
  private _listAssistantParam: ISPList;
  private _listReceptionUsersParam: ISPList;
  private _listCitiesParam: ISPList;
  private _listEmpUsers: ISPList;
  private _listsUrl: string;
  private _apiUrl: string;
  private _peoplemanagerUrl: string;
  private _listUrl: string;
  private _listItemsUrl: string;
  private _listUserUrl: string;
  private _VisitsTypesUrl: string;
  private _webPartContext: IWebPartContext;
  private _listdataUrl: string;
  private sendEmail: string;
  private _listVisitsUrl: string;
  //private _PersonalPassUrl: string;

  public set selectedList(value: ISPList) {
    this._selectedList = value;
    this._listUrl = `${this._listsUrl}(guid'${value.Id}')`;
    this._listItemsUrl = `${this._listsUrl}(guid'${value.Id}')/items`;
    //this._listUserUrl = `${this._listsUrl}(guid'718ee7b7-118e-4682-a66d-7b01266d9ab5')/items`;
   // this._listUserUrl = `${this._listsUrl}/GetByTitle('EMPLOYEE4RECEPTION')/items`;
    this._listUserUrl =`${this._listdataUrl}/Employees`;
   // this._PersonalPassUrl=`${this._listsUrl}/GetByTitle('PersonalPass')/items`; 
    this._VisitsTypesUrl=`${this._listsUrl}/GetByTitle('VisitsTypes')/items`; 
    //this._VisitsTypesUrl=`${this._listdataUrl}/VisitsTypes`;
    //this._listVisitsUrl=`${this._listdataUrl}/Visits`;
      this._listVisitsUrl = `${this._listsUrl}/GetByTitle('Visits')/items`; // переделать: убрать из кода (перешло в _listVisitsParam)
      
      this._listMyPropertiesParam = {
        Url:`${this._peoplemanagerUrl}/GetMyProperties`,
      };
      this._listCurrentUserParam = {
        Url:`${this._apiUrl}/currentUser`,
      };

    this._listPersonalPassParam = {
        Title:'PersonalPass',
        Url:`${this._listsUrl}/GetByTitle('PersonalPass')/items`,//переделать хардкод на id,//переделать хардкод на id
        Url_vti_bin:`${this._listdataUrl}/PersonalPass`,//переделать хардкод на id,//переделать хардкод на id
        ListItemEntityTypeFullName:'SP.Data.PersonalPass', //переделать хардкод на инициализацию
        Id:""//переделать хардкод на инициализацию
      };
      this._listNotifyParam = {
        Title:'NotificationTemplates',
        Url:`${this._listsUrl}/GetByTitle('NotificationTemplates')/items`,//переделать хардкод на id,//переделать хардкод на id
        Url_vti_bin:`${this._listdataUrl}/NotificationTemplates`,//переделать хардкод на id,//переделать хардкод на id
        ListItemEntityTypeFullName:'SP.Data.NotificationTemplates', //переделать хардкод на инициализацию
        Id:""//переделать хардкод на инициализацию
      };
    this._listAssistantParam = {
        Title:'Assistants',
        Url:`${this._listsUrl}/GetByTitle('Assistants')/items`,//переделать хардкод на id,//переделать хардкод на id
        Url_vti_bin:`${this._listdataUrl}/Assistants`,//переделать хардкод на id,//переделать хардкод на id
        ListItemEntityTypeFullName:'SP.Data.Assistants', //переделать хардкод на инициализацию
        Id:""//переделать хардкод на инициализацию
      };

    this._listPassTypeParam = {
        Title:'PassType',
        Url:`${this._listsUrl}/GetByTitle('PassType')/items`,//переделать хардкод на id,//переделать хардкод на id
        Url_vti_bin:`${this._listdataUrl}/PassType`,//переделать хардкод на id,//переделать хардкод на id
        ListItemEntityTypeFullName:'SP.Data.PassType', //переделать хардкод на инициализацию
        Id:""//переделать хардкод на инициализацию
      };
      
    this._listReceptionUsersParam = {
        Title:'ReceptionUsers',
        Url:`${this._listsUrl}/GetByTitle('ReceptionUsers')/items`,//переделать хардкод на id,//переделать хардкод на id
        Url_vti_bin:`${this._listdataUrl}/ReceptionUsers`,//переделать хардкод на id,//переделать хардкод на id
        ListItemEntityTypeFullName:'SP.Data.ReceptionUsers', //переделать хардкод на инициализацию
        Id:""//переделать хардкод на инициализацию
      };

      this._listCitiesParam = {
        Title:'Cities',
        Url:`${this._listsUrl}/GetByTitle('Cities')/items`,//переделать хардкод на id,//переделать хардкод на id
        Url_vti_bin:`${this._listdataUrl}/Cities`,//переделать хардкод на id,//переделать хардкод на id
        ListItemEntityTypeFullName:'SP.Data.Cities', //переделать хардкод на инициализацию
        Id:""//переделать хардкод на инициализацию
      };

    this._listVisitsParam = {
      Title:'Visits',
      Url:`${this._listsUrl}/GetByTitle('Visits')/items`,//переделать хардкод на id
      ListItemEntityTypeFullName:'SP.Data.VisitsListItem', //переделать хардкод на инициализацию
      Id:"a03bdc87-fc26-49e9-bf36-225abadcdda2"//переделать хардкод на инициализацию
    };

    this._listEmpUsers = {
      Title:'Visits',
      Url:`${this._listdataUrl}/EmpowermentUsers`,//переделать хардкод на id
      ListItemEntityTypeFullName:'SP.Data.EmpowermentUsersItem', //переделать хардкод на инициализацию
      Id:"5221fa7b-22e2-42fa-b7b5-354b566bf7c3"//переделать хардкод на инициализацию
    };
  }

  public get selectedList(): ISPList {
    return this._selectedList;
  }

  public set webPartContext(value: IWebPartContext) {
    this._webPartContext = value;
    this._peoplemanagerUrl=`${this._webPartContext.pageContext.web.absoluteUrl}/_api/sp.userprofiles.peoplemanager`;
    this._listsUrl = `${this._webPartContext.pageContext.web.absoluteUrl}/_api/web/lists`;
    this._apiUrl = `${this._webPartContext.pageContext.web.absoluteUrl}/_api/web`;
    this._listdataUrl = `${this._webPartContext.pageContext.web.absoluteUrl}/_vti_bin/listdata.svc`;
    this.sendEmail = `${this._webPartContext.pageContext.web.absoluteUrl}/_api/SP.Utilities.Utility.SendEmail`;
    
    
  }

  public get webPartContext(): IWebPartContext {
    return this._webPartContext;
  }

  public sendMail(params:ISendMail ): Promise<string> {
      params.From=params.From?params.From:'Reception';
      const sendResult =  this._sendMail(this.webPartContext.spHttpClient,params);
    //  console.log(sendResult);
    return ;
  }

  public getTaskLists(): Promise<ISPList[]> {
    const listTemplateId: string = '171';
    const queryString: string = `?$filter=BaseTemplate eq ${listTemplateId}`;
    const queryUrl: string = this._listsUrl + queryString;

    return this._webPartContext.spHttpClient.get(queryUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: ISPList[] }) => {
        return this._taskLists = json.value;
      });
  }

  public getItems(filter: string): Promise<ITodoItem[]> {
   // console.log("getItems param: " + filter  );
    return this._getItems(this.webPartContext.spHttpClient,filter);
  }

  public getUsers(filter: string): Promise<IUserItem[]> {
     //console.log("Getting users. Filter: " + filter  );
     return this._getUsers(this.webPartContext.spHttpClient,filter);
   }

   public getUserGroups(filter: IUGroup): Promise<IUGroup[]> {
    return this._getUserGroups(this.webPartContext.spHttpClient,filter);
  }

  public getPass(numFilter: string,statusFilter: string,cityFilter: string,typeFilter: string,busyFilter:string, activeFilter:string): Promise<IPassItem[]> {
    //console.log("Getting users. Filter: " + filter  );
    return this._getPass(this.webPartContext.spHttpClient,numFilter,statusFilter,cityFilter,typeFilter,busyFilter,activeFilter);
  }

  public getCities(filter: ICityItem): Promise<ICityItem[]> {
    //console.log("Getting users. Filter: " + filter  );
    return this._getCities(this.webPartContext.spHttpClient,filter);
  }

  public getPassConfig(filter: IPassItem): Promise<IPassItem[]> {
    //console.log("Getting users. Filter: " + filter  );
    return this._getPassConfig(this.webPartContext.spHttpClient,filter);
  }

   public getEmpUsers(filter: string, ): Promise<IEmpUserItem[]> {
    //console.log("Getting users. Filter: " + filter  );
    return this._getEmpUsers(this.webPartContext.spHttpClient,filter);
  }

   public getVisitsTypes(filter: string): Promise<IVisitsTypesItem[]> {
    //console.log("Getting users. Filter: " + filter  );
    return this._getVisitsTypes(this.webPartContext.spHttpClient,filter);
  }

  public getVisits(VisitsTypeId:string, filter: IVisitsItem): Promise<IVisitsItem[]> {
    //console.log("Getting users. Filter: " + filter  );
    
    return this._getVisits(this.webPartContext.spHttpClient,VisitsTypeId,filter);
  }

  public getItemCount(): Promise<string> {
    // console.log("getItems param: " + filter  );
     return this._getCountItems(this.webPartContext.spHttpClient);
   }

  public getUserInfo(filter:IUserInfo): Promise<IUserInfo> {
    // console.log("getItems param: " + filter  );
     return this._getUserInfo(this.webPartContext.spHttpClient,filter);
   }

   public getMyProperties(): Promise<IMyProperties> {
     return this._getMyProperties(this.webPartContext.spHttpClient);
   }
   
   public getCurrentUserProperties(): Promise<IMyProperties> {
    return this._getCurrentUserProperties(this.webPartContext.spHttpClient);
  }


  public getAssistant(uFilter: IUserItem): Promise<IUserItem> {
    // console.log("getItems param: " + filter  );
    const listUrl = this._listAssistantParam.Url;
    const query = '?';
    const filter = '&$filter=ManagerID eq '+ uFilter.Id;
  //  console.log(uFilter);
    return this._getAssistant(this.webPartContext.spHttpClient,listUrl,query,filter).then((user: IUserItem)=>{
      //console.log('getAssistant',user);
      if (user){
        if (user.AssistantIDId){
          return this._getAssistantUsers(this.webPartContext.spHttpClient,{Id:user.AssistantIDId}).then((uAssist)=>{
            return uAssist[0];
          });
        }
      }
      return {};
    });
    
   }
  public getBossUsers(uFilter: IUserItem): Promise<IUserItem> {
    // console.log("getItems param: " + filter  );
    return this._getBossUsers(this.webPartContext.spHttpClient,uFilter).then((uBoss)=>{
      return uBoss[0];
    });;
    
   }

  public getPassParams(filter: string): Promise<IPassItem> {
    // console.log("getItems param: " + filter  );
    const listUrl = this._listPersonalPassParam.Url;
    const query = '?$select=ID,NumberText,Created,Modified,StatusID/StatusName,CityID/CityNameUa,PassTypeId/TypeName&$expand=StatusID,CityID,PassTypeId';
    filter = '&$filter=ID eq '+filter;
    return this._getadditionalParam(this.webPartContext.spHttpClient,listUrl,query,filter)
    .then((row: any)=>{
    // console.log('getPassParams',row);
     if (row){
      typeof row.PassID=='object'?row.PassID={
        StatusID:{
          StatusName:row.StatusID.StatusName},
        PassTypeId:{
          TypeName:row.PassTypeId.TypeName},
        CityID:{
          CityNameUa:row.CityID.CityNameUa},
        
        NumberText:row.NumberText
      }:row.PassID=null;
    }
      return row;});
   }


   public getNotifyParams(filter: INotify): Promise<INotify[]> {
    // console.log("getItems param: " + filter  );
    const listUrl = this._listNotifyParam.Url;
    const query = '?';
    const filterString = '&$filter=  RemoveDate eq null and  VisitsTypeId eq '+ filter.VisitsTypeId ;
    return this._getNotifyParams(this.webPartContext.spHttpClient,listUrl,query,filterString)
    .then((row: any)=>{
        return row;});
   }

  public createItem(title: string): Promise<ITodoItem[]> {
    const batch: SPHttpClientBatch = this.webPartContext.spHttpClient.beginBatch();

    const batchPromises: Promise<{}>[] = [
      this._createItem(batch, title),
      this._getItemsBatched(batch)
    ];

    return this._resolveBatch(batch, batchPromises);
  }

  public clearVisit(visit:IVisitsItem): Promise<string> {
//    console.log('clearVisit ',visit);

      
      return this._updateVisit(this.webPartContext.spHttpClient,{ID:visit.ID,IsPassReturned:visit.IsPassReturned})
      .then(()=>{
        return '1';
      });
      
  }
  
  public clearPass(pass:IPassItem): Promise<string> {
   // console.log('clearPass StatusIDId',pass.StatusIDId);

    pass.StatusIDId= pass.StatusIDId?pass.StatusIDId:'2';//Доступна
   // console.log('clearPass StatusIDId',pass.StatusIDId);
    //const batch: SPHttpClientBatch = this.webPartContext.spHttpClient.beginBatch();
    const listUrl = this._listPersonalPassParam.Url;
    const query = '?$select=ID,VisitsIDId,StatusIDId';
    const filter = '&$filter=ID eq '+pass.ID;
    

    return this._getadditionalParam(this.webPartContext.spHttpClient,listUrl,query,filter)
    .then((row: any)=>{
    //  console.log(row);
      if (row.StatusIDId=='1' && pass.StatusIDId=='1'){
        return '0';
      }
    //  console.log(pass);
     // pass.StatusIDId=pass.StatusIDId=='2'?'1':'2';
     //Сделать пометку в пассах, что он используется
        return this._updatePass(this.webPartContext.spHttpClient,pass)
        .then(()=>{
          return this._updateVisit(this.webPartContext.spHttpClient,{ID:pass.VisitsIDId?pass.VisitsIDId:row.VisitsIDId,PassIDId:'',IsPassReturned:pass.StatusIDId=='2'?'1':'0'})
          .then(()=>{
            return '1';
          });
        });
     });
  }

  public updateVisit(visit: IVisitsItem, pass:IPassItem, filter:IVisitsItem,): Promise<IVisitsItem[]> {
    const batch: SPHttpClientBatch = this.webPartContext.spHttpClient.beginBatch();
//console.log(visit);
//console.log(pass);
    const batchPromises: Promise<{}>[] = [
      this._updateVisitBatch(batch,visit)
      .then((row:any)=>{
        /*
        pass.VisitsIDId=visit.ID;
        pass.StatusIDId='1';
  //      console.log(pass.ID,pass.IDPrev);
  //      console.log('Started _updatePass');
            this._updatePass(this.webPartContext.spHttpClient,pass).then((a)=>{
            pass.ID=pass.IDPrev;
            pass.StatusIDId='2';
  //       console.log(pass.ID,pass.IDPrev);
            this._updatePass(this.webPartContext.spHttpClient,pass).then((a)=>{
         
                       });

          });
         */
        return row;
      })
      //,
      ,this._getVisitsBatch(batch,visit.VisitsTypeID,filter) 
    ];

    return this._resolveBatch(batch, batchPromises);
  }
 
  public createVisit(visit: IVisitsItem, pass:IPassItem, filter:IVisitsItem,): Promise<IVisitsItem[]> {
    const batch: SPHttpClientBatch = this.webPartContext.spHttpClient.beginBatch();

    const batchPromises: Promise<{}>[] = [
      this._createVisit(batch,visit)
      .then((row:any)=>{
        pass.VisitsIDId=row.ID;
        pass.StatusIDId='1';
     //   console.log('Started _updatePass');
          this._updatePass(this.webPartContext.spHttpClient,pass).then((a)=>{
 //           console.log('Finished _updatePass',a);
          });
        return row;
      })
      //,
      ,this._getVisitsBatch(batch,visit.VisitsTypeID,filter) 
    ];

    return this._resolveBatch(batch, batchPromises);
  }
 
  public deleteItem(itemDeleted: ITodoItem): Promise<ITodoItem[]> {
    const batch: SPHttpClientBatch = this.webPartContext.spHttpClient.beginBatch();

    const batchPromises: Promise<{}>[] = [
      this._deleteItem(batch, itemDeleted),
      this._getItemsBatched(batch)
    ];

    return this._resolveBatch(batch, batchPromises);
  }

  public updateItem(itemUpdated: ITodoItem): Promise<ITodoItem[]> {
    const batch: SPHttpClientBatch = this.webPartContext.spHttpClient.beginBatch();

    const batchPromises: Promise<{}>[] = [
      this._updateItem(batch, itemUpdated),
      this._getItemsBatched(batch)
    ];

    return this._resolveBatch(batch, batchPromises);
  }

  public updatePass(itemUpdated: ITodoItem): Promise<IPassItem[]> {
    const batch: SPHttpClientBatch = this.webPartContext.spHttpClient.beginBatch();

    const batchPromises: Promise<{}>[] = [
      this._updateItem(batch, itemUpdated), 
      this._getItemsBatched(batch)
    ];

    return this._resolveBatch(batch, batchPromises);
  }


  
  private _getPass(requester: SPHttpClient, numFilter,statusFilter,cityFilter,typeFilter,visitFilter,activeFilter): Promise<IPassItem[]> {
     
     const queryString = '?$select=*,StatusID/StatusName,CityID/CityNameUa,PassTypeId/TypeName&$expand=StatusID,CityID,PassTypeId';
     var filterQuery: string = '';
     var filterCity: string = '';
     var filterRemoveDate: string = '';
     var filterStatus: string ='';
     var filterType: string ='';
     var order: string =  "&$orderby=NumberText";
     var limit: string = '&$top=50';
     
     
     filterQuery = "&$filter= 1 eq 1";
     if (numFilter && numFilter!=' '){
       //filterQuery = "$filter=startswith(FAMILYNAME,'"+filter+"') or startswith(FS,'"+filter+"') or startswith(FIO,'"+filter+"') or startswith(EMAIL,'"+filter+"')  or startswith(DEPARTMENT,'"+filter+"') or startswith(POSITION,'"+filter+"')";
       if (numFilter.length>0){

       var filterArray = numFilter.split(" ", 10); 
       filterQuery = filterQuery+" and ((";
       var filtercount=0;
       for (var element of filterArray) {
         if (element.length>0){
          filtercount++;
          if (filtercount==1){
            filterQuery =filterQuery+"startswith(NumberText,'"+element+"')";
          }else{
            filterQuery =filterQuery+"and substringof('"+element+"',NumberText)";
          }
        }
       }
       filterQuery = filterQuery+"))";
       
      } else{
        filterQuery = filterQuery+' 1 eq 1 ';

      }
    }
    
    if (cityFilter){
        filterCity = cityFilter!=='-1'?' and CityIDId eq '+cityFilter+' ':'';
      }else{
        //filterCity = ` and CityIDId eq null`;
        filterCity = ` `;
      }
      
      if(activeFilter=='1'){
        filterRemoveDate = ' and RemoveDate eq null ';
      } else {
        filterRemoveDate = 'and RemoveDate eq '+activeFilter+' ';

      }
      
      if (statusFilter){
        filterStatus = ' and StatusIDId eq '+statusFilter+' ';
      }
    
      if (typeFilter){
        filterType = " and (PassTypeId/VisitsTypeIDId eq " +typeFilter+")";
  
      }
      

       filterQuery =filterQuery+filterCity + filterStatus +  filterRemoveDate + filterType;
      
     
 
     const queryUrl: string = this._listPersonalPassParam.Url_vti_bin + queryString + filterQuery+order+limit;
    // console.log("_getPass string:  " + queryUrl  );
     return requester.get(queryUrl, SPHttpClient.configurations.v1)
       .then((response: SPHttpClientResponse) => {
   
         return response.json();
       })
       .then((json: { d: IPassItem2|any }) => {
   //  console.log(json);
         //return json.value.map((usr: IUserItem) => {
         // console.log(json.d);
     //    console.log(json.d.results);
          return json.d.results?json.d.results.map((usr: IPassItem) => {
           return usr;
         }):json.d.map((usr: IPassItem) => {
          return usr;
        });
       });
   }


  private _getUsers(requester: SPHttpClient, filter: string): Promise<IUserItem[]> {
    // console.log("_getItems param: " + filter  );
     //const queryString: string = `?$select=Id,Title,PercentComplete,AuthorId`;
  
     const queryString: string = '?';//`?$select=id,Title,PercentComplete,Author/ID,Author/Title,Author/FirstName,Author/LastName,Author/EMail&$expand=Author/Id?`;
     var filterQuery: string = '';
     if (filter.length>0){
      filter=filter.replace('\'',' ');
      
       //filterQuery = "$filter=startswith(FAMILYNAME,'"+filter+"') or startswith(FS,'"+filter+"') or startswith(FIO,'"+filter+"') or startswith(EMAIL,'"+filter+"')  or startswith(DEPARTMENT,'"+filter+"') or startswith(POSITION,'"+filter+"')";
       var filterArray = filter.split(" ", 10); 
       filterQuery = "$filter=((";
       var filtercount=0;
       for (var element of filterArray) {
         if (element.length>0){
          filtercount++;
          if (filtercount==1){
            filterQuery =filterQuery+"substringof('"+element+"',FIO)";
          }else{
            filterQuery =filterQuery+"and substringof('"+element+"',FIO)";
          }
        }
       }
       filterQuery =filterQuery+")or(";
       filtercount=0;
       for (var element of filterArray) {
        if (element.length>0){
          filtercount++;
          if (filtercount==1){
            filterQuery =filterQuery+"substringof('"+element+"',EMAIL)";
          }else{
            filterQuery =filterQuery+"and substringof('"+element+"',EMAIL)";
          }
        }
       }
       filterQuery =filterQuery+")or(";
       filtercount=0;
       for (var element of filterArray) {
        if (element.length>0){
          filtercount++;
          if (filtercount==1){
            filterQuery =filterQuery+"substringof('"+element+"',AccountName)";
          }else{
            filterQuery =filterQuery+"and substringof('"+element+"',AccountName)";
          }
        }
       }
       filterQuery =filterQuery+")or(";
       filtercount=0;
       for (var element of filterArray) {
        if (element.length>0){
          filtercount++;
          if (filtercount==1){
            filterQuery =filterQuery+"substringof('"+element+"',PHONE)";
          }else{
            filterQuery =filterQuery+"and substringof('"+element+"',PHONE)";
          }
        }
       }
       filterQuery =filterQuery+")or(";
       filtercount=0;
       for (var element of filterArray) {
        if (element.length>0){
          filtercount++;
          if (filtercount==1){
            filterQuery =filterQuery+"substringof('"+element+"',FAMILYNAMEOLD)";
          }else{
            filterQuery =filterQuery+"and substringof('"+element+"',FAMILYNAMEOLD)";
          }
        }
       }
       
      }
     
       filterQuery =filterQuery+")) and STATUS ne 'REM'&$orderby=FIO";
     
 
     const queryUrl: string = encodeURI(this._listUserUrl + queryString + filterQuery+'&$top=30');
    // console.log("string:  " + queryUrl  );
     return requester.get(queryUrl, SPHttpClient.configurations.v1)
       .then((response: SPHttpClientResponse) => {
   
         return response.json();
       })
       .then((json: { d: IUserItem2|any }) => {
       
         //return json.value.map((usr: IUserItem) => {
         // console.log(json.d);
        // console.log(json.d.results);
          return json.d.results?json.d.results.map((usr: IUserItem) => {
            if (!usr.Id){
              usr.Id=usr.Ідентифікатор;
           }

           if (usr.FAMILYNAMEOLD){
            if (usr.FAMILYNAMEOLD!=usr.FAMILYNAME){
              usr.FAMILYNAME = usr.FAMILYNAME + '('+usr.FAMILYNAMEOLD+')';
            }
           }
           return usr;
         }):json.d.map((usr: IUserItem) => {
          if (!usr.Id){
            usr.Id=usr.Ідентифікатор;
          }
          if (usr.FAMILYNAMEOLD){
            if (usr.FAMILYNAMEOLD!=usr.FAMILYNAME){
              usr.FAMILYNAME = usr.FAMILYNAME + '('+usr.FAMILYNAMEOLD+')';
            }
           }
          return usr;
        });
       });
   }
  private _getUserGroups(requester: SPHttpClient, filter: IUGroup): Promise<IUGroup[]> {
   // console.log('getUserGroups', filter,filter.UserId  );
     const queryString: string = '/GetUserById('+filter.UserId+')/Groups';
     var filterQuery: string ='';
    
     const queryUrl: string = encodeURI(this._apiUrl + queryString + filterQuery);
    // console.log("string:  " + queryUrl  );
     return requester.get(queryUrl, SPHttpClient.configurations.v1)
       .then((response: SPHttpClientResponse) => {
   
         return response.json();
       })
       .then((json:  {value:IUGroup[]} ) => {
          return json.value;
       });
   }

  private _getEmpUsers(requester: SPHttpClient, filter: string): Promise<IEmpUserItem[]> {
    // console.log("_getItems param: " + filter  );
     //const queryString: string = `?$select=Id,Title,PercentComplete,AuthorId`;
  
     const queryString: string = '?';//`?$select=id,Title,PercentComplete,Author/ID,Author/Title,Author/FirstName,Author/LastName,Author/EMail&$expand=Author/Id?`;
     var filterQuery: string = '';
    
     if (filter.length>0){
      filter=filter.replace('\'',' ');
       //filterQuery = "$filter=startsgulp serve --nobrowserwith(FAMILYNAME,'"+filter+"') or startswith(FS,'"+filter+"') or startswith(FIO,'"+filter+"') or startswith(EMAIL,'"+filter+"')  or startswith(DEPARTMENT,'"+filter+"') or startswith(POSITION,'"+filter+"')";
       var filterArray = filter.split(" ", 10); 
       filterQuery = "$filter=((";
       var filtercount=0;
       for (var element of filterArray) {
         if (element.length>0){
          filtercount++;
          if (filtercount==1){
            filterQuery =filterQuery+"substringof('"+element+"',FIO)";
          }else{
            filterQuery =filterQuery+"and substringof('"+element+"',FIO)";
          }
        }
       }
       filterQuery =filterQuery+")or(";
       filtercount=0;
       for (var element of filterArray) {
        if (element.length>0){
          filtercount++;
          if (filtercount==1){
            filterQuery =filterQuery+"substringof('"+element+"',Phone)";
          }else{
            filterQuery =filterQuery+"and substringof('"+element+"',Phone)";
          }
        }
       }

       filterQuery =filterQuery+")or(";
       filtercount=0;
       for (var element of filterArray) {
        if (element.length>0){
          filtercount++;
          if (filtercount==1){
            filterQuery =filterQuery+"substringof('"+element+"',EMAIL)";
          }else{
            filterQuery =filterQuery+"and substringof('"+element+"',EMAIL)";
          }
        }
       }

       filterQuery =filterQuery+")or(";
       filtercount=0;
       for (var element of filterArray) {
        if (element.length>0){
          filtercount++;
          if (filtercount==1){
            filterQuery =filterQuery+"substringof('"+element+"',Organization)";
          }else{
            filterQuery =filterQuery+"and substringof('"+element+"',Organization)";
          }
        }
       }
      
      }
       filterQuery =filterQuery+"))and InActiveDate eq  null&$orderby=FIO";
     
 
     const queryUrl: string = encodeURI(this._listEmpUsers.Url + queryString + filterQuery+'&$top=100');
    // console.log("string:  " + queryUrl  );
     return requester.get(queryUrl, SPHttpClient.configurations.v1)
       .then((response: SPHttpClientResponse) => {
   
         return response.json();
       })
       .then((json: { d: IEmpUserItem|any }) => {
       
         //return json.value.map((usr: IUserItem) => {
         // console.log(json.d);
        // console.log(json.d.results);
          return json.d.results?json.d.results.map((usr: IEmpUserItem) => {
           return usr;
         }):json.d.map((usr: IEmpUserItem) => {
          return usr;
        });
       });
   }

  private _getVisits(requester: SPHttpClient,VisitsTypeId:string, filter: IVisitsItem): Promise<IVisitsItem[]> {
    if (typeof filter != 'object'){filter={};}
    let queryUrl:string=this._listVisitsUrl;
    const queryString: string = '?$select=*,EmployeeID/FAMILYNAME,EmployeeID/FS,EmployeeID/AccountName,EmployeeID/EMAIL,EmployeeID/HRID,EmployeeID/POSITION,EmployeeID/DEPARTMENT,EmployeeID/PictureURL,EmployeeID/PHONE,EmpowermentUsersID/FIO,EmpowermentUsersID/Phone,Visitor,Organization,PassID/NumberText,PassID/ID,PostNum,Comments,IsPassReturned,Created,Author/FirstName,Author/LastName,CityID/CityNameUa&$expand=EmployeeID,EmpowermentUsersID,PassID,Author/Id,CityID';
    
    if (filter.ID){
       //queryUrl = queryUrl+'('+filter.ID+')';
       const Filter: string ='&$filter=Id eq '+filter.ID;
       queryUrl = queryUrl + queryString +Filter;
    }else{
      const Filter: string ='&$filter= ';
      const visitTypeFilter: string ='VisitsTypeIDId eq '+VisitsTypeId;
      const filterEmployee: string = filter.ui_employee?" and startswith(EmployeeID/FAMILYNAME,'"+filter.ui_employee+"')":'';
      const filterCity = filter.CityID.Id&&filter.CityID.Id!==-1?" and CityIDId eq '"+filter.CityID.Id+"'":'';
      const filterCreated: string = '';//filter.Created&&filter.Created!=='-1'?" and Created ge '"+this._calcFilteredDate(filter.Created)+"'":'';
      const filterCreatedFrom: string = filter.CreatedFrom&&filter.CreatedFrom?"  Created ge '"+this._onFormatDateFrom(filter.CreatedFrom)+"'":' ';
      const filterCreatedTo: string = filter.CreatedTo&&filter.CreatedTo?" and Created le '"+this._onFormatDateTo(filter.CreatedTo)+"'":'';
      const filterBusyTo= "IsPassReturned ne '1'";
      const filterPassTo= "and PassIDId ne null";

      const filterPart=  "and (("+ filterCreatedFrom +filterCreatedTo+") or ("+ filterBusyTo +"))";

      var stringSearch: string = '';
      if (filter.search){ 
     if (filter.search.length>0){
      filter.search=filter.search.replace('\'',' ');
       //filterQuery = "$filter=startsgulp serve --nobrowserwith(FAMILYNAME,'"+filter+"') or startswith(FS,'"+filter+"') or startswith(FIO,'"+filter+"') or startswith(EMAIL,'"+filter+"')  or startswith(DEPARTMENT,'"+filter+"') or startswith(POSITION,'"+filter+"')";
       var filterArray = filter.search.split(" ", 10); 
       stringSearch = " ((";
       var filtercount=0;
       for (var element of filterArray) {
         if (element.length>0){
          filtercount++;
          if (filtercount==1){
            stringSearch =stringSearch+"substringof('"+element+"',Visitor)";
          }else{
            stringSearch =stringSearch+"and substringof('"+element+"',Visitor)";
          }
        }
       }
       stringSearch =stringSearch+")or(";
       filtercount=0;
       for (var element of filterArray) {
        if (element.length>0){
          filtercount++;
          if (filtercount==1){
            stringSearch =stringSearch+"substringof('"+element+"',Organization)";
          }else{
            stringSearch =stringSearch+"and substringof('"+element+"',Organization)";
          }
        }
       }

       stringSearch =stringSearch+")or(";
       filtercount=0;
       for (var element of filterArray) {
        if (element.length>0){
          filtercount++;
          if (filtercount==1){
            stringSearch =stringSearch+"substringof('"+element+"',Comments)";
          }else{
            stringSearch =stringSearch+"and substringof('"+element+"',Comments)";
          }
        }
       }

       stringSearch =stringSearch+")or(";
       filtercount=0;
       for (var element of filterArray) {
        if (element.length>0){
          filtercount++;
          if (filtercount==1){
            stringSearch =stringSearch+"substringof('"+element+"',EmployeeID/FAMILYNAME)";
          }else{
            stringSearch =stringSearch+"and substringof('"+element+"',EmployeeID/FAMILYNAME)";
          }
        }
       }
       
       stringSearch =stringSearch+")or(";
       filtercount=0;
       for (var element of filterArray) {
        if (element.length>0){
          filtercount++;
          if (filtercount==1){
            stringSearch =stringSearch+"substringof('"+element+"',EmpowermentUsersID/FIO)";
          }else{
            stringSearch =stringSearch+"and substringof('"+element+"',EmpowermentUsersID/FIO)";
          }
        }
       }

       stringSearch =stringSearch+")or(";
       filtercount=0;
       for (var element of filterArray) {
        if (element.length>0){
          filtercount++;
          if (filtercount==1){
            stringSearch =stringSearch+"substringof('"+element+"',PassID/NumberText)";
          }else{
            stringSearch =stringSearch+"and substringof('"+element+"',PassID/NumberText)";
          }
        }
       }
       


       stringSearch=stringSearch+"))";
      }
    }

      const filterSearch: string = stringSearch.length>0?" and "+stringSearch:'';
      const orderBy: string = "&$orderby=Created desc&$top=1000";
      //queryUrl = queryUrl + queryString +Filter+visitTypeFilter+filterEmployee+filterCity+filterCreated+filterCreatedFrom+filterCreatedTo+filterSearch+orderBy;
      queryUrl = queryUrl + queryString +Filter+visitTypeFilter+filterEmployee+filterCity+filterCreated+filterPart+filterSearch+orderBy;
  } 
  queryUrl =encodeURI(queryUrl);
  //console.log(queryUrl);
   // console.log("string:  " + queryUrl  );
    return requester.get(queryUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: IVisitsItem[] }) => {
        return json.value.map((row: IVisitsItem) => {
          return row; 
        });
      }).then((rows: IVisitsItem[])=>{
        return rows.map((row: IVisitsItem) => {
          return row ;   
        });
      });
  }

  private _getVisitsBatch(requester: SPHttpClientBatch,VisitsTypeId:string, filter: IVisitsItem): Promise<IVisitsItem[]> {

    if (typeof filter != 'object'){filter={};}
    let queryUrl:string=this._listVisitsUrl;
    const queryString: string = '?$select=*,EmployeeID/FAMILYNAME,EmployeeID/FS,EmployeeID/AccountName,EmployeeID/EMAIL,EmployeeID/HRID,EmployeeID/POSITION,EmployeeID/DEPARTMENT,EmployeeID/PictureURL,EmployeeID/PHONE,EmpowermentUsersID/FIO,Visitor,Organization,PassID/NumberText,PassID/ID,PostNum,Comments,IsPassReturned,Created,Author/FirstName,Author/LastName,CityID/CityNameUa&$expand=EmployeeID,EmpowermentUsersID,PassID,Author/Id,CityID';
    
    if (filter.ID){
       //queryUrl = queryUrl+'('+filter.ID+')';
       const Filter: string ='&$filter=Id eq '+filter.ID;
       queryUrl = queryUrl + queryString +Filter;
    }else{
      const Filter: string ='&$filter= ';
      const visitTypeFilter: string ='VisitsTypeIDId eq '+VisitsTypeId;
      const filterEmployee: string = filter.ui_employee?" and startswith(EmployeeID/FAMILYNAME,'"+filter.ui_employee+"')":'';
      const filterCity = filter.CityID.Id&&filter.CityID.Id!==-1?" and CityIDId eq '"+filter.CityID.Id+"'":'';
      const filterCreated: string = '';//filter.Created&&filter.Created!=='-1'?" and Created ge '"+this._calcFilteredDate(filter.Created)+"'":'';
      const filterCreatedFrom: string = filter.CreatedFrom&&filter.CreatedFrom?" and Created ge '"+this._onFormatDateFrom(filter.CreatedFrom)+"'":'';
      const filterCreatedTo: string = filter.CreatedTo&&filter.CreatedTo?" and Created le '"+this._onFormatDateTo(filter.CreatedTo)+"'":'';


      const orderBy: string = "&$orderby=Created desc &$top=1000";
      queryUrl = queryUrl + queryString +Filter+visitTypeFilter+filterEmployee+filterCity+filterCreated+filterCreatedFrom+filterCreatedTo+orderBy;
  } 
    
  


   // console.log("string:  " + queryUrl  );
    return requester.get(queryUrl, SPHttpClientBatch.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: IVisitsItem[] }) => {
        return json.value.map((row: IVisitsItem) => {
          return row;
        });
      }).then((rows: IVisitsItem[])=>{
        return rows.map((row: IVisitsItem) => {
          return row ;   
        });
      });
  }

  private _getCities(requester: SPHttpClient,  filter: ICityItem): Promise<ICityItem[]> {
   
    const queryString: string = '?';
    var filterQuery: string = '';
    var filterRemoveDate: string = '';
    if (!filter.RemoveDate){
      filterRemoveDate='&$filter=RemoveDate eq null';
    }

    const queryUrl: string = this._listCitiesParam.Url + queryString + filterQuery+filterRemoveDate;
   // console.log("string:  " + queryUrl  );
    return requester.get(queryUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: ICityItem[] }) => {
        return json.value.map((rows: ICityItem) => {
//        return json.d.results.map((rows: ICityItem) => {
          return rows;
        });
      });
  }
  private _getPassConfig(requester: SPHttpClient,  filter: IPassItem): Promise<IPassItem[]> {
   
    const queryString: string = '?';
    var filterQuery: string = '';
    var filterRemoveDate: string = '';
    if (!filter.RemoveDate){
      filterRemoveDate='&$filter=RemoveDate eq null';
    }

    const queryUrl: string = this._listPassTypeParam.Url + queryString + filterQuery+filterRemoveDate;
   // console.log("string:  " + queryUrl  );
    return requester.get(queryUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: IPassItem[] }) => {
        return json.value.map((rows: IPassItem) => {
//        return json.d.results.map((rows: ICityItem) => {
          return rows;
        });
      });
  }

  
  private _getVisitsTypes(requester: SPHttpClient,  filter: string): Promise<IVisitsTypesItem[]> {
   
    const queryString: string = '?';
    var filterQuery: string = '&$filter=RemoveDate eq null';

     
    
   
    const queryUrl: string = this._VisitsTypesUrl + queryString + filterQuery;
   // console.log("string:  " + queryUrl  );
    return requester.get(queryUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: IVisitsTypesItem[] }) => {
        return json.value.map((rows: IVisitsTypesItem) => {
//        return json.d.results.map((rows: IVisitsTypesItem) => {
          return rows;
        });
      });
  }

  private _getadditionalParam(requester: SPHttpClient, listUrl: string, queryString:string  = `?`, filterQuery: string=''): Promise<any> {
    
         const queryUrl: string = listUrl + queryString+filterQuery;
    // console.log("string:  " + queryUrl  );
     return requester.get(queryUrl, SPHttpClient.configurations.v1)
       .then((response: SPHttpClientResponse) => {
         return response.json();
       })
       .then((json: { value: any }) => {
           return json.value[0];
      });
    }

  private _getNotifyParams(requester: SPHttpClient, listUrl: string, queryString:string  = `?`, filterQuery: string=''): Promise<INotify[]> {
         const queryUrl: string = listUrl + queryString+filterQuery;
    // console.log("string:  " + queryUrl  );
     return requester.get(queryUrl, SPHttpClient.configurations.v1)
       .then((response: SPHttpClientResponse) => {
         return response.json();
       })
       .then((json: { value: any }) => {
           return json.value;
      });
    }

    

  private _getAssistant(requester: SPHttpClient, listUrl: string, queryString:string  = `?`, filterQuery: string=''): Promise<IUserItem> {
    
         const queryUrl: string = listUrl + queryString+filterQuery;
    // console.log("string:  " + queryUrl  );
     return requester.get(queryUrl, SPHttpClient.configurations.v1)
       .then((response: SPHttpClientResponse) => {
         return response.json();
       })
       .then((json: { value: IUserItem }) => {
           return json.value[0];
      });
    }

    private _getAssistantUsers(requester: SPHttpClient, filter: IUserItem): Promise<IUserItem> {
          
       const queryString: string = '?';
       var filterQuery: string = '&$filter=Id eq '+ filter.Id;
       
       const queryUrl: string = encodeURI(this._listUserUrl + queryString + filterQuery);
      // console.log("string:  " + queryUrl  );
       return requester.get(queryUrl, SPHttpClient.configurations.v1)
         .then((response: SPHttpClientResponse) => {
        //  console.log(response);
           return response.json();
         })
         .then((json: { d: IUserItem2|any }) => {
        //  console.log(json.d);
           //return json.value.map((usr: IUserItem) => {
           // console.log(json.d);
          // console.log(json.d.results);
            return json.d.results?json.d.results.map((usr: IUserItem[]) => {
              
             return usr;
           }):json.d.map((usr: IUserItem) => {
          //  console.log(usr);
            return usr;
          });
         });
        
      
     }  
     private _getBossUsers(requester: SPHttpClient, filter: IUserItem): Promise<IUserItem> {
          
      const queryString: string = '?';
      var filterQuery: string = "&$filter=HRID eq '"+ filter.BOSSID+"'";
      
      const queryUrl: string = encodeURI(this._listUserUrl + queryString + filterQuery);
     // console.log("string:  " + queryUrl  );
      return requester.get(queryUrl, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
       //  console.log(response);
          return response.json();
        })
        .then((json: { d: IUserItem2|any }) => {
       //  console.log(json.d);
          //return json.value.map((usr: IUserItem) => {
          // console.log(json.d);
         // console.log(json.d.results);
           return json.d.results?json.d.results.map((usr: IUserItem[]) => {
             
            return usr;
          }):json.d.map((usr: IUserItem) => {
         //  console.log(usr);
           return usr;
         });
        });
       
     
    }  
   
  private _getCountItems(requester: SPHttpClient): Promise<string> {
      
    const queryString: string = `/ItemCount`;

    const queryUrl: string = this._listUrl + queryString;
   // console.log("string:  " + queryUrl  );
    return requester.get(queryUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: string }) => {
        return  json.value?json.value:'N/A';
       
      });

  }


  private _getUserInfo(requester: SPHttpClient,filter:IUserInfo): Promise<IUserInfo> {
      
  const queryString: string = `?$select=*,EmployeeID/FS,EmployeeID/FAMILYNAME,EmployeeID/EMAIL,EmployeeID/HRID,EmployeeID/BOSSID,EmployeeID/UserProfile_GUID,EmployeeID/AccountName,CityID/Id,CityID/CityNameUa&$expand=EmployeeID,CityID`;
  var filterString = '&$filter=';
  var filter_ID='';
  
  
 if (typeof filter.EmployeeID == 'object'){
  
   if (filter.EmployeeID.AccountName.length){
      filter.EmployeeID.AccountName?filter_ID='  UserAccountNameId eq  \'' + filter.EmployeeID.AccountName+'\'' :filter_ID=null;
   }else {
     filter.EmployeeID.UserProfile_GUID?filter_ID='  EmployeeID/UserProfile_GUID eq  \'' + filter.EmployeeID.UserProfile_GUID+'\'' :filter_ID=null;
   }
  }

    const queryUrl: string = this._listReceptionUsersParam.Url + queryString +filterString +filter_ID;
   // console.log("string:  " + queryUrl  );
    return requester.get(queryUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: IUserInfo }) => {
        return  json.value[0];
       
      });

  }

  private _getMyProperties(requester: SPHttpClient): Promise<IMyProperties> {
      
    //const queryString: string = `/_api/sp.userprofiles.peoplemanager/GetMyProperties`;
    
      const queryUrl: string = this._listMyPropertiesParam.Url;
     // console.log("string:  " + queryUrl  );
      return requester.get(queryUrl, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          return response.json();
        })
        .then((json:IMyProperties ) => {
          return  json;
        });
  
    }

    private _getCurrentUserProperties(requester: SPHttpClient): Promise<IMyProperties> {
      
        const queryUrl: string = this._listCurrentUserParam.Url;
       // console.log("string:  " + queryUrl  );
        return requester.get(queryUrl, SPHttpClient.configurations.v1)
          .then((response: SPHttpClientResponse) => {
            return response.json();
          })
          .then((json:IMyProperties ) => {
            return  json;
          });
    
      }

  

    
  
  private _getItems(requester: SPHttpClient, filter: string): Promise<ITodoItem[]> {
    // console.log("_getItems param: " + filter  );
     //const queryString: string = `?$select=Id,Title,PercentComplete,AuthorId`;
  
     const queryString: string = `?$select=id,Title,PercentComplete,Author/ID,Author/Title,Author/FirstName,Author/LastName,Author/EMail&$expand=Author/Id`;
     var filterQuery: string = '';
     if (filter.length>0){
       filterQuery = "&$filter=startswith(Title,'"+filter+"') or startswith(Author/LastName,'"+filter+"') or startswith(Author/EMail,'"+filter+"')  or startswith(Author/Title,'"+filter+"')";
     }
 
     const queryUrl: string = this._listItemsUrl + queryString + filterQuery;
    // console.log("string:  " + queryUrl  );
     return requester.get(queryUrl, SPHttpClient.configurations.v1)
       .then((response: SPHttpClientResponse) => {
         return response.json();
       })
       .then((json: { value: ITodoItem[] }) => {
         return json.value.map((task: ITodoItem) => {
           return task;
         });
       });
   }


  private _getItemsBatched(requester: SPHttpClientBatch): Promise<ITodoItem[]> {
   // const queryString: string = `?$select=Id,Title,PercentComplete,AuthorId`;
    const queryString: string = `?$select=id,Title,PercentComplete,Author/ID,Author/Title,Author/FirstName,Author/LastName,Author/EMail&$expand=Author/Id`;
    const queryUrl: string = this._listItemsUrl + queryString;

    return requester.get(queryUrl, SPHttpClientBatch.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: ITodoItem[] }) => {
        return json.value.map((task: ITodoItem) => {
          return task;
        });
      });
  }

  private _sendMail(requester: SPHttpClient, props: ISendMail): Promise<SPHttpClientResponse> {
    const body: {} = {
      "properties": {
        "__metadata": {"type": "SP.Utilities.EmailProperties"},
        "From": props.From,
        //"To":{ "results": ["Sergey.korotenko@kyivstar.ua",""]},
        "To":{ "results": props.To},
        "CC":{ "results": props.CC},
        "Subject":props.Subject,
        "Body":props.Body
      }
     
    };
    const headers: Headers = new Headers();
    //headers.append('If-Match', '*');
    headers.append('content-Type', 'application/json;odata=verbose');
    headers.append('Accept', 'application/json;odata=verbose');
    headers.append('odata-version', '');
    

    return requester.fetch(this.sendEmail,
      SPHttpClient.configurations.v1,
      {
        body: JSON.stringify(body),
        headers,
        method: 'POST'
      }
    );
  }
  private _createVisit(batch: SPHttpClientBatch, value: IVisitsItem): Promise<SPHttpClientResponse> {
    const body: {} = {
      '@data.type': `${this._listVisitsParam.ListItemEntityTypeFullName}`,
      'EmployeeIDId': value.ui_employee?value.ui_employee:null,
      'EmpowermentUsersIDId': value.EmpowermentUsersID.ID?value.EmpowermentUsersID.ID:null,
      'Visitor': value.Visitor,
      'Organization': value.Organization,
      'PassIDId': value.ui_pass?value.ui_pass:null,
      'CityIDId':value.CityID.Id?value.CityID.Id:null,
      'PostNum': value.PostNum,
      'Comments': value.Comments,
      'IsPassReturned': value.IsPassReturned,
      'VisitsTypeIDId': value.VisitsTypeID,
    };

    return batch.post(
      this._listVisitsParam.Url,
      SPHttpClientBatch.configurations.v1,
      { body: JSON.stringify(body) }
    ).then((response: SPHttpClientResponse) => {
      return response.json();
    });
  }

  private _createItem(batch: SPHttpClientBatch, title: string): Promise<SPHttpClientResponse> {
    const body: {} = {
      '@data.type': `${this._selectedList.ListItemEntityTypeFullName}`,
      'Title': title
    };

    return batch.post(
      this._listItemsUrl,
      SPHttpClientBatch.configurations.v1,
      { body: JSON.stringify(body) }
    );
  }




  private _deleteItem(batch: SPHttpClientBatch, item: ITodoItem): Promise<SPHttpClientResponse> {
    const itemDeletedUrl: string = `${this._listItemsUrl}(${item.Id})`;

    const headers: Headers = new Headers();
    headers.append('If-Match', '*');

    return batch.fetch(itemDeletedUrl,
      SPHttpClientBatch.configurations.v1,
      {
        headers,
        method: 'DELETE'
      }
    );
  }

  private _updatePass(requester: SPHttpClient, item: IPassItem): Promise<SPHttpClientResponse> {

    const itemUpdatedUrl: string = `${this._listPersonalPassParam.Url}(${item.ID})`;

    const headers: Headers = new Headers();
    headers.append('If-Match', '*');


    interface Ibody {
      "@data.type"?: string;
      "CityIDId"?: string;
      'NumberText'?: string;
      'PassTypeIdId'?: string;
      'StatusIDId'?: number;
      'VisitsIDId'?: string;
      'RemoveDate'?: string;
  }

  //console.log('IPassItem ',item);
    var body: Ibody=<any>{};
    
    //body = {"@data.type":`${this._listPersonalPassParam.ListItemEntityTypeFullName}`};
  body["@data.type"]=`${this._listPersonalPassParam.ListItemEntityTypeFullName}`;

    if (item.CityIDId){
      body.CityIDId =item.CityIDId;
    }
    if (item.NumberText){
     body.NumberText =item.NumberText;
    }
    if (item.PassTypeIdId){
     body.PassTypeIdId=item.PassTypeIdId;
    }
   /* if (item.StatusIDId){
      body.StatusIDId=item.StatusIDId;
    }*/
    if (typeof item.StatusIDId=='string'){
      if (item.StatusIDId){
        body.StatusIDId = Number(item.StatusIDId);
      }else{
        body.StatusIDId = null;
      }
    }   else if (typeof item.StatusIDId=='number'){
      if (item.StatusIDId){
        body.StatusIDId = item.StatusIDId;
      }else{
        body.StatusIDId = null;
      }
    }
    if (item.VisitsIDId){
      body.VisitsIDId=item.VisitsIDId;
    }
    if (item.RemoveDate){
      body.RemoveDate=item.RemoveDate;
    }

      
    
   

    return requester.fetch(itemUpdatedUrl,
      SPHttpClient.configurations.v1,
      {
        body: JSON.stringify(body),
        headers,
        method: 'PATCH'
      }
    );
  }

  private _updateVisitBatch(batch: SPHttpClientBatch, item: IVisitsItem): Promise<SPHttpClientResponse> {

    const itemUpdatedUrl: string = `${this._listVisitsParam.Url}(${item.ID})`;

    const headers: Headers = new Headers();
    headers.append('If-Match', '*');


    interface Ibody {
      "@data.type"?: string;
      "PassIDId"?: number;
      "IsPassReturned"?:string;
      'EmployeeIDId': number,
      'EmpowermentUsersIDId': number,
      'Visitor': string,
      'Organization': string,
      'CityIDId':string,
      'PostNum': string,
      'Comments': string,
      'VisitsTypeIDId': string,
  }//FIX ME lдобить все пораметры

    var body: Ibody=<any>{};
    
    //body = {"@data.type":`${this._listPersonalPassParam.ListItemEntityTypeFullName}`};
  body["@data.type"]=`${this._listVisitsParam.ListItemEntityTypeFullName}`;
 // console.log('item',item);
  //console.log(typeof item.PassIDId);
    if (typeof item.ui_pass=='string'){
      if (item.ui_pass){
        body.PassIDId = Number(item.ui_pass);
      }else{
        body.PassIDId = null;
      }
    }   else if (typeof item.ui_pass=='number'){
      if (item.ui_pass){
        body.PassIDId = item.ui_pass;
      }else{
        body.PassIDId = null;
      }
    }
    if (typeof item.IsPassReturned=='string'){
      if (item.IsPassReturned){
        body.IsPassReturned = item.IsPassReturned;
      }else{
        body.IsPassReturned = null;
      }
    }
    if (typeof item.ui_employee=='string'){
      if (item.ui_employee){
        body.EmployeeIDId = Number(item.ui_employee);
      }else{
        body.EmployeeIDId = null;
      }
    }else  if (typeof item.ui_employee=='number'){
      if (item.ui_employee){
        body.EmployeeIDId = item.ui_employee;
      }else{
        body.EmployeeIDId = null;
      }
    }
    if (typeof item.EmpowermentUsersIDId=='string'){
      if (item.EmpowermentUsersIDId){
        body.EmpowermentUsersIDId = Number(item.EmpowermentUsersIDId);
      }else{
        body.EmpowermentUsersIDId = null;
      }
    }else if (typeof item.EmpowermentUsersIDId=='number'){
      if (item.EmpowermentUsersIDId){
        body.EmpowermentUsersIDId = item.EmpowermentUsersIDId;
      }else{
        body.EmpowermentUsersIDId = null;
      }
    }
    if (typeof item.Visitor=='string'){
      if (item.Visitor){
        body.Visitor = item.Visitor;
      }else{
        body.Visitor = null;
      }
    }
    if (typeof item.Organization=='string'){
      if (item.Organization){
        body.Organization = item.Organization;
      }else{
        body.Organization = null;
      }
    }
    if (typeof item.CityIDId=='string'){
      if (item.CityIDId){
        body.CityIDId = item.CityIDId;
      }else{
        body.CityIDId = null;
      }
    }
    if (typeof item.Comments=='string'){
      if (item.Comments){
        body.Comments = item.Comments;
      }else{
        body.Comments = null;
      }
    }
    if (typeof item.VisitsTypeIDId=='string'){
      if (item.VisitsTypeIDId){
        body.VisitsTypeIDId = item.VisitsTypeIDId;
      }else{
        body.VisitsTypeIDId = null;
      }
    }
//FIX ME добить все параметры
      
    
       return batch.fetch(itemUpdatedUrl,
      SPHttpClientBatch.configurations.v1,
      {
        body: JSON.stringify(body),
        headers,
        method: 'PATCH'
      }
    );
  }

  private _updateVisit(requester: SPHttpClient, item: IVisitsItem): Promise<SPHttpClientResponse> {
//console.log('_updateVisit IsPassReturned',item.IsPassReturned);
    const itemUpdatedUrl: string = `${this._listVisitsParam.Url}(${item.ID})`;

    const headers: Headers = new Headers();
    headers.append('If-Match', '*');


    interface Ibody {
      "@data.type"?: string;
      "PassIDId"?: number;
      "IsPassReturned"?:string;
  }//FIX ME lдобить все пораметры

    var body: Ibody=<any>{};
    
    //body = {"@data.type":`${this._listPersonalPassParam.ListItemEntityTypeFullName}`};
  body["@data.type"]=`${this._listVisitsParam.ListItemEntityTypeFullName}`;
  //console.log('item',item);
  //console.log(typeof item.PassIDId);
    if (typeof item.ID=='string'){
      if (item.ID){
        body.PassIDId = Number(item.ID);
      }else{
        body.PassIDId = null;
      }
    }
    if (typeof item.IsPassReturned=='string'){
      if (item.IsPassReturned!=''){
        body.IsPassReturned = item.IsPassReturned;
      }else{
        body.IsPassReturned = null;
      }
    }
//FIX ME добить все параметры
      
    
   

    return requester.fetch(itemUpdatedUrl,
      SPHttpClient.configurations.v1,
      {
        body: JSON.stringify(body),
        headers,
        method: 'PATCH'
      }
    );
  }

  private _updateItem(batch: SPHttpClientBatch, item: ITodoItem): Promise<SPHttpClientResponse> {

    const itemUpdatedUrl: string = `${this._listItemsUrl}(${item.Id})`;

    const headers: Headers = new Headers();
    headers.append('If-Match', '*');

    const body: {} = {
      '@data.type': `${this._selectedList.ListItemEntityTypeFullName}`,
      'PercentComplete': item.PercentComplete
    };

    return batch.fetch(itemUpdatedUrl,
      SPHttpClientBatch.configurations.v1,
      {
        body: JSON.stringify(body),
        headers,
        method: 'PATCH'
      }
    ); 
  }

  private _onFormatDateFrom = (date: Date): string => {
    // return date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() % 100);
     return  (date.getFullYear()+ '-' + ("00" + (date.getMonth() + 1)).slice(-2) + '-' +  ("00" + date.getDate()).slice(-2) );
   };

   private _onFormatDateTo = (date: Date): string => {
    // return date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() % 100);
    var result = new Date(date);
    result.setDate(result.getDate() + 1);
    
       return  (result.getFullYear()+ '-' + ("00" + (result.getMonth() + 1)).slice(-2) + '-' +  ("00" + result.getDate()).slice(-2) );
   };

  private _calcFilteredDate (period:string){
    var today: Date = new Date();
    var dd = today.getDate();
    var day = today.getDay();
    var first_day = today.getDate() - day + (day == 0 ? -6:1);
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    const filter_date = {
      'Day':yyyy+'-'+mm+'-'+dd,
      'Week':yyyy+'-'+mm+'-'+first_day,
      'Month':yyyy+'-'+mm+'-01',
      'Year':yyyy+'-01-01',
      '-1':null,
    };
    return filter_date[period];
  }

  private _resolveBatch(batch: SPHttpClientBatch, promises: Promise<{}>[]): Promise<any> {
    return batch.execute()
      .then(() => Promise.all(promises).then(values => values[values.length - 1]));
  }

  // private _resolveBatchVisits(batch: SPHttpClientBatch, promises: Promise<{}>[]): Promise<IVisitsItem[]> {
  //   return batch.execute()
  //     .then(() => Promise.all(promises).then(values => values[values.length - 1]));
  // }

}