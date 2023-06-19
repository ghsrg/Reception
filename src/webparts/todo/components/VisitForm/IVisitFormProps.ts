import ItemCreationCallback from '../../models/ItemCreationCallback';
import ItemFilterCallback from '../../models/ItemFilterCallback';
import ItemFormCallback from '../../models/ItemFormCallback';
import IVisitsTypesItem from '../../models/IVisitsTypesItem';
import ITodoDataProvider from '../../dataProviders/ITodoDataProvider';
import ISPUser from '../../SPUser/ISPUser';
import IVisitsItem from '../../models/IVisitsItem';

interface IVisitFormProps {
  onSwichForm: ItemFormCallback;
  onFilterItem: ItemFilterCallback;
  exportDate: ItemFilterCallback;
  VisitsTypesItem: IVisitsTypesItem;
  showForm: string;
  dataProvider: ITodoDataProvider;
  currentUser: ISPUser;
  onCreateVisitItem:ItemCreationCallback;
  onUpdateVisitItem:ItemCreationCallback;
  itemForEdit?:IVisitsItem;
}



export default IVisitFormProps;