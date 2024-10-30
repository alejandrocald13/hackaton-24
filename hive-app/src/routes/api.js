import {sql, db} from "@vercel/postgres";

import { encrypt , decrypt } from "./crypt.js";
// Hacer clase base de datos
// Función para insertar usuarios en la base de datos

class Table{
  
  constructor(){
      
  };
  // Métodos de inserción
  async insertuserH(name, username, password, email, image = null) {
    const encryptedText = encrypt(password);
    const client = await db.connect();

    const { rows : result } = await client.sql(
      'INSERT INTO userH (name, userName, password, email, image, iv, key) VALUES (? ,?, ?, ?, ?, ?, ?)'
    );

    await result.run(name, username, encryptedText.encryptedData, email, image, encryptedText.iv, encryptedText.key);
    await result.finalize();
    await db.close();
    console.log("Usuario insertado y conexión cerrada.");
  };

  async insertGroup(groupName, createdDate, type, creatorUser){
      const client = await db.connect();
      const { rows : result } = await client.sql(
        'INSERT INTO group_ (groupName, createddate, type, creatoruser) VALUES (? ,?, ?, ?)'
      );
      await result.run(groupName, createdDate, type, creatorUser);
      await result.finalize();
      await db.close();
      console.log("Usuario insertado y conexión cerrada.");
  };

  async linkPeople(idUser, idGroup){
    const client = await db.connect();
    const { rows : result } = await client.sql(
      'INSERT INTO groups (iduser, idgroup) VALUES (?, ?)'
    );
    await result.run(idUser, idGroup);
    await result.finalize();
    await db.close();
  };


  async insertNote(idUser, information, confirmatedDate){
    const client = await db.connect();
    const { rows : result } = await client.sql(
      'INSERT INTO note (iduser, information, confirmateddate) VALUES (?, ?, ?)'
    );
    await result.run(idUser, information, confirmatedDate);
    await result.finalize();
    await db.close();
    console.log("NOTA insertado y conexión cerrada.");
};


  async validateUser(username, password, email = null){
    const client = await db.connect();
    const { rows : result } = await client.sql(
      'SELECT * FROM userH WHERE username = ?',
      [username]
  );
    let userFound = false
    if (result) {
      
      userFound = true;

      if (userFound){

          const foundPassword = result.password;
          const iv = result.iv;

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


  async fetchEvent(idUser){
    const client = await db.connect();
    const { rows : result } = await client.sql(
      'SELECT event.title, event.information, event.expireddate, group_.type, group_.groupname, group_.idgroup FROM event JOIN groups ON groups.idgroup = event.idgroup JOIN group_ ON event.idgroup = group_.idgroup WHERE groups.iduser = ?',
      [idUser]
  );

  let res;

  if (result) {
      res = result
    }
    else{
      res = null;
    }

    await db.close();
    return res;
  }

  async fetchGroupCalendar(idUser){
    const client = await db.connect();
    const { rows : result } = await client.sql(
      'SELECT groups.idgroup, group_.groupname FROM groups JOIN group_ ON group_.idgroup = groups.idgroup WHERE groups.iduser = ?',
      [idUser]
  );

  let res;

  if (result) {
      res = result
    }
    else{
      res = null;
    }

    await db.close();
    console.log("resultado")
    console.log(res)
    return res;
  }
  // ROBERTO CALDERON

  async fetchGroups(idUser){
    const client = await db.connect();
    const { rows : result } = await client.sql(
      'SELECT * FROM groups JOIN group_ ON groups.idgroup = group_.idgroup WHERE groups.iduser = ?');

  const registros = result.all(idUser);
  await result.finalize();

  let res;

  if (registros) {
      res = registros
    }
    else{
      res = null;
    }

    await db.close();

    return res;


  }

  async createGroup(groupName, createdDate, type_, creatorUser){
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&';
    let uniqueGroupCode = '';

    while (true){
      for (let i = 0; i < 7; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        uniqueGroupCode += caracteres.charAt(indiceAleatorio);
      }
      const client = await db.connect();
      const { rows : verify } = await client.sql('SELECT * FROM group_ WHERE idgroup = ?');

      if (verify){
        continue;
      }
      else{
        break;
      }

    }
  
    const client = await db.connect();
    const { rows : result } = await client.sql(
      'INSERT INTO Group_ (groupName, createdDate, type, creatorUser, idGroup) VALUES (?, ?, ?, ?, ?)',
    );
    
    this.linkPeople(creatorUser, uniqueGroupCode);

    let boolType = 0;

    if (type_ === "Académico"){
      boolType = 1;
    }

    await result.run(groupName, createdDate, boolType, creatorUser, uniqueGroupCode)
    await result.finalize();
    await db.close();

  }

  async createEvent(idUser, idGroup, title, info, createdDate, expiredDate){
    const client = await db.connect();
    const { rows : result } = await client.sql(
      'INSERT INTO event (iduser, idgroup, title, information, createddate, expireddate) VALUES (?, ?, ?, ?, ?, ?)',
    );
    
    await result.run(idUser, idGroup, title, info, createdDate, expiredDate);
    await result.finalize();
    await db.close();
  }

  async getEvents(idGroup){
    const client = await db.connect();
    const { rows : result } = await client.sql(
      'SELECT event.idevent, event.idgroup, event.iduser, event.title, event.information, event.expireddate, group_.groupname FROM event JOIN group_ ON event.idgroup = group_.idgroup WHERE event.idgroup = ?');

  const registros = result.all(idGroup);
  await result.finalize();

  let res;

  if (registros) {
      res = registros
    }
    else{
      res = null;
    }

    await db.close();

    return res;
  }

  async getMembers(idGroup){
    const client = await db.connect();
    const { rows : result } = await client.sql(
      'SELECT iduser as member, group_.groupname as name, group_.idgroup as idgroup FROM groups JOIN group_ ON groups.idgroup = group_.idgroup WHERE groups.idgroup = ?');

    const registros = result.all(idGroup);
    await result.finalize();

    let res;

    if (registros) {
        res = registros
      }
      else{
        res = null;
      }

      await db.close();

      return res;
    }


  async getEventsFeed(idUser){
    const client = await db.connect();
    const { rows : result } = await client.sql(
      'SELECT event.title, event.information, event.expireddate, event.iduser, group_.groupname FROM event JOIN groups ON groups.idgroup = event.idgroup JOIN group_ ON event.idgroup = group_.idgroup WHERE groups.iduser = ?');

    const registros = result.all(idUser);
    await result.finalize();

    let res;

    if (registros) {
        res = registros
      }
      else{
        res = null;
      }

      await db.close();
      
      return res;
    }

  async getNotesFeed(username){
    const client = await db.connect();
    const { rows : result } = await client.sql(
      'SELECT * FROM note WHERE note.iduser = ?',
      [username]

  );
    return result
  }
  // Obtener data
  async getNotes(idUser){
    const client = await db.connect();
    const { rows : result } = await client.sql(
      'SELECT * FROM note JOIN userH ON note.iduser = userH.username WHERE note.iduser = ?',
      [idUser]

  );
    return result
  }

  // Eliminar
  // Se modifico el delete con idNote y idUser a solo idNote
  async deleteNotes(idNotes){
    const client = await db.connect();
    const { rows : result } = await client.sql("DELETE FROM note WHERE idnote = ?", [idNotes]);
    return result
  }

};


// Exporta la función para usarla en otros archivos
export {Table};