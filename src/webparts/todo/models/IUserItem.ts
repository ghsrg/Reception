interface IUserItem {
    UserProfile_GUID?: string; // sharepoint profile ID"4de7fef5-e744-4e97-9e5e-18a9b6738746"
    AccountName?:  string; // AD KYIVSTAR.UA\\Sergey.Korotenko
    LastName?: string; // AD Last Name 
    UserName?:  string; //AD User Name "Sergey.Korotenko"
    Manager?: string; //AD  "KYIVSTAR.UA\\Pavel.Rakulenko"
    PictureURL?: string;
   
    Title?: string; // Ulcimus ID 2819fc8b-4247-4221-b626-810dc0385cd3
    FAMILYNAME?:  string; // Ulcimus LastName 
    FS?: string; // Ulcimus FirstName + Middle name
    EMAIL?:string; // Ulcimus E-mail
    PHONE?:string; //Ulcimus phone
    DEPARTMENT?: string; //Ulcimus DEPARTMENT
    POSITION?:  string; //Ulcimus Position
    BOSSID?:  string; // Ulcimus BOSS ID
    STATUS?:  string;  // Ulcimus User status /Отпуск/Командировка...
    LOCATION?:  string; // City location
    HRID?:string;
    ID?:string;
    Id?:string;
    Ідентифікатор?:string;
    Assistant?:IUserItem;
    AssistantIDId?:string;
    boss?:IUserItem;
    FAMILYNAMEOLD?:string;
    COMPANY?:string;
  }
  
  export default IUserItem;
  
 
  
  
  
  
  
  
  