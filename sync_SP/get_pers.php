<?php

// Sergey Korotenko  16-07-2018
require_once("./Thybag/SharePointAPI.php");
require_once("./Thybag/Auth/SoapClientAuth.php");
require_once("./Thybag/Auth/StreamWrapperHttpAuth.php");
require_once("./Thybag/Auth/SharePointOnlineAuth.php");

require_once("./list_config.php");
require_once("./list_data.php");
use Thybag\SharePointAPI;
#$action = 'data'; //install data sync 
$action =getopt('',['action:']);
if (!$action){
	echo "Select action:\n--action install\n--action data\n--action sync\n";
	exit;

}
$action =$action['action'];
echo "Starting $action action...\n";
#$sp = new SharePointAPI('i:0#.w|domain\\user', '', './Lists.asmx');
#$sp = new SharePointAPI('i:0#.w|domain\\user', '', 'http://sp.domain/departments/ERM/test_ERM/_vti_bin/Lists.asmx?WSDL','NTLM');
#$sp = new SharePointAPI('domain\\user', '', 'http://sp.domain/departments/ERM/test_ERM/_vti_bin/Lists.asmx?WSDL','NTLM');
#$sp_prof = new SharePointAPI('domain\\user', '', 'http://sp.domain/departments/ERM/test_ERM/_vti_bin/userprofileservice.asmx?WSDL','NTLM');

$sp = new SharePointAPI('domain\\KSRECEPTION', 'pass', 'http://ksreception/_vti_bin/Lists.asmx?WSDL','NTLM');
$sp_prof = new SharePointAPI('domain\\KSRECEPTION', 'pass', 'http://ksreception/_vti_bin/userprofileservice.asmx?WSDL','NTLM');
$sp_group = new SharePointAPI('domain\\KSRECEPTION', 'pass', 'http://ksreception/_vti_bin/UserGroup.asmx?WSDL','NTLM');

#$sps = new SharePointAPI('domain\\user', '', 'http://sp.domain/sites/myappcatalog/_vti_bin/Lists.asmx?WSDL','NTLM');
#$sp_profs = new SharePointAPI('domain\\user', '', 'http://sp.domain/sites/myappcatalog/_vti_bin/userprofileservice.asmx?WSDL','NTLM');

#$sp_prof = new SharePointAPI('domain\\user', '', 'http://ksreception/_vti_bin/userprofileservice.asmx?WSDL','NTLM');
$intranet_prof = new SharePointAPI('domain\\KSRECEPTION', 'pass', 'http://intranet.domain/cd/_vti_bin/userprofileservice.asmx?WSDL','NTLM');
#$sp = new SharePointAPI('domain\\user', '', './Lists.asmx');
#$sp = new SharePointAPI('kor.srg@sergtest.onmicrosoft.com', '', 'https://sergtest.sharepoint.com/sites/TestSite/_vti_bin/Lists.asmx?WSDL','SPONLINE');


# //If thete are no list - create it
$config_table=[];
$tmp_config_table=[];
#$tmp_config_table['Employees']='{bf603e32-62a5-4044-9af0-16b4372bb5fa}'; //TMP line for debug
if ($action == 'install'){

	foreach ($TableConfig as $TableName=>$TableFields){
		if ($sp->readListMeta($TableName) == NULL){
	echo("Creating Table ".$TableName."\n");

			$resp=$sp->addList($TableName,'', 100);
			$xml = new SimpleXMLElement($resp["raw_xml"]);
			$config_table[]=array('TableName'=>$TableName, 'TableID'=>$xml->attributes()['ID']);
			$tmp_config_table[$TableName]=$xml->attributes()['ID'];
#var_dump($xml->attributes()['ID']);
			sleep(1);
#			$sp->ModifyListFields($TableFields);
		}else{
	echo("Table ".$TableName.' exists'."\n");
}
	}

function arrModify($element){return '{'.$element.'}';}

if(count($tmp_config_table)>0){
	foreach ($TableConfig as $TableName=>$TableFields){
	
		if (array_key_exists($TableName,$tmp_config_table)){
			$find       = array_keys($tmp_config_table);
		  	$find=	array_map("arrModify",$find);
			$replace    = array_values($tmp_config_table);
			$TableFields = str_ireplace($find, $replace, $TableFields);
		echo("Configuration table ".$TableName."\n");

	           $result=     $sp->ModifyListFields($TableFields);
#var_dump($result);
		}
	}
}else{

	echo("No table for configuration\n");


}
#save created ID's in config table
#var_dump($config_table);
                $arr_size_for_write = 100;
                 while (count($config_table)>0){
                        $sp->writeMultiple('ConfigTable',array_slice($config_table,0,$arr_size_for_write));
                        array_splice($config_table,0,$arr_size_for_write);
                 }

	#exit;

}
 
