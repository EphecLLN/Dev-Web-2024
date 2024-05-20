create table images(
	id char(7) not null,
	path varchar(100) not null,
	description longtext null,
	primary key (id),
	unique (path)
);

create table photo_albums(
	id char(4) not null,
	company_name varchar(20) not null,
	name varchar(30) default 'main',
	created_at datetime default current_timestamp,
	description longtext null,
	primary key (id),
	foreign key (company_name) references companies(company_name)
);

create table rel_album_images(
	id char(6) not null,
	image_id char(7) not null,
	album_id char(4) not null,
	created_at datetime default current_timestamp,
	primary key (id),
	foreign key (image_id) references images(id),
	foreign key (album_id) references photo_albums(id),
	unique (image_id, album_id)
);
