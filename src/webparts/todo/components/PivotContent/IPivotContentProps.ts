//import IPivotContent from '../../models/IPivotContent';
import IVisitsTypesItem from '../../models/IVisitsTypesItem';
import ITodoDataProvider from '../../dataProviders/ITodoDataProvider';
//import ItemOperationCallback from '../../models/ItemOperationCallback'; /// поменять
import ISPUser from '../../SPUser/ISPUser';

interface PivotContentProps {
  VisitsTypesItem: IVisitsTypesItem;
  dataProvider: ITodoDataProvider;
  currentUser: ISPUser;
  //pivotInfo:IVisitsTypesItem
  
  //onCompleteTodoItem: ItemOperationCallback;
  //onDeleteTodoItem: ItemOperationCallback;
}

export default PivotContentProps;