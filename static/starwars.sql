CREATE TABLE users (
    id serial NOT NULL,
    username VARCHAR(255),
    password VARCHAR(25) NOT NULL
);



ALTER TABLE ONLY users
    ADD CONSTRAINT pk_users_id PRIMARY KEY (id);


