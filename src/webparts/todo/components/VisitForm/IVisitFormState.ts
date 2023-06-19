import IUserItem from '../../models/IUserItem';
import IEmpUserItem from '../../models/IEmpUserItem';
//import IEpmUserItem from '../../models/IEmpUserItem';
import IPassItem from '../../models/IPassItem';
import IVisitsItem from '../../models/IVisitsItem';

interface IVisitFormState {
    inputValue?: string;
    inputFilter?: string;
    fields?:any;
    showForm?:string;
    isCalloutVisible?: Boolean;
    userItems?: IUserItem[]&IEmpUserItem[];
    passItems?: IPassItem[];
    empUserItems?: IEmpUserItem[];
    CalloutStyle?:{
      width?:string;
      type?:string;
      height?:string;
    };

    search?:string;
    search_employee_string?:string;
    selected_employee_id?:string;
    selected_employee_type?:string;
    selected_employee?:IUserItem;
    search_pass_string?:string;
    search_clear_pass_string?:string;
    selected_pass_id?:string;
    prev_selected_pass_id?:string;
    selected_pass_type?:string;
    selectedNotifySwitch?:boolean;
    searchCount?:number;

    cityFilter?:string;
    periodFilter?:string;
    selectedVisitor?:string;
    selectedPostnum?:string;
    selectedOrganization?:string;
    selectedcomments?:string;
    selectedVisitID?:string;
    itemForEdit?:IVisitsItem;
    formValid?:string;
    selectedCity?:string;

    timeLableGetUser?:number;
    timeLableGetPass?:number;
 
  }
  
  export default IVisitFormState;