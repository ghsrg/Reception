import IPassItem from '../../models/IPassItem';
import PassOperationCallback from '../../models/PassOperationCallback'; 
import IVisitsTypesItem from '../../models/IVisitsTypesItem';


interface IPassListItemProps {
  item: IPassItem;
  selectPassCb:PassOperationCallback;
  layout:string;
  VisitsTypesItem: IVisitsTypesItem;
}

export default IPassListItemProps;