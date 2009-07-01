
create table type ( id char(20), parent char(255), primary key ( id ) );
insert into type values ( '', null );	-- Root
insert into type values ( 'Base', '/' );
insert into type values ( 'Text', '/ Base /' );
insert into type values ( 'Richtext', '/ Base /' );
insert into type values ( 'Number', '/ Base /' );
insert into type values ( 'Mammal', '/' );
insert into type values ( 'Dog', '/ Mammal /' );
insert into type values ( 'Cat', '/ Mammal /' );
insert into type values ( 'Cephalopod', '/' );
insert into type values ( 'Octopus', '/ Cephalopod /' );
insert into type values ( 'Squid', '/ Cephalopod /' );
insert into type values ( 'Cetacean', '/' );
insert into type values ( 'Dolphin', '/ Cetacean /' );
insert into type values ( 'Gastropod', '/' );
insert into type values ( 'Snail', '/ Gastropod /' );

create table type_attr ( type char(255), attr char(40), attr_type char(255),
	primary key ( type, attr ) );
insert into type_attr values ( '/', 'Name', '/ Base / Text /' );
insert into type_attr values ( '/', 'Description', '/ Base / Richtext /' );
insert into type_attr values ( '/ Mammal /', 'Number of Legs', '/ Base / Number /' );
insert into type_attr values ( '/ Mammal /', 'Size of Litter', '/ Base / Number /' );
insert into type_attr values ( '/ Mammal / Dog /', 'Breed', '/ Base / Text /' );
insert into type_attr values ( '/ Mammal / Cat /', 'Colour', '/ Base / Text /' );
insert into type_attr values ( '/ Cephalopod /', 'Number of Tentacles', '/ Base / Number /' );
insert into type_attr values ( '/ Cetacean / Dolphin /', 'Number of Dolphins in Pod', '/ Base / Number /' );
insert into type_attr values ( '/ Cetacean / Dolphin /', 'Cephalopod Diet', '/ Cephalopod /' );
insert into type_attr values ( '/ Gastropod / Snail /', 'Size of Shell', '/ Base / Number /' );

create table card ( name char(255), type char(255), descr blob, primary key ( name ) );
insert into card values ( 'Jinger', '/ Mammal / Cat /', 'Irritating furball living at 69 Stone St' );
insert into card values ( 'Tiddles', '/ Cetacean / Dolphin /', 'Sleek musical plaything of the seas' );
insert into card values ( 'Bernard', '/ Gastropod / Snail /', 'Charmless but dogged garden pest' );

create table card_attr ( card char(255), attr char(40), attr_type char(255), value char(255), value_blob blob,
	primary key ( card, attr ) );
insert into card_attr values ( 'Jinger', 'Number of Legs', '/ Base / Number /', '4', null );
insert into card_attr values ( 'Jinger', 'Colour', '/ Base / Text /', 'Mottled Ginger', null );
insert into card_attr values ( 'Tiddles', 'Cephalopod Diet', '/ Cephalopod /', 'Bernard', null );
insert into card_attr values ( 'Bernard', 'Size of Shell', '/ Base / Number /', '6.23', null );