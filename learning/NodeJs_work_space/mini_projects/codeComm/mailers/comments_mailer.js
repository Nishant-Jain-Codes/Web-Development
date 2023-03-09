const nodeMailer = require('../config/nodemailer');

//another way of exporting a method

exports.newComment = (comment) => {
    console.log('inside new Comment mailer');
    nodeMailer.transporter.sendMail({
        from : 'nishant.dev.test@gmail.com',
        to: comment.user.email,
        subject: "New Comment posted",
        html: "<h1>comment published</h1>", 
    },(err,info)=>{
        if(err){
            console.log('error in sending mail',err);
            return ;
        }
        console.log('message sent',info);
        return ;
    });
}