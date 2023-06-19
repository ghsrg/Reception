import IVisitsItem from "./IVisitsItem";
import IPassItem from "./IPassItem";

type ItemCreationCallback = (inputValue: IVisitsItem,PersonalPass:IPassItem,filter:IVisitsItem) => void;

export default ItemCreationCallback;