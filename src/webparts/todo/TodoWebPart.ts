import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  IPropertyPaneField,
  PropertyPaneLabel,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-webpart-base';

//import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import * as lodash from '@microsoft/sp-lodash-subset';
//import * as strings from 'todoStrings';
import TodoContainer from './components/TodoContainer/TodoContainer';
import ITodoContainerProps from './components/TodoContainer/ITodoContainerProps';
import ITodoWebPartProps from './ITodoWebPartProps';
import ITodoDataProvider from './dataProviders/ITodoDataProvider';
//import MockDataProvider from './tests/MockDataProvider';
import SharePointDataProvider from './dataProviders/SharePointDataProvider';
import ISPList from './models/ISPList';
import IUserInfo from './models/IUserInfo';
import IMyProperties from './models/IMyProperties';
import SPUser from './SPUser/SPUser';
import ISPUser from './SPUser/ISPUser';
import ISPInfo from './SPUser/ISPInfo';
import IHRInfo from './SPUser/IHRInfo';
import IContextInfo from './SPUser/IContextInfo';
import iSessionInfo from './SPUser/iSessionInfo';
import ICityItem from './models/ICityItem';
import IPassItem from './models/IPassItem';
import IUGroup from './models/IUGroup';



export default class TodoWebPart extends BaseClientSideWebPart<ITodoWebPartProps> {

  private _dropdownOptions: IPropertyPaneDropdownOption[];
  private _dataProvider: ITodoDataProvider;
  private _curentUser: ISPUser;
  private _selectedList: ISPList;
  private _todoContainerComponent: TodoContainer;
  private _disableDropdown: boolean;
  private _SPInfoObj: ISPInfo;
  private _ContextInfoObj: IContextInfo;
  private _SessionInfoObj: iSessionInfo;
  private _HRInfoObj: IHRInfo;


