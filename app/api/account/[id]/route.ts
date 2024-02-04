import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let db = null;
  const id = req.url.split("/").pop();
  if(!db){
    db = await open({
      filename: './db.sqlite',
      driver: sqlite3.Database
    });
  }
  const accounts = await db.all('SELECT * FROM accounts WHERE id = ?', id);
  return NextResponse.json(accounts[0]);
}

export async function PUT(req: NextRequest) {
  let db = null;
  const id = req.url.split("/").pop();
  const data = await req.json();
  if(!db){
    db = await open({
      filename: './db.sqlite',
      driver: sqlite3.Database
    });
  }
  if(data.action === 'deposit'){
    await db.run(`UPDATE accounts SET ${data.type} = ${data.type} + ? WHERE id = ?`, data.amount, id);
  }

  if(data.action === 'withdraw'){
    const account = await db.all('SELECT * FROM accounts WHERE id = ?', id);
    if(account[0][data.type] < data.amount){
      return NextResponse.json({error: "Insufficient funds"});
    }
    await db.run(`UPDATE accounts SET ${data.type} = ${data.type} - ? WHERE id = ?`, data.amount, id);
  }

  if(data.action === 'transfer'){
    const account = await db.all('SELECT * FROM accounts WHERE id = ?', id);
    const to = data.from === 'savings' ? 'checking' : 'savings';
    if(account[0][data.from] < data.amount){
      return NextResponse.json({error: "Insufficient funds"});
    }
    await db.run(`UPDATE accounts SET ${data.from} = ${data.from} - ? WHERE id = ?`, data.amount, id);
    await db.run(`UPDATE accounts SET ${to} = ${to} + ? WHERE id = ?`, data.amount, id);
  }

  const account = await db.all('SELECT * FROM accounts WHERE id = ?', id);
  return NextResponse.json(account[0]);
}