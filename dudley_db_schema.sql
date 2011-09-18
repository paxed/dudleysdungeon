CREATE TABLE comment (
        commentid serial primary key,
        stripid integer,
        commenttime timestamp,
        userid integer,
        commenttext text,
	edittime timestamp,
	anon boolean
);
CREATE TABLE news (
        newsid serial primary key,
        stripid integer,
        newstext text
);
CREATE TABLE strip (
        stripid serial primary key,
        striptime timestamp,
        submittime timestamp,
        stripdata text,
        author text,
        approved boolean,
	authorid integer,
	edittime timestamp,
	viewed integer
);
CREATE TABLE duduser (
        userid integer,
	username text,
	registertime timestamp,
	lastlogin timestamp,
	password text,
	s_keybnav boolean,
	userlevel integer
);
CREATE TABLE vote (
        voteid serial primary key,
        value integer,
        stripid integer,
        votetime timestamp,
        userid integer
);
