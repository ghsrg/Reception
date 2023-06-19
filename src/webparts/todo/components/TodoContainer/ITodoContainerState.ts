import ITodoItem from '../../models/ITodoItem';
import IUserItem from '../../models/IUserItem';
import IVisitsTypesItem from '../../models/IVisitsTypesItem';

interface ITodoContainerState {
  todoItems?: ITodoItem[];
  todoCount?: string;
  userItems?: IUserItem[];
  VisitsTypesItems?: IVisitsTypesItem[];
}

export default ITodoContainerState;