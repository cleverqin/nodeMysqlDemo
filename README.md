# nodeMysqlDemo
node+express+mysql实现用户表的增删改查的举例。
用户表sql
CREATE TABLE `user_tb` (
  `user_id` varchar(64) NOT NULL,
  `user_name` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `nick_name` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
