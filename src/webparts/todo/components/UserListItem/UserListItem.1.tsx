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
import styles from './UserListItem.module.scss';
import IUserItem from '../../models/IUserItem';
import IEmpUserItem from '../../models/IEmpUserItem';
import IUserListItemProps from './IUserListItemProps';
import IUserListItemState from './IUserListItemState';
//import * as update from 'immutability-helper';
var update = require('react-addons-update');

const examplePersona = {
  secondaryText: 'Designer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm'
};


export default class UserListItem extends React.Component<IUserListItemProps,IUserListItemState> {

  constructor(props: IUserListItemProps) {
    super(props);
    this.state={
      item:this.props.item
    }
  //  this._handleToggleChanged = this._handleToggleChanged.bind(this);
 //   this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._onDoubleClick = this._onDoubleClick.bind(this);
  }

  public componentWillReceiveProps(nextProps: IUserListItemProps) {
    const itm:IUserItem&IEmpUserItem = nextProps.item;
    this.setState({item:itm});
    //this.setState({item:{...nextProps.item}});
  //  console.log(nextProps);
    console.log('listItem-nextProps',nextProps.item.boss.FAMILYNAME+' - '+this.state.item.boss.FAMILYNAME);
  }

  public shouldComponentUpdate(newProps: IUserListItemProps): boolean {
    //console.log('listItem-shouldComponentUpdate');
    return (
      this.props.item !== newProps.item 
      //||      this.props.isChecked !== newProps.isChecked
    );
  
  }
  //componentWillReceiveProps(nextProps) {
  //  console.log(nextProps);
 // }

