interface ITodoItem {
  Id: number;
  Title: string;
  PercentComplete: number;
  Author: {
    ID: number;
    Title: string;
    FirstName: string;
    LastName: string;
    EMail: string;
  };
  
}

export default ITodoItem;
