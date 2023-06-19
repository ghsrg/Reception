import * as React from 'react';
//import { utf8ToAnsi } from 'utf8-to-ansi'
import { List, FocusZone, FocusZoneDirection, getRTLSafeKeyCode, KeyCodes, css,PrimaryButton,ButtonType } from 'office-ui-fabric-react';
import { DetailsList,DetailsRow, DetailsListLayoutMode, Selection, SelectionMode, IColumn, IDetailsRowProps } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import IVisitsListProps from './IVisitsListProps';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
// import VisitsListItem from '../UserListItem/UserListItem';
//  import IVisitsItem from '../../models/IUserItem';
//import VisitsListItem from '../VisitsListItem/VisitsListItem';
import IVisitsItem from '../../models/IVisitsItem';
  

import styles from './VisitsList.module.scss';
import { DeveloperToolsConsoleStore } from '../../../../../node_modules-2019-07-05-problem/@microsoft/sp-loader/lib/DeveloperTools/Stores/DeveloperToolsConsoleStore';
//let _items: IDocument[] = [];

export interface IDetailsListDocumentsExampleState {
  columns?: IColumn[];
  items?: IVisitsItem[];
  selectionDetails?: string;
  isModalSelection?: boolean;
  isCompactMode?: boolean;
  isTeachingBubbleVisible?: boolean;
  teachingBubbleText?:string;
  teachingtargetElement?:any;
}
// export interface IDocument { // move to models
//   [key: string]: any;
//   name: string;
//   value: string;
//   iconName: string;
//   modifiedBy: string;
//   dateModified: string;
//   dateModifiedValue: number;
//   fileSize: string;
//   fileSizeRaw: number;
// }

export default class VisitsList extends React.Component<IVisitsListProps, IDetailsListDocumentsExampleState> {
  private _selection: Selection;

