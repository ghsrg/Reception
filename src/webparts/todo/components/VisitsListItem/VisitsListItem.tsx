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
import styles from './VisitsListItem.module.scss';
//import IVisitsItem from '../../models/IVisitsItem';
import IVisitsListItemProps from './IVisitsListItemProps';
//import * as update from 'immutability-helper';
var update = require('react-addons-update');

const examplePersona = {
  secondaryText: 'Designer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm'
};


export default class UserListItem extends React.Component<IVisitsListItemProps,{}> {

  constructor(props: IVisitsListItemProps) {
    super(props);

  //  this._handleToggleChanged = this._handleToggleChanged.bind(this);
 //   this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  // public shouldComponentUpdate(newProps: IVisitsListItemProps): boolean {
  //   return (
  //     this.props.item !== newProps.item 
  //     //||      this.props.isChecked !== newProps.isChecked
  //   );
  // }

  public render(): JSX.Element {
    console.log('--------------------------------------------------------render VisitsListITEM');
    const classTodoItem: string = css(
      styles.visitsListItem,
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
          <div className={"ms-Grid-row"}>
            <div className={ css(styles.visitsRowBack, 'ms-Grid-row') }>
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <Persona
                      imageUrl= {typeof this.props.item.EmployeeID=='object'?this.props.item.EmployeeID.PictureURL?this.props.item.EmployeeID.PictureURL:'http://intranet.kyivstar.ua/cd/User%20Photos/Profile%20Pictures/kyivstar_ua_'+this.props.item.EmployeeID.AccountName.replace(/KYIVSTAR.UA\\(\w+).(\w*)/, "$1_$2")+'_LThumb.jpg':''} 
                     // imageInitials= {typeof this.props.item.EmployeeID=='object'? this.props.item.EmployeeID.EMAIL.replace(/(\w{1}).*\s*(\w{1}).*/, "$1$2"):this.props.item.EmployeeID.EMAIL}
                      primaryText= {typeof this.props.item.EmployeeID=='object'?this.props.item.EmployeeID.FAMILYNAME+' '+this.props.item.EmployeeID.FS:''}
                      secondaryText= {typeof this.props.item.EmployeeID=='object'?' '+this.props.item.EmployeeID.POSITION:''}
                     // tertiaryText= {this.props.item.DEPARTMENT}
                      optionalText= {'Available at 4:00pm'}
                      onRenderSecondaryText={ this._onRenderSecondaryText }
                      
                     size={ PersonaSize.size28 }
                    //  presence={ PersonaPresence.away }
                      hidePersonaDetails={false}
                  />
                </div>
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
                  <Label>{this.props.item.Visitor}</Label>
                </div>
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                  <Label>{this.props.item.Organization}</Label>
                </div>
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
                  <Label>{typeof this.props.item.PassID=='object'?this.props.item.PassID.NumberText+' '+this.props.item.PassID.CityID.CityNameUa:''}</Label>
                </div>
               <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                  <Label>{this.props.item.Comments}</Label>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
                  <Label>{this.props.item.IsPassReturned=='1'?'Да':''}</Label>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
                  <Label>  {this.props.item.Created}  </Label>
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
 /* private _handleToggleChanged(ev: React.FormEvent<HTMLInputElement>, checked: boolean): void {
    const newItem: IUserItem = update(this.props.item, {
      PercentComplete: { $set: this.props.item.PercentComplete >= 1 ? 0 : 1 }
    });

    this.props.onCompleteListItem(newItem);
  }*/

 /* private _handleDeleteClick(event: React.MouseEvent<HTMLButtonElement>) {
      this.props.onDeleteListItem(this.props.item);
  }*/
}