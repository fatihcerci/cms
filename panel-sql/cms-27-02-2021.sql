CREATE TABLE projects  ( 
	id         	int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
	url        	varchar(255) NULL DEFAULT NULL,
	title      	varchar(255) NULL DEFAULT NULL,
	description	text NULL DEFAULT NULL,
	rank       	int(11) NULL DEFAULT NULL,
	isActive   	tinyint(4) NULL DEFAULT NULL,
	createdAt  	datetime NULL DEFAULT NULL,
	PRIMARY KEY(id)
)
ENGINE = InnoDB
COLLATE utf8mb4_turkish_ci
AUTO_INCREMENT = 7
GO

ALTER TABLE users
ADD user_project_id INT

ALTER TABLE announcements
ADD project_id INT