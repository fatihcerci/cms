CREATE TABLE appointments  ( 
	id         	int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
    tckn      	varchar(11) NULL DEFAULT NULL,
	name      	varchar(50) NULL DEFAULT NULL,
    surname     varchar(50) NULL DEFAULT NULL,
	gender      varchar(10) NULL DEFAULT NULL,
	birthDate 	datetime NULL DEFAULT NULL,
    email       varchar(50) NULL DEFAULT NULL,
    phone       varchar(11) NULL DEFAULT NULL,
	isActive   	tinyint(4) NULL DEFAULT NULL,
	createdAt  	datetime NULL DEFAULT NULL,
	PRIMARY KEY(id)
)
ENGINE = InnoDB
CHARACTER SET utf8mb4
COLLATE utf8mb4_turkish_ci
AUTO_INCREMENT = 1
GO