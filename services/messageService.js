import { sql } from "../database/database.js";

const addItem = async (sender, message) => {
  await sql`INSERT INTO messages (sender, message) VALUES (${ sender }, ${ message })`;
};

const deleteItem = async (id) => {
  await sql`DELETE FROM messages WHERE id = ${ id }`;
};

const getSortedLastFives = async () => {
  return await sql`SELECT * FROM messages
    ORDER BY id DESC
    LIMIT 5;`;
};

const findAll = async () => {
  return await sql`SELECT * FROM messages`;
};

export { addItem, getSortedLastFives, deleteItem, findAll };