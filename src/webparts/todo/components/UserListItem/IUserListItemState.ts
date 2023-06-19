import IUserItem from '../../models/IUserItem';

import IEmpUserItem from '../../models/IEmpUserItem';

interface IUserListItemState {
  item: IUserItem&IEmpUserItem;
  }
  
  export default IUserListItemState;