  public render(): JSX.Element {
    this.props.item.Assistant=typeof this.props.item.Assistant=='object'?this.props.item.Assistant:{};
   // console.log(  this.props.item.Assistant);
    const classTodoItem: string = css(
      styles.userListItem,
      'ms-Grid',
      'ms-u-slideDownIn20'
    );
 
    return (
      <div
        role='row'
        className={ classTodoItem }
        data-is-focusable={ true }
        >
         <div className="ms-Grid">
        <FocusZone direction={ FocusZoneDirection.horizontal }>
       
          <div className="ms-Grid-row">
           
            <div className={this.props.item.Assistant.Id?css(styles.itemTaskRow_boss, 'ms-Grid-row'):css(styles.itemTaskRow, 'ms-Grid-row')} 
                 // onDoubleClick={(event) => this._onDoubleClick(this.props.item.HRID,this.props.item.Id?this.props.item.Id:this.props.item.ID,this.props.item.FIO?this.props.item.FIO:this.props.item.FAMILYNAME+' '+this.props.item.FS,event)}
                  onDoubleClick={(event) => this._onDoubleClick({
                      
                      UserProfile_GUID:this.props.item.UserProfile_GUID,  // sharepoint profile ID"4de7fef5-e744-4e97-9e5e-18a9b6738746"
                      AccountName:  this.props.item.AccountName, // AD KYIVSTAR.UA\\Sergey.Korotenko
                      LastName: this.props.item.LastName, // AD Last Name 
                      UserName:  this.props.item.UserName, //AD User Name "Sergey.Korotenko"
                      Manager: this.props.item.Manager, //AD  "KYIVSTAR.UA\\Pavel.Rakulenko"
                      PictureURL: this.props.item.PictureURL,
                      Title: this.props.item.Title, // Ulcimus ID 2819fc8b-4247-4221-b626-810dc0385cd3
                      FAMILYNAME:  this.props.item.FAMILYNAME?this.props.item.FAMILYNAME:this.props.item.FIO,
                      FS: this.props.item.FS,
                      EMAIL : this.props.item.EMAIL, // Ulcimus E-mail
                      PHONE : this.props.item.PHONE, //Ulcimus phone
                      DEPARTMENT: this.props.item.DEPARTMENT, //Ulcimus DEPARTMENT
                      POSITION:  this.props.item.POSITION, //Ulcimus Position
                      BOSSID:  this.props.item.BOSSID, // Ulcimus BOSS ID
                      STATUS:  this.props.item.STATUS,  // Ulcimus User status /Отпуск/Командировка...
                      LOCATION:  this.props.item.LOCATION, // City location
                      HRID:this.props.item.HRID,
                      ID:this.props.item.Id?this.props.item.Id:this.props.item.ID,
                      Id:'',
                      Ідентифікатор:''
                  },event
                      )}
            >
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg8">
                {this.props.item.AccountName? <Persona 
                        // imageUrl= {}
                          imageInitials= {this.props.item.AccountName? this.props.item.AccountName.replace(/.*\\([a-zA-Z]).*\.([a-zA-Z]).*/, "$1$2"):this.props.item.EMAIL}
                          primaryText= {this.props.item.FAMILYNAME+' '+this.props.item.FS}
                          secondaryText= {' '+this.props.item.POSITION}
                          tertiaryText= {this.props.item.DEPARTMENT}
                          optionalText= {this.props.item.PHONE}
                          onRenderSecondaryText={ this._onRenderSecondaryText }
                          //imageUrl = {this.props.item.PictureURL}
                          imageUrl= {typeof this.props.item=='object'?
                                          this.props.item.PictureURL?
                                            this.props.item.PictureURL
                                            :this.props.item.AccountName?
                                          'http://intranet.kyivstar.ua/cd/User%20Photos/Profile%20Pictures/kyivstar_ua_'+
                                              this.props.item.AccountName.replace(/KYIVSTAR.UA\\(\w+)(\.*)(\w*)/, (match, p1, p2, p3, offset, string)=>{return p2.length>0?p1+"_"+p3:p1;})+'_LThumb.jpg'
                                          :''
                                    :''} 
                        size={ PersonaSize.extraLarge }
                        //  presence={ PersonaPresence.away }
                          hidePersonaDetails={false }
                      />:
                      <Persona
                        // imageUrl= {}
                          imageInitials= {this.props.item.FIO? this.props.item.FIO.replace(/([А-ЯA-Z]).*([А-ЯA-Z]).*/, "$1$2"):''}
                          primaryText= {this.props.item.FIO}
                          secondaryText= {' '+this.props.item.Organization}
                          tertiaryText= {this.props.item.TypeName}  
                          optionalText= {''}
                          onRenderSecondaryText={ this._onRenderSecondaryText }
                          //imageUrl = {this.props.item.PictureURL}
                          imageUrl= {typeof this.props.item=='object'?
                                          this.props.item.PictureURL:''} 
                        size={ PersonaSize.extraLarge }
                        //  presence={ PersonaPresence.away }
                          hidePersonaDetails={false }
                      />
                    }
                    </div>

                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                        <Label>{this.props.item.EMAIL}</Label>
                        <Label>{this.props.item.InActiveDate}</Label>
                        {this.state.item.AccountName?   this.state.item.boss?<Label>{this.state.item.boss.FAMILYNAME+' '+this.state.item.boss.FS}</Label>:'':''}
                        <Label style= {{'color':'red'}}>{this.props.item.STATUS}</Label>
                      </div>

              </div>
            </div>
            
            {this.props.item.Assistant.Id?
            <div className={ css(styles.itemTaskRow, 'ms-Grid-row')} 
                 // onDoubleClick={(event) => this._onDoubleClick(this.props.item.HRID,this.props.item.Id?this.props.item.Id:this.props.item.ID,this.props.item.FIO?this.props.item.FIO:this.props.item.FAMILYNAME+' '+this.props.item.FS,event)}
                  onDoubleClick={(event) => this._onDoubleClick({
                      
                      UserProfile_GUID:this.props.item.Assistant.UserProfile_GUID,  // sharepoint profile ID"4de7fef5-e744-4e97-9e5e-18a9b6738746"
                      AccountName:  this.props.item.Assistant.AccountName, // AD KYIVSTAR.UA\\Sergey.Korotenko
                      LastName: this.props.item.Assistant.LastName, // AD Last Name 
                      UserName:  this.props.item.Assistant.UserName, //AD User Name "Sergey.Korotenko"
                      Manager: this.props.item.Assistant.Manager, //AD  "KYIVSTAR.UA\\Pavel.Rakulenko"
                      PictureURL: this.props.item.Assistant.PictureURL,
                      Title: this.props.item.Assistant.Title, // Ulcimus ID 2819fc8b-4247-4221-b626-810dc0385cd3
                      FAMILYNAME:  this.props.item.Assistant.FAMILYNAME,
                      FS: this.props.item.Assistant.FS,
                      EMAIL : this.props.item.Assistant.EMAIL, // Ulcimus E-mail
                      PHONE : this.props.item.Assistant.PHONE, //Ulcimus phone
                      DEPARTMENT: this.props.item.Assistant.DEPARTMENT, //Ulcimus DEPARTMENT
                      POSITION:  this.props.item.Assistant.POSITION, //Ulcimus Position
                      BOSSID:  this.props.item.Assistant.BOSSID, // Ulcimus BOSS ID
                      STATUS:  this.props.item.Assistant.STATUS,  // Ulcimus User status /Отпуск/Командировка...
                      LOCATION:  this.props.item.Assistant.LOCATION, // City location
                      HRID:this.props.item.Assistant.HRID,
                      ID:this.props.item.Assistant.Id?this.props.item.Assistant.Id:this.props.item.Assistant.ID,
                      Id:'',
                      Ідентифікатор:''
                  },event
                      )}
            >
             <div className={ css(styles.itemTaskRow, "ms-Grid-col ms-sm6 ms-md4 ms-lg1")}>
              {this.props.item.Assistant.Id?   <Label><b>{'Асистент:'}</b></Label>:''}
             </div>
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6">
               
                {this.props.item.Assistant.Id? 
              
                    <Persona
                        // imageUrl= {}
                          imageInitials= {this.props.item.Assistant.AccountName? this.props.item.AccountName.replace(/.*\\([a-zA-Z]).*\.([a-zA-Z]).*/, "$1$2"):this.props.item.EMAIL}
                          primaryText= {this.props.item.Assistant.FAMILYNAME+' '+this.props.item.Assistant.FS}
                          secondaryText= {' '+this.props.item.Assistant.POSITION}
                          tertiaryText= {this.props.item.Assistant.DEPARTMENT}
                          optionalText= {this.props.item.Assistant.PHONE}
                          onRenderSecondaryText={ this._onRenderSecondaryText }
                          //imageUrl = {this.props.item.PictureURL}
                          imageUrl= {typeof this.props.item=='object'?
                                          this.props.item.Assistant.PictureURL?
                                            this.props.item.Assistant.PictureURL
                                            :this.props.item.Assistant.AccountName?
                                          'http://intranet.kyivstar.ua/cd/User%20Photos/Profile%20Pictures/kyivstar_ua_'+
                                              this.props.item.Assistant.AccountName.replace(/KYIVSTAR.UA\\(\w+)(\.*)(\w*)/, (match, p1, p2, p3, offset, string)=>{return p2.length>0?p1+"_"+p3:p1;})+'_LThumb.jpg'
                                          :''
                                    :''} 
                        size={ PersonaSize.extraLarge }
                        //  presence={ PersonaPresence.away }
                          hidePersonaDetails={false }
                      />:<div></div>
              
                    }
                    </div>

                    {this.props.item.Assistant.Id?  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                        <Label >{this.props.item.Assistant.EMAIL}</Label>
                        <Label style= {{'color':'red'}}>{this.props.item.STATUS}</Label>
                        { this.state.item.Assistant.boss?<Label>{this.props.item.Assistant.boss.FAMILYNAME+' '+this.props.item.Assistant.boss.FS}</Label>:''}
                        

                      </div>:<div></div>}

                      
            </div>:''}
            </FocusZone>
          </div>
     
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

  private _onDoubleClick(user,event){
   // console.log('_onDoubleClick',user,event);
     //this.props.selectUserCb(id+";#"+hrid,fio);
      this.props.selectUserCb(user);
    
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