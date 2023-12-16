select * from try.teacher;
select * from student;




-- 中文别名
SELECT class_id '班级ID', `name` '名字', score '分数' FROM stu;


-- 查某学生的详细信息
select s.*, info.student_id_of_id from student s
join student_info info on s.id = info.student_id_of_id
where s.name = '小明';


-- 查某学生的编号、姓名、班级名字
select s.*, class.name class_name from student s
join class on s.class_id = class.class_id
where s.name = '小龙';


-- 查某学生的课程
select s.*, l.name lesson_name from student s
join mid_student_lesson m on s.id = m.student_id_of_id
join lesson l on m.lesson_id = l.id
where s.name = '小明';


-- 查哪个班的学生最喜欢物理
select c.class_id, count(c.class_id) total from class c
join student s
on c.class_id = s.class_id
join mid_student_lesson m
on s.id = m.student_id_of_id
join lesson l
on m.lesson_id = l.id
where l.name = '物理'
group by c.class_id
order by total desc
limit 1;


-- 查学生课程中间表 学生有没有重复的课程
select * from mid_student_lesson m
order by student_id_of_id, lesson_id;


-- 查课程的学生数量
select lesson_id, count(lesson_id) total from mid_student_lesson m
group by lesson_id
order by total desc;


-- 查学生的课程数量
select student_id_of_id, count(*) total from mid_student_lesson m
group by student_id_of_id
order by total desc;


-- 查没有课程的学生
select s.id, s.name, s.class_id, if(m.lesson_id, m.lesson_id, '无课程') l_id from mid_student_lesson m
right join student s
on m.student_id_of_id = s.id
WHERE m.lesson_id is null;


-- 查有课程的学生
SELECT s1.id, s1.name, s1.class_id,	count(s1.l_id) lesson_count FROM
	(SELECT s.id, s.name,	s.class_id,	IF( m.lesson_id, m.lesson_id, '无课程' ) l_id FROM mid_student_lesson m
	RIGHT JOIN student s 
  ON m.student_id_of_id = s.id 
	WHERE m.lesson_id IS NOT NULL) AS s1
GROUP BY s1.id;


-- 查同一班级的学生, 与某人
SELECT * FROM student
WHERE class_id = 
  ( SELECT class_id FROM student 
  WHERE `name` = '小贾' )
AND `name` != '小贾';

-- 还有一种自连接查询, 关联自身这张表, 但要看作两张表, 效率高
SELECT s2.* FROM student s1
JOIN student s2
ON s1.class_id = s2.class_id
WHERE s1.`name` = '小贾'
AND s2.`name` != '小贾';


-- UNION 联合, 连接结果集
SELECT * FROM class
UNION ALL
SELECT * FROM class;

(SELECT * FROM class LIMIT 3)
UNION ALL
(SELECT * FROM class LIMIT 3)
LIMIT 4;


-- 查某表的大小
SELECT concat( round( sum( DATA_LENGTH / 1024 / 1024 ), 2 ), 'M' ) AS table_size 
FROM information_schema.TABLES 
WHERE table_schema = 'try' AND table_name = 'class3';