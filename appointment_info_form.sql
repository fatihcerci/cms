DROP TABLE appointments
CREATE TABLE appointments  ( 
	id             	int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
	isActive       	tinyint(4) NULL DEFAULT NULL,
	createdAt      	datetime NULL DEFAULT NULL,
	appointmentDate	datetime NULL DEFAULT NULL,
    patient_id      int(11) NULL DEFAULT NULL,
	PRIMARY KEY(id)
)
ENGINE = InnoDB
COLLATE utf8_turkish_ci
AUTO_INCREMENT = 7
GO

DROP TABLE patient
CREATE TABLE patient  ( 
	id             	int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
	tckn           	varchar(11) NULL DEFAULT NULL,
	name           	varchar(50) NULL DEFAULT NULL,
	surname        	varchar(50) NULL DEFAULT NULL,
	gender         	varchar(50) NULL DEFAULT NULL,
	birthDate      	datetime NULL DEFAULT NULL,
	email          	varchar(50) NULL DEFAULT NULL,
	phone          	varchar(50) NULL DEFAULT NULL,
    province        varchar(50) NULL DEFAULT NULL,
    district        varchar(50) NULL DEFAULT NULL,
    address         varchar(255) NULL DEFAULT NULL,
    height          varchar(50) NULL DEFAULT NULL,
    weight          varchar(50) NULL DEFAULT NULL,
    job             varchar(50) NULL DEFAULT NULL,
	isActive       	tinyint(4) NULL DEFAULT NULL,
	createdAt      	datetime NULL DEFAULT NULL,
	PRIMARY KEY(id)
)
ENGINE = InnoDB
COLLATE utf8_turkish_ci
AUTO_INCREMENT = 7
GO

DROP TABLE patient_complaint
CREATE TABLE patient_complaint  ( 
	id                  int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
    description         varchar(255) NULL DEFAULT NULL,
    violence            varchar(255) NULL DEFAULT NULL,
    treatment_applied   varchar(255) NULL DEFAULT NULL,
	isActive            tinyint(4) NULL DEFAULT NULL,
	createdAt           datetime NULL DEFAULT NULL,
    patient_id          int(11) NULL DEFAULT NULL,
	PRIMARY KEY(id)
)
ENGINE = InnoDB
COLLATE utf8_turkish_ci
AUTO_INCREMENT = 7
GO


DROP TABLE patient_pills
CREATE TABLE patient_pills  ( 
	id                  int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
    name                varchar(255) NULL DEFAULT NULL,
    dose                varchar(255) NULL DEFAULT NULL,
    startDate           datetime NULL DEFAULT NULL,
    reason              varchar(255) NULL DEFAULT NULL,
	isActive            tinyint(4) NULL DEFAULT NULL,
	createdAt           datetime NULL DEFAULT NULL,
    patient_id          int(11) NULL DEFAULT NULL,
	PRIMARY KEY(id)
)
ENGINE = InnoDB
COLLATE utf8_turkish_ci
AUTO_INCREMENT = 7
GO