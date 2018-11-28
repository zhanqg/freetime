// // 商品评论表
// module.exports = app => {
//     const mongoose = app.mongoose;
//     const Schema = mongoose.Schema;

//     const CommentSchema = new Schema({
//         comment_uid: String,        // 评论人的id
//         comment_name: String,       // 评论人的名字
//         cid: String,                // 商品的id
//         comment_time: {             // 评论的时间
//             type: Number,
//             default: +new Date(),
//         },
//         content: {                  // 评论的内容
//             type: String,
//             required: true
//         },
//         comment_avatar: {            // 评论人的头像
//             type:String,
//             default: 'http://images.baixingliangfan.cn/compressedPic/20171219105440_2015.jpg'
//         },     
//     });

//     return mongoose.model('Comment', CommentSchema, 'comment');
// }