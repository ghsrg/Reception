import IPassItem from "./IPassItem";


type PassOperationCallback = (id: string,text:string,passRow:IPassItem) => void;

export default PassOperationCallback;