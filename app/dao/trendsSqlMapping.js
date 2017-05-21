var trends={
    insert:'INSERT INTO trends_tb(user_id, trends_content,create_date,pic_list) VALUES(?,?,?,?)',
    queryAll:'SELECT trends_tb.trends_id,trends_tb.user_id,trends_tb.trends_content,trends_tb.create_date,trends_tb.pic_list,user_tb.user_name,user_tb.nick_name,user_tb.user_pic ' +
    'FROM trends_tb INNER JOIN user_tb ON trends_tb.user_id = user_tb.user_id WHERE trends_tb.user_id = user_tb.user_id ORDER BY trends_tb.create_date DESC'
}
module.exports = trends;