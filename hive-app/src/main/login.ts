import Database from 'better-sqlite3';

const db = new Database("hive-db.db");

function login(userName: string, password: string): boolean{
    const readStmt = db.prepare("SELECT * from User WHERE userName = ? & password = ?");
    const user = readStmt.get(userName, password);

    if (user){
        return true;
    }
    else {
        return false;
    }
}

db.close();