  constructor(props: IVisitsListProps) {
    super(props);
 //   this._onRenderCell = this._onRenderCell.bind(this);
    this._onRenderRow = this._onRenderRow.bind(this);
   
    this._onColumnClick= this._onColumnClick.bind(this);
    this._getColumns= this._getColumns.bind(this);
    this._exportToCsv= this._exportToCsv.bind(this);
    this._genDataForExport= this._genDataForExport.bind(this);
    this.exportToExel= this.exportToExel.bind(this);
    //this._renderItemColumn= this._renderItemColumn.bind(this);
    this._onPassReturned= this._onPassReturned.bind(this);
    this._onDismiss= this._onDismiss.bind(this);
    
    
    this._keyPress = this._keyPress.bind(this);
    this._onDoubleClick = this._onDoubleClick.bind(this);
    this._onDoubleClickNo = this._onDoubleClickNo.bind(this);

    const _columns: IColumn[] = [
      {
        key: 'employee',
        name: 'Співробітник',
        fieldName: 'ui_autor',
        isMultiline:true,
       
        minWidth: 100,
        maxWidth: 260,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        onColumnClick: this._onColumnClick,
        data: 'string',
        onRender: (item: IVisitsItem) => {
          return <span>{item.ui_autor}</span>;
        },
        //isPadded: true
      },
      {
        key: 'phone',
        name: 'Телефон',
        fieldName: 'PHONE',
        isMultiline:true,
        minWidth: 90,
        maxWidth: 190,
        isResizable: true,
        onColumnClick: this._onColumnClick,
        data: 'number',
        onRender: (item: IVisitsItem) => {
          if (typeof item.EmployeeID == 'object'){
            return <span>{item.EmployeeID.PHONE}</span>;
          }else if (typeof item.EmpowermentUsersID == 'object') {
            return <span>{item.EmpowermentUsersID.Phone}</span>;
          }else{
            return <span>{'-'}</span>;
          }
        },
        //isPadded: true
      },
      {
        key: 'visitor',
        name: 'Відвідувач',
        fieldName: 'Visitor',
        isMultiline:true,
        minWidth: 100,
        maxWidth: 190,
        isResizable: true,
        onColumnClick: this._onColumnClick,
        data: 'number',
        onRender: (item: IVisitsItem) => {
          return <span>{item.Visitor}</span>;
        },
        //isPadded: true
      },
      
      {
        key: 'postnum',
        name: '№ вх. кореспонденції',
        fieldName: 'PostNum',
        isMultiline:true,
        minWidth: 100,
        maxWidth: 190,
        isResizable: true,
        onColumnClick: this._onColumnClick,
        data: 'string',
        onRender: (item: IVisitsItem) => {
          return <span>{item.PostNum}</span>;
        },
        //isPadded: true
      },
      {
        key: 'organization',
        name: 'Компанія',
        fieldName: 'Organization',
        minWidth: 100,
        maxWidth: 250,
        isResizable: true,
        isCollapsable: true,
        data: 'string',
        isMultiline:true,
        onColumnClick: this._onColumnClick,
        onRender: (item: IVisitsItem) => {
          return <span>{item.Organization}</span>;
        },
       // isPadded: true
      },
      {
        key: 'pass',
        name: 'Перепустка',
        fieldName: 'ui_pass',
        minWidth: 60,
        maxWidth: 90,
        isResizable: true,
        isCollapsable: true,
        isMultiline:true,
        data: 'number',
        onColumnClick: this._onColumnClick,
        onRender: (item: IVisitsItem) => {
          return <span>{item.ui_pass}</span>;
        }
      },{
        key: 'key',
        name: 'Ключ',
        fieldName: 'ui_pass',
        minWidth: 60,
        maxWidth: 90,
        isResizable: true,
        isCollapsable: true,
        isMultiline:true,
        data: 'number',
        onColumnClick: this._onColumnClick,
        onRender: (item: IVisitsItem) => {
          return <span>{item.ui_pass}</span>;
        }
      },{
        key: 'passreturned',
        name: 'Повернення',
        fieldName: 'ui_IsPassReturned',
        minWidth: 50,
        maxWidth: 100,
        isMultiline:true,
        isResizable: true,
        isCollapsable: true,
        data: 'string',
        onColumnClick: this._onColumnClick,
        onRender: (item: IVisitsItem) => {
        //  console.log(item);
          return <div>
                 <PrimaryButton 
                    className={item.IsPassReturned=='1'?styles.btn_y:styles.btn_n}
                    buttonType={ ButtonType.primary }
                    //ariaLabel=''
                    onClick={(e) => this._onPassReturned(e,item)}>
                      { item.IsPassReturned=='1'?'Так':''}
                  </PrimaryButton>
          </div>
          
        },
       // isPadded: true
      },{
        key: 'docstransfer',
        name: 'Передано',
        fieldName: 'ui_IsPassReturned',
        minWidth: 50,
        maxWidth: 100,
        isMultiline:true,
        isResizable: true,
        isCollapsable: true,
        data: 'string',
        onColumnClick: this._onColumnClick,
        onRender: (item: IVisitsItem) => {
        //  console.log(item);
          return <div>
                 <PrimaryButton 
                    className={item.IsPassReturned=='1'?styles.btn_y:styles.btn_n}
                    buttonType={ ButtonType.primary }
                    onClick={(e) => this._onPassReturned(e,item)}
                    onDoubleClick={this._onDoubleClickNo}
                    >

                      { item.IsPassReturned=='1'?'Так':''}
                  </PrimaryButton>  
          </div>
          
        },
       // isPadded: true
      }, {
        key: 'city',
        name: 'Місто',
        fieldName: 'City',
        minWidth: 60,
        maxWidth: 90,
        isResizable: true,
        isCollapsable: true,
        isMultiline:true,
        data: 'number',
        onColumnClick: this._onColumnClick,
        onRender: (item: IVisitsItem) => {
          return <span>{item.CityID.CityNameUa}</span>;
        }
      },{
        key: 'comments',
        name: 'Примітка',
        fieldName: 'Comments',
        minWidth: 80,
        maxWidth: 160,
        isResizable: true,
        isCollapsable: true,
        data: 'number',
        isMultiline:true,
        onColumnClick: this._onColumnClick,
        onRender: (item: IVisitsItem) => {
          return <span>{item.Comments}</span>;
        }
      },{
        key: 'created',
        name: 'Дата',
        fieldName: 'Created',
        minWidth: 100,
        maxWidth: 250,
        isResizable: true,
        isCollapsable: true,
        isMultiline:true,
        data: 'string',
        onColumnClick: this._onColumnClick,
        onRender: (item: IVisitsItem) => {
          let d = new Date(item.Created);
          let dformat = [d.getFullYear(), ("00" + (d.getMonth() + 1)).slice(-2),("00" + d.getDate()).slice(-2)].join('-')+' '+
           [("00" + d.getHours()).slice(-2),("00" + d.getMinutes()).slice(-2), ("00" + d.getSeconds()).slice(-2)].join(':');
          return <span >{dformat}</span>;
          //return <span >{item.Created.replace(/[a-zA-Z]/g,' ')}</span>;
        },
       // isPadded: true
      },{
        key: 'autor',
        name: 'Автор',
        fieldName: 'ui_employee',
        minWidth: 100,
        maxWidth: 250,
        isMultiline:true,
        isResizable: true,
        isCollapsable: true,
        data: 'string',
        onColumnClick: this._onColumnClick,
        onRender: (item: IVisitsItem) => {
          return <span>{item.ui_employee}</span>;
        }
       // isPadded: true
      }
    ];

    this._selection = new Selection({
      onSelectionChanged: () => {
        //console.log(this._getSelectionDetails());
         this.setState({
           selectionDetails: this._getSelectionDetails(),
         //  isModalSelection: this._selection.isModal()
         });
      }
    });
      
    this.state = {
      items:  this.props.items,
      columns: _columns,
      selectionDetails: this._getSelectionDetails(),
      isModalSelection: true,//this._selection.isModal(),
      isCompactMode: false,
      isTeachingBubbleVisible:false,
      teachingBubbleText:''
    };
  }

