import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { encrypt , decrypt } from "./crypt.js";

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

        const encryptedText = encrypt(password);

        const stmt = await db.prepare(
          'INSERT INTO User (name, userName, password, email, image, iv, key) VALUES (? ,?, ?, ?, ?, ?, ?)'
        );

        await stmt.run(name, userName, encryptedText.encryptedData, email, image, encryptedText.iv, encryptedText.key);
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


    async createEvent(idUser, idGroup, title, info, createdDate, expiredDate){
      const db = await open({
        filename: "./hive-db.db",
        driver: sqlite3.Database,
      });
      const stmt = await db.prepare(
        'SELECT Event.title, Event.information, Event.expiredDate, Group_.type, Group_.groupName FROM Event JOIN Groups ON Groups.idGroup = Event.idGroup JOIN Group_ ON Event.idGroup = Group_.idGroup WHERE Groups.idUser = "alejandrocald13"',
      );
      
      await stmt.run(idUser, idGroup, title, info, createdDate, expiredDate);
      await stmt.finalize();
      await db.close();
    }

    async fetchEvent(idUser){
      const db = await open({
        filename: "./hive-db.db",
        driver: sqlite3.Database,
      });
        
      const stmt = await db.all(
        'SELECT Event.title, Event.information, Event.expiredDate, Group_.type, Group_.groupName, Group_.idGroup FROM Event JOIN Groups ON Groups.idGroup = Event.idGroup JOIN Group_ ON Event.idGroup = Group_.idGroup WHERE Groups.idUser = "alejandrocald13"'
    );

    let result;

    if (stmt) {
        result = stmt
      }
      else{
        result = null;
      }

      await db.close();
      return result;
    }

    async fetchGroupCalendar(idUser){
      const db = await open({
        filename: "./hive-db.db",
        driver: sqlite3.Database,
      });
        
      const stmt = await db.all(
        'SELECT Groups.idGroup, Group_.groupName, Group_.type FROM Groups JOIN Group_ ON Groups.idGroup = Group_.idGroup WHERE Groups.idUser = "alejandrocald13"'
    );

    let result;

    if (stmt) {
        result = stmt
      }
      else{
        result = null;
      }

      await db.close();
      console.log("resultado")
      console.log(result)
      return result;
    }



    // ROBERTO CALDERON
    async fetchGroups(idUser){
      const db = await open({
        filename: "./hive-db.db",
        driver: sqlite3.Database,
      });
    
      const stmt = await db.all(
        'SELECT * FROM Groups JOIN Group_ ON Groups.idGroup = Group_.groupName WHERE Groups.idUser = ?',
        [idUser]
    );

    let result;

    if (stmt) {
        result = stmt
      }
      else{
        result = null;
      }

      await db.close();

      return result;
    }


};


// Exporta la función para usarla en otros archivos
export {Table};
