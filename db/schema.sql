-- person table for signing up

create table person(
  id serial primary key
  ,email varchar(50)
  ,pwd varchar(10)
  ,lname varchar(50)
  ,fname varchar(50)
  ,imgurl text
);

-- trip table to save trips
create table trip(
  id serial primary key
  ,leader_id int references person(id)
  ,country varchar(50)
  ,city varchar(50)
  ,start_addr text
  ,end_addr text
  ,meet_date date
  ,meet_time time
);

-- team table to join a group
create table team(
  trip_id int references trip(id)
  ,person_id int references person(id)
)
