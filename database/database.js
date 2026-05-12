import bcrypt from "bcrypt";
import pg from "pg";

const {Pool} = pg; //> вытащили отдельный класс Pool, который будет использоваться для создания подключений к базе данных

let pool;

export async function initDb() {
    pool = new Pool({connectionString: process.env.DATABASE_URL, ssl: {rejectUnauthorized: false}}); //> ssl {rejectUnauthorized: false} - отключаем проверку SSL-сертификата

    await pool.query(`CREATE TABLE IF NOT EXISTS users( //> pool.query - выполняет SQL-запрос
        id SERIAL PRIMARY KEY, //> SERIAL - целочисленный тип данных, который автоматически увеличивается при каждом добавлении нового записи
        login TEXT UNIQUE, 
        password TEXT,
        create_at DATETIME DEFAULT CURRENT_TIMESTAMP //> DATETIME - дата и время, по умолчанию текущее время
    )`)
}

export function getDb(){
    return pool;
}