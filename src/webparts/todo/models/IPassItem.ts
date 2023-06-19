import IVisitsItem from "./IVisitsItem";

interface IPassItem {
    CityID?:{
        CityNameUa?:string;
        Id?:string
    };
    Created?:string;
    Modified?:string;
    CityIDId?:string;
    ID?:string;
    Id?:string;
    IDPrev?:string;
    Ідентифікатор?:string;
    NumberText?:string;
    Descr?:string;
    PassTypeId?:{
        TypeName:string;
        Id?:string
    };
    PassTypeIdId?:string;
    VisitsTypeIDId?:string;
    StatusID?:{
      StatusName?:string;
      Id?:string
    };
    StatusIDId?:string;
    VisitsID?:IVisitsItem;
    // VisitsID?:{
    //     ID?:string
    // };
    VisitsIDId?:string;
    RemoveDate?:string;

}
  
  export default IPassItem;
  
 
  
  
  
  
  
  
  