




SELECT MAX(id) FROM test.students;


SELECT MIN(score) FROM test.students;


SELECT COUNT(id) num FROM test.students GROUP BY class_id;
SELECT class_id, COUNT(id) num FROM test.students GROUP BY class_id;
SELECT 
  class_id, COUNT(id) num 
FROM test.students 
GROUP BY class_id 
ORDER BY class_id;
SELECT 
  class_id, gender, COUNT(id) num 
FROM test.students 
GROUP BY class_id, gender 
ORDER BY class_id;


SELECT 
  class_id, AVG(score) average 
FROM test.students 
GROUP BY class_id 
ORDER BY class_id;
SELECT 
  class_id, gender, AVG(score) average 
FROM test.students 
GROUP BY class_id, gender 
ORDER BY class_id;





UPDATE test.students SET score = 66 WHERE id = 16;


UPDATE test.students SET score = 66, name = '二牛' WHERE id = 11;


UPDATE test.students SET score = score - 10 WHERE id >= 10;


UPDATE test.students SET score = score + 5 WHERE NOT (id = 10 OR id = 8);
UPDATE test.students SET score = score - 5 WHERE id <> 10 AND id <> 8;


UPDATE test.students SET score = score + 10 WHERE score < 60;


DELETE FROM test.students WHERE id = 17;


DELETE FROM test.students WHERE id >= 15;


CREATE DATABASE test_2;


SHOW DATABASES;


DROP DATABASE test_2;


USE test_2;


SHOW TABLES;


DESC test.students;


SHOW CREATE TABLE test.students;


CREATE TABLE test.teachers;


USE test;


CREATE TABLE teachers (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    class_id BIGINT NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE ccc;



ALTER TABLE teachers ADD COLUMN gender VARCHAR(10) NOT NULL;
ALTER TABLE teachers ADD context_time DATETIME NOT NULL;


ALTER TABLE teachers CHANGE COLUMN gender sex VARCHAR(20) NOT NULL;


ALTER TABLE students DROP COLUMN birth;


REPLACE INTO students (id, name, class_id, gender, score)
VALUES (1, 'xm', 1, 'M', 99);
REPLACE INTO students (id, name, class_id, gender, score)
VALUES (11, 'xf', 2, 'F', 59);


INSERT INTO students (id, class_id, name, gender, score)
VALUES (1, 2, '小明', 'F', 99)
ON DUPLICATE KEY
UPDATE name = '小明2', score = 90;
INSERT INTO students (id, class_id, name, gender, score)
VALUES (12, 2, '小贾', 'M', 99)
ON DUPLICATE KEY
UPDATE name = '小贾2', score = 9;


INSERT IGNORE INTO students (id, class_id, name, gender, score)
VALUES (1, 1, '小明', 'F', 29);


CREATE TABLE students_of_class_1 SELECT * FROM students WHERE class_id = 1;
CREATE TABLE students_of_1 SELECT * FROM students;


CREATE TABLE statistics (
    id BIGINT NOT NULL AUTO_INCREMENT,
    class_id BIGINT NOT NULL,
    average DOUBLE NOT NULL,
    PRIMARY KEY (id)
);
INSERT INTO statistics (class_id, average)
SELECT class_id, AVG(score)
FROM students
GROUP BY class_id;


ALTER TABLE students ADD INDEX idx_score(score);
SELECT * FROM students 
FORCE INDEX (idx_score) 
WHERE class_id = 1 ORDER BY id DESC;




show databases;

create database test_2;

drop database test_2;

use test;
show tables;

DESC teachers;

SHOW CREATE TABLE test.students;

SELECT * FROM teachersteachers;

CREATE TABLE test.ccc (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    class_id BIGINT NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE students_of_class_1;


ALTER TABLE students ADD COLUMN birth VARCHAR(10) NOT NULL;

ALTER TABLE teachers ADD context_time DATETIME NOT NULL;

ALTER TABLE teachers DROP context_time;

REPLACE INTO students (id, name, class_id, gender, score)
VALUES (1, 'xm', 1, 'M', 99);

REPLACE INTO students (id, name, class_id, gender, score)
VALUES (11, 'xf', 2, 'F', 59);

REPLACE INTO students (id, name, class_id, gender, score)
VALUES (1, 'xm', 1, 'M', 99);

REPLACE INTO students (id, name, class_id, gender, score)
VALUES (11, 'xf', 3, 'M', 19);

REPLACE INTO students (id, name, class_id, gender, score)
VALUES (1, 'xm', 1, 'M', 9);

INSERT INTO students (id, class_id, name, gender, score)
VALUES (1, 2, '小明', 'F', 99)
ON DUPLICATE KEY
UPDATE name = '小明2', score = 90;

INSERT INTO students (id, class_id, name, gender, score)
VALUES (12, 2, '小贾', 'M', 99)
ON DUPLICATE KEY
UPDATE name = '小贾2', score = 9;

INSERT IGNORE INTO students (id, class_id, name, gender, score)
VALUES (1, 1, '小明', 'F', 29);

CREATE TABLE students_of_class_1 SELECT * FROM students WHERE class_id = 1;

CREATE TABLE students_of_1 SELECT * FROM students;

CREATE TABLE statistics (
    id BIGINT NOT NULL AUTO_INCREMENT,
    class_id BIGINT NOT NULL,
    average DOUBLE NOT NULL,
    PRIMARY KEY (id)
);
INSERT INTO statistics (class_id, average)
SELECT class_id, AVG(score)
FROM students
GROUP BY class_id;

ALTER TABLE students ADD INDEX idx_score(score);

ALTER TABLE students ADD INDEX idx_score(score);
SELECT * FROM students 
FORCE INDEX (idx_score) 
WHERE class_id = 1 ORDER BY score DESC;