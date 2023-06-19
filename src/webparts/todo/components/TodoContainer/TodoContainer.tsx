import * as React from 'react';
import { DisplayMode } from '@microsoft/sp-core-library';
import { Fabric, Checkbox } from 'office-ui-fabric-react';
import TodoForm from '../TodoForm/TodoForm';
import ITodoItem from '../../models/ITodoItem';
import IUserItem from '../../models/IUserItem';
import IVisitsTypesItem from '../../models/IVisitsTypesItem';
import ConfigurationView from '../ConfigurationView/ConfigurationView';
import PivotContent from '../PivotContent/PivotContent';
import ITodoContainerProps from './ITodoContainerProps';
import ITodoContainerState from './ITodoContainerState';

var update = require('react-addons-update');

import { Label } from 'office-ui-fabric-react/lib/Label';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { PivotItem, IPivotItemProps, Pivot } from 'office-ui-fabric-react';


export default class Todo extends React.Component<ITodoContainerProps, ITodoContainerState> {
  private _showPlaceHolder: boolean = false;

  constructor(props: ITodoContainerProps) {
    super(props);
this.props.dataProvider.selectedList={Id:'qwert',Title:'asdf'};////////////////// заглушка для отключения настроек во время тестирования
    if (this.props.dataProvider.selectedList) {
      if (this.props.dataProvider.selectedList.Id !== '0') {
        this._showPlaceHolder = false;
      }
      else if (this.props.dataProvider.selectedList.Id === '0') {
        this._showPlaceHolder = true;
      }
    } else {
      this._showPlaceHolder = true;
    }
  
    this.state = {
      todoItems: [],
      VisitsTypesItems:[],
      todoCount: "0"
    };

    this._configureWebPart = this._configureWebPart.bind(this);
    this._createTodoItem = this._createTodoItem.bind(this);
    this._completeTodoItem = this._completeTodoItem.bind(this);
    this._deleteTodoItem = this._deleteTodoItem.bind(this);
    this._filterTodoItem = this._filterTodoItem.bind(this);
    this._filterUserItem = this._filterUserItem.bind(this);
  }

  public componentWillReceiveProps(props: ITodoContainerProps) {

    if (this.props.dataProvider.selectedList) {
      if (this.props.dataProvider.selectedList.Id !== '0') {
        this._showPlaceHolder = false;
          this.props.dataProvider.getVisitsTypes("").then(
            (items: IVisitsTypesItem[]) => {
              this.setState({ VisitsTypesItems: items });
          });
      }
      else if (this.props.dataProvider.selectedList.Id === '0') {
    //    this._showPlaceHolder = true;
      }
    } else {
  //    this._showPlaceHolder = true;
    }
  }

  public render(): JSX.Element {
    //console.log('-TC5 render-TodoContainer');     
    var VisitsTypesItems=[];
   if ( this.state.VisitsTypesItems.length>0){ 
     VisitsTypesItems= this.state.VisitsTypesItems.sort(function(a, b) {
          return a.Seq - b.Seq;
      });  
    }
    return (
    
      <Fabric className="ms-fadeIn400" style= {{ "height":"500px;"}}>
    
         
         { this._showPlaceHolder && this.props.webPartDisplayMode === DisplayMode.Edit &&
            <ConfigurationView
              icon={ 'ms-Icon--People' }
              iconText='Kyivstar Reception'
              description='Конфигурация системы Ресепшин.'
              buttonLabel='Настроить'
              onConfigure={ this._configureWebPart }  />
          }
          { this._showPlaceHolder && this.props.webPartDisplayMode === DisplayMode.Read &&
            <ConfigurationView
              icon={ 'ms-Icon--People' }
              iconText='Kyivstar Reception'
              description='Необходимо перейти в режим настройки, что бы выбрать список конфигурации.' />
          }
          { !this._showPlaceHolder &&
        
              <Pivot
             //  onLinkClick={this._handleLinkClick}
                selectedKey={"Contracts"}
      
              >
              
      
               { 
                
                VisitsTypesItems.length ? VisitsTypesItems.map((record,i)=>{
                  console.log();
                  return(
                              
                  
                    <PivotItem 
                          linkText={record.VisitsTypeNameUa} 
                          itemIcon={record.ItemIcon}
                          itemKey={record.ItemKey}
                         
                    >
      
                      <PivotContent 
                          VisitsTypesItem={record} 
                          dataProvider={this.props.dataProvider}
                          currentUser={this.props.currentUser}
                          
                          />
                  </PivotItem>
                  
                  );
                }): null
              }

                
                { /*    <PivotItem linkText="Tasks" itemCount={parseInt(this.state.todoCount)} itemIcon="TaskManager">
                
                    <TodoForm onAddTodoItem={ this._createTodoItem} onFilterItem={ this._filterTodoItem}/>
                    <TodoList items={this.state.todoItems}
                        onCompleteTodoItem={this._completeTodoItem}
                        onDeleteTodoItem={this._deleteTodoItem} />
                
                </PivotItem>*/}

              </Pivot>
            
          }

      </Fabric>
  
    );
  }

 // private _customRenderer1() {
 //   this.props.dataProvider.getItemCount(inputValue).then(
 //     (items: ITodoCount[]) => {
//        this.setState({ todoItems: items });
//      });
//  }
private _handleLinkClick = (item: PivotItem): void =>  {
  this.props.dataProvider.getUsers("").then(
    (items: IUserItem[]) => {
      const newItems = update(this.state.userItems, { $set: items });
      this.setState({ userItems: newItems ,todoItems:this.state.todoItems });
    });
}

  private _configureWebPart(): void {
    this.props.configureStartCallback();
  }

  private _createTodoItem(inputValue: string): Promise<any> {
    return this.props.dataProvider.createItem(inputValue).then(
      (items: ITodoItem[]) => {
        const newItems = update(this.state.todoItems, { $set: items });
        this.setState({ todoItems: newItems });
        this.props.dataProvider.getItemCount().then(
          (value: string) => {
            this.setState({ todoCount: value });
        });
      });
  }

  private _filterTodoItem(inputValue: string) {
    if (!this._showPlaceHolder) {
     // console.log("_filterTodoItem:" + inputValue );
      this.props.dataProvider.getItems(inputValue).then(
        (items: ITodoItem[]) => {
          this.setState({ todoItems: items });
        });
    }
  }
  private _filterUserItem(inputValue: string) {
    if (!this._showPlaceHolder) {
     // console.log("_filterTodoItem:" + inputValue );
      this.props.dataProvider.getUsers(inputValue).then(
        (usr: IUserItem[]) => {
          this.setState({ userItems: usr });
        });
    }
  }

  private _completeTodoItem(todoItem: ITodoItem): Promise<any> {
    return this.props.dataProvider.updateItem(todoItem).then(
      (items: ITodoItem[]) => {
        const newItems = update(this.state.todoItems, { $set: items });
        this.setState({ todoItems: newItems });
      });
  }

  private _deleteTodoItem(todoItem: ITodoItem): Promise<any> {
    return this.props.dataProvider.deleteItem(todoItem).then(
      (items: ITodoItem[]) => {
        const newItems = update(this.state.todoItems, { $set: items });
        this.setState({ todoItems: newItems });
      });
  }

}
