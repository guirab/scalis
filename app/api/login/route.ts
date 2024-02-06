import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let db = null;
  if(!db){
    db = await open({
      filename: './db.sqlite',
      driver: sqlite3.Database
    });
  }
  let data
  try {
    data = await req.json();
  } catch (e) {
    data= req.body
    return NextResponse.json({error: "Invalid JSON"});
  }
  // const data = await req.json();
  console.log(data)
  const result = await db.all('SELECT * FROM accounts WHERE username = ?', data.username);
  if(result.length === 0){
    return NextResponse.json({error: "Invalid username"});
  }
  if(result[0].password !== data.password){
    return NextResponse.json({error: "Invalid password"});
  }
  return NextResponse.json(result);
}
