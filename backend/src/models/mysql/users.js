import mysql from "mysql2/promise";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = process.env.SALT_ROUNDS || 10;
dotenv.config();

const config = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  port: process.env.DB_PORT || 3306,
  password: process.env.DB_PASS || "bcqoz1!B", // Change this to your MySQL password
  database: process.env.DB_NAME || "sanders_db", // Change this to your MySQL database name
};

export class UserModel {
  static async getAll() {
    let connection = null;
    try {
      connection = await mysql.createConnection(config);
      const [users] = await connection.query(
        "SELECT id, name, email, role_id, phone, profile_image_url FROM users"
      );
      return users;
    } catch (error) {
      console.error("Error fetching users: ", error);
      return [];
    } finally {
      if (connection) {
        connection.end();
      }
    }
  }

  static async registerNewUser(name, email, password, role_id, phone, profile_image_url) {
    let connection = null;
    try {
      connection = await mysql.createConnection(config);
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await connection.query(
        "INSERT INTO users (name, email, password, role_id, phone, profile_image_url) VALUES (?, ?, ?, ?, ?, ?)",
        [name, email, hashedPassword, role_id, phone, profile_image_url]
      );

      return { success: true, message: "Usuario registrado correctamente" };
    } catch (error) {
      console.error("Error: ", error);

      // Capturar el código de error de MySQL para entradas duplicadas
      if (error.code === "ER_DUP_ENTRY") {
        // Devolver un mensaje detallado para entradas duplicadas
        return {
          success: false,
          message: "El correo electrónico o teléfono ya está registrado.",
        };
      }

      return {
        success: false,
        message: "Ocurrió un error al registrar el usuario.",
      };
    } finally {
      if (connection) {
        connection.end();
        console.log("Connection closed");
      }
    }
  }

  static async getLogin(email, pass) {
    let connection = null;
    try {
      connection = await mysql.createConnection(config);
      const [user] = await connection.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      const hashedPassword = user[0].password;
      const match = await bcrypt.compare(pass, hashedPassword);

      if (match) {
        const token = jwt.sign(
          {
            id: user[0].id,
            email: user[0].email,
            password: user[0].password,
            role_id: user[0].role_id,
            phone: user[0].phone,
            profile_image_url: user[0].profile_image_url,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );

        const refreshToken = jwt.sign(
          {
            id: user[0].id,
            email: user[0].email,
            password: user[0].password,
            role_id: user[0].role_id,
            phone: user[0].phone,
            profile_image_url: user[0].profile_image_url,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );

        return { user: user[0], token, refreshToken };
      }
    } catch (error) {
      console.error("Error: ", error);
      return [];
    } finally {
      if (connection) {
        connection.end();
        console.log("Connection closed");
      }
    }
  }

  static async updateUser(id, name, email, role_id, phone) {
    let connection = null;
    try {
      connection = await mysql.createConnection(config);
      await connection.query(
        "UPDATE users SET name = ?, email = ?, role_id = ?, phone = ? WHERE id = ?",
        [name, email, role_id, phone, id]
      );
      return true;
    } catch (error) {
      console.error("Error: ", error);
      return false;
    } finally {
      if (connection) {
        connection.end();
        console.log("Connection closed");
      }
    }
  }

  static async deleteUser(id) {
    let connection = null;
    try {
      connection = await mysql.createConnection(config);

      // Primero desvincular las donaciones relacionadas con el usuario
      await connection.query(
        "UPDATE donations SET donor_id = NULL WHERE donor_id = ?",
        [id]
      );

      // Luego eliminar el usuario
      await connection.query("DELETE FROM users WHERE id = ?", [id]);

      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      return false;
    } finally {
      if (connection) {
        connection.end();
        console.log("Connection closed");
      }
    }
  }

  static async refreshToken(refreshToken) {
    try {
      // Verificar si el Refresh Token es válido
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

      // Generar un nuevo Access Token usando el mismo payload que ya estaba en el Refresh Token
      const newToken = jwt.sign(
        { id: decoded.id, email: decoded.email, role: decoded.role }, // Usamos el mismo payload del token anterior
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Expira en 1 hora
      );

      // Generar un nuevo Refresh Token
      const newRefreshToken = jwt.sign(
        { id: decoded.id, email: decoded.email, role: decoded.role }, // Usamos el mismo payload
        process.env.JWT_SECRET,
        { expiresIn: "7d" } // Expira en 7 días
      );

      return { token: newToken, refreshToken: newRefreshToken };
    } catch (error) {
      console.log("Error al refrescar los tokens: ", error);
      return false;
    }
  }

  static async updateProfileImage(userId, profileImageUrl) {
    let connection = null;

    try {
      connection = await mysql.createConnection(config);
      const [result] = await connection.query(
        "UPDATE users SET profile_image_url = ? WHERE id = ?",
        [profileImageUrl, userId]
      );

      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error actualizando la imagen de perfil:", error);
      throw error;
    }
    finally {
        if (connection) {
            connection.end();
            console.log('Conexión cerrada');
        }
    }
  }
}
