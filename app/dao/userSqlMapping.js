var user = {
    insert:'INSERT INTO user_tb(user_name, password,nick_name,user_pic) VALUES(?,?,?,"1.jpg")',
    update:'update user_tb set  password=? ,nick_name=? where user_id=?',
    delete: 'delete from user_tb where user_id=?',
    queryByName: 'select * from user_tb where user_name=?',
    queryByID: 'select * from user_tb where user_id=?',
    queryAll: 'select * from user_tb LIMIT ?,?',
    queryCountNum: 'SELECT COUNT(*) AS countNum FROM user_tb',
    updateUserPic:"update user_tb set  user_pic=? where user_id=?"
};

module.exports = user;