create table users(
    username varchar(20) not null,
    password varchar(64) not null, -- SHA-256 produit un hash de 64 caractères hexadécimaux
    email varchar(50) not null,
    primary key (username),
    unique (username)
);

create table addresses(
    id char(5) not null,
    street varchar(30) not null,
    street_number int not null,
    box_number varchar(5) null,
    postcode int not null,
    locality varchar(20) not null,
    country varchar(20) not null,
    primary key (id)
);

create table producers(
    id char(7) not null,
    username varchar(20) not null,
    firstname char(20) not null,
    lastname char(20) not null,
    phone_num char(10) not null,
    email_pro varchar(50) not null,
    primary key (id),
    foreign key (username) references users(username),
    unique (username)
);

create table companies(
    company_name varchar(20) not null,
    password varchar(64) not null, -- SHA-256 produit un hash de 64 caractères hexadécimaux
    alias varchar(50) not null,
    address varchar(200) not null,
    mail varchar(50) not null,
    phone_num char(10) not null,
    vat_num char(12) not null,
    description longtext null,
    primary key (company_name),
    foreign key (address) references addresses(id),
    unique (alias)
);

create table rel_comp_prods(
    producer_id char(7) not null,
    company_name varchar(20) not null,
    primary key (producer_id, company_name),
    foreign key (producer_id) references producers(id),
    foreign key (company_name) references companies(company_name)
);
