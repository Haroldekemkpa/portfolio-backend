import { createHire, getAllHireRequest } from "../model/hiremeModel.js";
import {
  clientEmailTemplate,
  adminTemplate,
  transporter,
} from "../utilities/mailer.js";

export const createHireController = async (req, res) => {
  try {
    const { client, email, project } = req.body;

    if (!client || !email || !project) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await createHire({ client, email, project });

    const createdAt = new Date().toLocaleString();

    // Format email templates with dynamic values
    const clientHTML = clientEmailTemplate.replace("{{name}}", client);
    const adminHTML = adminTemplate
      .replace("{{client}}", client)
      .replace("{{email}}", email)
      .replace("{{created_at}}", createdAt)
      .replace("{{project_details}}", project);

    // Send email to client
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thanks for reaching out!",
      html: clientHTML,
    });

    // Send email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // your admin email
      subject: `New Hire Request from ${client}`,
      html: adminHTML,
    });

    return res.status(201).json({
      success: true,
      message: "Hire request sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error sending hire request try again",
      error: error.message,
    });
  }
};

export const getAllHireController = async (req, res) => {
  try {
    const hires = await getAllHireRequest();
    return res.status(200).json({ success: true, hires });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error getting hire requests tryagain",
      error: error.message,
    });
  }
};
