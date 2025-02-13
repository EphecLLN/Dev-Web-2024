create table categories(
	id char(4) not null,
	name varchar(30) not null,
	mother_cat char(5) null, -- A category can be a subcategory of another one
	description longtext null,
	primary key (id),
	foreign key (mother_cat) references categories(id),
	unique (name)
);

create table products(
	id char(5) not null,
	name varchar(30) not null,
	cat char(4) not null,
	description longtext null,
	picture varchar(30) not null,
	primary key (id),
	foreign key (cat) references categories(id),
	unique (name)
);

create table catalog_details(
	id char(6) not null,
	company_name varchar(20) not null,
	product_id char(5) not null,
	created_at datetime default current_timestamp,
	quantity int default 0,
	availability bit default 1,
	price DECIMAL(6,2) default 0.00,
	primary key (id),
	foreign key (company_name) references companies(company_name),
	foreign key (product_id) references products(id),
	unique (company_name, product_id)
);

create table shop_cart_details(
	id char(6) not null,
	username varchar(20) not null,
	catalog_detail_id char(5) not null,
	created_at datetime default current_timestamp,
	validation_date datetime null,
	primary key (id),
	foreign key (username) references users(username),
	foreign key (catalog_detail_id) references catalog_details(id),
	unique (username, catalog_detail_id)
);

