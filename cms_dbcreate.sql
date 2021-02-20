-- brands --
CREATE TABLE brands  ( 
	id       	int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
	title    	varchar(255) NULL DEFAULT '''',
	img_url  	varchar(255) NULL DEFAULT '''',
	rank     	int(255) NULL DEFAULT NULL,
	isActive 	tinyint(4) NULL DEFAULT NULL,
	createdAt	datetime NULL DEFAULT NULL ,
    PRIMARY KEY (id)
	)
GO
-- courses --
CREATE TABLE courses  ( 
	id         	int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
	url        	varchar(255) NULL DEFAULT NULL,
	title      	varchar(255) NULL DEFAULT NULL,
	description	text NULL DEFAULT NULL,
	img_url    	varchar(255) NULL DEFAULT NULL,
	event_date 	datetime NULL DEFAULT NULL,
	rank       	int(11) NULL DEFAULT NULL,
	isActive   	tinyint(4) NULL DEFAULT NULL,
	createdAt  	datetime NULL DEFAULT NULL,
    PRIMARY KEY (id)
	)
GO

DROP TABLE IF EXISTS `email_settings`;
-- email_settings --
CREATE TABLE `email_settings` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `protocol` varchar(10) COLLATE utf8_turkish_ci DEFAULT NULL,
  `host` varchar(100) COLLATE utf8_turkish_ci DEFAULT NULL,
  `port` varchar(10) COLLATE utf8_turkish_ci DEFAULT '',
  `user` varchar(100) COLLATE utf8_turkish_ci DEFAULT '',
  `password` varchar(100) COLLATE utf8_turkish_ci DEFAULT '',
  `from` varchar(100) COLLATE utf8_turkish_ci DEFAULT '',
  `to` varchar(100) COLLATE utf8_turkish_ci DEFAULT '',
  `user_name` varchar(100) COLLATE utf8_turkish_ci DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;
GO
INSERT INTO email_settings(id, protocol, host, port, user, password, `from`, `to`, user_name, isActive, createdAt)
  VALUES('1', 'smtp', 'ssl://smtp.gmail.com', '465', 'chercy.001@gmail.com', 'chercy_2233893', 'chercy.001@gmail.com', 'chercy.001@gmail.com', 'LENORA', '1', NOW())
GO

-- files --
CREATE TABLE files  ( 
	id        	int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
	gallery_id	int(11) NULL DEFAULT NULL,
	url       	varchar(255) NULL DEFAULT NULL,
	rank      	int(255) NULL DEFAULT NULL,
	isActive  	tinyint(255) NULL DEFAULT NULL,
	createdAt 	datetime NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
	)
GO

-- galleries --
CREATE TABLE galleries  ( 
	id          	int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
	url         	varchar(255) NULL DEFAULT NULL,
	title       	varchar(100) NULL DEFAULT NULL,
	gallery_type	varchar(50) NULL DEFAULT NULL,
	folder_name 	varchar(50) NULL DEFAULT NULL,
	isActive    	tinyint(4) NULL DEFAULT NULL,
	createdAt   	datetime NULL DEFAULT NULL,
	rank        	int(11) NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
	)
GO


-- images --
CREATE TABLE images  ( 
	id        	int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
	gallery_id	int(11) NULL DEFAULT NULL,
	url       	varchar(255) NULL DEFAULT NULL,
	rank      	int(255) NULL DEFAULT NULL,
	isActive  	tinyint(255) NULL DEFAULT NULL,
	createdAt 	datetime NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
	)
GO


-- members --
CREATE TABLE members  ( 
	id       	int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
	email    	varchar(50) NULL DEFAULT NULL,
	isActive 	tinyint(50) NULL DEFAULT NULL,
	createdAt	datetime NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
	)
GO

-- news --
CREATE TABLE news  ( 
	id         	int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
	url        	varchar(255) NULL DEFAULT NULL,
	title      	varchar(255) NULL DEFAULT NULL,
	description	text NULL DEFAULT NULL,
	news_type  	varchar(10) NULL DEFAULT NULL,
	img_url    	varchar(255) NULL DEFAULT NULL,
	video_url  	varchar(255) NULL DEFAULT NULL,
	rank       	int(11) NULL DEFAULT NULL,
	isActive   	tinyint(4) NULL DEFAULT NULL,
	createdAt  	datetime NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
	)
GO


-- popups --
CREATE TABLE popups  ( 
	id         	int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
	title      	varchar(255) NULL DEFAULT NULL,
	description	text NULL DEFAULT NULL,
	page       	varchar(50) NULL DEFAULT NULL,
	isActive   	tinyint(4) NULL DEFAULT NULL,
	createdAt  	datetime NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
	)
GO

