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

