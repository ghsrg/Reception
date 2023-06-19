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
import styles from './TodoListItem.module.scss';
import ITodoItem from '../../models/ITodoItem';
import ITodoListItemProps from './ITodoListItemProps';
//import * as update from 'immutability-helper';
var update = require('react-addons-update');

const examplePersona = {
  secondaryText: 'Designer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm'
};


export default class TodoListItem extends React.Component<ITodoListItemProps,{}> {

  constructor(props: ITodoListItemProps) {
    super(props);

    this._handleToggleChanged = this._handleToggleChanged.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  public shouldComponentUpdate(newProps: ITodoListItemProps): boolean {
    return (
      this.props.item !== newProps.item ||
      this.props.isChecked !== newProps.isChecked
    );
  }

  public render(): JSX.Element {
    const classTodoItem: string = css(
      styles.todoListItem,
      'ms-Grid',
      'ms-u-slideDownIn20'
    );
 
    return (
      <div
        role='row'
        className={ classTodoItem }
        data-is-focusable={ true }
        >
        <FocusZone direction={ FocusZoneDirection.horizontal }>
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className={ css(styles.itemTaskRow, 'ms-Grid-row') }>
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                <Checkbox
                  className={ css(styles.checkbox, 'ms-Grid-col', 'ms-u-sm11') }
                  label={this.props.item.Title}
                  onChange={ this._handleToggleChanged }
                  checked={ this.props.isChecked }
                  />
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                  <Label>{this.props.item.PercentComplete*100+'%'}</Label>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6">
                  <Persona
                     // imageUrl= {}
                      imageInitials= {this.props.item.Author.Title.replace(/(\w{1}).*\s(\w{1}).*/, "$1$2")}
                      primaryText= {this.props.item.Author.Title}
                      secondaryText= {'Software Engineer'}
                      tertiaryText= {'In a meeting'}
                      optionalText= {'Available at 4:00pm'}
                      onRenderSecondaryText={ this._onRenderSecondaryText }
                    // size={ PersonaSize.size40 }
                    //  presence={ PersonaPresence.away }
                      hidePersonaDetails={false }
                  />
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
                  <Button
                    //className={ css(styles.deleteButton, 'ms-Grid-col', 'ms-u-sm1') }
                    buttonType={ ButtonType.icon }
                    icon='Cancel'
                    onClick={this._handleDeleteClick}
                    />
                </div>
              </div>
            </div>
          </div>
        </FocusZone>
      </div>
    );
  }

  private _onRenderSecondaryText = (props: IPersonaProps): JSX.Element => {
    return (
      <div>
        <Icon iconName={ 'Suitcase' } className={ 'ms-JobIconExample' } />
        { props.secondaryText }
      </div>
    );
  }
  private _handleToggleChanged(ev: React.FormEvent<HTMLInputElement>, checked: boolean): void {
    const newItem: ITodoItem = update(this.props.item, {
      PercentComplete: { $set: this.props.item.PercentComplete >= 1 ? 0 : 1 }
    });

    this.props.onCompleteListItem(newItem);
  }

  private _handleDeleteClick(event: React.MouseEvent<HTMLButtonElement>) {
      this.props.onDeleteListItem(this.props.item);
  }
}