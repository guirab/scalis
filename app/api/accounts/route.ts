import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  let db = null;
  if(!db){
    db = await open({
      filename: './db.sqlite',
      driver: sqlite3.Database
    });
  }
  const accounts = await db.all('SELECT * FROM accounts');
  return NextResponse.json(accounts);
}

export async function POST(req: NextRequest) {
  let db = null;
  if(!db){
    db = await open({
      filename: './db.sqlite',
      driver: sqlite3.Database
    });
  }
  const data = await req.json();
  const result = await db.run('INSERT INTO accounts (username, password, checking, savings) VALUES (?, ?, ?, ?)', [data.username, data.password, data.checking, data.savings]);
  return NextResponse.json(result);
}