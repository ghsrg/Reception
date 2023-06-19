import IUserItem from './IUserItem';

//type UserOperationCallback = (hrid:string,id: string,text:string) => void;
type UserOperationCallback = (user:IUserItem) => void;

export default UserOperationCallback;