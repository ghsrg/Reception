import * as React from 'react';
import { List, FocusZone, FocusZoneDirection, getRTLSafeKeyCode, KeyCodes } from 'office-ui-fabric-react';
import IUserListProps from './IUserListProps';
import IUserListState from './IUserListState';
import UserListItem from '../UserListItem/UserListItem';
import IUserItem from '../../models/IUserItem';
import IEmpUserItem from '../../models/IEmpUserItem';
import styles from './UserList.module.scss';

export default class UserList extends React.Component<IUserListProps,IUserListState> {
  constructor(props: IUserListProps) {
    super(props);
    //console.log('-----------------------------------constructor UserList');
    this._onRenderCell = this._onRenderCell.bind(this);
    this.focusZone = this.focusZone.bind(this);
    
    this.state = {
      items:[...this.props.items]
    };
  }

  private ref2FZ : any;
  private ref2List : any;
  
  public componentWillReceiveProps(nextProps: IUserListProps) {
    this.setState({
      items:[...nextProps.items]
    });
    //console.log('userList-nextProps',this.state.items);
  }

  public focusZone(){
    this.ref2FZ.focus();
  }

  public render(): JSX.Element {
    //console.log('-----------------------------------render UserList');
    return (
      <FocusZone
    
        direction={ FocusZoneDirection.vertical }
     //   isInnerZoneKeystroke={ (ev: React.KeyboardEvent<HTMLElement>) => ev.which === getRTLSafeKeyCode(KeyCodes.right) }
        ref={ref => (this.ref2FZ  = ref)}
        >
        <div >

        <List style={{overflow: "visible"}} onClick={(e)=>{this.ref2List.forceUpdate();}}
          ref={ref => (this.ref2List  = ref)}
          
          data-is-scrollable="true" 
          //getPageStyle={(page)=>{return page;}} //FIX ME хак для витруализации грида
          //className={ styles.userList }
          //items={ this.props.items }
          items={ this.state.items }
          onRenderCell={ this._onRenderCell }

          />
          </div>
      </FocusZone>
    );
  }



  private _onRenderCell(item: IUserItem&IEmpUserItem, index: number) {
    return (
      <UserListItem item = /*{item}*/{ this.state.items[index] } selectUserCb={this.props.selectUserCb}
      
      //  isChecked={ item.PercentComplete >= 1 ? true : false }
       // onCompleteListItem={this.props.onCompleteTodoItem}
       //onDeleteListItem={this.props.onDeleteTodoItem} 
       />
    );
  }
}