
alter table users
    add created_at datetime default current_timestamp,
    add profile_picture_id char(7) null,
    add constraint fk_users_profile_picture_id foreign key (profile_picture_id) references images(id)
;

alter table companies
    add created_at datetime default current_timestamp,
    add profile_picture_id char(7) null,
    add constraint fk_companies_profile_picture_id foreign key (profile_picture_id) references images(id)
;

alter table catalog_details
    add profile_picture_id char(7) null,
    add constraint fk_catalog_details_profile_picture_id foreign key (profile_picture_id) references images(id)
;
