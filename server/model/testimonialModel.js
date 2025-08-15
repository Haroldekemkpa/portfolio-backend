import createPool from "./db.js";
const db = await createPool();

export const createTestimonialTable = async () => {
  try {
    db.query(`
        CREATE TABLE IF NOT EXISTS testimonialS(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        title VARCHAR(255),
        comment VARCHAR(255),
        profile_img VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
        `);
    console.log("testimonialS tale created successfully");
  } catch (error) {
    console.error("something went wrong");
    throw error;
  }
};

export const createTestimonial = async (testimonial) => {
  try {
    const { name, title, comment, profile_img } = testimonial;

    const query = `INSERT INTO testimonialS (name, title, comment, profile_img) VALUES(?, ?, ?, ?)`;
    const testimonials = await db.query(query, [
      name,
      title,
      comment,
      profile_img,
    ]);

    console.log("comment submited succefully");
    return { success: true, message: "testimonial created successfully" };
  } catch (error) {
    console.error("something went wrong");
    throw error;
  }
};

export const getTestimonial = async () => {
  try {
    const query = `SELECT * FROM testimonials ORDER BY created_at DESC`;
    const [rows] = await db.query(query);

    console.log("get all testimonial request successful");
    return rows;
  } catch (error) {
    console.error("something went wrong");
    throw error;
  }
};

export const deleteTestimonial = async (id) => {
  try {
    const query = `DELETE FROM testimonialS WHERE id = ?`;
    const [result] = await db.query(query, [id]);

    if (result.affectedRows === 0) {
      console.log(`No testimonial found with id ${id}`);
      return { success: false, message: "Testimonial not found" };
    }

    console.log(`Testimonial with id ${id} deleted successfully`);
    return { success: true, message: "Testimonial deleted" };
  } catch (error) {
    console.error("Something went wrong while deleting the testimonial");
    throw error;
  }
};
