import db from "@lib/db/subscribe";

export default async function handler(req, res) {
  const { firstname, email, type } = JSON.parse(req.body);

  try {
    await db.query(`
      INSERT INTO template_subscribe(email, firstname, type) 
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE firstname = VALUES(firstname)
    `,
      [email, firstname, type]
    );

    return res.status(200).end();
  } catch (error) {
    return res.status(500).end();
  }
};
