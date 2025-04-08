import { NextResponse } from "next/server";
import { pool } from "@/utils/database";

export async function GET() {
  try {
    const query = "SELECT * FROM tasks";
    const response = await pool.query(query);
    return NextResponse.json(response.rows);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, description } = await request.json();

    const query =
      "INSERT INTO tasks(title, description) VALUES ($1, $2) RETURNING *";
    const values = [title, description];
    const response = await pool.query(query, values);

    return NextResponse.json(response.rows[0]);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
