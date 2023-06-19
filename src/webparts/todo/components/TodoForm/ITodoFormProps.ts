import ItemCreationCallback from '../../models/ItemCreationCallback';
import ItemFilterCallback from '../../models/ItemFilterCallback';

interface ITodoFormProps {
  onAddTodoItem: ItemCreationCallback;
  onFilterItem: ItemFilterCallback;
}



export default ITodoFormProps;