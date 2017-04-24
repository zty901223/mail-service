##### Email Service API
=================================

[Live Service](http://emailservice-1223.herokuapp.com/)

### Description
This Web app provide a service that send a simple text email using SendGird or Mailgun.
User will need to fill up sender email address, receiver email address, mail subject and content to send the mail.
By default, it will use SendGrid to send the mail. If SendGrid service went down, it will then switch to mailgun to send the mail.
If both online mail services are down, an error message will be returned.

- online mail service provider:
[SendGrid](https://sendgrid.com/)
[Mailgun](https://www.mailgun.com/)


### Architecture
- Node.js
- Express back-end
- a simple html index page

The web service is very simple to create.
The tricky part is how to create the npm module that is reuseable and open sourced.

The npm module is customized for my web application that in my web service, I only called one function to achieve sending using SendGrid as default mail service and using Mailgun as the contingency mail service.
However, it also could means that to apply the npm module to other web service, some modifcation may be needed.
For more information about the npm module, please refer to [npm packge](https://www.npmjs.com/package/send-mail-kz#example).


### Trade-offs
- To keep the web application simple, I have a nested promises (3 levels) in the main function in the npm module, which will first check if SendGrid service is up and send mail via SendGrid. If SendGrid went down, it will then check if Mailgun service is up and send mail via Mailgun. If both mail service went down, an error message will returned. It could be better to handle the condition check on server side with the web service.

- For simplicity, only a simple json format variable is accepted as the mail body.
```javascript
mailbody = {
	fromMailAddress: 'Sender Email address',
	toMailAddress: 'Receiver Email address',
	subject: 'subject',
	emailContent: 'mail cntent'
}
```

- Minimal Front-end. This project is more focused on back-end and the npm module therefore only a minimal index page is provided as front-end.

- No database is involved. All mail sent using the web service will not be stored.

- Testing is focused on the npm module instead of the web service.


### To-dos
- Front-end can be refined.

- Involving database. MongoDB can be used to store the mails that has been sent for tracking and checking.

- Adding more mail options. e.g. sending adding pictures and attachments.

- More detailed response and thorough error handling

- Adding more contingency Email service.


### How to run
$ git clone https://github.com/zty901223/mail-service

$ cd mail-service and npm install

$ SET DEBUG=emailservice:* & npm start


### To use
To use SendGrid and Mailgun service, you will need to sign up on their officail website
[SendGrid](https://sendgrid.com/)
[Mailgun](https://www.mailgun.com/)

For SendGrid, you will need an API key.
For Mailgun, you will need an API key as well as a mailgun domain.
Details are provided on the official website.

### Dependencies
- ejs: ~2.5.5
- express: ~4.14.1
- send-mail-kz: ^0.1.0
- sendgrid: ^5.0.0
- mailgun-js: ^0.10.1