
mysql> select rno,marks from student where marks<=40;
+-----+-------+
| rno | marks |
+-----+-------+
| 2   | 40    |
| 6   | 12    |
+-----+-------+
2 rows in set (0.01 sec)

mysql> select rno from where marks>40;
1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'where marks>40' at line 1
mysql> select rno from student where marks>40;
+-----+
| rno |
+-----+
| 1   |
| 3   |
| 4   |
| 5   |
+-----+
4 rows in set (0.02 sec)

mysql> create table stu1(rno int(3) primary key,marks int(3),name varchar(10));
Query OK, 0 rows affected (0.00 sec)

mysql> insert into stu1 values(1,55,'ravi');
Query OK, 1 row affected (0.00 sec)

mysql> insert into stu1 values(2,77,'sajith');
Query OK, 1 row affected (0.00 sec)

mysql> insert into stu1 values(3,23,'tharindu');
Query OK, 1 row affected (0.00 sec)

mysql> insert into stu1 values(4,87,'inoka');
Query OK, 1 row affected (0.00 sec)

mysql> select * from stu1;
+-----+-------+----------+
| rno | marks | name     |
+-----+-------+----------+
|   1 |    55 | ravi     |
|   2 |    77 | sajith   |
|   3 |    23 | tharindu |
|   4 |    87 | inoka    |
+-----+-------+----------+
4 rows in set (0.03 sec)

mysql> select * from stu1 where name like 'r%';
+-----+-------+------+
| rno | marks | name |
+-----+-------+------+
|   1 |    55 | ravi |
+-----+-------+------+
1 row in set (0.04 sec)

mysql> select * from stu1 where name like '%u';
+-----+-------+----------+
| rno | marks | name     |
+-----+-------+----------+
|   3 |    23 | tharindu |
+-----+-------+----------+
1 row in set (0.04 sec)

mysql> select * from stu1 where name like '%a%';
+-----+-------+----------+
| rno | marks | name     |
+-----+-------+----------+
|   1 |    55 | ravi     |
|   2 |    77 | sajith   |
|   3 |    23 | tharindu |
|   4 |    87 | inoka    |
+-----+-------+----------+
4 rows in set (0.04 sec)

mysql> select * from stu1 where name not like '%r%';
+-----+-------+--------+
| rno | marks | name   |
+-----+-------+--------+
|   2 |    77 | sajith |
|   4 |    87 | inoka  |
+-----+-------+--------+
2 rows in set (0.04 sec)

mysql> select * from stu1 where name not like '%a%';
Empty set

mysql> select * from stu1 where name like '_a%';
+-----+-------+--------+
| rno | marks | name   |
+-----+-------+--------+
|   1 |    55 | ravi   |
|   2 |    77 | sajith |
+-----+-------+--------+
2 rows in set (0.05 sec)

mysql> select * from stu1 where name like '_a__';
+-----+-------+------+
| rno | marks | name |
+-----+-------+------+
|   1 |    55 | ravi |
+-----+-------+------+
1 row in set (0.04 sec)

mysql> select * from stu1 where name like '_____';
+-----+-------+-------+
| rno | marks | name  |
+-----+-------+-------+
|   4 |    87 | inoka |
+-----+-------+-------+
1 row in set (0.04 sec)

mysql> select * from stu1 where name like 'sa%' and 'ta%';
Empty set

mysql> select * from stu1 where name between 'sa%' and 'ta%';
+-----+-------+--------+
| rno | marks | name   |
+-----+-------+--------+
|   2 |    77 | sajith |
+-----+-------+--------+
1 row in set (0.04 sec)

mysql> select * from stu1 where mark between 50 and 80;
1054 - Unknown column 'mark' in 'where clause'
mysql> select * from stu1 where marks between 50 and 80;
+-----+-------+--------+
| rno | marks | name   |
+-----+-------+--------+
|   1 |    55 | ravi   |
|   2 |    77 | sajith |
+-----+-------+--------+
2 rows in set (0.05 sec)

mysql> select * from stu1 where marks>50 and marks<80;
+-----+-------+--------+
| rno | marks | name   |
+-----+-------+--------+
|   1 |    55 | ravi   |
|   2 |    77 | sajith |
+-----+-------+--------+
2 rows in set (0.05 sec)

mysql> ALTER TABLE stu1
ADD age;
1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near '' at line 2
mysql> alter table stu1 modify rno int(4);
Query OK, 0 rows affected (0.02 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> alter table stu1 add address varchar(20);
Query OK, 4 rows affected (0.02 sec)
Records: 4  Duplicates: 0  Warnings: 0

mysql> select * from stu1;
+-----+-------+----------+---------+
| rno | marks | name     | address |
+-----+-------+----------+---------+
|   1 |    55 | ravi     | NULL    |
|   2 |    77 | sajith   | NULL    |
|   3 |    23 | tharindu | NULL    |
|   4 |    87 | inoka    | NULL    |
+-----+-------+----------+---------+
4 rows in set (0.04 sec)

mysql> create table stu2(marks int(3), name varchar(10));
Query OK, 0 rows affected (0.00 sec)

mysql> select * from stu2
    -> ;
Empty set

mysql> select * from stu2;
Empty set

mysql> alter table stu2 add primary key (name);
Query OK, 0 rows affected (0.02 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> create table stu3(marks int(3),rno int(4) primary key,name varchar(10));
Query OK, 0 rows affected (0.01 sec)

mysql> create table stu4(name varchar(11), rno int(4) reference stu3);
1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'stu3)' at line 1
mysql> create table stu4(name varchar(11),rno int(4) reference stu3);
1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'stu3)' at line 1
mysql> create table stu4(name varchar(11),rno int(4) references stu3);
Query OK, 0 rows affected (0.01 sec)

mysql> insert into stu3 values 