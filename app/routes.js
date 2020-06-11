var fs = require("fs");
module.exports = function(app) {
  var fs = require("fs");
  var nodemailer = require("nodemailer");

  // server routes ===========================================================
  // handle things like api calls
  // authentication routes
  var options = { root: "." };

  var transporter = nodemailer.createTransport({
    service: "Yahoo",
    auth: {
      user: "sophie@iceesolutions.com",
      pass: "QWqw12!@"
    }
  });
  app.post("/email", function(req, res) {
    var mailOptions = {
      from: "sophie@iceesolutions.com",
      to: "sophie@iceesolutions.com",
      subject: req.name,
      text: "Name: "+req.name+"\nEmail: "+req.email+"\n\n"+req.comment
    };
    console.log(req);
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });
  // frontend routes =========================================================
  // route to handle all angular requests
  app.get("*", function(req, res) {
    res.sendFile("./public/index.html", options);
  });
};