if ($action == 'data'){
	foreach ($InstallDataAdd as $TableName=>$TableData){
		$arr_size_for_write = 100;
		if (count($TableData)>0){
		 while (count($TableData)>0){
                $result =$sp->writeMultiple($TableName,array_slice($TableData,0,$arr_size_for_write));
                	array_splice($TableData,0,$arr_size_for_write);
		var_dump($result);
        	 }
		
		}
	}


}

if ($action == 'sync'){

$conn = oci_connect('user', 'pass', 'host:1521/ucmsmain','UTF8');
  if (!$conn) {    $e = oci_error();    trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);}

$stid = oci_parse($conn, ' SELECT r.*, rl.loginname FROM ulcimus.V_EMPLOYEE4RECEPTION r, ulcimus.V_EMPLOYEE4RECEPTION_login rl where r.id=rl.id  and rownum<200000  ');
 if (!$stid) {    $e = oci_error($conn);    trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);}
#
$r = oci_execute($stid);
 if (!$r) {      $e = oci_error($stid);    trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);}#

$fp = fopen('/home/jive/sync_SP/emp.csv', 'w');


$HRListName = 'Employees';
$EmpDataAdd = array();
$EmpDataUpd = array();
$count=0;
		$SPList = $sp->read($HRListName, NULL, NULL, array("ID","hrid"));

#	var_dump($SPList);	
#	$Arr4Del=array();
#	foreach ($SPList as $rec) {
#		array_push($Arr4Del,$rec["title"]);	
#	}
#	var_dump($Arr4Del);
#var_dump($SPList);

