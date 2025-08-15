import createPool from "./db.js";

const db = await createPool();

export const createAdminTable = async () => {
  try {
    db.query(`
        CREATE TABLE IF NOT EXISTS admin(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        role ENUM('admin', 'viewer') DEFAULT 'viewer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
        `);
    console.log("Admin table created successful");
  } catch (error) {
    console.error("Error in creating admin table: ", error);
    throw error;
  }
};

export const createAdmin = async (admin) => {
  try {
    const { name, email, password } = admin;

    const query = `INSERT INTO admin(name, email, password) VALUES(?, ?, ?)`;
    const [result] = await db.query(query, [name, email, password]);
    console.log("admin created successfully");
    return result;
  } catch (error) {
    console.error("couldn't create admin");
    throw error;
  }
};

export const getAdminByEmail = async (email) => {
  try {
    const query = `SELECT * FROM admin WHERE email = ?`;
    const [rows] = await db.query(query, [email]);
    if (rows.length === 0) {
      console.log("No admin found with that email");
      return null;
    }
    console.log("admin loging sucessfull");
    return rows[0];
  } catch (error) {
    console.error("Error getting admin");
    throw error;
  }
};

export const deleteAdmin = async (id) => {
  try {
    const query = `DELETE FROM admin WHERE id = ?`;
    const [result] = await db.query(query, [id]);

    if (result.affectedRows === 0) {
      console.log("no admin with that id found");
      return { success: false, message: "admin not found" };
    }

    console.log(`Admin with id: ${id} deleted sucessfully`);
    return { success: true, message: "admin deleted" };
  } catch (error) {
    console.error("deleting error", error);
    throw error;
  }
};

export const getAllAdmin = async () => {
  try {
    const [rows] = await db.query(`SELECT * FROM admin`);
    console.log("get all admins successful");
    return rows;
  } catch (error) {
    console.error("Something went wrong: ", error);
    throw error;
  }
};
