declare interface ITodoStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  ConfigListName: string;
}

declare module 'todoStrings' {
  const strings: ITodoStrings;
  export = strings;
}
