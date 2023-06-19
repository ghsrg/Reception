<?php

$InstallDataAdd['Cities'][] = array('CityNameUa'=>'Київ');
$InstallDataAdd['Cities'][] = array('CityNameUa'=>'Дніпро');
$InstallDataAdd['Cities'][] = array('CityNameUa'=>'Львів');

$InstallDataAdd['VisitsTypes'][] = array('VisitsTypeNameUa'=>'Відвідувач','ItemIcon'=>'Group','NotifyTo'=>'','NotifySwitch'=>'0','ColumnsKeys'=>'employee;visitor;pass;passreturned;comments;notify;created;autor');
$InstallDataAdd['VisitsTypes'][] = array('VisitsTypeNameUa'=>'Тимчасовий пропуск','ItemIcon'=>'ContactCard','NotifyTo'=>'','NotifySwitch'=>'1','ColumnsKeys'=>'employee;pass;passreturned;comments;notify;created;autor');
$InstallDataAdd['VisitsTypes'][] = array('VisitsTypeNameUa'=>'Документи','ItemIcon'=>'DocumentSet','NotifyTo'=>'','NotifySwitch'=>'1','ColumnsKeys'=>'employee;organization;comments;notify;created;autor');
$InstallDataAdd['VisitsTypes'][] = array('VisitsTypeNameUa'=>'Передача документів для клієнта','ItemIcon'=>'UserFollowed','NotifyTo'=>'','NotifySwitch'=>'0','ColumnsKeys'=>'employee;organization;comments;notify;created;autor');
$InstallDataAdd['VisitsTypes'][] = array('VisitsTypeNameUa'=>'Реєстр ухвал','ItemIcon'=>'BulletedList','NotifyTo'=>'','NotifySwitch'=>'1','ColumnsKeys'=>'employee;comments;notify;created;autor');
$InstallDataAdd['VisitsTypes'][] = array('VisitsTypeNameUa'=>'Отримання ухвали','ItemIcon'=>'MailForward','NotifyTo'=>'','NotifySwitch'=>'1','ColumnsKeys'=>'employee;comments;created;autor');
$InstallDataAdd['VisitsTypes'][] = array('VisitsTypeNameUa'=>'Обслуговування клієнтів','ItemIcon'=>'CommentAdd','NotifyTo'=>'','NotifySwitch'=>'1','ColumnsKeys'=>'comments;created;autor');

$InstallDataAdd['PassType'][] = array('TypeName'=>'Відвідувач','VisitsTypeID'=>'1;#Відвідувач');
$InstallDataAdd['PassType'][] = array('TypeName'=>'Співробітник','VisitsTypeID'=>'2;#Тимчасовий пропуск');

$InstallDataAdd['PassStatus'][] = array('StatusName'=>'Видана');
$InstallDataAdd['PassStatus'][] = array('StatusName'=>'Доступна');
$InstallDataAdd['PassStatus'][] = array('StatusName'=>'Неактивна');

$InstallDataAdd['EmpowermentUsers'][] = array('FIO'=>'Жучкін Ярослав', 'Organization'=>'Add','Phone'=>'044-444-44-44','EMAIL'=>'Skr@soft.ua');
$InstallDataAdd['EmpowermentUsers'][] = array('FIO'=>'Пупкін Іван', 'Organization'=>'Ree','Phone'=>'055-555-55-55','EMAIL'=>'Pipkin@soft.ua');
$InstallDataAdd['EmpowermentUsers'][] = array('FIO'=>'Васькін Володимир Петрович', 'Organization'=>'So','Phone'=>'077-777-77-77','EMAIL'=>'Lushkon@inteec.com');
$InstallDataAdd['EmpowermentUsers'][] = array('FIO'=>'Лучко Володимир', 'Organization'=>'In','Phone'=>'066-666-66-66','EMAIL'=>'LVol@in.com');
$InstallDataAdd['EmpowermentUsers'][] = array('FIO'=>'Ложкін Іван Василійович', 'Organization'=>'GM','Phone'=>'011-111-11-11','EMAIL'=>'Skryp@gm.com');


$InstallDataAdd['PersonalPass'][] = array('NumberText'=>'01', 'StatusID'=>'2;#Доступна', 'CityID'=>'1;#Київ', 'PassTypeId'=>'1;#Відвідувач' );
$InstallDataAdd['PersonalPass'][] = array('NumberText'=>'02', 'StatusID'=>'2;#Доступна', 'CityID'=>'1;#Київ', 'PassTypeId'=>'1;#Відвідувач' );
$InstallDataAdd['PersonalPass'][] = array('NumberText'=>'03', 'StatusID'=>'2;#Доступна', 'CityID'=>'1;#Київ', 'PassTypeId'=>'1;#Відвідувач' );
$InstallDataAdd['PersonalPass'][] = array('NumberText'=>'04', 'StatusID'=>'2;#Доступна', 'CityID'=>'1;#Київ', 'PassTypeId'=>'1;#Відвідувач' );
$InstallDataAdd['PersonalPass'][] = array('NumberText'=>'01', 'StatusID'=>'2;#Доступна', 'CityID'=>'1;#Київ', 'PassTypeId'=>'2;#Співробітник' );
$InstallDataAdd['PersonalPass'][] = array('NumberText'=>'02', 'StatusID'=>'2;#Доступна', 'CityID'=>'1;#Київ', 'PassTypeId'=>'2;#Співробітник' );
$InstallDataAdd['PersonalPass'][] = array('NumberText'=>'03', 'StatusID'=>'2;#Доступна', 'CityID'=>'1;#Київ', 'PassTypeId'=>'2;#Співробітник' );
?>