   componentWillReceiveProps(nextProps) {
   // console.log(nextProps);
    if (this.props.exportData){
     
      this.exportToExel();
    }
    const newNextProps = nextProps.items.map((item: IVisitsItem) => {
     // console.log(item);
      item.ui_autor=typeof item.EmployeeID=='object'?item.EmployeeID.FAMILYNAME+' '+item.EmployeeID.FS:typeof item.EmpowermentUsersID=='object'?'__'+item.EmpowermentUsersID.FIO:' ';
      item.ui_employee =item.Author.LastName+' '+item.Author.FirstName; 
      item.ui_pass = typeof item.PassID=='object'?typeof item.PassID.CityID=='object'?item.PassID.NumberText + ' '+item.PassID.CityID.CityNameUa:item.ui_pass:'';
      //item.ui_pass=typeof item.PassID.CityID=='object'?item.ui_pass + ' '+item.PassID.CityID.CityNameUa:item.ui_pass;
      
      //item.ui_IsPassReturned=item.IsPassReturned=='1'?'Так':'';
      return item;
    });
    
     this.setState({items:nextProps.items});


   }
   
   private ref2DetailsList : any;

  public render(): JSX.Element {
   //  console.log('-----------------------------------render VisitsList'); 
    return (
      <div>
      <FocusZone 
        direction={ FocusZoneDirection.vertical }
       // isInnerZoneKeystroke={ (ev: React.KeyboardEvent<HTMLElement>) => ev.which === getRTLSafeKeyCode(KeyCodes.right) }
        >
  { /* <PrimaryButton 
     // className={ styles.addButton }
      buttonType={ ButtonType.primary }
      ariaLabel=''
      iconProps={{ iconName: 'ExcelLogo' }}
      onClick={()=>{this.exportToExel();}}>
    
    </PrimaryButton>
  */}
         <div className={styles.layer} style={{overflow: "visible"}} onScroll={(e)=>{this.ref2DetailsList.forceUpdate();}}>

          <DetailsList data-is-scrollable="true" 
            ref = {(input)=>{this.ref2DetailsList = input }}
              items={ this.state.items}
              //compact={true}
              columns={this._getColumns(this.state.columns)}
              selectionMode={SelectionMode.none}//{this.state.isModalSelection ? SelectionMode.multiple : SelectionMode.none}
              setKey="set"
             
              layoutMode={DetailsListLayoutMode.justified}
              isHeaderVisible={true}
              selection={this._selection}
              selectionPreservedOnEmptyClick={true}
              onItemInvoked={this._onItemInvoked}
              onRenderRow={this._onRenderRow}
          
            //  onRenderItemColumn={this._renderItemColumn}
        
              
            //  enterModalSelectionOnTouch={true}
          //  ariaLabelForSelectionColumn="Toggle selection"
          //    ariaLabelForSelectAllCheckbox="Toggle selection for all items"
              />
             </div>
      
       {
         // <List
        //  className={ styles.visitList }
        //  items={ this.props.items}
        //  onRenderCell={ this._onRenderCell }
        //  />
       } 
      </FocusZone>
      {this.state.isTeachingBubbleVisible ? (
        <div>
          <TeachingBubble
            targetElement={this.state.teachingtargetElement}
            hasCondensedHeadline={true}
            onDismiss={this._onDismiss}
            hasCloseIcon={true}
            headline="Невозможно изменить статус"
          >
          {this.state.teachingBubbleText}
          </TeachingBubble>
        </div>
      ) : null}
      </div>
    );
  }
  private _onDismiss(){
    this.setState({isTeachingBubbleVisible: false});
  }



