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
    this.props.item.Assistant=typeof this.props.item.Assistant=='object'?this.props.item.Assistant:{};
    this.state={
      item:this.props.item
    }
  //  this._handleToggleChanged = this._handleToggleChanged.bind(this);
 //   this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._onDoubleClick = this._onDoubleClick.bind(this);
    this._keyPress2 = this._keyPress2.bind(this);
    this._onRenderCompany = this._onRenderCompany.bind(this);
    this._onRenderPosition = this._onRenderPosition.bind(this);
    this._onRenderDept = this._onRenderDept.bind(this);
  }

  public componentWillReceiveProps(nextProps: IUserListItemProps) {
    const itm:IUserItem&IEmpUserItem = nextProps.item;
   // this.setState({item:itm});
    this.setState({item:nextProps.item});
  //  console.log(nextProps);
  //  console.log('listItem-nextProps',nextProps.item.boss.FAMILYNAME+' - '+this.state.item.boss.FAMILYNAME);
  }

  /*public shouldComponentUpdate(newProps: IUserListItemProps): boolean {
    console.log('listItem-shouldComponentUpdate');
    return (
      this.props.item !== newProps.item 
      //||      this.props.isChecked !== newProps.isChecked
    );
  }*/
  
  //componentWillReceiveProps(nextProps) {
  //  console.log(nextProps);
 // }

  public render(): JSX.Element {
   
   // console.log(  this.props.item);
    //console.log(  this.state);
    const classTodoItem: string = css(
      styles.userListItem,
      'ms-Grid',
      'ms-u-slideDownIn20'
      ,styles.over
    );
      if (typeof this.state.item.Assistant != "object"){
        this.state.item.Assistant={};
      }
    return (
   
      <div
        role='row'
        className={ classTodoItem  }
        data-is-focusable={ true }
        onKeyDown={(e) => this._keyPress2(e,this)}
        >
         <div className="ms-Grid ">
      { // <FocusZone direction={ FocusZoneDirection.horizontal }>
        }
       
          <div className="ms-Grid-row ">
           
            <div className={this.state.item.Assistant.Id?css(styles.itemTaskRow_boss, 'ms-Grid-row '):css(styles.itemTaskRow, 'ms-Grid-row')} 
                 // onDoubleClick={(event) => this._onDoubleClick(this.props.item.HRID,this.props.item.Id?this.props.item.Id:this.props.item.ID,this.props.item.FIO?this.props.item.FIO:this.props.item.FAMILYNAME+' '+this.props.item.FS,event)}
                 type=''
                 onDoubleClick={(event) => this._onDoubleClick(null,event,'')}
            >
              
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg8">
                {this.state.item.AccountName?  <div><Persona 
                        // imageUrl= {}
                          imageInitials= {this.state.item.AccountName? this.state.item.AccountName.replace(/.*\\([a-zA-Z]).*\.([a-zA-Z]).*/, "$1$2"):this.state.item.EMAIL}
                          primaryText= {this.state.item.FAMILYNAME+' '+this.state.item.FS}
                          secondaryText= {this.state.item.COMPANY}
                          tertiaryText= {this.state.item.DEPARTMENT}
                          optionalText= {' '+this.state.item.POSITION}
                          onRenderSecondaryText={ this._onRenderCompany }
                          onRenderOptionalText={ this._onRenderPosition }
                          onRenderTertiaryText={ this._onRenderDept }
                          imageUrl= {typeof this.state.item=='object'?
                                          this.state.item.PictureURL?
                                            this.state.item.PictureURL
                                            :this.state.item.AccountName?
                                          'http://intranet.kyivstar.ua/cd/User%20Photos/Profile%20Pictures/kyivstar_ua_'+
                                              this.state.item.AccountName.replace(/KYIVSTAR.UA\\(\w+)(\.*)(\w*)/, (match, p1, p2, p3, offset, string)=>{return p2.length>0?p1+"_"+p3:p1;})+'_LThumb.jpg'
                                          :''
                                    :''} 
                        size={ PersonaSize.extraLarge }
                        //  presence={ PersonaPresence.away }
                          hidePersonaDetails={false }
                      />
                     
                      <Icon iconName={ 'Phone' } className={ 'ms-JobIconExample' } />
                      { ' '+ this.state.item.PHONE }
                      <br></br>
                      <Icon iconName={ 'Mail' } className={ 'ms-JobIconExample' } />
                      { ' '+ this.state.item.EMAIL }
                    </div>
                      :<div>
                      <Persona
                        // imageUrl= {}
                          imageInitials= {this.state.item.FIO? this.state.item.FIO.replace(/([А-ЯA-Z]).*([А-ЯA-Z]).*/, "$1$2"):''}
                          primaryText= {this.state.item.FIO}
                          secondaryText= {' '+this.state.item.Organization}
                          tertiaryText= {this.state.item.TypeName}  
                          optionalText= {''}
                         // onRenderSecondaryText={ this._onRenderSecondaryText }
                         // onRenderTertiaryText={ this._onRenderTertiaryText }
                          imageUrl= {typeof this.state.item=='object'?
                                          this.state.item.PictureURL:''} 
                        size={ PersonaSize.extraLarge }
                        //  presence={ PersonaPresence.away }
                          hidePersonaDetails={false }
                      />
                     <Icon iconName={ 'Phone' } className={ 'ms-JobIconExample' } />
                      { ' '+ this.state.item.Phone }
                      <br></br>
                      <Icon iconName={ 'Mail' } className={ 'ms-JobIconExample' } />
                      { ' '+ this.state.item.EMAIL }
                      </div>
                    }
                    
                    </div>

                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                    
                        <Label>{this.state.item.InActiveDate}</Label>
                        <Label style= {{'color':'red'}}>{this.state.item.STATUS}</Label>
                        {this.state.item.AccountName?   this.state.item.boss?<div>Керівник: {this.state.item.boss.FAMILYNAME+' '+this.state.item.boss.FS}{this.state.item.boss.STATUS?' - '+this.state.item.boss.STATUS:''}</div>:'':''}
                        

                      </div>

              </div>
            </div>
            
            {this.state.item.Assistant.Id?
            <div className={ css(styles.itemTaskRow, 'ms-Grid-row')} 
                 // onDoubleClick={(event) => this._onDoubleClick(this.props.item.HRID,this.props.item.Id?this.props.item.Id:this.props.item.ID,this.props.item.FIO?this.props.item.FIO:this.props.item.FAMILYNAME+' '+this.props.item.FS,event)}
                 type='assistant' 
                 onDoubleClick={(event) => this._onDoubleClick(null,event,'assistant')}
            >
             <div className={ css(styles.itemTaskRow, "ms-Grid-col ms-sm6 ms-md4 ms-lg1")}>
              {this.state.item.Assistant.Id?   <Label><b>{'Асистент:'}</b></Label>:''}
             </div>
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6">
               
                {this.state.item.Assistant.Id? 
                  <div>
                    <Persona
                        // imageUrl= {}
                          imageInitials= {this.state.item.Assistant.AccountName? this.state.item.AccountName.replace(/.*\\([a-zA-Z]).*\.([a-zA-Z]).*/, "$1$2"):this.state.item.EMAIL}
                          
                          primaryText= {this.state.item.Assistant.FAMILYNAME+' '+this.state.item.Assistant.FS}
                          secondaryText= {this.state.item.COMPANY}
                          tertiaryText= {this.state.item.Assistant.DEPARTMENT}
                          optionalText= {' '+this.state.item.Assistant.POSITION}
                          onRenderSecondaryText={ this._onRenderCompany }
                          onRenderOptionalText={ this._onRenderPosition }
                          onRenderTertiaryText={ this._onRenderDept }
                          imageUrl= {typeof this.state.item=='object'?
                                          this.state.item.Assistant.PictureURL?
                                            this.state.item.Assistant.PictureURL
                                            :this.state.item.Assistant.AccountName?
                                          'http://intranet.kyivstar.ua/cd/User%20Photos/Profile%20Pictures/kyivstar_ua_'+
                                              this.state.item.Assistant.AccountName.replace(/KYIVSTAR.UA\\(\w+)(\.*)(\w*)/, (match, p1, p2, p3, offset, string)=>{return p2.length>0?p1+"_"+p3:p1;})+'_LThumb.jpg'
                                          :''
                                    :''} 
                        size={ PersonaSize.extraLarge }
                        //  presence={ PersonaPresence.away }
                          hidePersonaDetails={false }
                      />
                      <Icon iconName={ 'Phone' } className={ 'ms-JobIconExample' } />
                      { ' '+ this.state.item.Assistant.PHONE }
                      <br></br>
                      <Icon iconName={ 'Mail' } className={ 'ms-JobIconExample' } />
                      { ' '+ this.state.item.Assistant.EMAIL }
                   </div>:<div></div>
                   }
                    </div>
                    

                    {this.state.item.Assistant.Id?  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                      
                        <Label style= {{'color':'red'}}>{this.state.item.STATUS}</Label>
                        
{this.state.item.Assistant.AccountName?   this.state.item.Assistant.boss?<div>Керівник: {this.state.item.Assistant.boss.FAMILYNAME+' '+this.state.item.Assistant.boss.FS}{this.state.item.Assistant.boss.STATUS?' - '+this.state.item.Assistant.boss.STATUS:''}</div>:'':''}
                      </div>:<div></div>}

                      
            </div>:''}
          {//  </FocusZone>
          }
          </div>
     
      </div>
    );
  }
  private _keyPress2 (e,a){

    if(e.keyCode == 13){

      this._onDoubleClick(null,null,'keyPress');
    //  this._onDoubleClick(this.state.item.Id?this.state.item.Id:this.state.item.ID,this.state.item.NumberText,event)
     // this.props.selectPassCb();
      //console.log('enter', console.log(e.target));
    }}


  private _onRenderPosition = (props: IPersonaProps): JSX.Element => {
    return (
      <div>
        <Icon iconName={ '1Suitcase' } className={ 'ms-JobIconExample' }/>
        { ' '+props.optionalText }
      </div>
    );
  }
  private _onRenderDept = (props: IPersonaProps): JSX.Element => {
    return (
      <div>
        <Icon iconName={ '1Org' }/>
        { ' '+props.tertiaryText }
      </div>
    );
  }
  private _onRenderCompany = (props: IPersonaProps): JSX.Element => {
    //console.log(props);
    return (
      <div>
        <Icon iconName={ '1CityNext' }  />
        { ' '+props.secondaryText }
      </div>
    );
  }
  



  private _onDoubleClick(user,event,type){
 
    if (!user){
      //if (this.state.item.Assistant.Id){
      if (type=='assistant'|| (type=='keyPress' && this.state.item.Assistant.Id)){
          user = {
            UserProfile_GUID:this.state.item.Assistant.UserProfile_GUID,  // sharepoint profile ID"4de7fef5-e744-4e97-9e5e-18a9b6738746"
            AccountName:  this.state.item.Assistant.AccountName, // AD KYIVSTAR.UA\\Sergey.Korotenko
            LastName: this.state.item.Assistant.LastName, // AD Last Name 
            UserName:  this.state.item.Assistant.UserName, //AD User Name "Sergey.Korotenko"
            Manager: this.state.item.Assistant.Manager, //AD  "KYIVSTAR.UA\\Pavel.Rakulenko"
            PictureURL: this.state.item.Assistant.PictureURL,
            Title: this.state.item.Assistant.Title, // Ulcimus ID 2819fc8b-4247-4221-b626-810dc0385cd3
            FAMILYNAME:  this.state.item.Assistant.FAMILYNAME,
            FS: this.state.item.Assistant.FS,
            EMAIL : this.state.item.Assistant.EMAIL, // Ulcimus E-mail
            PHONE : this.state.item.Assistant.PHONE, //Ulcimus phone
            DEPARTMENT: this.state.item.Assistant.DEPARTMENT, //Ulcimus DEPARTMENT
            POSITION:  this.state.item.Assistant.POSITION, //Ulcimus Position
            BOSSID:  this.state.item.Assistant.BOSSID, // Ulcimus BOSS ID
            STATUS:  this.state.item.Assistant.STATUS,  // Ulcimus User status /Отпуск/Командировка...
            LOCATION:  this.state.item.Assistant.LOCATION, // City location
            HRID:this.state.item.Assistant.HRID,
            ID:this.state.item.Assistant.Id?this.state.item.Assistant.Id:this.state.item.Assistant.ID,
            Id:'',
            Ідентифікатор:''
        }
        }else{
          user = {
            UserProfile_GUID:this.state.item.UserProfile_GUID,  // sharepoint profile ID"4de7fef5-e744-4e97-9e5e-18a9b6738746"
            AccountName:  this.state.item.AccountName, // AD KYIVSTAR.UA\\Sergey.Korotenko
            LastName: this.state.item.LastName, // AD Last Name 
            UserName:  this.state.item.UserName, //AD User Name "Sergey.Korotenko"
            Manager: this.state.item.Manager, //AD  "KYIVSTAR.UA\\Pavel.Rakulenko"
            PictureURL: this.state.item.PictureURL,
            Title: this.state.item.Title, // Ulcimus ID 2819fc8b-4247-4221-b626-810dc0385cd3
            FAMILYNAME:  this.state.item.FAMILYNAME?this.state.item.FAMILYNAME:this.state.item.FIO,
            FS: this.state.item.FS,
            EMAIL : this.state.item.EMAIL, // Ulcimus E-mail
            PHONE : this.state.item.PHONE, //Ulcimus phone
            DEPARTMENT: this.state.item.DEPARTMENT, //Ulcimus DEPARTMENT
            POSITION:  this.state.item.POSITION, //Ulcimus Position
            BOSSID:  this.state.item.BOSSID, // Ulcimus BOSS ID
            STATUS:  this.state.item.STATUS,  // Ulcimus User status /Отпуск/Командировка...
            LOCATION:  this.state.item.LOCATION, // City location
            HRID:this.state.item.HRID,
            ID:this.state.item.Id?this.state.item.Id:this.state.item.ID,
            Id:'',
            Ідентифікатор:''
        }
      }
  }

      this.props.selectUserCb(user);
    
  }

 /* private _handleToggleChanged(ev: React.FormEvent<HTMLInputElement>, checked: boolean): void {
    const newItem: IUserItem = update(this.state.item, {
      PercentComplete: { $set: this.state.item.PercentComplete >= 1 ? 0 : 1 }
    });

    this.props.onCompleteListItem(newItem);
  }*/

 /* private _handleDeleteClick(event: React.MouseEvent<HTMLButtonElement>) {
      this.props.onDeleteListItem(this.state.item);
  }*/
}