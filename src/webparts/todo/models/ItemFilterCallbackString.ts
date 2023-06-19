import IVisitsItem from "./IVisitsItem";

type ItemFilterCallbackString = (inputValue: any,a?:any, b?:any) => Promise<string>;


export default ItemFilterCallbackString;