import massive from "massive";
import dotenv from 'dotenv';
dotenv.config();

declare module 'massive' {
    interface Database {
        trace: (on: boolean, reason: string) => void;
    }
}

const defaultConnectionInfo: massive.ConnectionInfo = {
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || "5435"),
}

let db: massive.Database;

export type Connection = massive.Database;

async function getConnectionForOffline(connectionInfo: Partial<massive.ConnectionInfo> = defaultConnectionInfo): Promise<massive.Database> {
    if (db) {
        return db;
    }
    const instance = await massive({
        ...defaultConnectionInfo,
        ...connectionInfo,
    }, { scripts: `${process.cwd()}/src/database/dbscripts` });

    db = instance;

    return db;
}

export async function getConnection(): Promise<massive.Database> {
    const connectionInfo: Partial<massive.ConnectionInfo> = defaultConnectionInfo;
    let _db: massive.Database;
    _db = await getConnectionForOffline(connectionInfo);
    return _db;
}

// massive(defaultConnectionInfo).then(db => {
//     app.set('db', db);

//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
// }).catch(err => {
//     console.error('Error connecting to the database:', err);
// });

// export default app;

// const pool = new Pool({
//     user: process.env.POSTGRES_USER,
//     host: 'localhost',
//     database: process.env.POSTGRES_DB,
//     password: process.env.POSTGRES_PASSWORD,
//     port: 3452,
// });

// export default pool;