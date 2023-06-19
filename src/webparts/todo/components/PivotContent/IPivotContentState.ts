import IUserItem from '../../models/IUserItem';
import IVisitsItem from '../../models/IVisitsItem';


interface IPivotContentState {

 userItems?: IUserItem[];
 visitsItems?: IVisitsItem[];
 showForm?: string;
 text?:string;
 exportData?:boolean;
 itemForEdit?:IVisitsItem;


 timeLableGetVisits?:number;
}

export default IPivotContentState;