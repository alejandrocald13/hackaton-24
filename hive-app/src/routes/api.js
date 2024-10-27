import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { encrypt , decrypt } from "./crypt.js";
import { useEffect } from "react";
import { isCompositeComponent } from "react-dom/test-utils";

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
            'INSERT INTO Group_ (groupName, createdDate, type, creatorUser) VALUES (? ,?, ?, ?)'
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

    async insertNote(idUser, information, confirmatedDate){
        const db = await open({
            filename: "./hive-db.db",
            driver: sqlite3.Database,
          });
        
          const stmt = await db.prepare(
            'INSERT INTO Note (idUser, information, confirmatedDate) VALUES (?, ?, ?)'
          );
          await stmt.run(idUser, information, confirmatedDate);
          await stmt.finalize();
          await db.close();
          console.log("NOTA insertado y conexión cerrada.");
    };


    async insertEvent(idEvent, idGroup, idUser, title, information, createdDate, expiredDate){
        const db = await open({
            filename: "./hive-db.db",
            driver: sqlite3.Database,
          });
        
          const stmt = await db.prepare(
            'INSERT INTO Post (idEvent, idGroup, idUser, title, information, createdDate, expiredDate) VALUES (?, ?, ?, ?, ?, ?, ?)'
          );
          await stmt.run(idEvent, idGroup, idUser, title, information, createdDate, expiredDate);
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
        'SELECT * FROM User WHERE userName = ?',
        [userName]
    );
      let userFound = false
      if (stmt) {
        
        userFound = true;

        if (userFound){

            const foundPassword = stmt.password;
            const iv = stmt.iv;

            const decryptedText = decrypt({encryptedData: foundPassword, iv: iv});

            if (decryptedText === password){
                userFound = true;
            }
            else{
                userFound = false;
            }
        }
        
        


      } else{
        userFound = false
      }
      await db.close();
      return userFound

    }

    async getNotes(idUser){
      const db = await open({
        filename: "./hive-db.db",
        driver: sqlite3.Database,
      });
    
      const data = await db.all(
        'SELECT * FROM Note WHERE idUser = ?',
        [idUser]
    );
      return data
    }

    async getEvent(idUser){
      const db = await open({
        filename: "./hive-db.db",
        driver: sqlite3.Database,
      });
    
      const data = await db.all(
        'SELECT * FROM Event WHERE idUser = ?',
        [idUser]
    );
      return data
    }

    async getGroups(idUser, idGroup){
      const db = await open({
        filename: "./hive-db.db",
        driver: sqlite3.Database,
      });
    
      const data = await db.all(
        'SELECT * FROM Groups WHERE idUser = ? AND idGroup = ?',
        [idUser, idGroup]
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