while ($row = oci_fetch_array($stid, OCI_ASSOC+OCI_RETURN_NULLS)) {
$count++;
#	if ($i==0){
#    		fputcsv($fp, array_keys($row),";");
		#$EmpData[$i] = array(HIRD=>$row['ID'],FAMILYNAME=>$row['FAMILYNAME']);
#		var_dump($row);
#		$i++;
#	}
		
		#var_dump($row['ID']);
		#var_dump(array_column($SPList,'hrid'));
		$SPListKey = array_search($row['ID'], array_column($SPList,'hrid'));

		#var_dump($SPListKey);
echo $row['ID']. ", Array key = ". $SPListKey.", SP key =  ".$SPList[$SPListKey]['id']."SP_size = ".count($SPList).". ";
		if ($SPListKey>-1){
			array_splice($SPList,$SPListKey,1);		
		}
		$SPRec = $sp->read($HRListName, 1, array('HRID'=>$row['ID']));

		#var_dump(1111,$SPRec);
		if (array_key_exists('0',$SPRec)){
			$SPRow = $SPRec[0];
		} 
		$UserProfive = $sp_prof->GetUserProfileByName($row['LOGINNAME']); # Insert Login into ULCIMUS View
		$AddUser2Group = $sp_group->AddUserToGroup('noPerm',$row['LOGINNAME']); # Insert user to noPermission group for sending email
		$AddUser2GroupCloud = $sp_group->AddUserToGroup('noPerm','i:0#.w|'.$row['LOGINNAME']); # Insert user to noPermission group for sending email
//exit;
		$UserProfiveIntranet = $intranet_prof->GetUserProfileByName($row['LOGINNAME']); # Insert Login into ULCIMUS View
		$UserProfiveIntranet['PictureURL']=str_replace('MThumb.jpg','LThumb.jpg',$UserProfiveIntranet['PictureURL']);
		#$UserProfive = $sp_prof->GetUserProfileByName('user'); # Insert Login into ULCIMUS View
		
echo $count.') '.$row['EMAIL'].','.$UserProfive['AccountName']."\n";

		//var_dump($SPRow);
		//var_dump($row['ID']);
		//var_dump($SPRow['hrid']);
		if(!is_null($SPRow["hrid"]) AND $SPRow["hrid"]==$row['ID'])
		{
#	var_dump($UserProfive['AccountName']);
			echo($row['ID']." ".$row['EMAIL']." need update \n");
			$EmpDataUpd[] = array('ID'=>$SPRow['id'],'HRID'=>$row['ID'],'FAMILYNAME'=>$row['FAMILYNAME'],'FS'=>$row['FS'],'EMAIL'=>$row['EMAIL'],'PHONE'=>$row['PHONE'],'POSITION'=>$row['POSITION'],'DEPARTMENT'=>$row['DEPARTMENT'],'BOSSID'=>$row['BOSSID'],'STATUS'=>$row['STATUS'],'LOCATION'=>$row['LOCATION'],'UserProfile_GUID'=>$UserProfive['UserProfile_GUID'],'AccountName'=>$UserProfive['AccountName'],'LastName'=>$UserProfive['LastName'],'Manager'=>$UserProfive['Manager'],'PictureURL'=>$UserProfiveIntranet['PictureURL'],'FIO'=>$row['FAMILYNAME'].' '.$row['FS'],'COMPANY'=>$row['COMPANY'],'FAMILYNAMEOLD'=>$row['FAMILYNAMEOLD']);
		}else{
			
			echo($row['ID']." need add \n");
			$EmpDataAdd[] = array('HRID'=>$row['ID'],'FAMILYNAME'=>$row['FAMILYNAME'],'FS'=>$row['FS'],'EMAIL'=>$row['EMAIL'],'PHONE'=>$row['PHONE'],'POSITION'=>$row['POSITION'],'DEPARTMENT'=>$row['DEPARTMENT'],'BOSSID'=>$row['BOSSID'],'STATUS'=>$row['STATUS'],'LOCATION'=>$row['LOCATION'],'UserProfile_GUID'=>$UserProfive['UserProfile_GUID'],'AccountName'=>$UserProfive['AccountName'],'LastName'=>$UserProfive['LastName'],'Manager'=>$UserProfive['Manager'],'PictureURL'=>$UserProfiveIntranet['PictureURL'],'FIO'=>$row['FAMILYNAME'].' '.$row['FS'],'COMPANY'=>$row['COMPANY'],'FAMILYNAMEOLD'=>$row['FAMILYNAMEOLD']);
		}



#log
    fputcsv($fp, $row,";");
}
fclose($fp);
oci_free_statement($stid);
oci_close($conn);	
$arr_size_for_write = 200;
if(count($EmpDataAdd)>0){
	while (count($EmpDataAdd)>0){
		$sp->writeMultiple($HRListName,array_slice($EmpDataAdd,0,$arr_size_for_write));
		array_splice($EmpDataAdd,0,$arr_size_for_write);
	}
}

$arr_size_for_upd = 200;
if(count($EmpDataUpd)>0){
	while (count($EmpDataUpd)>0){
		#var_dump($EmpDataUpd);
		echo(count($EmpDataUpd)."\n");
		$sp->updateMultiple($HRListName,array_slice($EmpDataUpd,0,$arr_size_for_upd));
		array_splice($EmpDataUpd,0,$arr_size_for_upd);
	}
#var_dump($EmpDataUpd);
}
$Arr4Del  = array();

foreach ($SPList as $row) {
	#array_push($Arr4Del,$row["id"]);	
#var_dump($row);
	$Arr4Del[] = array('ID'=>$row["id"],'STATUS'=>'REM');

	echo($row['id']." need remove \n");
}

#var_dump($Arr4Del);
$arr_size_for_del = 200;
if(count($Arr4Del)>0){
	while (count($Arr4Del)>0){
	#	$sp->deleteMultiple($HRListName,$Arr4Del);
		$sp->updateMultiple($HRListName,array_slice($Arr4Del,0,$arr_size_for_del));
		array_splice($Arr4Del,0,$arr_size_for_del);

	}

}
}

?>
