import {
  createTestimonial,
  deleteTestimonial,
  getTestimonial,
} from "../model/testimonialModel.js";

export const createTestimonialController = async (req, res) => {
  try {
    const { name, title, comment } = req.body;
    const profile_img = req.file?.filename || null;

    if (!name || !title || !comment) {
      return res.status(400).json({
        error: "all fields are requires",
      });
    }

    await createTestimonial({
      name,
      title,
      comment,
      profile_img,
    });

    return res.status(200).json({
      success: true,
      message: "comment submited successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: " error submitting comment try again",
      error: error.message,
    });
  }
};

// controllers/dashboard/testimonialController.js

export const deleteTestimonialController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "ID is required" });
    }

    const result = await deleteTestimonial(id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.status(201).json(result);
  } catch (error) {
    console.error("Error in deleteTestimonialController:", error);
    return res.status(500).json({
      success: false,
      message: "error deleting testimonial try again",
      error: error.message,
    });
  }
};

//Get all testimonial

export const getAllTestimonialController = async (req, res) => {
  try {
    const testimonials = await getTestimonial();
    return res.status(200).json({ success: true, testimonials });
  } catch (error) {
    return res.status(500).json({
      sucCess: false,
      message: "Error getting testimonials try again",
      error: error.message,
    });
  }
};
