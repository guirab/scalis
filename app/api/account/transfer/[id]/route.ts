import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let db = null;
  const id = req.url.split("/").pop();
  const data = await req.json();
  if(!db){
    db = await open({
      filename: './db.sqlite',
      driver: sqlite3.Database
    });
  }
  const accountFrom = await db.all('SELECT * FROM accounts WHERE id = ?', id);
  const accountTo = await db.all('SELECT * FROM accounts WHERE username = ?', data.to);
  if(accountTo.length === 0){
    return NextResponse.json({error: "Account not found"});
  } else if(id === accountTo[0].id.toString()){
    return NextResponse.json({error: "Cannot transfer to same account"});
  } else if (accountFrom[0].password !== data.password){
    return NextResponse.json({error: "Invalid password"});
  } else if(accountFrom[0].checking < data.amount){
    return NextResponse.json({error: "Insufficient funds"});
  }
  await db.run('UPDATE accounts SET checking = checking - ? WHERE id = ?', data.amount, id);
  await db.run('UPDATE accounts SET checking = checking + ? WHERE username = ?', data.amount, data.to);
  const result = await db.all('SELECT * FROM accounts WHERE id = ?', id);
  return NextResponse.json(result[0]);
}