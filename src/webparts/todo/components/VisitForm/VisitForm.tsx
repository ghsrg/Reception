import * as React from 'react';
import {
  TextField,
  Button,
  ButtonType,
  Dropdown,
  PrimaryButton,
  Label,
  css,
  FocusZone, FocusZoneDirection
} from 'office-ui-fabric-react';
//import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import styles from './VisitForm.module.scss';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import IVisitFormState from './IVisitFormState';
import IVisitFormProps from './IVisitFormProps';
import UserList from '../UserList/UserList';
import IUserItem from '../../models/IUserItem';
import IEmpUserItem from '../../models/IEmpUserItem';
import { IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import IPassItem from '../../models/IPassItem';
import PassList from '../PassList/PassList';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';


export default class VisitForm extends  React.Component<IVisitFormProps, IVisitFormState>{

 // private _placeHolderText: string = 'Enter your todo';
  private _placeHolderFiltereText: string = 'Поиск...';
  private _forCalloutElement: any | null;
  private _cityOption:IDropdownOption[];
  private DayPickerStrings: IDatePickerStrings = {
    months: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
    shortMonths: ['Січ', 'Лют', 'Берез', 'Квіт', 'Трав', 'Черв', 'Лип', 'Серп', 'Верес', 'Жовт', 'Листоп', 'Груд'],
    days: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'],
    shortDays: ['НД', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
    goToToday: 'Согодні',
    prevMonthAriaLabel: 'Попередній місяць',
    nextMonthAriaLabel: 'Наступний місяць',
    prevYearAriaLabel: 'Попередній рік',
    nextYearAriaLabel: 'Наступний рік'   
  };
  
  constructor(props: IVisitFormProps) {
    super(props);
        
    this._handleInputChange = this._handleInputChange.bind(this);
   // this._handleInputChangefilter = this._handleInputChangefilter.bind(this);
    this._handleAddButtonClick = this._handleAddButtonClick.bind(this);
    this._handleClearButtonClick = this._handleClearButtonClick.bind(this);
    this._handleCancelButtonClick = this._handleCancelButtonClick.bind(this);
    this._handleSaveButtonClick = this._handleSaveButtonClick.bind(this);
    this._getFields = this._getFields.bind(this);
    this._onFormatDate = this._onFormatDate.bind(this);
    this._onSelectDateFrom = this._onSelectDateFrom.bind(this);
    this._onSelectDateTo = this._onSelectDateTo.bind(this);
   
    this._onCalloutDismiss = this._onCalloutDismiss.bind(this);
    this._hadlerEmployeeSelecting = this._hadlerEmployeeSelecting.bind(this);
    this._hadlerPassSelecting = this._hadlerPassSelecting.bind(this);
    this._hadlerBusyPassSelecting = this._hadlerBusyPassSelecting.bind(this);
    this._selectUserCb = this._selectUserCb.bind(this);
    this._selectPassCb = this._selectPassCb.bind(this);
    this._clearPassCb = this._clearPassCb.bind(this);
    this.changePassStatus = this.changePassStatus.bind(this);
    this._onFocusinput = this._onFocusinput.bind(this);
    this._handlerCityChanged = this._handlerCityChanged.bind(this);
    this._handlerPeriodChanged = this._handlerPeriodChanged.bind(this);
    this._getCurrentPassTypes = this._getCurrentPassTypes.bind(this);
    //this._calcFilteredDate = this._calcFilteredDate.bind(this);
    this._refreshVisitsItems = this._refreshVisitsItems.bind(this);
    this.refreshVisitsItems = this.refreshVisitsItems.bind(this);
    this._fillAssistant = this._fillAssistant.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this._keyPress = this._keyPress.bind(this);
    this._keyPress2 = this._keyPress2.bind(this);
    
   

    this.state = {
      search:'',
      search_employee_string:'',
      selected_employee_id:'',
      search_pass_string:'',
      selected_pass_id:'',
      inputValue: '',
      inputFilter: '',
      showForm:'main',
      isCalloutVisible: false,
      userItems: [],
      passItems: [],
      empUserItems: [],
      CalloutStyle:{width:'',type:'',height:''},
      selectedVisitor:'',
      selectedOrganization:'',
      selectedcomments:'',
      cityFilter:'',
      formValid:''

    };
  
    const _fields = [
      {
        key: 'employee',
        fieldName: 'ui_autor',
        objectName:'TextField',
        object:  TextField,
          label:'Співробітник', 
          placeholder:'...',
          underlined: true,
          required:true,
          value: ()=>{return this.state.search_employee_string;},
          onChanged: this._hadlerEmployeeSelecting,
          ref:(input)=>{this.inputEmployee = input; },
          onFocus:()=>{return this._onFocusinput;},
          onKeyDown: this._keyPress
      },
      
      {
        key: 'organization',
        fieldName: 'Organization',
        object: TextField,
        objectName:'TextField',
        label:'Організація',
          underlined: true,
          required:false,
          onChanged: (value)=>{this.setState({selectedOrganization:value});},
          ref:(input)=>{this.inputOrganization = input; },
          value: ()=>{return this.state.selectedOrganization;},
        //  onChanged: this._handleInputChangefilter
         onFocus:()=>{return this._onFocusinput;}
      },
      {
        key: 'visitor',
        fieldName: 'Visitor',
        objectName:'TextField',
        object: TextField,
          label:'Відвідувач',
          ref:(input)=>{this.inputVisitor = input; },
          underlined: true,
          onChanged: (value)=>{this.setState({selectedVisitor:value});},
          required:true,
          value: ()=>{return this.state.selectedVisitor;}
       //   onChanged: this._handleInputChangefilter
      },
      {
        key: 'postnum',
        fieldName: 'PostNum',
        objectName:'TextField',
        object: TextField,
          label:'№ вх. кореспонденції',
          ref:(input)=>{this.inputPostnum = input; },
          underlined: true,
          onChanged: (value)=>{this.setState({selectedPostnum:value});},
          required:true,
          value: ()=>{return this.state.selectedPostnum;}
       //   onChanged: this._handleInputChangefilter
      },
      {
        key: 'pass',
        fieldName: 'ui_pass',
        label:'Перепустка',
        object: TextField,
        objectName:'TextField',
        placeholder:'...',
          underlined: true,
          required:true,
          value: ()=>{return this.state.search_pass_string;},
          onChanged: this._hadlerPassSelecting,
          ref:(input)=>{this.inputPass = input; },
          onFocus:()=>{return this._hadlerPassSelecting;},
          onKeyDown: this._keyPress

      },{
        key: 'key',
        fieldName: 'ui_pass',
        label:'Ключ',
        object: TextField,
        objectName:'TextField',
        placeholder:'...',
          underlined: true,
          required:true,
          value: ()=>{return this.state.search_pass_string;},
          onChanged: this._hadlerPassSelecting,
          ref:(input)=>{this.inputPass = input; },
          onFocus:()=>{return this._hadlerPassSelecting;},
          onKeyDown: this._keyPress

      },{
        key: 'comments',
        fieldName: 'Comments',
        label:'Примітка',
        object: TextField,
        objectName:'TextField',
         onChanged: (value)=>{this.setState({selectedcomments:value});},  
          underlined: true,
          ref:(input)=>{this.inputComments = input; },
          required:false,
          value: ()=>{return this.state.selectedcomments;}
         // onChanged: this._handleInputChangefilter
      
      },{
      key: 'notify',
      fieldName: 'NotifySwitch',
      object: 'Toggle',
      objectName:'Toggle',
      defaultChecked:JSON.parse(this.props.VisitsTypesItem.NotifySwitch),
      label:"Відсилати повідомлення",
      inlineLabel:true,
      onText:"Відсилати повідомлення",
      offText:"Не відсилати повідомлення",
      //onFocus:{() => console.log('onFocus called')},
      //onBlur:{() => console.log('onBlur called')},
      onChanged: (checked: boolean)=>{this.setState({selectedNotifySwitch:checked});},  
      }
    ];
   
      
    

      this._cityOption = [
        { key: 'Header4', text: 'Работа з містом:', itemType: DropdownMenuItemType.Header },
        { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider }];

      this._cityOption= this._cityOption.concat(this.props.currentUser.SessionInfo.Cities.map((row)=>{
        const opt:IDropdownOption={
          key:String(row.Id),
          text:row.CityNameUa
        };
        return opt;
      }));
      this._cityOption= this._cityOption.concat([{key:'divider_20',text:'-',itemType: DropdownMenuItemType.Divider},{key:'-1',text:'Всі'}]);
      this.state.fields = _fields;
      this.state.periodFilter=this.props.currentUser.SessionInfo.Period;
      this.state.cityFilter=this.props.currentUser.SessionInfo.CityID.Id;
  }
  private inputEmployee : any;
  private inputVisitor : any;
  private inputPostnum : any;
  private inputOrganization : any;
  private inputPass : any;
  private inputClearPass : any;
  private inputComments : any;
  private inputSearch : any;
  private ref2passList : any;
  private ref2EmpList : any;

  
  componentWillReceiveProps(nextProps) {
        this._cityOption = [
             { key: 'Header4', text: 'Работа з містом:', itemType: DropdownMenuItemType.Header },
             { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider }];
        this._cityOption= this._cityOption.concat(this.props.currentUser.SessionInfo.Cities.map((row)=>{
          const opt:IDropdownOption={
            key:String(row.Id),
            text:row.CityNameUa
          };
          return opt;
        }));
        this._cityOption= this._cityOption.concat([{key:'divider_20',text:'-',itemType: DropdownMenuItemType.Divider},{key:'-1',text:'Всі'}]);

      if (nextProps.showForm=='edit'){ //EDIT VISIT
          var emp_string='';
          var employee_type='';
          var employee_id='';
          if (typeof nextProps.itemForEdit.EmployeeID=='object' ){
            emp_string = nextProps.itemForEdit.EmployeeID.FAMILYNAME+' '+nextProps.itemForEdit.EmployeeID.FS;
            employee_type=nextProps.itemForEdit.EmployeeID.HRID?nextProps.itemForEdit.EmployeeID.HRID:null;
            if (employee_type){
              employee_id = nextProps.itemForEdit.EmployeeIDId?nextProps.itemForEdit.EmployeeIDId:null
          }else{
             employee_id = nextProps.itemForEdit.EmpowermentUsersIDId?nextProps.itemForEdit.EmpowermentUsersIDId:null
          }
          }else if (typeof nextProps.itemForEdit.EmpowermentUsersID=='object'){
            emp_string =nextProps.itemForEdit.EmpowermentUsersID.FIO;
            
          }
          this.setState({
            selectedVisitor:nextProps.itemForEdit.Visitor?nextProps.itemForEdit.Visitor:null,
            selectedPostnum:nextProps.itemForEdit.PostNum?nextProps.itemForEdit.PostNum:null,
            selected_pass_id:nextProps.itemForEdit.PassIDId?nextProps.itemForEdit.PassIDId:null,
            selectedVisitID:nextProps.itemForEdit.ID?nextProps.itemForEdit.Id:null,
            selected_employee_id:employee_id,
            selected_employee_type:employee_type,
            search_employee_string:emp_string,
            selectedOrganization:nextProps.itemForEdit.Organization,
            search_pass_string:typeof nextProps.itemForEdit.PassID=='object'?nextProps.itemForEdit.PassID.NumberText:null,
            selectedcomments:nextProps.itemForEdit.Comments,
            showForm:nextProps.showForm,
            periodFilter:this.props.currentUser.SessionInfo.Period,
            cityFilter:this.props.currentUser.SessionInfo.CityID.Id,
            itemForEdit:nextProps.itemForEdit,
            prev_selected_pass_id:nextProps.itemForEdit.PassIDId?nextProps.itemForEdit.PassIDId:null,
            });
      }else{ //NEW VISIT
          this.setState({
            showForm:nextProps.showForm,
            periodFilter:this.props.currentUser.SessionInfo.Period,
            cityFilter:this.props.currentUser.SessionInfo.CityID.Id,
            search_pass_string: ''
          });
      }
   }



  public render(): JSX.Element {
    let divCalloutStyle = {
      'width': this.state.CalloutStyle.width?this.state.CalloutStyle.width:'760px',
      'max-height':this.state.CalloutStyle.height?this.state.CalloutStyle.height:'60hv'
     
    };


  
 
      return (

<div >
     { this.state.showForm==='add' &&
        <div className={  "ms-Grid " + styles.visitFormLab} >
        {this._getFields(this.state.fields).length ? this._getFields(this.state.fields).map((record,i)=>{
           
           const keyArr = this.props.VisitsTypesItem.ColumnsKeys.split(';');
           const reqString = keyArr.filter((row)=>{
             return row.replace(/(.*?)\*{1}/,"$1")==record.key;
           }); 
           var required = false;
           if (reqString[0]){
              if (reqString[0].replace(/.*?(\*)/,"$1")=='*'){
                required = true;
              }
           }
                  return(
                   <div>
                   
               {(() => {
                          switch (record.objectName) {
                            case "TextField":  
                              { return  <record.object style = {{'border':'0','min-width':'500px'}}   
                                autoComplete="off" ///доделать
                                label={record.label} 
                                placeholder={record.placeholder}
                                ref={(input)=>{typeof record.ref=='function'?record.ref(input):"";}}
                                underlined={record.underlined}
                                //required={required} FIX ME доделать проверку для динамической обязательности полей и тогда включить это поле
                                required={record.required}
                                value={typeof record.value=='function'?record.value():''}
                                onChanged={record.onChanged}
                                onKeyDown={record.onKeyDown}
                                validateOnFocusOut={true}
                                onFocus={typeof record.onFocus=='function'?record.onFocus():''}
                              />;
                              }
                            case "Toggle":  //FIX ME - не работает в IE на classic page
                              { return   <Toggle    
                                label=""
                                onChanged={record.onChanged}
                                defaultChecked={record.defaultChecked} 
                                onText={record.onText} 
                                offText={record.offText} 
                              />;
                              }
                            default:      console.log('Unknown object name: '+record.objectName);
                          }
                        })()}
                      
                     </div>
                  );
                }): null
            }

              { this.state.formValid.length>0 &&
               <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg4">
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg4">
                </div>
                 <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg8">
                 <Label style={{'color':'red'}} >{this.state.formValid}</Label>
                 </div>
                </div>
              }

                <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg4">
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg4">
                </div>
                 <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
                  {//this.props.currentUser.ContextInfo.Role=='rw'&& 
                    this.props.currentUser.ChekUserRights('add')&& 
                    <PrimaryButton style = {{'min-width':'100px'}}
                        className={ styles.addButton }
                        buttonType={ ButtonType.primary }
                        ariaLabel='Зберегти новий візит'
                        iconProps={{ iconName: 'Save' }}
                        onClick={this._handleSaveButtonClick}>
                        OK
                      </PrimaryButton>
                  }
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
                  {this._getCurrentPassTypes().length>0 &&this.props.currentUser.ChekUserRights('clear')&&    
                    <PrimaryButton style = {{'min-width':'100px'}}
                      className={ styles.addButton }
                      buttonType={ ButtonType.primary }
                      ariaLabel='Out a visitor'
                      iconProps={{ iconName: 'OutOfOffice' }}
                      onClick={this._handleClearButtonClick}>
                      Вихід
                    </PrimaryButton>
                }
                </div>

                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
                    <PrimaryButton style = {{'min-width':'100px'}}
                      className={ styles.addButton }
                      buttonType={ ButtonType.primary }
                      ariaLabel='Відмінити збереження нового візиту'
                      iconProps={{ iconName: 'Back' }}
                      onClick={this._handleCancelButtonClick}> 
                      Назад
                    </PrimaryButton>
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
                  </div>
                
              </div>
        </div>
      }

       { this.state.showForm==='edit' &&
        <div className={  "ms-Grid " + styles.visitFormLab} >
        {this._getFields(this.state.fields).length ? this._getFields(this.state.fields).map((record,i)=>{
           
           const keyArr = this.props.VisitsTypesItem.ColumnsKeys.split(';');
           const reqString = keyArr.filter((row)=>{
             return row.replace(/(.*?)\*{1}/,"$1")==record.key;
           }); 
           var required = false;
           if (reqString[0]){
              if (reqString[0].replace(/.*?(\*)/,"$1")=='*'){
                required = true;
              }
           }
           
                  return(
                   <div>
                   
               {(() => {
      
                
                          switch (record.objectName) {
                            case "TextField":  
                              { return  <record.object style = {{'border':'0','min-width':'500px'}}   
                                autoComplete="off" ///доделать
                                label={record.label} 
                                placeholder={record.placeholder}
                                ref={(input)=>{typeof record.ref=='function'?record.ref(input):"";}}
                                underlined={record.underlined}
                                //required={required} FIX ME доделать проверку для динамической обязательности полей и тогда включить это поле
                                required={record.required}
                                value={typeof record.value=='function'?record.value():''}
                                onChanged={record.onChanged}
                                onKeyDown={record.onKeyDown}
                                validateOnFocusOut={true}
                                onFocus={typeof record.onFocus=='function'?record.onFocus():''}
                              />;
                              }
                            case "Toggle":  //FIX ME - не работает в IE на classic page
                              { return   <Toggle    
                                label=""
                                onChanged={record.onChanged}
                                defaultChecked={record.defaultChecked} 
                                onText={record.onText} 
                                offText={record.offText} 
                              />;
                             
                              }
                             

                            default:      console.log('Unknown object name: '+record.objectName);
                          }
                        })()}
                      
                     </div>
                  );
                }): null
              }
              { this.state.formValid.length>0 &&
               <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg4">
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg4">
                </div>
                 <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg8">
                 <Label style={{'color':'red'}} >{this.state.formValid}</Label>
                 </div>
                </div>
              }

                <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg4">
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg4">
                </div>
                 <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
                  {//this.props.currentUser.ContextInfo.Role=='rw'&& 
                    this.props.currentUser.ChekUserRights('add')&& 
                    <PrimaryButton style = {{'min-width':'100px'}}
                        className={ styles.addButton }
                        buttonType={ ButtonType.primary }
                        ariaLabel='Зберегти новий візит'
                        iconProps={{ iconName: 'Save' }}
                        onClick={this._handleSaveButtonClick}>
                        Зберегти
                      </PrimaryButton>
                  }
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
                  
                </div>

                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
                    <PrimaryButton style = {{'min-width':'100px'}}
                      className={ styles.addButton }
                      buttonType={ ButtonType.primary }
                      ariaLabel='Відмінити збереження нового візиту'
                      iconProps={{ iconName: 'Back' }}
                      onClick={this._handleCancelButtonClick}> 
                      Скасувати
                    </PrimaryButton>
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
                  </div>
                
              </div>
        </div>
      }

      { this.state.showForm==='clear' &&
        <div className="ms-Grid">
              <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                  <TextField  
                    value = {this.state.search_clear_pass_string}
                    onChanged ={ this._hadlerBusyPassSelecting}
                    ref={(input)=>{this.inputClearPass = input; }}
                    autoComplete="off" 
                  />
                  </div>
                  
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
                    <PrimaryButton style = {{'min-width':'100px'}}
                      className={ styles.addButton }
                      buttonType={ ButtonType.primary }
                      ariaLabel='Закрити'
                      iconProps={{ iconName: 'Back' }}
                      onClick={this._handleCancelButtonClick}> 
                      Назад
                    </PrimaryButton>
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
                  </div>
              </div>
              <Label> Не повернуті (
              {this.state.searchCount>-1?''+this.state.searchCount+'':'Loading... '}
              )</Label>
              <PassList  
                 items={this.state.passItems} 
                 selectPassCb={this._clearPassCb}
                 layout={'Busy'}
                 VisitsTypesItem = {this.props.VisitsTypesItem}  
                 />
        </div>
      }

     { this.state.showForm==='main' &&  
        <div className="ms-Grid">  
        
        <div className="ms-Grid-row">


          <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg2">
            <DatePicker 
                  firstDayOfWeek={DayOfWeek.Monday} 
                  strings={this.DayPickerStrings} 
                  formatDate={this._onFormatDate}
                  onSelectDate={this._onSelectDateFrom}
                  value={this.props.currentUser.SessionInfo.DateFrom}
                  placeholder="Дата з" 
                  ariaLabel="Дата з" />
                  
          </div>
          <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg2">
            <DatePicker 
                  firstDayOfWeek={DayOfWeek.Monday} 
                  strings={this.DayPickerStrings} 
                  formatDate={this._onFormatDate}
                  onSelectDate={this._onSelectDateTo}
                  value={this.props.currentUser.SessionInfo.DateTo}
                  placeholder="Дата по" 
                  ariaLabel="Дата по" />
                  
          </div>

          <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg1">
          {this.props.currentUser.ChekUserRights('changeCity')&&
            <Dropdown
                selectedKey={this.state.cityFilter}
                onChanged={this._handlerCityChanged}//{(row)=>{ this.setState({cityFilter:''+row.key})}}
                options={this._cityOption}
            />}          
            {!this.props.currentUser.ChekUserRights('changeCity')&&this.props.currentUser.SessionInfo.CityID.Id.length<1&&

            <Label style={{'color':'red'}} >Для вас не вказане місто! Зверніться до адміністратора!</Label>
       
            }
          </div>

          <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg2">
          <TextField    
                                autoComplete="off" 
                               // label='Знайти'
                                placeholder='Знайти'
                                ref={(input)=>{this.inputSearch = input; }}
                             //   underlined={true}
                                value={this.state.search}
                                onChanged={this._onSearch}
                                onKeyDown={this._keyPress2}
          
                              />
          </div>

          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
            {// this._getCurrentPassTypes().length>0 &&this.props.currentUser.ContextInfo.Role=='rw' &&   
             this._getCurrentPassTypes().length>0 &&this.props.currentUser.ChekUserRights('clear')&&    
              <PrimaryButton style = {{'min-width':'100px'}}
                className={ styles.addButton }
                buttonType={ ButtonType.primary }
                ariaLabel='Out a visitor'
                iconProps={{ iconName: 'OutOfOffice' }}
                onClick={this._handleClearButtonClick}>
              Вихід
              </PrimaryButton>
          }
          </div>
          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
            {//this.props.currentUser.ContextInfo.Role=='rw'&& 
            this.props.currentUser.ChekUserRights('add')&& 
                <PrimaryButton style = {{'min-width':'100px'}}
                  className={ styles.addButton }
                  buttonType={ ButtonType.primary }
                  ariaLabel='Add a visitor'
                  iconProps={{ iconName: 'AddFriend' }}
                  onClick={this._handleAddButtonClick}>
                  
                  Додати
                </PrimaryButton>
              }
          </div>
          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
          </div>
          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
          </div>
          <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg1">
                  <PrimaryButton 
                  // className={ styles.addButton }
                    buttonType={ ButtonType.primary }
                    ariaLabel=''
                    iconProps={{ iconName: 'ExcelLogo' }}
                    onClick={()=>{this.props.exportDate({});}}>
                  </PrimaryButton>
                </div>
       </div>
     </div> 
     }
    

      {this.state.isCalloutVisible ? (
       
          <Callout
            className={styles.visitForm}
            gapSpace={5}
            target={this._forCalloutElement}
            isBeakVisible={false}
            minPagePadding={50}
            
            
           // beakWidth={10}
           
           // beakStyle = {styles.visitFormCallout}
            onDismiss={this._onCalloutDismiss}
            directionalHint={DirectionalHint.bottomLeftEdge}
         //   style={}
            
          >
           <div  style={divCalloutStyle} > 
            {this.state.CalloutStyle.type=='Employee'?
              <div style={divCalloutStyle}> 
                  Співробітники ({this.state.searchCount>-1?this.state.searchCount:'Loading...'}):
                  <UserList 
                    items={this.state.userItems} selectUserCb={this._selectUserCb}   ref={ref => (this.ref2EmpList  = ref)} />
                  Інші особи, які мають право на провід відвідувачів:
                  <UserList  items={this.state.empUserItems} selectUserCb={this._selectUserCb}/>
              </div>
              
              :this.state.CalloutStyle.type=='Pass'?    
              <div style={divCalloutStyle}  > 
                    Доступні до видачі:
                    <PassList  VisitsTypesItem = {this.props.VisitsTypesItem}   items={this.state.passItems}  layout={'New'}  selectPassCb={this._selectPassCb}  ref={ref => (this.ref2passList  = ref)}/>
              </div>
              :<div > 
                Невідомий тип запиту. Поимилка:8898
              </div>
            }
            </div>
   
          </Callout>
      
         
        
        ) : null}
    </div>
    );
  
  } 

private _selectUserCb (user: IUserItem){
   // console.log('_selectUserCb',id,hrid,text);
    this.setState({
      //search_employee_string:text,
      //selected_employee_id:id,
      //selected_employee_type:hrid
      search_employee_string:user.FS?user.FAMILYNAME+' '+user.FS:user.FAMILYNAME,
      selected_employee_id:user.ID?user.ID:user.Id,
      selected_employee_type:user.HRID,
      selected_employee:user
    });
    this._onCalloutDismiss();
  }

private _onFormatDate = (date: Date): string => {
   // return date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() % 100);
    return ("00" + date.getDate()).slice(-2) + '/' + ("00" + (date.getMonth() + 1)).slice(-2) + '/' +  ("00" + (date.getFullYear() % 100)).slice(-2);
  };

private _selectPassCb (id: string,text:string,passRow:IPassItem){
    this.setState({
      search_pass_string:text,
      selected_pass_id:id,
      selectedCity:typeof passRow== 'object'? passRow.CityIDId:''
    });
    this._onCalloutDismiss();
  }
  
private _clearPassCb (id: string){
   // console.log('_clearPassCb',id);
if (id){
    this.props.dataProvider.clearPass({ID:id})
    .then(() => {
        this._hadlerBusyPassSelecting(null);
        this._refreshVisitsItems();
      });
    }
  }

public changePassStatus (id: string,status:string,VisitsIDId:string) {
   // console.log('status',status);
    if (id){
    return this.props.dataProvider.clearPass({ID:id,StatusIDId:status=='1'?'1':'2',VisitsIDId:VisitsIDId})
    .then((result) => {
     // console.log('result = ',result);
     // alert('Перпустка на вже видана!');
      //  this._hadlerBusyPassSelecting(null);
        //this._refreshVisitsItems();
        return result;
      });
    }else{
      return this.props.dataProvider.clearVisit({ID:VisitsIDId,IsPassReturned:status=='1'?'0':'1'})
      .then((result) => {
       // console.log('result = ',result);
       // alert('Перпустка на вже видана!');
        //  this._hadlerBusyPassSelecting(null);
          //this._refreshVisitsItems();
          return result;
        });
    }
  }

  public refreshVisitsItems(){
    this._refreshVisitsItems();
  };


private _onCalloutDismiss = (): void => {
    this.setState({
      isCalloutVisible: false
    });  
  }
private _keyPress2 (e){
    if (e.keyCode == 13) {
      e.preventDefault();
      return false;
    }
  }



private _keyPress (e){
    
    if(e.keyCode == 40 || e.keyCode == 38 ){
      if (this.state.isCalloutVisible){
        if (this.state.CalloutStyle.type=='Employee'){
          this.ref2EmpList.focusZone();
        } else if (this.state.CalloutStyle.type=='Pass'){
          this.ref2passList.focusZone();
        }
      }
    }

    if(e.keyCode == 13){
      if (this.state.isCalloutVisible){
      if (this.state.CalloutStyle.type=='Employee'){
        if (this.state.userItems.length==1){
          var userItems = this.state.userItems[0];
        //   console.log(this.state.userItems);
           this._selectUserCb({
            UserProfile_GUID:userItems.UserProfile_GUID,  // sharepoint profile ID"4de7fef5-e744-4e97-9e5e-18a9b6738746"
            AccountName:  userItems.AccountName, // AD KYIVSTAR.UA\\Sergey.Korotenko
            LastName: userItems.LastName, // AD Last Name 
            UserName:  userItems.UserName, //AD User Name "Sergey.Korotenko"
            Manager: userItems.Manager, //AD  "KYIVSTAR.UA\\Pavel.Rakulenko"
            PictureURL: userItems.PictureURL,
            Title: userItems.Title, // Ulcimus ID 2819fc8b-4247-4221-b626-810dc0385cd3
            FAMILYNAME:  userItems.FAMILYNAME?userItems.FAMILYNAME:userItems.FIO,
            FS: userItems.FS,
            EMAIL : userItems.EMAIL, // Ulcimus E-mail
            PHONE : userItems.PHONE, //Ulcimus phone
            DEPARTMENT: userItems.DEPARTMENT, //Ulcimus DEPARTMENT
            POSITION:  userItems.POSITION, //Ulcimus Position
            BOSSID:  userItems.BOSSID, // Ulcimus BOSS ID
            STATUS:  userItems.STATUS,  // Ulcimus User status /Отпуск/Командировка...
            LOCATION: userItems.LOCATION, // City location
            HRID:userItems.HRID,
            ID:userItems.Id?userItems.Id:userItems.ID,
            Id:'',
            Ідентифікатор:''
        });
        }
      }else if (this.state.CalloutStyle.type=='Pass'){
        if (this.state.passItems.length==1){
          var passItems = this.state.passItems[0];
      //    console.log(this.state.passItems);
          this._selectPassCb(passItems.Id?passItems.Id:passItems.ID,passItems.NumberText,passItems);
        }
      }
    }
   }
  }

private _hadlerEmployeeSelecting (newValue: string) {
    
    const timeLableGetUser = Math.random();
    
    this.setState({
      timeLableGetUser: timeLableGetUser,
      empUserItems:[],
      search_employee_string: newValue,
      userItems:[],
      searchCount:-1
    });
    if (newValue.length<3){
      this.setState({
          searchCount:0
      });
      return null;
  }
    //console.log(event);
    this._forCalloutElement=event.srcElement.parentElement.parentElement;
  
    this.props.dataProvider.getUsers(newValue)
    .then((userList: IUserItem[]&IEmpUserItem[]) => {
      if (this.state.timeLableGetUser==timeLableGetUser){
        this._fillAssistant(userList,timeLableGetUser);
      }
      });

    this.props.dataProvider.getEmpUsers(newValue).then(
      (items: IEmpUserItem[]) => {
          this.setState({
            empUserItems:items,
         //   search_string:newValue
          }as IVisitFormState);
      });

      if (!this.state.isCalloutVisible){
        var heigh = window.innerHeight-event.srcElement.getBoundingClientRect().top-30;
        var width=event.srcElement.parentElement.parentElement.clientWidth-70;
        this.setState({
         // inputValue: newValue,
         // employee: {search_string:newValue,selected_id:''},
          CalloutStyle:{width:""+width+"px",
                        height:heigh+"px",
                        type:'Employee'},
          isCalloutVisible: true
        }as IVisitFormState);
     
      //  console.log(event.srcElement.getBoundingClientRect().top,heigh);
        
   
      }
  
  };

private async _fillAssistant(rows:IUserItem[]&IEmpUserItem[],timeLableGetUser:number) { 
  //  const finalRows =[];
    this.setState({searchCount:rows.length});
    this.setState({userItems: rows });
          rows.forEach( (row,index) => {
            if (this.state.timeLableGetUser==timeLableGetUser){
    
              this.props.dataProvider.getAssistant(row).then((rowA)=>{
                  if (this.state.timeLableGetUser==timeLableGetUser){
                    rows[index].Assistant=rowA;
                  //  console.log('----------------------setStateA',rowA);
                    this.setState({ userItems: rows});
                    if (rowA){                 
                      this.props.dataProvider.getBossUsers(rowA).then((rowBA)=>{
                          if (this.state.timeLableGetUser==timeLableGetUser){
                            rows[index].Assistant.boss=rowBA;
                           // console.log('----------------------setStateBA');
                            this.setState({ userItems: rows });
                          }
                        })
                      }
                  }
              });
                
              this.props.dataProvider.getBossUsers(row).then((rowB)=>{
                  if (this.state.timeLableGetUser==timeLableGetUser){    
                      rows[index].boss=rowB;             
                        if (this.state.timeLableGetUser==timeLableGetUser){    
                          this.setState({ userItems:rows}); 
                        }
                  }   
              })
            }else{
              return;
          }
         })

    return true;
  }


private _hadlerPassSelecting (numFilter: string) {
    this.setState({  passItems:[]});

      if (typeof numFilter == 'string'){
      //  console.log('typeof',numFilter,this.inputPass.value);
        this.setState({
          search_pass_string: numFilter
        }as IVisitFormState );

        if (numFilter.length<1){
            return null;
        }
      }else{
        numFilter = this.inputPass.value?this.inputPass.value:' ';
        
      }
      if (this.state.search_pass_string==numFilter){
        return null;
      }
    this._forCalloutElement=event.srcElement.parentElement.parentElement;

    const  statusFilter: string = '2';//свободна
    const cityFilter: string = this.state.cityFilter;
    const typeFilter: string = this.props.VisitsTypesItem.ID;
    const visitFilter: string = null;
    const activeFilter: string = '1';
    //console.log('_hadlerPassSelecting ', this.props,typeFilter);
    this.props.dataProvider.getPass(numFilter,statusFilter,cityFilter,typeFilter,visitFilter,activeFilter).then(
      (items: IPassItem[]) => {
           this.setState({
            passItems:items,
          }as IVisitFormState);
      });
      
    if (!this.state.isCalloutVisible){
      this.setState({
        CalloutStyle:{width:""+event.srcElement.parentElement.parentElement.clientWidth+"px",type:'Pass'},
        isCalloutVisible: true
      }as IVisitFormState);
    }
  };


private _hadlerBusyPassSelecting (numFilter: string) {
    const timeLableGetPass = Math.random();
    this.setState({  passItems:[],
      timeLableGetPass:timeLableGetPass,
      searchCount:-1});

    if (typeof numFilter == 'string'){
      this.setState({
        search_pass_string: numFilter,
      }as IVisitFormState );
    }else{
      numFilter = this.inputClearPass.value?this.inputClearPass.value:' ';
    }

    const statusFilter: string = '1';//Видана
    const cityFilter: string = this.state.cityFilter;
    const typeFilter: string =this.props.VisitsTypesItem.ID;
    const visitFilter: string = null;
    const activeFilter: string = '1';
    this.props.dataProvider.getPass(numFilter,statusFilter,cityFilter,typeFilter,visitFilter,activeFilter).then(
      (items: IPassItem[]) => {
        if (this.state.timeLableGetPass==timeLableGetPass){
         // console.log(items[0].Modified);
          this._fillPassParams(items,timeLableGetPass);
        }else{
          console.log('return1');
        }
      });

  
  };

  private async _fillPassParams(rows:IPassItem[],timeLableGetPass:number) { 
 if (this.props.VisitsTypesItem.ID=='8'){
    rows.unshift({NumberText:'Номер',CityID:{CityNameUa:"Місто"},PassTypeId:{TypeName:"Тип"},VisitsID:{Visitor:'Відвідувач',EmployeeID:{FAMILYNAME:'Співробітник',FS:''}}});
 }else{
  rows.unshift({NumberText:'Номер',CityID:{CityNameUa:"Місто"},PassTypeId:{TypeName:"Тип"},VisitsID:{Visitor:'Відвідувач',EmployeeID:{FAMILYNAME:'Співробітник',FS:''}}});
  }
      this.setState({passItems: rows,searchCount:rows.length-1 });
            rows.forEach( (row,index) => {
              if(row.Id){
                if (this.state.timeLableGetPass==timeLableGetPass){
            //     console.log(row);
                  this.props.dataProvider.getVisits(null,{ID:row.VisitsIDId}).then((rowV)=>{
                  //  console.log(rowV);
                    if (this.state.timeLableGetPass==timeLableGetPass){    
                          rows[index].VisitsID =rowV[0];             
                            if (this.state.timeLableGetPass==timeLableGetPass){    
                              this.setState({ passItems:rows}); 
                            }else{
                              console.log('return4');
                              return;
                          }
                      } else{
                        console.log('return3');
                        return;
                    }
                  })
                }else{
                  console.log('return2');
                  return;
              }
            }
           })
  
      return true;
    }

private _handlerCityChanged (row){
    this.props.currentUser.SessionInfo.CityID={Id:row.key,CityNameUa:row.text};
    this._refreshVisitsItems();
  }

private _handlerPeriodChanged (row){
    this.props.currentUser.SessionInfo.Period=row.key;
    this._refreshVisitsItems();
  }

private _onSelectDateFrom = (date: Date | null | undefined): void => {
      this.props.currentUser.SessionInfo.DateFrom=date;
      this._refreshVisitsItems();
  };

private _onSelectDateTo = (date: Date | null | undefined): void => {
    this.props.currentUser.SessionInfo.DateTo=date;
    this._refreshVisitsItems();
};

private _onSearch = (newValue: string): void => {
 
    this.setState({search:newValue})
    this.props.onFilterItem({
      CityID:{Id:Number(this.props.currentUser.SessionInfo.CityID.Id)},
      Created:this.props.currentUser.SessionInfo.Period,
      CreatedFrom:this.props.currentUser.SessionInfo.DateFrom,
      CreatedTo:this.props.currentUser.SessionInfo.DateTo,
      search:newValue
  });// переделать на единый вызов в форме!!!!!!
};


private _refreshVisitsItems (){
  this.props.onFilterItem({
    CityID:{Id:Number(this.props.currentUser.SessionInfo.CityID.Id)},
    Created:this.props.currentUser.SessionInfo.Period,
    CreatedFrom:this.props.currentUser.SessionInfo.DateFrom,
    CreatedTo:this.props.currentUser.SessionInfo.DateTo,
    search:this.state.search
});// переделать на единый вызов в форме!!!!!!
}

  
private _onFocusinput (element) {
    element.target.select();
}

private _getCurrentPassTypes () {
   var res = this.props.currentUser.ContextInfo.PassConfig.filter((row,idx)=>{
     if (String(row.VisitsTypeIDId )== String(this.props.VisitsTypesItem.ID) ){
      return true;
    } 
    return false;
  });
   return res;
}

private _handleInputChange(newValue: string) {
    this.setState({
      inputValue: newValue
    }as IVisitFormState );
   
  }

 
private _getFields(items){
    const keyArr = this.props.VisitsTypesItem.ColumnsKeys.split(';');
    return items.filter((row)=>{
      return keyArr.some(key=>key.replace(/(.*?)\*{1}/,"$1")==row.key);
    });   
  }
  
private _handleAddButtonClick(event?: React.MouseEvent<HTMLButtonElement>) {
    this.setState({
      search_pass_string: '',
      search_employee_string: '',
      selectedOrganization: '',
      selectedVisitor: '',
      selectedPostnum: '',
      selectedCity:'',
      selectedcomments: '',
      formValid:''
    }as IVisitFormState );
    this.props.onSwichForm('add');
  }

private _handleClearButtonClick(event?: React.MouseEvent<HTMLButtonElement>) {

    this.props.onSwichForm('clear');
    this.setState({
      search_pass_string: '',
      selectedCity:'',
      formValid:''
    }as IVisitFormState );
    this._hadlerBusyPassSelecting('');
  }

private _handleCancelButtonClick(event?: React.MouseEvent<HTMLButtonElement>) {
    this.setState({
      formValid:''
    });

    this.props.onSwichForm('main');

    this._refreshVisitsItems();
  }

private _handleSaveButtonClick(event?: React.MouseEvent<HTMLButtonElement>) {
    this.setState({
      formValid:''
    });

    var formValid=true;
      switch (String(this.props.VisitsTypesItem.ID)){
          case '1': {if (!this.state.selected_employee_id || !this.state.selectedVisitor||!this.state.selected_pass_id) {formValid=false;}
            break; 
          };
          case '2': {if (!this.state.selected_employee_id || !this.state.selected_pass_id) {formValid=false;}
            break; 
          };
          case '8': {if (!this.state.selected_employee_id || !this.state.selected_pass_id) {formValid=false;}
          break; 
        };
          case '3': {if (!this.state.selected_employee_id ) {formValid=false;} break; };
          case '4':{ if (!this.state.selected_employee_id ) { formValid=false;} break; };
          case '5': {if (!this.state.selected_employee_id ) {formValid=false;} break; };
          case '6': {if (!this.state.selected_employee_id || !this.state.selectedPostnum ) {formValid=false;} break; };
          default :formValid=true;
      }


    if (formValid==true)    {
       //FIX ME Доделать Сохранить визит
   // console.log(this.state);
    if ( this.state.showForm==='edit'){
      this.props.onUpdateVisitItem({
        ID:this.state.selectedVisitID,
        EmployeeID:this.state.selected_employee,
        ui_employee:this.state.selected_employee_type?this.state.selected_employee_id:'',
        //Visitor:this.inputVisitor.value,
        Visitor:this.state.selectedVisitor,
        //Organization:this.inputOrganization.value,
        Organization:this.state.selectedOrganization,
        EmpowermentUsersID: {ID:!this.state.selected_employee_type?this.state.selected_employee_id:''},  //FIX ME
        ui_pass: this.state.selected_pass_id, // FIX ME
        PostNum: this.state.selectedPostnum,// FIX ME
        //Comments:this.inputComments.value,
        Comments:this.state.selectedcomments,
       // IsPassReturned:'0',
        //CityID:{Id:Number(this.state.cityFilter)},
        CityID:{Id:Number(this.state.selectedCity?this.state.selectedCity:this.state.cityFilter)},
        //VisitsTypeID:this.props.VisitsTypesItem.ID+";#"+this.props.VisitsTypesItem.VisitsTypeNameUa
        VisitsTypeID:this.props.VisitsTypesItem.ID, //+
        selectedNotifySwitch:typeof this.state.selectedNotifySwitch !="undefined"?this.state.selectedNotifySwitch:JSON.parse(this.props.VisitsTypesItem.NotifySwitch)
      },{
        ID:this.state.selected_pass_id,
        IDPrev:this.state.prev_selected_pass_id
      },{
        CreatedTo:this.props.currentUser.SessionInfo.DateTo,
        CreatedFrom:this.props.currentUser.SessionInfo.DateFrom,
        Created:this.props.currentUser.SessionInfo.Period,
        CityID:{Id:Number(this.props.currentUser.SessionInfo.CityID.Id)}
        //CityID:{Id:Number(this.state.selectedCity?this.state.selectedCity:this.state.cityFilter)},
      });

      this.setState({
        itemForEdit:{},
        selectedVisitor:'',
        selectedPostnum:'',
      // selectedOrganization:'',
        selected_pass_id:'',
        search_pass_string:'',
        selectedcomments:'',
        formValid:''
      });
        this.props.onSwichForm('main');

        
        //this._refreshVisitsItems();
      }else{
        var IsPassReturned = '0' 
       

        if (!((this.props.VisitsTypesItem.ColumnsKeys.split(';').some(key=>key=='passreturned'))
              ||(this.props.VisitsTypesItem.ColumnsKeys.split(';').some(key=>key=='docstransfer')))
          ){
       
            IsPassReturned='1';
          }
      // console.log(this.state.selectedNotifySwitch);
      // console.log(JSON.parse(this.props.VisitsTypesItem.NotifySwitch));
        this.props.onCreateVisitItem({
          ID:this.state.selectedVisitID,
          EmployeeID:this.state.selected_employee,
          ui_employee:this.state.selected_employee_type?this.state.selected_employee_id:'',
          //Visitor:this.inputVisitor.value,
          Visitor:this.state.selectedVisitor,
          //Organization:this.inputOrganization.value,
          Organization:this.state.selectedOrganization,
          EmpowermentUsersID: {ID:!this.state.selected_employee_type?this.state.selected_employee_id:''},  //FIX ME
          ui_pass: this.state.selected_pass_id, // FIX ME
          PassID: {NumberText:this.state.search_pass_string},
          PostNum: this.state.selectedPostnum,// FIX ME
          //Comments:this.inputComments.value,
          Comments:this.state.selectedcomments,
          IsPassReturned:IsPassReturned,
          //CityID:{Id:Number(this.state.cityFilter)},
          CityID:{Id:Number(this.state.selectedCity?this.state.selectedCity:this.state.cityFilter)},
          //VisitsTypeID:this.props.VisitsTypesItem.ID+";#"+this.props.VisitsTypesItem.VisitsTypeNameUa
          VisitsTypeID:this.props.VisitsTypesItem.ID, //+
          selectedNotifySwitch:typeof this.state.selectedNotifySwitch !="undefined"?this.state.selectedNotifySwitch:JSON.parse(this.props.VisitsTypesItem.NotifySwitch)
        },{
          ID:this.state.selected_pass_id
        },{
          CreatedTo:this.props.currentUser.SessionInfo.DateTo,
          CreatedFrom:this.props.currentUser.SessionInfo.DateFrom,
          Created:this.props.currentUser.SessionInfo.Period,
          CityID:{Id:Number(this.props.currentUser.SessionInfo.CityID.Id)}
          //CityID:{Id:Number(this.state.selectedCity?this.state.selectedCity:this.state.cityFilter)},
        });
  
//console.log(this.state.selected_pass_id,this.state.search_pass_string);
        this.setState({
          itemForEdit:{},
          selectedVisitor:'',
          selectedPostnum:'',
        // selectedOrganization:'',
          selected_pass_id:'',
          search_pass_string:'',
          selectedcomments:'',
          formValid:''
        });


//console.log(this.state);
if (this.props.VisitsTypesItem.SaveFields!="1"){
//console.log('clear Fields');
        this.setState({
          search_pass_string: '',
          selected_pass_id:'',
          search_employee_string:'',
          selected_employee:'',
          selected_employee_id:'',
          selectedOrganization:'',
          selectedVisitor:'',
          selectedPostnum:'',
          selectedcomments:''
        
        }as IVisitFormState );
      }else{

      }
    //  console.log(this.state.selected_pass_id,this.state.search_pass_string);
      }
    }else{
      this.setState({
      formValid:'Не всі обов\'язкові поля заповнені!'
      });
     // console.log(this.state);
    }
  }

  
}
   
     
      