SELECT name, collation_name FROM sys.databases;
GO
ALTER DATABASE db_aa6873_printapphib SET SINGLE_USER WITH
ROLLBACK IMMEDIATE;
GO
ALTER DATABASE db_aa6873_printapphib COLLATE Croatian_CI_AS;
GO
ALTER DATABASE db_aa6873_printapphib SET MULTI_USER;
GO
SELECT name, collation_name FROM sys.databases;
GO

CREATE TABLE materials (
  id int not null primary key identity(1,1),
  bottomExposure decimal(38,2) DEFAULT NULL,
  bottomLiftDistance int DEFAULT NULL,
  bottomLiftSpeed decimal(38,2) DEFAULT NULL,
  bottomRetractSpeed decimal(38,2) DEFAULT NULL,
  calibratedExposure decimal(38,2) DEFAULT NULL,
  costPerUnit decimal(38,2) DEFAULT NULL,
  layerHeight decimal(38,2) DEFAULT NULL,
  liftDistance int DEFAULT NULL,
  liftSpeed decimal(38,2) DEFAULT NULL,
  lightOffDelay decimal(38,2) DEFAULT NULL,
  manufacturer varchar(255) NOT NULL,
  materialName varchar(255) NOT NULL,
  retractSpeed decimal(38,2) DEFAULT NULL
 );

 CREATE TABLE printers (
  id int not null primary key identity(1,1),
  fepCount int DEFAULT NULL,
  manufacturer varchar(255) NOT NULL,
  printerName varchar(255) NOT NULL,
  printerTime int DEFAULT NULL
  );

  CREATE TABLE projects (
  id int not null primary key identity(1,1),
  completionDate datetime DEFAULT NULL,
  creationDate datetime DEFAULT NULL,
  isCompleted bit DEFAULT NULL,
  projectDescription varchar(255) DEFAULT NULL,
  projectName varchar(255) NOT NULL,
  totalCost decimal(38,2) DEFAULT NULL,
  totalPrintCount int DEFAULT NULL,
  totalPrintTime int DEFAULT NULL
  );

CREATE TABLE users (
  id int not null primary key identity(1,1),
  userName varchar(255) NOT NULL,
  userPassword varchar(255) NOT NULL
  );

  CREATE TABLE parts (
  id int not null primary key identity(1,1),
  cost decimal(38,2) DEFAULT NULL,
  partName varchar(255) NOT NULL,
  printTime int DEFAULT NULL,
  printCount int DEFAULT NULL,
  project_id int DEFAULT NULL,
  foreign key (project_id) references projects (id)
  );
  
  CREATE TABLE printjobs (
  id int not null primary key identity(1,1),
  cost decimal(38,2) DEFAULT NULL,
  printTime int DEFAULT NULL,
  volume decimal(38,2) DEFAULT NULL,
  material int DEFAULT NULL,
  part_id int DEFAULT NULL,
  printer_id int DEFAULT NULL,
  foreign key (material) references materials (id),
  foreign key (part_id) references parts (id),
  foreign key (printer_id) references printers(id)
  );

  INSERT INTO users (userName,userPassword) VALUES
	 ('admin','$2a$12$LC5mZnTnmuU34H0VEAkrv.3tFrxSYGIKPCJTfVk/i3/eytW2eKTYm');

  INSERT INTO dbo.materials (bottomExposure,bottomLiftDistance,bottomLiftSpeed,bottomRetractSpeed,calibratedExposure,costPerUnit,layerHeight,liftDistance,liftSpeed,lightOffDelay,manufacturer,materialName,retractSpeed) VALUES
	 (15.00,4,3.00,2.00,3.00,46.00,25.00,7,4.00,1.00,'Earth','Q',3.00),
	 (10.00,7,4.00,3.00,3.00,69.00,17.00,7,7.00,1.00,'Saturn','Betazoid',9.00),
	 (46.00,4,3.00,1.00,3.00,49.00,83.00,8,1.00,1.00,'Mercury','Jem''Hadar',4.00),
	 (31.00,4,3.00,8.00,3.00,51.00,46.00,4,7.00,0.00,'Saturn','Ferengi',9.00),
	 (30.00,5,3.00,3.00,4.00,89.00,34.00,7,7.00,0.00,'Mars','Vorta',9.00);
 
 INSERT INTO dbo.printers (fepCount,manufacturer,printerName,printerTime) VALUES
	 (3,'Neptune','Maltz',453),
	 (11,'Earth','Q',1600),
	 (8,'Mercury','Ru''afo',1188),
	 (8,'Saturn','Maltz',1720),
	 (0,'Neptune','Gorn',0);

