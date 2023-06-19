import * as React from 'react';
import IPivotContentProps from './IPivotContentProps';
import IPivotContentState from './IPivotContentState';
import IVisitsItem from '../../models/IVisitsItem';
import styles from './PivotContent.module.scss';
import VisitsList from '../VisitsList/VisitsList';
import VisitForm from '../VisitForm/VisitForm';
import IPassItem from '../../models/IPassItem';
import INotify from '../../models/INotify';



export default class PivotContent extends React.Component<IPivotContentProps,IPivotContentState> {
  constructor(props: IPivotContentProps) {
    super(props);
    this._refreshVisitsItem = this._refreshVisitsItem.bind(this);
    this._swichForm = this._swichForm.bind(this);
    this._editRow = this._editRow.bind(this);
    this._fillPassID=this._fillPassID.bind(this);
    this._createVisitItem=this._createVisitItem.bind(this);
    this._updateVisitItem=this._updateVisitItem.bind(this);
    this._exportDate=this._exportDate.bind(this);
    this._changePassStatus=this._changePassStatus.bind(this);
    this._refreshVisitsItems=this._refreshVisitsItems.bind(this);
  
    this.state = {
      userItems: [],
      visitsItems:[],
      showForm: 'main',
      exportData:false
      };
   
  }

  private ref2VisitList : any;
  private ref2VisitForm : any;

  componentDidMount(){
    if (!this.state.userItems.length || this.state.userItems.length==0 ){
        this._refreshVisitsItem({});
    }
  }

