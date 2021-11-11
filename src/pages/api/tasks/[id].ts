import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const text = "SELECT * FROM tasks WHERE id = $1";
        const values = [id];
        const result = await conn.query(text, values);

        if (result.rowCount === 0)
          return res.status(404).json({ message: "Task Not Found" });

        return res.json(result.rows[0]);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case "PUT":
      try {
        const { title, description } = body;
        const text =
          "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *";
        const values = [title, description, id];
        const result = await conn.query(text, values);
        return res.json(result.rows[0]);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case "DELETE":
      try {
        const text = "DELETE FROM tasks WHERE id = $1 RETURNING *";
        const values = [id];
        const result = await conn.query(text, values);

        if (result.rowCount === 0)
          return res.status(404).json({ message: "Task Not Found" });

        return res.json(result.rows[0]);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: "Method are not supported" });
  }
};
