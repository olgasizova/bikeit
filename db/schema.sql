-- person table for signing up

CREATE TABLE person(
  id SERIAL PRIMARY KEY,
  email VARCHAR(50),
  pwd VARCHAR(10),
  lname VARCHAR(50),
  fname VARCHAR(50),
  imgurl TEXT
);

-- trip table to save trips
CREATE TABLE trip(
  id SERIAL PRIMARY KEY,
  leader_id INT REFERENCES person(id),
  country VARCHAR(50),
  city VARCHAR(50),
  start_addr TEXT,
  end_addr TEXT,
  meet_date DATE,
  meet_time TIME,
);

-- team table to join a group, each time a person join a group, their person id is added to this table
CREATE TABLE team(
  trip_id INT REFERENCES trip(id),
  person_id INT REFERENCES person(id)
);