  public render(): JSX.Element {
   return (
    <div  className="ms-slideDownIn20">
      <div><br></br> </div>
      <VisitForm 
              VisitsTypesItem = {this.props.VisitsTypesItem} 
              onFilterItem={ this._refreshVisitsItem} 
              showForm={this.state.showForm} 
              onSwichForm={this._swichForm}  
              dataProvider={this.props.dataProvider} 
              currentUser={this.props.currentUser}
              onCreateVisitItem={this._createVisitItem}
              onUpdateVisitItem={this._updateVisitItem}
              exportDate={this._exportDate}
              ref={ref => (this.ref2VisitForm = ref)}
              itemForEdit={this.state.itemForEdit}

      />

      { this.state.showForm!='clear' &&
      
        <div className={styles.bord} >
           {<VisitsList  
              VisitsTypesItem = {this.props.VisitsTypesItem} 
              items={this.state.visitsItems}
              currentUser={this.props.currentUser}
              exportData={this.state.exportData}
              dblClick={this._editRow}
              onClickClearPass={this._changePassStatus}
              onRefreshVisitsItems={this._refreshVisitsItems}
              
              ref={ref => (this.ref2VisitList = ref)} 
            />
           }
        </div> 
        
      }
  </div>  
  );
  }

private _swichForm(value: string ){
  this.setState({showForm:value});
}

private _refreshVisitsItems (){
  this.ref2VisitForm.refreshVisitsItems();
}

private _editRow(value,obj,event){
  this.setState({showForm:'edit',
      itemForEdit:value.item
       });
}

private _changePassStatus(id:string,status:string,VisitsIDId:string){ 
  return  this.ref2VisitForm.changePassStatus(id,status,VisitsIDId);
}

private _exportDate(data){
  this.ref2VisitList.exportToExel();
}

private _refreshVisitsItem(filter: IVisitsItem) {
  const timeLableGetVisits = Math.random();
  this.setState({
       timeLableGetVisits:timeLableGetVisits
   });
    filter = {...{CityID:{Id:Number(this.props.currentUser.SessionInfo.CityID.Id)},
                  Created:this.props.currentUser.SessionInfo.Period,
                  CreatedFrom:this.props.currentUser.SessionInfo.DateFrom,
                  CreatedTo:this.props.currentUser.SessionInfo.DateTo
              },...filter};
   
      this.props.dataProvider.getVisits(this.props.VisitsTypesItem.ID,filter)
      .then((rows: IVisitsItem[]) => {
          if (this.state.timeLableGetVisits==timeLableGetVisits){
            this._fillPassID(rows,timeLableGetVisits);
          }
      });
}

private async _fillPassID(rows:IVisitsItem[],timeLable) { 
        const finalRows =[];
        var i=1;
        while(rows.length>0) {
          if (this.state.timeLableGetVisits==timeLable){
            i=2*i;
            i=i<300?i:300;
            const partOfRows =    rows.splice(0, i);
              const new_rows : IVisitsItem[]= await Promise.all(
                partOfRows.map(async (row) => {
                  if (typeof row.PassID=='object'){
                    const result = await this.props.dataProvider.getPassParams(row.PassID.ID);
                    typeof row.PassID=='object'?row.PassID=result:null;

                  }
                
                    return  row;
                })
            
                ); 
                Array.prototype.push.apply(finalRows,new_rows);
                if (this.state.timeLableGetVisits==timeLable){
                  this.setState({ visitsItems: finalRows });
                }
            }else{
              return ;
            }
          }
          if (this.state.timeLableGetVisits==timeLable){
            this.setState({ visitsItems: finalRows });
          }
        return true;
}

private _updateVisitItem(visit: IVisitsItem,pass:IPassItem,filter:IVisitsItem): Promise<any> {
  const timeLableGetVisits = Math.random();
  this.setState({
       timeLableGetVisits:timeLableGetVisits
   });
    return this.props.dataProvider.updateVisit(visit,pass,filter).then(
      (rows: IVisitsItem[]) => {
        if (this.state.timeLableGetVisits==timeLableGetVisits){
         this._fillPassID(rows,timeLableGetVisits);
        }
      });
      
}

private _createVisitItem(visit: IVisitsItem,pass:IPassItem,filter:IVisitsItem): Promise<any> {
//  console.log('_createVisitItem');
  const timeLableGetVisits = Math.random();
  this.setState({
       timeLableGetVisits:timeLableGetVisits
   });
    return this.props.dataProvider.createVisit(visit,pass,filter).then(
      (rows: IVisitsItem[]) => {
        if (this.state.timeLableGetVisits==timeLableGetVisits){
          this._fillPassID(rows,timeLableGetVisits);
        }
      }).then(()=>{
        //console.log('getNotifyParams');
        return this.props.dataProvider.getNotifyParams({VisitsTypeId:this.props.VisitsTypesItem.ID})
        .then((msgArr:INotify[])=>{
         // console.log(visit,msgArr);
          if(visit.selectedNotifySwitch){
            msgArr.forEach( (msg,index) => {
              let To=[visit.EmployeeID.EMAIL];
              let headerBody =`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
              <html>
              <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
              </head>
              <body>
              `;
              let postBody =` 
              </body>
              </html>`;

                if (msg.TypeNotify=='MAIL'){
                  if (msg.To){
                    To=msg.To.split(';');
                  }

                   this.props.dataProvider.sendMail({
                    To: To,
                    CC: msg.ToCC?msg.ToCC.split(';'):[],
                    Subject: msg.Subject?msg.Subject
                    .replace('{FS}',visit.EmployeeID.FS)
                    .replace('{FAMILYNAME}',visit.EmployeeID?visit.EmployeeID.FAMILYNAME:'')
                    .replace('{Visitor}',visit.Visitor)
                    .replace('{Organization}',visit.Organization)
                    .replace('{Comments}',visit.Comments)
                    .replace('{PostNum}',visit.PostNum)
                    .replace('{Pass}',visit.PassID?visit.PassID.NumberText:'')
                    .replace('&#123;FS&#125;',visit.EmployeeID.FS)
                    .replace('&#123;FAMILYNAME&#125;',visit.EmployeeID?visit.EmployeeID.FAMILYNAME:'')
                    .replace('&#123;Visitor&#125;',visit.Visitor)
                    .replace('&#123;Organization&#125;',visit.Organization)
                    .replace('&#123;Comments&#125;',visit.Comments)
                    .replace('&#123;PostNum&#125;',visit.PostNum)
                    .replace('&#123;Pass&#125;',visit.PassID?visit.PassID.NumberText:'')
                    .replace('&#123;Created&#125;',visit.Created)
                    :"Повідомлення від рецепції",
                    Body: msg.Body?
                      headerBody+
                      msg.Body
                      .replace('{FS}',visit.EmployeeID.FS)
                      .replace('{FAMILYNAME}',visit.EmployeeID?visit.EmployeeID.FAMILYNAME:'')
                      .replace('{Visitor}',visit.Visitor)
                      .replace('{Organization}',visit.Organization)
                      .replace('{Comments}',visit.Comments)
                      .replace('{PostNum}',visit.PostNum)
                      .replace('{Pass}',visit.PassID?visit.PassID.NumberText:'')
                      .replace('&#123;FS&#125;',visit.EmployeeID.FS)
                      .replace('&#123;FAMILYNAME&#125;',visit.EmployeeID?visit.EmployeeID.FAMILYNAME:'')
                      .replace('&#123;Visitor&#125;',visit.Visitor)
                      .replace('&#123;Organization&#125;',visit.Organization)
                      .replace('&#123;Comments&#125;',visit.Comments)
                      .replace('&#123;PostNum&#125;',visit.PostNum)
                      .replace('&#123;Pass&#125;',visit.PassID?visit.PassID.NumberText:'')
                      .replace('&#123;Created&#125;',visit.Created)
                      +postBody
                    :headerBody+`067-237-22-60,<br>067-237-20-11<br>Рецепція​`+postBody
                    
                  });
                }else{
                  console.log('uncknown TypeNotify '+msg.TypeNotify);
                }
            })
          }

        });
    })
      
  }
          


}
