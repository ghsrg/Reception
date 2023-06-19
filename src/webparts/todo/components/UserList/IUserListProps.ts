import IUserItem from '../../models/IUserItem';
import UserOperationCallback from '../../models/UserOperationCallback'; 
import IEmpUserItem from '../../models/IEmpUserItem';

interface IUserListProps {
  items: IUserItem[]&IEmpUserItem[];
  //onCompleteTodoItem: ItemOperationCallback;
  //onDeleteTodoItem: ItemOperationCallback;
  selectUserCb:UserOperationCallback;
  
}

export default IUserListProps;