  protected onInit(): Promise<void> {
    document.getElementById('sideNavBox')?document.getElementById('sideNavBox').style.display = 'none':'';
    document.getElementById('contentBox')?document.getElementById('contentBox').style.marginLeft='0px':'';
    this.context.statusRenderer.displayLoadingIndicator(this.domElement, "Reception",50);

    /*
    Create the appropriate data provider depending on where the web part is running.
    The DEBUG flag will ensure the mock data provider is not bundled with the web part when you package the solution for distribution, that is, using the --ship flag with the package-solution gulp command.
    */
 
      this._dataProvider = new SharePointDataProvider();
      this._dataProvider.webPartContext = this.context;
      this._curentUser= new SPUser();
    

    this._openPropertyPane = this._openPropertyPane.bind(this);
    this._getUserGroups = this._getUserGroups.bind(this);

    /*
    Get the list of tasks lists from the current site and populate the property pane dropdown field with the values.
    */
    this._loadTaskLists().then(()=>{
        this._loadMyProperties().then((result: IMyProperties)=>{ // получаем инфу по профайлу юзера
       //     console.log(result);
        //   console.log('load2 _loadMyProperties',result.UserProfileProperties);
          
            this._SPInfoObj = { // что будет загружено 
              Id: result.Id,
              AccountName:result.AccountName,
              DisplayName:result.DisplayName,
              EMAIL:result.Email,
              PersonalUrl:'',
              PictureUrl:result.PictureUrl,
              Title:result.Title,
              UserProfile_GUID:'',
              SID:'',
              FirstName: '',
              LastName: '',
              PreferredName: '',
              OrganizationalStructure: '',
              Department: '',
              Manager: '',
              UserName: '',
              AboutMe: '',
              WorkPhone: '',
              LoginName: '',
              IsSiteAdmin: '',
              UserGroups:[]
            };
            result.UserProfileProperties.forEach((key,value)=>{
              if (typeof this._SPInfoObj[key.Key] !== 'undefined'){
                this._SPInfoObj[key.Key]=key.Value;
              }
            });
           
             this._curentUser.SPInfo=this._SPInfoObj;
    
          }).then(()=>{
            this._loadCurrentUserProperties().then((result: IMyProperties)=>{// получаем инфу про профайл на сайте
             // console.log('load3 _loadCurrentUserProperties',result);
              this._SPInfoObj.Id=String(result.Id);
              this._SPInfoObj.IsSiteAdmin=String(result.IsSiteAdmin);
              this._SPInfoObj.LoginName=result.LoginName;
              this._curentUser.SPInfo= this._SPInfoObj;
              
            }).then(()=>{
              this._getUserGroups().then((result: IUGroup[])=>{// получаем список групп в которые входит юзер
                //console.log('load3 _loadCurrentUserProperties',result);
                this._curentUser.SPInfo.UserGroups=result;
              });
      
            
    
          }).then(()=>{
            this._getUserInfo().then((result: IUserInfo)=>{ // получаем данные ресепшин юзера
              console.log('load4  _getUserInfo',result);
              this._HRInfoObj = {
                BOSSID:'',
                HRID:'', 
                FAMILYNAME:'',
                FS:''
              };
              if (result){
                if (result.EmployeeID){
                  this._HRInfoObj.HRID=result.EmployeeID.HRID;
                  this._HRInfoObj.BOSSID=result.EmployeeID.BOSSID;
                  this._HRInfoObj.FAMILYNAME=result.EmployeeID.FAMILYNAME;
                  this._HRInfoObj.FS=result.EmployeeID.FS;
                }
              }
              this._curentUser.HRInfo= this._HRInfoObj;


            this._ContextInfoObj = {
             // Period:'',
              CityID:{
                Id:'',
                CityNameUa:''
              }
            };
        
              if (result){
                this._ContextInfoObj.CityID.Id=String(result.CityID.Id);
                this._ContextInfoObj.CityID.CityNameUa=result.CityID.CityNameUa;
             
              }
            //  this._ContextInfoObj.Period='Day';
              this._curentUser.ContextInfo= this._ContextInfoObj;

                //console.log('load5 ContextInfo', this._curentUser.ContextInfo);
            
            this._SessionInfoObj = {
            //  Period:'',
              DateFrom:new Date(),
              DateTo:new Date(),
              CityID:{
                Id:'',
                CityNameUa:''
              },
              Cities:[]
            };
            if (result){
              this._SessionInfoObj.CityID.Id=this._ContextInfoObj.CityID.Id;
              this._SessionInfoObj.CityID.CityNameUa=this._ContextInfoObj.CityID.CityNameUa;
            //  this._SessionInfoObj.Period=this._ContextInfoObj.Period;
              
            }else{
               console.log('SessionInfo', this._curentUser.SessionInfo);
            }
              this._curentUser.SessionInfo= this._SessionInfoObj;
              //   console.log('SessionInfo', this._curentUser.SessionInfo);
        })
  
        
        .then(()=>{
          this._loadPassConfig().then((result: IPassItem[])=>{
            //console.log(result);
            this._curentUser.ContextInfo.PassConfig=result;
            //console.log(this._curentUser.ContextInfo.PassConfig);
        });}).then(()=>{
          this._loadCities().then((result: ICityItem[])=>{
           // console.log(result);
            this._curentUser.SessionInfo.Cities=result;
          }).then(()=>{
            /*
            If a list is already selected, then we would have stored the list Id in the associated web part property.
            So, check to see if we do have a selected list for the web part. If we do, then we set that as the selected list
            in the property pane dropdown field.
            */
            if (this.properties.spListIndex) {
              this._setSelectedList(this.properties.spListIndex.toString());
              //this.context.statusRenderer.clearLoadingIndicator(this.domElement);
              this.context.statusRenderer.clearLoadingIndicator(this.domElement);
              
            }
           // console.log('RRR2 rendering.....');
              this.render();
          });
        });

  //сюда  
})  
      });
      //console.log('load6  Preload finished');
    });
      
      

    return super.onInit();
  }