INSERT INTO dbo.projects (completionDate,creationDate,isCompleted,projectDescription,projectName,totalCost,totalPrintCount,totalPrintTime) VALUES
	 ('2023-03-02','2023-04-25',1,'Ad debitis dolor enim voluptatem at. Enim ut cupiditate repudiandae velit sit. Quo possimus ipsa voluptas sunt. Illum voluptatem ducimus aut nam. Aspernatur ducimus est aliquam.','The Briar Patch',0.00,0,0),
	 ('2023-11-02','2023-10-31',0,'Perferendis est blanditiis et dolorem. Sapiente et esse blanditiis. Dolorum mollitia nemo quo. Qui sunt nisi dolorum possimus totam. Eos tenetur autem eos voluptate dolor qui. Atque officia aut provident iste voluptatibus sequi dolores.','Gamma Quadrant',34.83,2,461),
	 ('2023-09-15','2023-10-30',0,'Quis omnis fugit autem vitae quos. Vel est non ullam quidem expedita reprehenderit. Alias est voluptas et dolores. Optio aut consequatur ad est. Odit sint molestiae vel.','Thalos VII',44.34,1,550),
	 ('2023-10-23','2023-04-25',0,'Nostrum dolor et. Suscipit dolorem veritatis culpa. Repellendus nihil odio. Iusto odio in officiis velit deleniti. Voluptatem temporibus velit ipsa ut. Quam fuga asperiores omnis.','Deep Space Nine',57.27,2,560),
	 ('2023-04-18','2023-01-12',1,'Et nulla qui provident. Placeat odio ipsa praesentium eos quasi. Sunt est earum consequuntur qui autem quidem neque. Deserunt illum aut iusto consequatur. Quibusdam magnam est neque ut et.','Gamma Quadrant',36.59,1,483),
	 ('2023-11-13','2023-09-15',0,'Ad possimus exercitationem assumenda qui nostrum. Sit voluptatem soluta eos enim minima fugit. Praesentium dignissimos repellendus beatae corporis. Ut quis nobis dolores ipsum molestiae. Possimus debitis repellat consequuntur labore qui qui ut.','Wolf 359',3.77,1,64),
	 ('2023-03-21','2023-11-24',0,'Voluptatem at modi. Consequuntur rerum non asperiores natus asperiores ut quia. Adipisci commodi aliquid et nemo illo blanditiis. Quidem mollitia qui voluptatum. Et velit ab. Deserunt et dicta vero velit alias distinctio porro.','Qo''noS',40.24,1,400),
	 ('2023-03-10','2023-08-11',0,'Ut praesentium quia occaecati qui a neque placeat. Rem non ut. Nulla quidem dolorem iusto vel. Tempora hic mollitia odio sed numquam est ullam. Aut doloremque ut. Sed amet sunt commodi repellat earum. Et a velit in aut non.','Deep Space Nine',0.00,0,0),
	 ('2023-01-17','2023-05-29',0,'Exercitationem sunt et modi. Unde corrupti est tenetur in cupiditate sit. Quod qui quo. Pariatur eum sit voluptas. Non ut expedita optio eos architecto et dicta.','Bajor',27.98,2,225),
	 ('2023-05-04','2023-06-24',1,'In odio laudantium illum excepturi praesentium delectus. Veniam eius consequatur quibusdam necessitatibus voluptatem. Ut vitae deserunt id quam nisi voluptas. Est quo aperiam alias doloribus perspiciatis voluptates. Et porro quae officiis sed doloremque.','Alpha Quadrant',0.00,0,0);

INSERT INTO dbo.parts (cost,partName,printTime,project_id) VALUES
	 (0.00,'Data',0,6),
	 (22.98,'Jonathan Archer',244,4),
	 (34.29,'Travis Mayweather',316,4),
	 (3.77,'Hoshi Sato',64,6),
	 (0.00,'Harry Kim',0,5),
	 (0.00,'Jonathan Archer',0,5),
	 (40.24,'Travis Mayweather',400,7),
	 (0.00,'Deanna Troi',0,6),
	 (0.00,'Odo',0,9),
	 (16.35,'Seven of Nine',105,9);
INSERT INTO dbo.parts (cost,partName,printTime,project_id) VALUES
	 (17.34,'Montgomery Scott',225,2),
	 (0.00,'Beverly Crusher',0,8),
	 (0.00,'Jonathan Archer',0,5),
	 (44.34,'Malcolm Reed',550,3),
	 (0.00,'Geordi La Forge',0,6),
	 (36.59,'Jadzia Dax',483,5),
	 (17.49,'Malcolm Reed',236,2),
	 (11.63,'Pavel Chekov',120,9),
	 (0.00,'Leonard McCoy',0,6),
	 (0.00,'Natasha Yar',0,9); 

	 INSERT INTO dbo.printjobs (cost,printTime,result,volume,material,part_id,printer_id) VALUES
	 (17.34,225,1,340.00,4,11,4),
	 (22.98,244,1,469.00,3,2,4),
	 (22.75,178,1,446.00,4,7,3),
	 (17.49,236,1,343.00,4,17,4),
	 (11.63,120,1,228.00,4,18,3),
	 (16.83,187,1,330.00,4,3,2),
	 (17.49,222,1,357.00,3,7,2),
	 (3.93,181,0,77.00,4,11,2),
	 (9.64,107,0,189.00,4,17,2),
	 (17.99,267,0,391.00,1,1,3);
INSERT INTO dbo.printjobs (cost,printTime,result,volume,material,part_id,printer_id) VALUES
	 (12.93,240,1,281.00,1,16,2),
	 (9.74,264,1,191.00,4,14,4),
	 (23.66,243,1,464.00,4,16,1),
	 (20.61,135,0,448.00,1,9,4),
	 (17.20,85,0,351.00,3,3,3),
	 (16.35,105,1,237.00,2,10,2),
	 (9.07,246,0,185.00,3,11,4),
	 (26.15,152,0,379.00,2,8,3),
	 (8.52,58,0,167.00,4,4,2),
	 (8.00,62,0,116.00,2,6,3);
INSERT INTO dbo.printjobs (cost,printTime,result,volume,material,part_id,printer_id) VALUES
	 (12.08,200,0,175.00,2,12,4),
	 (3.77,64,1,82.00,1,4,2),
	 (6.66,84,0,136.00,3,17,1),
	 (26.63,126,0,386.00,2,5,1),
	 (23.46,170,0,340.00,2,9,4),
	 (17.46,129,1,253.00,2,3,2),
	 (28.43,91,1,412.00,2,14,2),
	 (17.04,129,0,247.00,2,18,3),
	 (6.17,195,1,121.00,4,14,3),
	 (22.85,216,0,448.00,4,8,2);
	 