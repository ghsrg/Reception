<?php

$TableConfig = array(
	'Employees' => '<UpdateList xmlns="http://schemas.microsoft.com/sharepoint/soap/">
                        <listName>Employees</listName>
                        <newFields>
                                <Fields>
                                 <Method ID="10" AddToView="">
                                        <Field DisplayName="HRID" Type="Text" Required="TRUE"></Field>
                                 </Method>
                                 <Method ID="11" AddToView="">
                                        <Field DisplayName="FAMILYNAME" Type="Text"></Field>
                                 </Method>
                                 <Method ID="12" AddToView="">
                                        <Field DisplayName="FS" Type="Text"></Field>
                                 </Method>
                                 <Method ID="13" AddToView="">
                                        <Field DisplayName="EMAIL" Type="Text"></Field>
                                 </Method>
                                 <Method ID="14" AddToView="">
                                        <Field DisplayName="PHONE" Type="Text"></Field>
                                 </Method>
                                 <Method ID="15" AddToView="">
                                        <Field DisplayName="POSITION" Type="Text"></Field>
                                 </Method>
                                 <Method ID="16" AddToView="">
                                        <Field DisplayName="DEPARTMENT" Type="Text"></Field>
                                 </Method>
                                 <Method ID="17" AddToView="">
                                        <Field DisplayName="BOSSID" Type="Text"></Field>
                                 </Method>
                                 <Method ID="18" AddToView="">
                                        <Field DisplayName="STATUS" Type="Text"></Field>
                                 </Method>
                                 <Method ID="19" AddToView="">
                                        <Field DisplayName="LOCATION" Type="Text"></Field>
                                 </Method>
                                 <Method ID="20" AddToView="">
                                        <Field DisplayName="UserProfile_GUID" Type="Text"></Field>
                                 </Method>
                                 <Method ID="21" AddToView="">
                                        <Field DisplayName="AccountName" Type="Text"></Field>
                                 </Method>
                                 <Method ID="22" AddToView="">
                                        <Field DisplayName="LastName" Type="Text"></Field>
                                 </Method>
                                 <Method ID="23" AddToView="">
                                        <Field DisplayName="" Type="Text"></Field>
                                 </Method>
                                 <Method ID="24" AddToView="">
                                        <Field DisplayName="Manager" Type="Text"></Field>
                                 </Method>
                                 <Method ID="25" AddToView="">
                                        <Field DisplayName="PictureURL" Type="Text"></Field>
                                 </Method>
                                 <Method ID="26" AddToView="">
                                        <Field DisplayName="FIO" Type="Text"></Field>
                                 </Method>
                                </Fields>
                        </newFields>
						<updateFields>
                                <Fields>
								 <Method ID="1">
                                        <Field Type="Text" Name="Title" Required="FALSE"/>
                                </Method>
                                </Fields>
                         </updateFields>
                         <deleteFields>
                                 <Fields>
                                 </Fields>
                         </deleteFields>
                </UpdateList>',
				
	'Cities' => '<UpdateList xmlns="http://schemas.microsoft.com/sharepoint/soap/">
                        <listName>Cities</listName>
                        <newFields>
                                <Fields>
                                 <Method ID="10" AddToView="">
                                        <Field DisplayName="CityNameUa" Name="CityNameUa" Type="Text" Required="TRUE"></Field>
                                 </Method>
								  <Method ID="11" AddToView="">
                                        <Field DisplayName="RemoveDate" Name="RemoveDate" Type="Text"></Field>
                                 </Method>
                                </Fields>
                        </newFields>
						<updateFields>
                                <Fields>
								<Method ID="1">
                                        <Field Type="Text" Name="Title" Required="FALSE"/>
                                </Method>
                                </Fields>
                         </updateFields>
                         <deleteFields>
                                 <Fields>
                                 </Fields>
                         </deleteFields>
                </UpdateList>',			
				
	'CustomerService' => '<UpdateList xmlns="http://schemas.microsoft.com/sharepoint/soap/">
                        <listName>CustomerService</listName>
                        <newFields>
                                <Fields>
                                 <Method ID="10" AddToView="">
                                        <Field DisplayName="EmployeeID" Name="EmployeeID" Type="Lookup" List="{Employees}" ShowField="AccountName"></Field>
                                 </Method>
                                 <Method ID="11" AddToView="">
                                        <Field DisplayName="CityID" Name="CityID" Type="Lookup" List="{Cities}" ShowField="CityNameUa"></Field>
                                 </Method>
                                </Fields>
                        </newFields>
						<updateFields>
                                <Fields>
                               <Method ID="1">
                                        <Field Type="Text" Name="Title" Required="FALSE"/>
                                </Method>
                                </Fields>
                         </updateFields>
                         <deleteFields>
                                 <Fields>
                                 </Fields>
                         </deleteFields>
                </UpdateList>',
				
				
	'ReceptionUsers' => '<UpdateList xmlns="http://schemas.microsoft.com/sharepoint/soap/">
                        <listName>ReceptionUsers</listName>
                        <newFields>
                                <Fields>
								<Method ID="9" AddToView="">
                                        <Field DisplayName="EmployeeID" Name="EmployeeID" Type="Lookup" List="{Employees}" ShowField="AccountName"></Field>
                                 </Method>
                                 <Method ID="10" AddToView="">
                                         <Field DisplayName="CityID" Name="CityID" Type="Lookup" List="{Cities}" ShowField="CityNameUa"></Field>
                                 </Method>
								  <Method ID="11" AddToView="">
                                        <Field DisplayName="InActiveDate" Name="InActiveDate" Type="Text"></Field>
                                 </Method>
                                </Fields>
                        </newFields>
						<updateFields>
                                <Fields>
                               <Method ID="1">
                                        <Field Type="Text" Name="Title" Required="FALSE"/>
                                </Method>
                                </Fields>
                         </updateFields>
                         <deleteFields>
                                 <Fields>
                                 </Fields>
                         </deleteFields>
                </UpdateList>',
				
				
	'PersonalPass' => '<UpdateList xmlns="http://schemas.microsoft.com/sharepoint/soap/">
                        <listName>PersonalPass</listName>
                        <newFields>
                                <Fields>
                                 <Method ID="10" AddToView="">
                                        <Field DisplayName="NumberText" Name="NumberText" Type="Text" Required="TRUE"></Field>
                                 </Method>
                                 <Method ID="11" AddToView="">
                                        <Field DisplayName="StatusID" Name="StatusID" Type="Lookup" List="{PassStatus}" ShowField="StatusName"></Field>
                                 </Method>
								 <Method ID="12" AddToView="">
                                         <Field DisplayName="CityID" Required="TRUE" Name="CityID" Type="Lookup" List="{Cities}" ShowField="CityNameUa"></Field>
                                 </Method>
								 <Method ID="13" AddToView="">
                                        <Field DisplayName="PassTypeId" Required="TRUE" Name="PassTypeId" Type="Lookup" List="{PassType}" ShowField="TypeName"></Field>
                                 </Method>
								 <Method ID="14" AddToView="">
                                        <Field DisplayName="VisitsID" Name="VisitsID" Type="Lookup" List="{Visits}" ShowField="ID"></Field>
                                 </Method>
								 <Method ID="15" AddToView="">
                                        <Field DisplayName="RemoveDate" Name="RemoveDate" Type="Text"></Field>
                                 </Method>
                                </Fields>
                        </newFields>
						<updateFields>
                                <Fields>
                                <Method ID="1">
                                        <Field Type="Text" Name="Title" Required="FALSE"/>
                                </Method>
                                </Fields>
                         </updateFields>
                         <deleteFields>
                                 <Fields>
                                 </Fields>
                         </deleteFields>
                </UpdateList>',
				
				
	'PassStatus' => '<UpdateList xmlns="http://schemas.microsoft.com/sharepoint/soap/">
                        <listName>PassStatus</listName>
                        <newFields>
                                <Fields>
                                 <Method ID="10" AddToView="">
                                        <Field DisplayName="StatusName" Name="StatusName" Type="Text" Required="TRUE"></Field>
                                 </Method>
                                 <Method ID="11" AddToView="">
                                        <Field DisplayName="RemoveDate" Name="RemoveDate" Type="Text"></Field>
                                 </Method>
                                </Fields>
                        </newFields>
						<updateFields>
                                <Fields>
                               <Method ID="1">
                                        <Field Type="Text" Name="Title" Required="FALSE"/>
                                </Method>
                                </Fields>
                         </updateFields>
                         <deleteFields>
                                 <Fields>
                                 </Fields>
                         </deleteFields>
                </UpdateList>',
				
				
	'PassType' => '<UpdateList xmlns="http://schemas.microsoft.com/sharepoint/soap/">
                        <listName>PassType</listName>
                        <newFields>
                                <Fields>
                                 <Method ID="10" AddToView="">
                                        <Field DisplayName="TypeName" Name="TypeName" Type="Text" Required="TRUE"></Field>
                                 </Method>
								 <Method ID="11" AddToView="">
                                       <Field DisplayName="VisitsTypeID" Name="VisitsTypeID" Type="Lookup" List="{VisitsTypes}" ShowField="VisitsTypeNameUa"></Field>
                                 </Method>
                                 <Method ID="12" AddToView="">
                                        <Field DisplayName="RemoveDate" Name="RemoveDate" Type="Text"></Field>
                                 </Method>
                                </Fields>
                        </newFields>
						<updateFields>
                                <Fields>
								<Method ID="1">
                                        <Field Type="Text" Name="Title" Required="FALSE"/>
                                </Method>
                                </Fields>
                         </updateFields>
                         <deleteFields>
                                 <Fields>
                                 </Fields>
                         </deleteFields>
                </UpdateList>',
				
	'EmpowermentUsers' => '<UpdateList xmlns="http://schemas.microsoft.com/sharepoint/soap/">
                        <listName>EmpowermentUsers</listName>
                        <newFields>
                                <Fields>
								   <Method ID="10" AddToView="">
                                        <Field DisplayName="FIO" Name="FIO" Type="Text" Required="TRUE"></Field>
                                 </Method>
								 <Method ID="11" AddToView="">
                                        <Field DisplayName="Organization" Name="Organization" Type="Text" Required="TRUE"></Field>
                                 </Method>
                                 <Method ID="12" AddToView="">
                                        <Field DisplayName="TypeName" Name="TypeName" Type="Text"></Field>
                                 </Method>
								  <Method ID="13" AddToView="">
                                        <Field DisplayName="Phone" Name="Phone" Type="Text"></Field>
                                 </Method>
								 <Method ID="14" AddToView="">
                                        <Field DisplayName="EMAIL" Name="EMAIL" Type="Text"></Field>
                                 </Method>
								  <Method ID="15" AddToView="">
                                        <Field DisplayName="InActiveDate" Name="InActiveDate" Type="Text"></Field>
                                 </Method>
								 
                                </Fields>
                        </newFields>
						<updateFields>
                                <Fields>
                                <Method ID="1">
                                        <Field Type="Text" Name="Title" Required="FALSE"/>
                                </Method>
                                </Fields>
                         </updateFields>
                         <deleteFields>
                                 <Fields>
                                 </Fields>
                         </deleteFields>
                </UpdateList>',
				
				
		'VisitsTypes' => '<UpdateList xmlns="http://schemas.microsoft.com/sharepoint/soap/">
                        <listName>VisitsTypes</listName>
                        <newFields>
                                <Fields>
                                 <Method ID="10" AddToView="">
                                        <Field DisplayName="VisitsTypeNameUa" Name="VisitsTypeNameUa" Type="Text" Required="TRUE"></Field>
                                 </Method>
								  <Method ID="11" AddToView="">
                                        <Field DisplayName="ItemIcon" Name="ItemIcon" Type="Text"></Field>
                                 </Method>
								 <Method ID="12" AddToView="">
                                        <Field DisplayName="NotifyTo" Name="NotifyTo" Type="Text"></Field>
                                 </Method>
								 <Method ID="13" AddToView="">
                                        <Field DisplayName="NotifySwitch" Name="NotifySwitch" Type="Text"></Field>
                                 </Method>
								 <Method ID="14" AddToView="">
                                        <Field DisplayName="RemoveDate" Name="RemoveDate" Type="Text"></Field>
                                 </Method>
								 <Method ID="15" AddToView="">
                                        <Field DisplayName="ColumnsKeys" Name="ColumnsKeys" Type="Text"></Field>
                                 </Method>
                                </Fields>
                        </newFields>
						<updateFields>
                                <Fields>
								<Method ID="1">
                                        <Field Type="Text" Name="Title" Required="FALSE"/>
                                </Method>
                                </Fields>
                         </updateFields>
                         <deleteFields>
                                 <Fields>
                                 </Fields>
                         </deleteFields>
                </UpdateList>',	
				
	'Visits' => '<UpdateList xmlns="http://schemas.microsoft.com/sharepoint/soap/">
                        <listName>Visits</listName>
                        <newFields>
                                <Fields>
                                 <Method ID="10" AddToView="">
                                       <Field DisplayName="EmployeeID" Name="EmployeeID" Type="Lookup" List="{Employees}" ShowField="HRID"></Field>
                                 </Method>
                                 <Method ID="11" AddToView="">
                                        <Field DisplayName="EmpowermentUsersID" Name="EmpowermentUsersID" Type="Lookup" List="{EmpowermentUsers}" ShowField="FIO"></Field>
                                 </Method>
								    <Method ID="12" AddToView="">
                                        <Field DisplayName="Visitor" Name="Visitor" Type="Text"></Field>
                                 </Method>
								    <Method ID="13" AddToView="">
                                        <Field DisplayName="Organization" Name="Organization" Type="Text"></Field>
                                 </Method>
								    <Method ID="14" AddToView="">
                                        <Field DisplayName="PassID" Name="PassID" Type="Lookup" List="{PersonalPass}" ShowField="NumberText"></Field> 
                                 </Method>
								    <Method ID="15" AddToView="">
                                        <Field DisplayName="PostNum" Name="PostNum" Type="Text"></Field>
                                 </Method>
								    <Method ID="16" AddToView="">
                                        <Field DisplayName="Comments" Name="Comments" Type="Text"></Field>
                                 </Method>		
								    <Method ID="17" AddToView="">
                                        <Field DisplayName="IsPassReturned" Name="IsPassReturned" Type="Text"></Field>
                                 </Method>		
								    <Method ID="18" AddToView="">
                                        <Field DisplayName="VisitsTypeID" Name="VisitsTypeID" Type="Lookup" List="{VisitsTypes}" ShowField="VisitsTypeNameUa"></Field>
                                 </Method>		
								<Method ID="19" AddToView="">
                                         <Field DisplayName="CityID" Required="TRUE" Name="CityID" Type="Lookup" List="{Cities}" ShowField="CityNameUa"></Field>
                                 </Method>								 
                                </Fields>
                        </newFields>
						<updateFields>
                                <Fields>
								<Method ID="1">
                                        <Field Type="Text" Name="Title" Required="FALSE"/>
                                </Method>
                                </Fields>
                         </updateFields>
                         <deleteFields>
                                 <Fields>
                                 </Fields>
                         </deleteFields>
                </UpdateList>',
				
				
	'Assistants' => '<UpdateList xmlns="http://schemas.microsoft.com/sharepoint/soap/">
                        <listName>Assistants</listName>
                        <newFields>
                                <Fields>
								<Method ID="10" AddToView="">
                                        <Field DisplayName="ManagerID" Name="ManagerID" Type="Lookup" List="{Employees}" ShowField="AccountName"></Field>
									
                                 </Method>
                                 <Method ID="11" AddToView="">
                                        <Field DisplayName="AssistantID" Name="AssistantID" Type="Lookup" List="{Employees}" ShowField="AccountName"></Field>
                                 </Method>
                                </Fields>
                        </newFields>
						<updateFields>
                                <Fields>
								<Method ID="1">
                                        <Field Type="Text" Name="Title" Required="FALSE"/>
                                </Method>
                                </Fields>
                         </updateFields>
                         <deleteFields>
                                 <Fields>
                                 </Fields>
                         </deleteFields>
                </UpdateList>',
				

		
				
	
				
'ConfigTable' => '<UpdateList xmlns="http://schemas.microsoft.com/sharepoint/soap/">
                        <listName>ConfigTable</listName>
                        <newFields>
                                <Fields>
                                 <Method ID="10" AddToView="">
                                        <Field DisplayName="TableName" Name="TableName" Type="Text"></Field>
                                 </Method>
								  <Method ID="11" AddToView="">
                                        <Field DisplayName="TableID" Name="TableID" Type="Text"></Field>
                                 </Method>
                                </Fields>
                        </newFields>
						<updateFields>
                                <Fields>
								<Method ID="1">
                                        <Field Type="Text" Name="Title" Required="FALSE"/>
                                </Method>
                                </Fields>
                         </updateFields>
                         <deleteFields>
                                 <Fields>
                                 </Fields>
                         </deleteFields>
                </UpdateList>'
);				
?>
