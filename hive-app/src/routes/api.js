import { open } from "sqlite";
import sqlite3 from "sqlite3";
// Hacer clase base de datos

// Función para insertar usuarios en la base de datos
class Table{
    constructor(){
        

    };
    // Métodos de inserción
    async insertUser(name, userName, password, email, image = null) {
        const db = await open({
          filename: "./hive-db.db",
          driver: sqlite3.Database,
        });
      
        const stmt = await db.prepare(
          'INSERT INTO User (name, userName, password, email, image) VALUES (? ,?, ?, ?, ?)'
        );
        await stmt.run(name, userName, password, email, image);
        await stmt.finalize();
        await db.close();
        console.log("Usuario insertado y conexión cerrada.");
    };

    async insertGroup(groupName, createdDate, type, creatorUser){
        const db = await open({
            filename: "./hive-db.db",
            driver: sqlite3.Database,
          });
        
          const stmt = await db.prepare(
            'INSERT INTO Group (groupName, createdDate, type, creatorUser) VALUES (? ,?, ?, ?)'
          );
          await stmt.run(groupName, createdDate, type, creatorUser);
          await stmt.finalize();
          await db.close();
          console.log("Usuario insertado y conexión cerrada.");
    };

    async insertGroups(idUser, idGroup){
        const db = await open({
            filename: "./hive-db.db",
            driver: sqlite3.Database,
          });
        
          const stmt = await db.prepare(
            'INSERT INTO Groups (idUser, idGroup) VALUES (?, ?)'
          );
          await stmt.run(idUser, idGroup);
          await stmt.finalize();
          await db.close();
          console.log("Usuario insertado y conexión cerrada.");
    };

    async insertNotes(idUser, information, confirmatedDate, image){
        const db = await open({
            filename: "./hive-db.db",
            driver: sqlite3.Database,
          });
        
          const stmt = await db.prepare(
            'INSERT INTO Note (idUser, information, confirmatedDate, image) VALUES (?, ?, ?, ?)'
          );
          await stmt.run(idUser, information, confirmatedDate, image);
          await stmt.finalize();
          await db.close();
          console.log("Usuario insertado y conexión cerrada.");
    };


    async insertPost(idGroup, idUser, confirmatedDate, information, image){
        const db = await open({
            filename: "./hive-db.db",
            driver: sqlite3.Database,
          });
        
          const stmt = await db.prepare(
            'INSERT INTO Post (idGroup, idUser, confirmatedDate, information, image) VALUES (?, ?, ?, ?, ?)'
          );
          await stmt.run(idGroup, idUser, confirmatedDate, information, image);
          await stmt.finalize();
          await db.close();
          console.log("Usuario insertado y conexión cerrada.");
    };

    async validateUser(userName, password, email = null){
      const db = await open({
        filename: "./hive-db.db",
        driver: sqlite3.Database,
      });
    
      const stmt = await db.get(
        'SELECT * FROM User WHERE userName = ? AND password = ?',
        [userName, password]
    );
    
      let userFound = false
      if (stmt) {
        userFound = true
      } else{
        userFound = false
      }
      await db.close();
      return userFound

    }

    async getNotes(){
      const db = await open({
        filename: "./hive-db.db",
        driver: sqlite3.Database,
      });
    
      const data = await db.all(
        'SELECT * FROM User'
    );
      return data
    }

    async getEvents(){
      const db = await open({
        filename: "./hive-db.db",
        driver: sqlite3.Database,
      });
    
      const data = await db.all(
        'SELECT * FROM Events'
    );
      return data
    }

    async getGroups(){
      const db = await open({
        filename: "./hive-db.db",
        driver: sqlite3.Database,
      });
    
      const data = await db.all(
        'SELECT * FROM Groups'
    );
      return data
    }

    async getGroup(){
      const db = await open({
        filename: "./hive-db.db",
        driver: sqlite3.Database,
      });
    
      const data = await db.all(
        'SELECT * FROM Group'
    );
      return data
    }


};


// Exporta la función para usarla en otros archivos
export {Table};
