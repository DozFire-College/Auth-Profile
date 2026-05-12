import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pg from "pg";
import { getDb } from "../database/database.js";

const router = express.Router();

router.post('/register', async (req, res) => {
  const {login, password} = req.body

  if(!login || !password){
    res.json({success: false, error: "Login or password is empty!"});
    res.end();
    return;
  }

  if(password.length < 6){
    res.json({success: false, error: "Password is too short!"});
    res.end();
    return;
  }

  const db = getDb();
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await db.query(`INSERT INTO users(login, password) VALUES($1, $2) RETURNING id, login, created_at`, [login, hashedPassword]);
  const user = result.rows[0];

  fetch(`${process.env.PROFILE_SERVICE_URL}/api/profile`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({user_id: user.id, full_name: user.login})
  }).catch (() => { //> ловец ошибок
    
  });
  res.json({success: true, message: "Register Success!"});

});

router.post('/login', async (req, res) => {
  const {login, password} = req.body
  const db = getDb();

  if(!login){
    res.json({success: false, error: "Login or password is empty!"});
    res.end();
    return;
  }

  const result = await db.query(`SELECT * FROM users WHERE login = $1`, [login]);
  const user_login = result.rows[0];

  const isPasswordValid = await bcrypt.compare(password, user_login.password);
  if(isPasswordValid){
    res.json({success: true, message: "Welcome!"});
  }
  else{
    res.json({success: false, error: "Error!"});
  }

  const token = jwt.sign({id: user_login.id, login: user_login.login}, 
    process.env.JWT_SECRET, 
    {expiresIn: "1h"}
  );
  
  if(isPasswordValid){
    res.json({success: true, token, user_loin: {id: user_login.id, login: user_login.login, created_at: user_login.create_at}});
    res.end();
  }
});

export default router;