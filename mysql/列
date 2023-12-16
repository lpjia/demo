-- 增加一列
ALTER TABLE class3 ADD COLUMN floor_id INT NOT NULL;

alter table class 
add column teacher_id varchar(10) not null;

alter table class 
add column teacher_id varchar(10) not null default 'A1' after 字段;




-- 更新某些字段的记录
UPDATE class3 
SET floor_id = ( 10 + id );

UPDATE class3 
SET floor_id = ( 20 + id )
WHERE class_id = 203;

UPDATE class3 
SET floor_id = ( 30 + id )
WHERE class_id > 203;


update student_info
join student
on student_info.id = student.id
set student_info.student_id_of_id = student.id;



-- 删除某些字段的记录
DELETE FROM class3 WHERE class_id = 205;


-- 删除列 字段
ALTER TABLE class3 DROP COLUMN floor_id;



-- 添加索引
ALTER TABLE teacher
ADD INDEX idx_teacher_id (teacher_id);


-- 快速清空表, 重置auto_increment的值, 保留表结构
TRUNCATE TABLE class3;


-- 插入相同表结构的数据
INSERT INTO class3 SELECT * FROM class;


INSERT INTO student_info(student_id)  
SELECT student_id FROM student;


-- 插入多条数据
INSERT INTO 
mid_student_lesson (student_id_of_id, lesson_id) 
VALUES 
(6, 1), 
(17, 2), 
(4, 3), 
(19, 4),
(7, 5),
(10, 6),
(5, 10),
(16, 5),
(8, 1);