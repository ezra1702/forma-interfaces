import mysql from "mysql2/promise";

export default async function handler(req, res){
    if (req.method !== "POST"){
        return res.status(405).json({ error: "Method not allowed" });
    }

    // Samain dengan di database MySQL
    const{ nama_lengkap, email, perusahaan, layanan, pesan } = req.body;

    if(!nama_lengkap || !email || !layanan || !pesan){
        return res.status(400).json({ error: "Data tidak lengkap" });
    }

    // Koneksinya ke MySQL
    try{
        const connection = await mysql.createConnection({
            host: "mysql-forma-interfaces.alwaysdata.net/",
            user: "440525_apiBE",
            password: "f0rm41nt3rf4c3s",
            database: "forma-interfaces-1",
        });

        await connection.execute(
            `INSERT INTO project_requests (nama_lengkap, email, perusahaan, layanan, pesan)
            VALUES (?, ?, ?, ?, ?)`,
            [nama_lengkap, email, perusahaan || null, layanan, pesan]
        );

        await connection.end();

        res.status(200).json({ status: "success" });
    } catch (err){
        console.error("DB Error:", err);
        res.status(500).json({ error: "Database error" });
    }
}