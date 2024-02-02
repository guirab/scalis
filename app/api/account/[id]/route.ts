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
  return NextResponse.json(accounts);
}