  public render(): void {
    //console.log('RRR1 rendering.....');
    /*
    Create the react element we want to render in the web part DOM. Pass the required props to the react component. 
    */
    const element: React.ReactElement<ITodoContainerProps> = React.createElement(
      
      TodoContainer,
      {
        dataProvider: this._dataProvider,
        currentUser:this._curentUser,
        webPartDisplayMode: this.displayMode,
        configureStartCallback: this._openPropertyPane
      }
    );
   // console.log('RRR2 rendering element.....',element);
   // console.log('RRR3 rendering domElement.....',this.domElement);
    this._todoContainerComponent = <TodoContainer>ReactDom.render(element, this.domElement);
   // console.log('RRR4 rendering _todoContainerComponent.....',this._todoContainerComponent);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private _loadTaskLists(): Promise<any> {
    return this._dataProvider.getTaskLists()
      .then((taskLists: ISPList[]) => {
        // Disable dropdown field if there are no results from the server.
        this._disableDropdown = taskLists.length === 0;
        if (taskLists.length !== 0) {
          this._dropdownOptions = taskLists.map((list: ISPList) => {
            return {
              key: list.Id,
              text: list.Title
            };
          });
        }
      });
  }
  private _loadCities(): Promise<ICityItem[]> {
    return this._dataProvider.getCities({})
      .then((MyProperties: ICityItem[]) => {
          return MyProperties;
      });
  }
  private _loadPassConfig(): Promise<IPassItem[]> {
    return this._dataProvider.getPassConfig({})
      .then((MyProperties: IPassItem[]) => {
          return MyProperties;
      });
  }

  private _loadMyProperties(): Promise<IMyProperties> {
    return this._dataProvider.getMyProperties()
      .then((MyProperties: IMyProperties) => {
          return MyProperties;
      });
  }
  private _loadCurrentUserProperties(): Promise<IMyProperties> {
    return this._dataProvider.getCurrentUserProperties()
      .then((UserProperties: IMyProperties) => {
          return UserProperties;
      });
  }
  private _getUserInfo(): Promise<IUserInfo> {
   // console.log('load4 _getUserInfo',this._curentUser.SPInfo);
    return this._dataProvider.getUserInfo({EmployeeID:{UserProfile_GUID:this._curentUser.SPInfo.UserProfile_GUID,AccountName:this._curentUser.SPInfo.Id}})
      .then((UserProperties: IUserInfo) => {
          return UserProperties;
      });
  }
  private _getUserGroups(): Promise<IUGroup[]> {
     return this._dataProvider.getUserGroups({UserId:this._SPInfoObj.Id})
      .then((UserGroups: IUGroup[]) => {
          return UserGroups;
      });
  }

  


  private _setSelectedList(value: string) {
    const selectedIndex: number = lodash.findIndex(this._dropdownOptions,
      (item: IPropertyPaneDropdownOption) => item.key === value
    );

    const selectedDropDownOption: IPropertyPaneDropdownOption = this._dropdownOptions[selectedIndex];

    if (selectedDropDownOption) {
      this._selectedList = {
        Title: selectedDropDownOption.text,
        Id: selectedDropDownOption.key.toString()
      };

      this._dataProvider.selectedList = this._selectedList;
    }
  }

  private _openPropertyPane(): void {
    this.context.propertyPane.open();
  }

  /*protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
           
              groupFields: this._getGroupFields()
            }
          ]
        }
      ]
    }; 
  }*/

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    /*
    Check the property path to see which property pane feld changed. If the property path matches the dropdown, then we set that list
    as the selected list for the web part. 
    */
    if (propertyPath === 'spListIndex') {
      this._setSelectedList(newValue);
    }

    /*
    Finally, tell property pane to re-render the web part. 
    This is valid for reactive property pane. 
    */
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  }
/*
  private _getGroupFields(): IPropertyPaneField<any>[] {
    const fields: IPropertyPaneField<any>[] = [];

    fields.push(PropertyPaneDropdown('spListIndex', {
      label: strings.ConfigListName,
      disabled: this._disableDropdown,
      options: this._dropdownOptions
    }));

   
    if (this._disableDropdown) {
      fields.push(PropertyPaneLabel(null, {
        text: 'Could not find tasks lists in your site. Create one or more tasks list and then try using the web part.'
      }));
    }

    return fields;
  }
*/
}