-- portfolio_categories --
CREATE TABLE portfolio_categories  ( 
	id   	int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
	title	varchar(100) NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
	)
GO

-- portfolio_images --
CREATE TABLE portfolio_images  ( 
	id          	int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
	portfolio_id	int(11) NULL DEFAULT NULL,
	img_url     	varchar(255) NULL DEFAULT NULL,
	rank        	int(11) NULL DEFAULT NULL,
	isActive    	tinyint(11) NULL DEFAULT NULL,
	isCover     	tinyint(11) NULL DEFAULT NULL,
	createdAt   	datetime NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
	)
GO

-- portfolios --
CREATE TABLE portfolios  ( 
	id           	int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
	url          	varchar(255) NULL DEFAULT NULL,
	title        	varchar(255) NULL DEFAULT NULL,
	description  	text NULL DEFAULT NULL,
	rank         	int(11) NULL DEFAULT NULL,
	finishedAt   	datetime NULL DEFAULT NULL,
	client       	varchar(255) NULL DEFAULT NULL,
	category_id  	int(11) NULL DEFAULT NULL,
	place        	varchar(100) NULL DEFAULT NULL,
	portfolio_url	varchar(255) NULL DEFAULT NULL,
	isActive     	tinyint(4) NULL DEFAULT NULL,
	createdAt    	datetime NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
	)
GO

-- product_images --
CREATE TABLE product_images  ( 
	id        	int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
	product_id	int(11) NULL DEFAULT NULL,
	img_url   	varchar(255) NULL DEFAULT NULL,
	rank      	int(11) NULL DEFAULT NULL,
	isActive  	tinyint(11) NULL DEFAULT NULL,
	isCover   	tinyint(11) NULL DEFAULT NULL,
	createdAt 	datetime NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
	)
GO


-- products --
CREATE TABLE products  ( 
	id         	int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
	url        	varchar(255) NULL DEFAULT NULL,
	title      	varchar(255) NULL DEFAULT NULL,
	description	text NULL DEFAULT NULL,
	rank       	int(11) NULL DEFAULT NULL,
	isActive   	tinyint(4) NULL DEFAULT NULL,
	createdAt  	datetime NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
	)
GO


-- references --
CREATE TABLE `references`  ( 
	id         	int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
	url        	varchar(255) NULL DEFAULT NULL,
	title      	varchar(255) NULL DEFAULT NULL,
	description	text NULL DEFAULT NULL,
	img_url    	varchar(255) NULL DEFAULT NULL,
	rank       	int(11) NULL DEFAULT NULL,
	isActive   	tinyint(4) NULL DEFAULT NULL,
	createdAt  	datetime NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
	)
GO

-- services --
CREATE TABLE services  ( 
	id         	int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
	url        	varchar(255) NULL DEFAULT NULL,
	title      	varchar(255) NULL DEFAULT NULL,
	description	text NULL DEFAULT NULL,
	img_url    	varchar(255) NULL DEFAULT NULL,
	rank       	int(11) NULL DEFAULT NULL,
	isActive   	tinyint(4) NULL DEFAULT NULL,
	createdAt  	datetime NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
	)
GO

-- settings --
CREATE TABLE settings  ( 
	id                             	int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
	company_name                   	varchar(255) NULL DEFAULT NULL,
	slogan                         	varchar(255) NULL DEFAULT NULL,
	address                        	text NULL DEFAULT NULL,
	about_us                       	longtext NULL DEFAULT NULL,
	mission                        	longtext NULL DEFAULT NULL,
	vision                         	longtext NULL DEFAULT NULL,
	logo                           	varchar(255) NULL DEFAULT NULL,
	mobile_logo                    	varchar(255) NULL DEFAULT 'NULL',
	favicon                        	varchar(255) NULL DEFAULT NULL,
	phone_1                        	varchar(15) NULL DEFAULT NULL,
	phone_2                        	varchar(15) NULL DEFAULT NULL,
	fax_1                          	varchar(15) NULL DEFAULT NULL,
	fax_2                          	varchar(15) NULL DEFAULT NULL,
	email                          	varchar(50) NULL DEFAULT NULL,
	facebook                       	varchar(255) NULL DEFAULT NULL,
	twitter                        	varchar(255) NULL DEFAULT NULL,
	instagram                      	varchar(255) NULL DEFAULT NULL,
	linkedin                       	varchar(255) NULL DEFAULT NULL,
	lat                            	varchar(20) NULL DEFAULT NULL,
	`long`                          varchar(20) NULL DEFAULT NULL,
	createdAt                      	datetime NULL DEFAULT NULL,
	updatedAt                      	datetime NULL DEFAULT NULL,
	homepage_references_description	text NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
	)
