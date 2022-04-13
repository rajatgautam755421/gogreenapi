const router = require("express").Router();
const nodemailer = require("nodemailer");

router.get("/mail", async (req, res) => {
  const { email, product_price, product_amount, location } = req.body;
  console.log(email);
  console.log(product_price);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "gautamrajat185@gmail.com",
        pass: "1462962708",
      },
    });

    const mailOptions = {
      from: "gautamrajat185@gmail.com",
      to: "rajatgautam832@gmail.com",
      subject: "Mail From GoGreen",
      html: `
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GoGreen</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <h1 style="text-align: center; margin: 10px 0px">
      Email To ${email} From GoGreen
    </h1>
    <p style="text-align: center; margin: 10px 0px">
      We Like To Inform You That Your Payment Is Recieved And You Will Recieve
      Your Item As Soon As Possible
    </p>

    <div class="container" style="margin-top: 20px">
      <table class="table" border="1" style="margin: 0px auto">
        <thead>
          <tr>
            <th scope="col">Product Price</th>
            <th scope="col">Product Quantity</th>
            <th scope="col">Product Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${product_price}</td>
            <td>${product_amount}</td>
            <td>${location}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>

      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
