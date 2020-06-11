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
      pass: "jveoyvtyfjadzxkg"
    }
  });
  app.post("/email", function(req, res) {
    if (req.body.comment=="" || req.body.email=="") {
      return;
    }
    var mailOptions = {
      from: "sophie@iceesolutions.com",
      to: "sophie@iceesolutions.com",
      subject: req.body.name,
      text: "Name: "+req.body.name+"\nEmail: "+req.body.email+"\n\n"+req.body.comment
    };
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + req.body + "\n"+info.response);
      }
    });
  });
  // frontend routes =========================================================
  // route to handle all angular requests
  app.get("*", function(req, res) {
    res.sendFile("./public/index.html", options);
  });
};