GO
INSERT INTO settings(id, company_name, slogan, address, about_us, mission, vision, logo, mobile_logo, favicon, phone_1, phone_2, fax_1, fax_2, email, facebook, twitter, instagram, linkedin, lat, `long`, createdAt, updatedAt, homepage_references_description)
  VALUES('1', 'LENORA', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO

-- slides --
CREATE TABLE slides  ( 
	id            	int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
	title         	varchar(50) NULL DEFAULT NULL,
	description   	varchar(255) NULL DEFAULT NULL,
	allowButton   	tinyint(4) NULL DEFAULT NULL,
	button_url    	varchar(255) NULL DEFAULT NULL,
	button_caption	varchar(25) NULL DEFAULT NULL,
	animation_type	varchar(255) NULL DEFAULT NULL,
	animation_time	int(11) NULL DEFAULT NULL,
	rank          	int(11) NULL DEFAULT NULL,
	isActive      	tinyint(4) NULL DEFAULT NULL,
	createdAt     	datetime NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
	)
GO

-- testimonials --
CREATE TABLE testimonials  ( 
	id         	int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
	title      	varchar(100) NULL DEFAULT NULL,
	description	varchar(500) NULL DEFAULT NULL,
	full_name  	varchar(50) NULL DEFAULT NULL,
	company    	varchar(50) NULL DEFAULT NULL,
	img_url    	varchar(255) NULL DEFAULT NULL,
	rank       	tinyint(4) NULL DEFAULT '-99',
	isActive   	tinyint(4) NULL DEFAULT NULL,
	createdAt  	datetime NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
	)
GO


-- user_roles --
CREATE TABLE user_roles  ( 
	id         	int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
	title      	varchar(50) NULL DEFAULT NULL,
	permissions	text NULL DEFAULT NULL,
	isActive   	tinyint(4) NULL DEFAULT NULL,
	createdAt  	datetime NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
	)
GO
INSERT INTO user_roles(id, title, permissions, isActive, createdAt)
  VALUES('1', 'Admin', '{"brands":{"read":"on","write":"on","update":"on","delete":"on"},"courses":{"read":"on","write":"on","update":"on","delete":"on"},"dashboard":{"read":"on","write":"on","update":"on","delete":"on"},"emailsettings":{"read":"on","write":"on","update":"on","delete":"on"},"galleries":{"read":"on","write":"on","update":"on","delete":"on"},"news":{"read":"on","write":"on","update":"on","delete":"on"},"popups":{"read":"on","write":"on","update":"on","delete":"on"},"portfolio":{"read":"on","write":"on","update":"on","delete":"on"},"portfolio_categories":{"read":"on","write":"on","update":"on","delete":"on"},"product":{"read":"on","write":"on","update":"on","delete":"on"},"references":{"read":"on","write":"on","update":"on","delete":"on"},"services":{"read":"on","write":"on","update":"on","delete":"on"},"settings":{"read":"on","write":"on","update":"on","delete":"on"},"slides":{"read":"on","write":"on","update":"on","delete":"on"},"testimonials":{"read":"on","write":"on","update":"on","delete":"on"},"userop":{"read":"on","write":"on","update":"on","delete":"on"},"users":{"read":"on","write":"on","update":"on","delete":"on"},"user_roles":{"read":"on","write":"on","update":"on","delete":"on"}}', '1', NOW())
GO

INSERT INTO user_roles(id, title, permissions, isActive, createdAt)
  VALUES('2', 'Kullanýcý', NULL, '1', NOW())
GO

-- users --
CREATE TABLE users  ( 
	id          	int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
	user_name   	varchar(50) NULL DEFAULT NULL,
	full_name   	varchar(50) NULL DEFAULT NULL,
	email       	varchar(50) NULL DEFAULT NULL,
	password    	varchar(100) NULL DEFAULT NULL,
	permissions 	varchar(1000) NULL DEFAULT NULL,
	user_role_id	int(11) NULL DEFAULT '2',
	isActive    	tinyint(4) NULL DEFAULT NULL,
	createdAt   	datetime NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
	)
GO
INSERT INTO users(id, user_name, full_name, email, password, permissions, user_role_id, isActive, createdAt)
  VALUES('1', 'admin', 'Admin', 'fatihcerci001@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', NULL, '1', '1', NOW())
GO

-- videos --
CREATE TABLE videos  ( 
	id        	int(11) UNSIGNED AUTO_INCREMENT NOT NULL,
	gallery_id	int(11) NULL DEFAULT NULL,
	url       	varchar(255) NULL DEFAULT NULL,
	rank      	int(255) NULL DEFAULT NULL,
	isActive  	tinyint(255) NULL DEFAULT NULL,
	createdAt 	datetime NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
	)
GO


