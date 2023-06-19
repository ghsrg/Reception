import IPassItem from './IPassItem';
import ICityItem from './ICityItem'

interface IVisitsItem {
    ID?:string;
  ui_employee?:string;
    EmployeeID?: {
      EMAIL?:string;
      FAMILYNAME?:string;
      FS?:string;
      HRID?:string;
      POSITION?:string;
      DEPARTMENT?:string;
      PictureURL?:string;
      PHONE?:string;
      AccountName?:string;
    }; //
    EmployeeIDId?:string;
    EmpowermentUsersID?:{
        ID?:string;
        FIO?:string;
        Phone?:string;
      };
      EmpowermentUsersIDId?:string;
    Visitor?:string;
    PassIDId?:string;
    Organization?:string;
  ui_pass?:string;
    PassID?:IPassItem;
    PostNum?:string;
    Comments?:string;
    IsPassReturned?:string;
    ui_IsPassReturned?:string;
    VisitsTypeID?:string;
    VisitsTypeIDId?:string;
    CityID?:ICityItem;
    CityIDId?:ICityItem;
  ui_autor?:string;
    Author?:{
      FirstName:string;
      LastName:string;
    };  
  
   
    Created?:string;
    CreatedFrom?:Date;
    CreatedTo?:Date;
    search?:string;
    selectedNotifySwitch?:boolean;
  }
  
  export default IVisitsItem;
  
 
  
  
  
  
  
  
  