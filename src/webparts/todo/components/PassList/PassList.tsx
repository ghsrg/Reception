import * as React from 'react';
import { List, FocusZone, FocusZoneDirection, getRTLSafeKeyCode, KeyCodes } from 'office-ui-fabric-react';
import IPassListProps from './IPassListProps';
import IPassListState from './IPassListState';
//import PassListItem from '../PassListItem/PassListItem';
import PassListItem from '../PassListItem/PassListItem';
import IPassItem from '../../models/IPassItem';
import styles from './PassList.module.scss';

export default class PassList extends React.Component<IPassListProps, IPassListState> {
  constructor(props: IPassListProps) {
  //  console.log('-----------------------------------constructor PassList');
    super(props);
    
    this.state = {
      items:[...this.props.items]
    };
    this._onRenderCell = this._onRenderCell.bind(this);
    this.focusZone = this.focusZone.bind(this);
   // this._keyPress = this._keyPress.bind(this);
  //  this._keyPress2 = this._keyPress2.bind(this);
  }

  private ref2FZ : any;

  public componentWillReceiveProps(nextProps: IPassListProps) {
    this.setState({
      items:[...nextProps.items]
    });
    //console.log('pass List-nextProps',this.state.items);
  }

  public componentDidUpdate(prevProps, prevState) {
    //console.log('prev',prevProps, prevState);
    //console.log('ref2FZ',this.ref2FZ);
   
    //console.log('ref2list',this.ref2list);
    //console.log('ref2listCell',this.ref2listCell);
   // this.ref2FZ.focus();
  }

public focusZone(){
  this.ref2FZ.focus();
}
 
  public render(): JSX.Element {
   // console.log('-----------------------------------render PassList');
    return (
      <FocusZone 
        direction={ FocusZoneDirection.vertical }
      //  isInnerZoneKeystroke={ (ev: React.KeyboardEvent<HTMLElement>) => { return true }}
       // onKeyDown={this._keyPress}
        ref={ref => (this.ref2FZ  = ref)}
      //  defaultActiveElement={'1'}
    
        
        >
        <List 
          className={ styles.passList }
          items={ this.state.items }
          onRenderCell={ this._onRenderCell }
          //onKeyDown={this._keyPress2}
        //  onKeyDown={(value)=>{this._keyPress2(value,this);}}
         // ref={ref => (this.ref2list  = ref)}
          />
      </FocusZone>
    );
  }
  /*
  private _keyPress (e){
   // console.log(e);
    if(e.keyCode == 13){
     // this.props.selectPassCb();
     // console.log('enter', console.log(e.target));
    }}

    private _keyPress2 (e,a){
      console.log('_keyPress2',e,a);
      if(e.keyCode == 13){
       // this.props.selectPassCb();
        //console.log('enter', console.log(e.target));
      }}*/

  private _onRenderCell(item: IPassItem, index: number) {
    //console.log(this.ref2UserList);
   // console.log(this.ref2UserList.context());
    
    return (
     
      <PassListItem item= { this.state.items[index] } VisitsTypesItem = {this.props.VisitsTypesItem}    layout={this.props.layout}  selectPassCb={this.props.selectPassCb}    />
    
    );
  }
}