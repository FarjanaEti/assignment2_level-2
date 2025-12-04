import {Pool} from "pg"
import config from ".";

export const pool = new Pool({
  connectionString: `${config.connection_str}`,
});

const initBD=async()=>{
    
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password TEXT NOT NULL CHECK (CHAR_LENGTH(password) >= 6),
        phone VARCHAR(15) NOT NULL,
        role VARCHAR(20) NOT NULL CHECK (Role IN ('admin', 'customer')),
        CONSTRAINT email_lowercase CHECK (email = LOWER(email))
        )
        `);

        
}

export default initBD;