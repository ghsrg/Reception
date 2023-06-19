import IUserItem from '../../models/IUserItem';

import IEmpUserItem from '../../models/IEmpUserItem';

interface IUserListState {
  items: IUserItem[]&IEmpUserItem[];
  }
  
  export default IUserListState;