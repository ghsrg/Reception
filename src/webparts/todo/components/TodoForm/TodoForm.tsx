import * as React from 'react';
import {
  TextField,
  Button,
  ButtonType
} from 'office-ui-fabric-react';
import styles from './TodoForm.module.scss';
import ITodoFormState from './ITodoFormState';
import ITodoFormProps from './ITodoFormProps';

export default class TodoForm extends React.Component<ITodoFormProps, ITodoFormState>{

  private _placeHolderText: string = 'Enter your todo';
  private _placeHolderFiltereText: string = 'Filter';

  constructor(props: ITodoFormProps) {
    super(props);

    this.state = {
      inputValue: '',
      inputFilter: ''
    };
    
    
    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleInputChangefilter = this._handleInputChangefilter.bind(this);
    this._handleAddButtonClick = this._handleAddButtonClick.bind(this);
  }

  public render(): JSX.Element {
    return (
     // <div className={ styles.todoForm }>
       <div className="ms-Grid">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg10">
            <TextField
              value={ this.state.inputValue }
              placeholder={ this._placeHolderText }
              autoComplete='off'          
              onChanged={this._handleInputChange}/>
              </div>
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                <Button
                  className={ styles.addButton }
                  buttonType={ ButtonType.primary }
                  ariaLabel='Add a todo task'
                  onClick={this._handleAddButtonClick}>
                  Add
                </Button>
              
            </div>
          </div>
        <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg10">
            <TextField
              className={ styles.textField }
              value={this.state.inputFilter }
              placeholder={ this._placeHolderFiltereText }
              autoComplete='off'          
              onChanged={this._handleInputChangefilter}/>
        </div>
        
        </div>
      </div>
    );
  } 

  private _handleInputChange(newValue: string) {
    this.setState({
      inputValue: newValue
    }as ITodoFormState );
   
  }

  private _handleInputChangefilter(newValue: string) {
    this.setState({
      inputFilter: newValue//,
    }as ITodoFormState);
     if (newValue.length>1 || newValue.length==0 ){
     //this.props.onFilterItem(newValue);
    }
   
  }


  private _handleAddButtonClick(event?: React.MouseEvent<HTMLButtonElement>) {
    this.setState({
      inputValue: this._placeHolderText//,
    });
   // this.props.onAddTodoItem(this.state.inputValue);
  }
}
