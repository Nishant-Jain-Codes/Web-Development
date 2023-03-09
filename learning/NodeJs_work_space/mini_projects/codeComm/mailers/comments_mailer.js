const nodeMailer = require('../config/nodemailer');

//another way of exporting a method

exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment:comment }, '/comments/new_comment.ejs');
    console.log('inside new Comment mailer');
    nodeMailer.transporter.sendMail({
        from : 'nishant.dev.test@gmail.com',
        to: comment.user.email,
        subject: "New Comment posted",
        html: htmlString 
    },(err,info)=>{
        if(err){
            console.log('error in sending mail',err);
            return ;
        }
        console.log('message sent',info);
        return ;
    });
}