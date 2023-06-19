import IUserItem from '../../models/IUserItem';
import UserOperationCallback from '../../models/UserOperationCallback'; 
import IEmpUserItem from '../../models/IEmpUserItem';

interface IUserListItemProps {
  item?: IUserItem&IEmpUserItem;
  selectUserCb?:UserOperationCallback;
}

export default IUserListItemProps;