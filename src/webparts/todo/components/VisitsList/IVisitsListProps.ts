import IVisitsItem from '../../models/IVisitsItem';
import IVisitsTypesItem from '../../models/IVisitsTypesItem';
import ISPUser from '../../SPUser/ISPUser';
import ItemFilterCallback from '../../models/ItemFilterCallback';
import ItemFilterCallbackString from '../../models/ItemFilterCallbackString';
//import ItemOperationCallback from '../../models/ItemOperationCallback'; /// поменять




interface IVisitsListProps {
  items: IVisitsItem[];
  VisitsTypesItem: IVisitsTypesItem;
  currentUser: ISPUser;
  dblClick:ItemFilterCallback;
  onRefreshVisitsItems:ItemFilterCallback;
  onClickClearPass:ItemFilterCallbackString;
  //onCompleteTodoItem: ItemOperationCallback;
  //onDeleteTodoItem: ItemOperationCallback;

  exportData:boolean;
}

export default IVisitsListProps;