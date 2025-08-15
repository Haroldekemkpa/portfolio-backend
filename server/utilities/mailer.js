import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const clientEmailTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8" />
    <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 8px; }
        h2 { color: #10b981; }
        p { color: #333333; }
        .footer { font-size: 12px; color: #999999; margin-top: 20px; }
    </style>
    </head>
    <body>
    <div class="container">
        <h2>Thank You for Reaching Out!</h2>
        <p>Hello {{name}},</p>
        <p>Thank you for getting in touch. I have received your message and will respond as soon as possible.</p>
        <p>In the meantime, feel free to explore my work or connect with me on LinkedIn or GitHub.</p>
        <p>Warm regards,<br><strong>Harold Onyebuchi Ekemkpa</strong></p>
        <div class="footer">
        <p>Portfolio: <a href="https://github.com/Haroldekemkpa">find me on Github</a></p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/harold-ekemkpa/">connect with me on linkedin</a></p>
        </div>
    </div>
    </body>
    </html>

`;

export const adminTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <title>New Hire Request</title>
    <style>
        body {
        font-family: Arial, sans-serif;
        background-color: #f9fafb;
        margin: 0;
        padding: 0;
        }
        .container {
        background-color: #ffffff;
        max-width: 600px;
        margin: 30px auto;
        padding: 24px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0,0,0,0.05);
        }
        h2 {
        color: #f97316;
        margin-bottom: 20px;
        }
        .info {
        margin-bottom: 12px;
        }
        .info strong {
        display: inline-block;
        width: 120px;
        color: #333;
        }
        .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #999;
        border-top: 1px solid #eee;
        padding-top: 10px;
        }
        .project-details {
        white-space: pre-line;
        background-color: #f3f4f6;
        padding: 10px;
        border-radius: 4px;
        font-size: 14px;
        color: #333;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <h2>📩 New Hire Request Received</h2>

        <div class="info">
        <strong>Client Name:</strong> {{client}}
        </div>
        <div class="info">
        <strong>Email:</strong> {{email}}
        </div>
        <div class="info">
        <strong>Date:</strong> {{created_at}}
        </div>

        <div class="info">
        <strong>Project Details:</strong>
        <div class="project-details">{{project_details}}</div>
        </div>

        <div class="footer">
        This message was sent automatically from your portfolio site.
        </div>
    </div>
    </body>
    </html>

`;