  private _getColumns(items: IColumn[]): IColumn[]{
    const keyArr = this.props.VisitsTypesItem.ColumnsKeys.split(';');
  /*  keyArr.map((row)=>{  //FIX ME Сделать сортировку по пордяку, указанному в таблице
      return items.
    })*/
    return items.filter((row:IColumn)=>{
      return keyArr.some(key=>key==row.key);
    });   

  }


  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this._selection.getSelection()[0] as any).name;
      default:
        return `${selectionCount} items selected`;
    }
  }

  private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    //const { columns, items } = this.state;
    const  columns = this.state.columns;
    const items  = this.state.items;
   // console.log('items:',items);
    let newItems: IVisitsItem[] = items.slice();

    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter((currCol: IColumn, idx: number) => {
      return column.key === currCol.key;
    })[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
   
    newItems = this._sortItems(newItems, currColumn.fieldName || '', currColumn.isSortedDescending);
    //console.log('newItems:',newItems);
    //console.log('old.state',this.state.items);
    this.setState({
       columns: newColumns,
       items: newItems
     });
    // console.log('new.state',this.state.items);
  }

  private _sortItems = (items: IVisitsItem[], sortBy: string, descending = false): IVisitsItem[] => {
    if (descending) {
      return items.sort((a: IVisitsItem, b: IVisitsItem) => {
             const sortBy_func=new Function ("param", "return typeof param."+sortBy.split(".", 3)[0]+"=='object'?param."+sortBy+":param."+sortBy.split(".", 3)[0]+";");
            // const sortBy_func=new Function ("param", "return param."+sortBy);
              
             if (sortBy_func(a) < sortBy_func(b)) {
          return 1;
        }
        if (sortBy_func(a) > sortBy_func(b)) {
          return -1;
        }
        return 0;
      });
    } else {
      return items.sort((a: IVisitsItem, b: IVisitsItem) => {
        const sortBy_func=new Function ("param", "return typeof param."+sortBy.split(".", 3)[0]+"=='object'?param."+sortBy+":param."+sortBy.split(".", 3)[0]+";");
         // const sortBy_func=new Function ("param", "return param."+sortBy);

        if (sortBy_func(a) < sortBy_func(b)) {
          return -1;
        }
        if (sortBy_func(a) > sortBy_func(b)) {
          return 1;
        }
        return 0;
      });
    }
  }

  private _onPassReturned(e: any,item:any): void {
    //console.log(e,item);

    this.setState({
      teachingtargetElement:e.target
    });

    this.props.onClickClearPass(item.PassIDId,item.IsPassReturned,item.ID).then((result) => {
      //console.log('result',result);
      if (result=='0'){
        this.setState({isTeachingBubbleVisible: true,
          teachingBubbleText: item.ui_pass+' уже выдан! Вначале небходимо необходимо освободить его.'
        });
      } else{
        this.props.onRefreshVisitsItems(''); // параметр - затычка
      }
    })
   }

  private _onItemInvoked(e: any,item:any): void {
  //  alert(`Item invoked: ${item.name}`);
   // console.log(e,item);

  }



  private _onRenderRow( props:IDetailsRowProps, defaultRender ) {
    //console.log(props,defaultRender());
    const customStyles = {root:{}};
    if (props.item.IsPassReturned == "1") {
    // console.log(props,defaultRender);
      return  <div 
                className={styles.passReturned} 
                onKeyDown={(e) => this._keyPress(props,this,e)}
                onDoubleClick={(event) => this._onDoubleClick(props,this,event)}
      >                  

              {defaultRender({...props})}            
            </div>;
    }
    return <div 
           
              onKeyDown={(e) => this._keyPress(props,this,e)}
              onDoubleClick={(event) => this._onDoubleClick(props,this,event)}
              > 
               {defaultRender({...props})} 
          </div>;
   
  }
  private _onDoubleClick (props,obj,event){
    //console.log('_onDoubleClick2',event.target);
  //  console.log('_onDoubleClick2',event.target.style);
   // console.log('_onDoubleClick2',event.target.className);
    if (event.target.className.indexOf('Button')> -1){
      event.preventDefault();
      return false;
    }

    this.props.dblClick(props,obj,event);
   
     // this.props.selectPassCb();
      //console.log('enter', console.log(e.target));
    }

    private _onDoubleClickNo (e){
      //console.log('_onDoubleClickNo');
        e.preventDefault();
        return false;
      }
    

  private _keyPress (props,obj,e){
   //  console.log('_keyPress',props,obj,e);
     if(e.keyCode == 13){
    
      // this.props.selectPassCb();
       //console.log('enter', console.log(e.target));
     }}




  private _genDataForExport(): Array<Array<string>> {
    var columns = this._getColumns(this.state.columns);
    var keys:Array<string>=[];
    var titles:Array<string>=[];
    var dataArray: Array<Array<string>>=[];
    var rowNum=0;
    //console.log(columns);
    //console.log(this.state.items);
   // console.log(columns);
    for (var el of columns) {
      keys.push(el.fieldName);
      titles.push(el.name);
    }
    dataArray[0]=titles;
    
    for (var row of this.state.items) {

      rowNum++;
      dataArray[rowNum]=[];
        for (var key of keys) {
          if (key=='ui_IsPassReturned'){
            key='IsPassReturned';
          }

          dataArray[rowNum].push(row[key]?row[key]:'')
        }
    }
    //console.log(dataArray);
  return dataArray;
  };/*
  private _exportToCsv(xlsArray:Array<any> ,fileName:string) { // FIX ME вынести отдельно в утилиты
   // console.log(xlsArray,fileName);
    var CsvString = "";
    xlsArray.forEach(function(RowItem, RowIndex) {
      RowItem.forEach(function(ColItem, ColIndex) {
        CsvString += ColItem + ';';
      });
      CsvString += "\r\n";
    });
    //console.log(CsvString);
    //CsvString=utf8ToAnsi(CsvString);
    //console.log(CsvString);
    CsvString = "data:text/csv;charset=utf-8," + (CsvString);
    //CsvString = "data:application/csv," + (CsvString);
    //CsvString = "data:application/csv," + encodeURIComponent(CsvString);
    var x = document.createElement("A");
    x.setAttribute("href", CsvString );
    fileName = fileName.length>0?fileName:"somedata";
    x.setAttribute("download",fileName+".csv");
    document.body.appendChild(x);
    x.click();
  }*/


  private _exportToCsv(rows:Array<any> ,filename:string) { // FIX ME вынести отдельно в утилиты
    //console.log(rows,filename);
    {
      var processRow = function (row) {
       
          var finalVal = '';
          for (var j = 0; j < row.length; j++) {
     
              var innerValue = row[j] === null ? '' : row[j].toString();
              if (row[j] instanceof Date) {
                  innerValue = row[j].toLocaleString();
              };
              var result = innerValue.replace(/"/g, '""');
              if (result.search(/("|,|\n)/g) >= 0)
                  result = '"' + result + '"';
              if (j > 0)
                  finalVal += ';';
              finalVal += result;
          }
        //  finalVal=finalVal.split('').map((a)=> { return a.charCodeAt(0); }).join();
          return finalVal + '\n';
      };
      
    
  
      var csvFile = '';
      for (var i = 0; i < rows.length; i++) {
          csvFile += processRow(rows[i]);
      }
  
      var universalBOM = "\uFEFF";
      csvFile = universalBOM+csvFile;

      var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });

      if (navigator.msSaveBlob) { // IE 10+
          navigator.msSaveBlob(blob, filename+".csv");
      } else {
          var link = document.createElement("a");
          if (link.download !== undefined) { // feature detection
              // Browsers that support HTML5 download attribute
              var url = URL.createObjectURL(blob);
              link.setAttribute("href", url);
              link.setAttribute("download", filename+".csv");
              link.style.visibility = 'hidden';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
          }
      }
  }
  }

  

  public exportToExel(){
    var DateFrom = (this.props.currentUser.SessionInfo.DateFrom.getFullYear()+ '-' + ("00" + (this.props.currentUser.SessionInfo.DateFrom.getMonth() + 1)).slice(-2) + '-' +  ("00" + this.props.currentUser.SessionInfo.DateFrom.getDate()).slice(-2) );
    var DateTo = (this.props.currentUser.SessionInfo.DateTo.getFullYear()+ '-' + ("00" + (this.props.currentUser.SessionInfo.DateTo.getMonth() + 1)).slice(-2) + '-' +  ("00" + this.props.currentUser.SessionInfo.DateTo.getDate()).slice(-2) );
    var file_name = this.props.VisitsTypesItem.VisitsTypeNameUa+'_'+DateFrom+'-'+DateTo;
    this._exportToCsv(this._genDataForExport(),file_name); 
    
  }

 
}