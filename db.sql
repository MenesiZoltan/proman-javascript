create schema public;

comment on schema public is 'standard public schema';


create table if not exists boards
(
	id serial not null
		constraint boards_pk
			primary key,
	name text,
	user_id integer
);


create unique index if not exists boards_id_uindex
	on boards (id);

create table if not exists tasks
(
	id serial not null
		constraint tasks_pk
			primary key,
	task text not null,
	board_id integer,
	status text default 'new'::text,
	position text,
	user_id integer
);


create unique index if not exists tasks_id_uindex
	on tasks (id);

create table if not exists users
(
	id serial not null
		constraint users_pk
			primary key,
	password varchar(100) not null,
	email varchar(100) not null
);


create unique index if not exists users_email_uindex
	on users (email);

create unique index if not exists users_password_uindex
	on users (password);

