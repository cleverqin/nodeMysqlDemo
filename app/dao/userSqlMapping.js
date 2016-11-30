var user = {
    insert:'INSERT INTO user_tb(user_id, user_name, password,nick_name) VALUES(?,?,?,?)',
    update:'update user_tb set  password=? ,nick_name=? where user_id=?',
    delete: 'delete from user_tb where user_id=?',
    queryByName: 'select * from user_tb where user_name=?',
    queryByID: 'select * from user_tb where user_id=?',
    queryAll: 'select * from user_tb'
};

module.exports = user;