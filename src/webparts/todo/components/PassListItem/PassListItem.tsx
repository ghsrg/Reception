import * as React from 'react';
import {
  Checkbox,
  Button,
  ButtonType,
  FocusZone,
  FocusZoneDirection,
  Persona,
  Label ,
  PersonaSize,
  IPersonaProps,
  PersonaPresence,
  Icon,
  css
} from 'office-ui-fabric-react';
import styles from './PassListItem.module.scss';
import IPassItem from '../../models/IPassItem';
import IPassListItemProps from './IPassListItemProps';
import IPassListItemState from './IPassListItemState';
//import * as update from 'immutability-helper';
var update = require('react-addons-update');




export default class PassListItem extends React.Component<IPassListItemProps,IPassListItemState> {

  constructor(props: IPassListItemProps) {
    super(props);
    this.state={
      item:this.props.item
    }
  //  console.log('-----------------------------------constructor PassListItem');
  //  this._handleToggleChanged = this._handleToggleChanged.bind(this);
 //   this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._onDoubleClick = this._onDoubleClick.bind(this);
    this._keyPress2 = this._keyPress2.bind(this);
  }
/*
  public shouldComponentUpdate(newProps: IPassListItemProps): boolean {
    console.log(newProps,this.props.item !== newProps.item );
    return (
      this.props.item !== newProps.item 
    );
  }*/

public componentWillReceiveProps(nextProps: IPassListItemProps) {
  //const item:IPassItem = nextProps;
  this.setState({item:nextProps.item});
  //console.log(nextProps.item);
}

  public render(): JSX.Element {
  //  console.log('-----------render PassListItem');
    const classTodoItem: string = css(
      styles.passListItem,
      'ms-Grid',
      'ms-u-slideDownIn20',
      styles.over
    ); 
    const item=this.state.item;
    //console.log(item.VisitsID,item.VisitsID.Visitor);
    if (!item.VisitsID){
      item.VisitsID={};
    }
    if (!item.VisitsID.ID){
      if(!item.VisitsID.EmployeeID){
          item.VisitsID={EmployeeID:{FAMILYNAME:'',FS:''},Visitor:item.VisitsID.Visitor};
      }
    }
       
      let itemD=item.Modified;
      let  Modifiedformat='';
      if (itemD){ // Заглушка под формат /Date()/
        let itemDF = itemD.replace('/Date(','').replace(')/','')
        let d = new Date(parseFloat(itemDF));
      // let d=dt.toISOString();
        Modifiedformat = [d.getFullYear(), ("00" + (d.getMonth() + 1)).slice(-2),("00" + d.getDate()).slice(-2)].join('-');
        //+' '+[("00" + d.getHours()).slice(-2),("00" + d.getMinutes()).slice(-2), ("00" + d.getSeconds()).slice(-2)].join(':');
        //return <span >{item.Created.replace(/[a-zA-Z]/g,' ')}</span>;
      } 
  
    return (
      
      <div
        role='row'
        className={ classTodoItem }
        data-is-focusable={ true }
        onKeyDown={(e) => this._keyPress2(e,this)}
        >
   { /*    <FocusZone 
          direction={ FocusZoneDirection.horizontal }
          onKeyDown={(value)=>{this._keyPress2(value,this);}}
   >*/}
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className={ css(styles.itemTaskRow, 'ms-Grid-row')}
                 
                  onDoubleClick={(event) => this._onDoubleClick(this.state.item.Id?this.state.item.Id:this.state.item.ID,this.state.item.NumberText,event)}
            >
    {this.props.layout=='New'&&
           <div>
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
              <Label>{item.NumberText}</Label>
             </div>
             <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                  <Label>{item.CityID?this.state.item.CityID.CityNameUa:''}</Label>
             </div>
             <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                <Label>{item.PassTypeId?this.state.item.PassTypeId.TypeName:''}</Label>
             </div>
             <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6">
                <Label>{item.Descr}</Label>
             </div>
             <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
                <Label>{item.RemoveDate}</Label>
             </div>
          </div>
          }  



     {this.props.layout=='Busy'&&
            <div>
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
              <Label>{item.NumberText  }</Label>
             </div>
             <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                  <Label>{item.CityID?this.state.item.CityID.CityNameUa:''}</Label>
             </div>
             <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                <Label>{item.PassTypeId?this.state.item.PassTypeId.TypeName:''}</Label>
             </div>
             {this.props.VisitsTypesItem.ID!='8'&&   // FIX ME
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
                  <Label>{/*item.StatusID?item.StatusID.StatusName:''*/}
                  {item.VisitsID.Visitor}
                  </Label>
                </div>
             }
             <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
               {typeof item.VisitsID.EmployeeID == 'object'&&
               <Label>{item.VisitsID.EmployeeID.FAMILYNAME+' '+item.VisitsID.EmployeeID.FS}</Label>
              }
              {typeof item.VisitsID.EmpowermentUsersID == 'object'&&
               <Label>{"__"+item.VisitsID.EmpowermentUsersID.FIO}</Label>
              }
             </div>
             <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
              <Label>{Modifiedformat}</Label>
             </div>
            </div>
          }  

              </div>
            </div>
          </div>
    {/*    </FocusZone>*/}
      </div>
    );
  }

  private _keyPress2 (e,a){
   // console.log('_keyPress3',e,a);
    if(e.keyCode == 13){
      this._onDoubleClick(this.state.item.Id?this.state.item.Id:this.state.item.ID,this.state.item.NumberText,event)
     // this.props.selectPassCb();
      //console.log('enter', console.log(e.target));
    }}

  // private _onRenderSecondaryText = (props: IPersonaProps): JSX.Element => {
  //   return (
  //     <div>
  //       <Icon iconName={ 'Suitcase' } className={ 'ms-JobIconExample' } />
  //       { props.secondaryText }
  //     </div>
  //   );
  // }

  private _onDoubleClick(id,text,event){
    //console.log(hrid,id,event);
      //this.props.selectPassCb(id+";#"+hrid,fio);
      this.props.selectPassCb(id,text,this.props.item);
    
  }

 /* private _handleToggleChanged(ev: React.FormEvent<HTMLInputElement>, checked: boolean): void {
    const newItem: IPassItem = update(this.state.item, {
      PercentComplete: { $set: this.state.item.PercentComplete >= 1 ? 0 : 1 }
    });

    this.props.onCompleteListItem(newItem);
  }*/

 /* private _handleDeleteClick(event: React.MouseEvent<HTMLButtonElement>) {
      this.props.onDeleteListItem(this.state.item);
  }*/
}