import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/utils/database";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const text = "SELECT * FROM tasks WHERE id = $1";
    const { id } = await params;
    const values = [id];
    const result = await pool.query(text, values);

    if (result.rowCount === 0)
      return NextResponse.json({ message: "Task Not Found" }, { status: 404 });

    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { title, description } = body;
    const text =
      "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *";
    const { id } = await params;
    const values = [title, description, id];
    const result = await pool.query(text, values);
    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const text = "DELETE FROM tasks WHERE id = $1 RETURNING *";
    const { id } = await params;
    const values = [id];
    const result = await pool.query(text, values);

    if (result.rowCount === 0)
      return NextResponse.json({ message: "Task Not Found" }, { status: 404 });

    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
