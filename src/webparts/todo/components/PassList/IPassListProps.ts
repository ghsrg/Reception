import IPassItem from '../../models/IPassItem';
import PassOperationCallback from '../../models/PassOperationCallback'; 
import IVisitsTypesItem from '../../models/IVisitsTypesItem';


interface IPassListProps {
  items: IPassItem[];
  //onCompleteTodoItem: ItemOperationCallback;
  //onDeleteTodoItem: ItemOperationCallback;
  selectPassCb:PassOperationCallback;
  layout:string;
  VisitsTypesItem: IVisitsTypesItem;
}

export default IPassListProps;