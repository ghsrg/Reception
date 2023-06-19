interface INotify {
  Id?: string;
  Title?: string;
  TypeNotify?: string;
  VisitsTypeId?:string;
  To?:string;
  ToCC?:string;
  Subject?:string;
  Body?:string;
  RemoveDate?:string;
}

export default INotify;