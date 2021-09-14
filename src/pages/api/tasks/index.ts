import { NextApiRequest, NextApiResponse } from 'next';
import { conn } from 'src/utils/database'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;

    switch (method) {
        case "GET":
            try {
                const query = 'SELECT * FROM tasks';
                const response = await conn.query(query);
                res.json(response.rows)
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
            break;
        case 'POST':
            try {
                const { title, description } = body;

                const query = 'INSERT INTO tasks(title, description) VALUES ($1, $2) RETURNING *';
                const values = [title, description];

                const response = await conn.query(query, values)

                res.json({ task: response.rows[0] });
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
            break;
        default:
            return res.status(400).json({message: 'Method are not supported'});
    }

}