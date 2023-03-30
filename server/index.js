const express = require("express");

const sqlite3 = require('sqlite3').verbose();
let sql;


// conect to db
const db = new sqlite3.Database("./hospitalportal.db", sqlite3.OPEN_READWRITE, (err) => {
   if (err) return console.error(err.message);
});

//Create table
// sql  = `CREATE TABLE tickets (
//          idticket INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
//          date DATE NOT NULL,
//          time TEXT NOT NULL,
//          free TEXT NOT NULL CHECK (free IN ('true', 'false')),
//          user TEXT,
//          doctor INTEGER NOT NULL,
//          FOREIGN KEY(user) REFERENCES "users"("username"),
//          FOREIGN KEY(doctor) REFERENCES "doctors"("iddoctor")
//       )`;

// sql = `INSERT INTO tickets (date, time, free, doctor) VALUES (?,?,?,?)`;
//    db.run(
//       sql,
//       ['2022-03-29', "12:00", "true", 1],
//       (err, result)=> {
         
//       }
//    );

// sql  = `CREATE TABLE doctors (
//       iddoctor INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
//       name TEXT NOT NULL,
//       surname TEXT NOT NULL,
//       patronymic TEXT NOT NULL,
//       speciality TEXT NOT NULL CHECK (speciality IN ('therapist', 'pediatrician', 'surgeon', 'psychiatrist', 'ophthalmologist', 'otolaryngologist', 'dentist')),
//       cabinet INTEGER NOT NULL,
//       username TEXT NOT NULL,
//       FOREIGN KEY(username) REFERENCES "users"("username")
//    )`;

// sql = `INSERT INTO users (username, password, role) VALUES (?,?,?)`;
//    db.run(
//       sql,
//       ["d", "p", "doctor"],
//       (err, result)=> {
         
//       }
//    );


// sql = `INSERT INTO doctors (name, surname, patronymic, speciality, cabinet, username) VALUES (?,?,?,?,?,?)`;
//    db.run(
//       sql,
//       ["docName", "docSurname", "docPatronymic", "therapist", 314, "d"],
//       (err, result)=> {
         
//       }
//    );

// sql  = `CREATE TABLE patients (
//    idpatient INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
//    name TEXT NOT NULL,
//    surname TEXT NOT NULL,
//    patronymic TEXT NOT NULL,
//    age INTEGER NOT NULL,
//    gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
//    address TEXT NOT NULL,
//    phone TEXT NOT NULL,
//    email TEXT NOT NULL,
//    username TEXT NOT NULL,
//    FOREIGN KEY(username) REFERENCES "users"("username")
// )`;

// sql  = `CREATE TABLE users (
//          username TEXT PRIMARY KEY UNIQUE NOT NULL,
//          password TEXT NOT NULL,
//          role TEXT NOT NULL CHECK (role IN ('patient', 'doctor', 'admin'))
//  )`;


// db.run(sql);


// const mysql = require("mysql2");
 const cors = require("cors");
 const { json } = require("express");

 const app = express();
 app.use(express.json());
 app.listen(3001, () => {
   console.log("running server");
});

 app.use(cors());

// const db = mysql.createConnection({
//     user: "root",
//     host: "localhost",
//     password: "",
//     database: "loginsystem",
//  });

 app.post('/register', (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    
   sql = `INSERT INTO users (username, password, role) VALUES (?,?,?)`;
   db.run(
      sql,
      [username, password, role],
      (err, result)=> {
         if (err) {
            res.send({err: err});
         }
                     
         res.send(result);
      }
   );
 });


 app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    db.all(
      sql,
      [username, password],
      (err, result)=> {
         if (err) {
            res.send({err: err});
         }
                     
         res.send(result);
      }
   );
 });

 app.post('/applyInfPatient', (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const patronymic = req.body.patronymic;
    const age = req.body.age;
    const gender = req.body.gender;
    const address = req.body.address;
    const phone = req.body.phone;
    const email = req.body.email;
    const username = req.body.username;
    
    sql = `INSERT INTO patients (name, surname, patronymic, age, gender, address, phone, email, username) VALUES (?,?,?,?,?,?,?,?,?)`;
    db.run(
      sql,
      [name, surname, patronymic, age, gender, address, phone, email, username],
      (err, result)=> {
         if (err) {
            res.send({err: err});
         }
                     
         res.send(result);
      }
   );
 });

 app.post('/changeInfPatient', (req, res) => {
   const username = req.body.username;
   
   sql = `SELECT * FROM patients WHERE username = ?`;
    db.all(
      sql,
      [username],
      (err, result)=> {
         if (err) {
            res.send({err: err});
         }
                     
         res.send(result);
      }
   );
});

app.post('/updateInfPatient', (req, res) => {
   const name = req.body.name;
    const surname = req.body.surname;
    const patronymic = req.body.patronymic;
    const age = req.body.age;
    const gender = req.body.gender;
    const address = req.body.address;
    const phone = req.body.phone;
    const email = req.body.email;
    const username = req.body.username;
   
    sql = `UPDATE patients SET name=?, surname=?, patronymic=?, age=?, gender=?, address=?, phone=?, email=? WHERE username=?`;
    db.run(
      sql,
      [name, surname, patronymic, age, gender, address, phone, email, username],
      (err, result)=> {
         if (err) {
            res.send({err: err});
         }
                     
         res.send(result);
      }
   );
});

app.post('/getDoctors', (req, res) => {
   const speciality = req.body.speciality;
   
   sql = `SELECT * FROM doctors WHERE speciality = ?`;
   db.all(
     sql,
     [speciality],
     (err, result)=> {
        if (err) {
           res.send({err: err});
        }
                    
        res.send(result);
     }
  );
});

app.post('/getTimeTickets', (req, res) => {
   const doctor = req.body.doctor;
   const date = req.body.date;
   const free = 'true';
   
   sql = `SELECT * FROM tickets WHERE doctor = ? AND date = ? AND free = ?`;
   db.all(
     sql,
     [doctor, date, free],
     (err, result)=> {
        if (err) {
           res.send({err: err});
        }
                    
        res.send(result);
     }
  );
});

app.post('/reserveTicket', (req, res) => {
   const doctor = req.body.doctor;
   const date = req.body.date;
   const time = req.body.time;
   const username = req.body.username;
   const free = 'false';
   
   sql = `UPDATE tickets SET free=?, user=? WHERE doctor=? AND date=? AND time=?`;
   db.run(
     sql,
     [free, username, doctor, date, time],
     (err, result)=> {
        if (err) {
           res.send({err: err});
        }
                    
        res.send(result);
     }
  );
});

app.post('/outputTickets', (req, res) => {
   const username = req.body.username;
   
   sql = "SELECT idticket, date, time, doctor, "+
      "(SELECT speciality FROM doctors WHERE iddoctor=doctor) AS doctorSpeciality, "+
      "(SELECT name FROM doctors WHERE iddoctor=doctor) AS doctorName, "+
      "(SELECT surname FROM doctors WHERE iddoctor=doctor) AS doctorSurname, "+
      "(SELECT patronymic FROM doctors WHERE iddoctor=doctor) AS doctorPatronymic, "+
      "(SELECT cabinet FROM doctors WHERE iddoctor=doctor) AS doctorCabinet "+
      "FROM tickets WHERE user = ?";
   db.all(
     sql,
     [username],
     (err, result)=> {
        if (err) {
           res.send({err: err});
        }
                    
        res.send(result);
     }
  );
});

app.post('/deleteUsersTicket', (req, res) => {
   const idticket = req.body.idticket;
   const free = 'true';
   const user = '';
   console.log('idtickets=='+idticket);
   
   sql = `UPDATE tickets SET free=?, user=? WHERE idticket=?`;
   db.run(
     sql,
     [free, user, idticket],
     (err, result)=> {
        if (err) {
           res.send({err: err});
        }
                    
        res.send(result);
     }
  );
});

// //----------------------------------- admin home ------------------------------------------

// app.post('/getPatientsAdminHome', (req, res) => {
   
//    db.execute(
//        "SELECT name, surname, patronymic, age, sex, address, phone, username AS usern, idpatient, (SELECT password FROM users WHERE username = usern) AS password FROM patient",
//        (err, result)=> {
//            if (err) {
//                res.send({err: err});
//            }
           
//            res.send(result);
//        }
//    );
// });

// app.post('/deletePatientAdminHome', (req, res) => {
//    const patient = req.body.patient;

//    db.execute(
//        "DELETE FROM patient WHERE idpatient=?",
//        [patient],
//        (err, result)=> {
//            if (err) {
//                res.send({err: err});
//            }
           
//            res.send(result);
//        }
//    );
// });

// app.post('/deleteUserPatientAdminHome', (req, res) => {
//    const username = req.body.username;

//    db.execute(
//        "DELETE FROM users WHERE username=?",
//        [username],
//        (err, result)=> {
//            if (err) {
//                res.send({err: err});
//            }
           
//            res.send(result);
//        }
//    );
// });

// app.post('/changeTicketPatientAdminHome', (req, res) => {
//    const free = 'true';
//    const user = '';
//    const username = req.body.username;

//    db.query(
//       "UPDATE tickets SET free=?, user=? WHERE user=?",
//      [free, user, username],
//      function(err, result) {
//         if (err) {
//            res.send({err: err});
//         }
       
//         res.send(result);
//      }
//    );
// });



// app.post('/getDoctorsAdminHome', (req, res) => {
//    db.execute(
//        "SELECT name, surname, patronymic, speciality, cabinet, username AS usern, iddoctor, (SELECT password FROM users WHERE username = usern) AS password FROM doctor",
//        (err, result)=> {
//            if (err) {
//                res.send({err: err});
//            }
           
//            res.send(result);
//        }
//    );
// });

// app.post('/deleteDoctorAdminHome', (req, res) => {
//    const doctor = req.body.doctor;

//    db.execute(
//        "DELETE FROM doctor WHERE iddoctor=?",
//        [doctor],
//        (err, result)=> {
//            if (err) {
//                res.send({err: err});
//            }
           
//            res.send(result);
//        }
//    );
// });

// app.post('/deleteUserDoctorAdminHome', (req, res) => {
//    const username = req.body.username;

//    db.execute(
//        "DELETE FROM users WHERE username=?",
//        [username],
//        (err, result)=> {
//            if (err) {
//                res.send({err: err});
//            }
           
//            res.send(result);
//        }
//    );
// });

// app.post('/deleteTicketDoctorAdminHome', (req, res) => {
//    const iddoctor = req.body.iddoctor;

//    db.execute(
//        "DELETE FROM tickets WHERE doctor=?",
//        [iddoctor],
//        (err, result)=> {
//            if (err) {
//                res.send({err: err});
//            }
           
//            res.send(result);
//        }
//    );
// });

// app.post('/updateInfDoctor', (req, res) => {
//    const name = req.body.name;
//    const surname = req.body.surname;
//    const patronymic = req.body.patronymic;
//    const speciality = req.body.speciality;
//    const cabinet = req.body.cabinet;
//    const username = req.body.username;
   
//    db.query(
//       "UPDATE doctor SET name=?, surname=?, patronymic=?, speciality=?, cabinet=? WHERE username=?",
//      [name, surname, patronymic, speciality, cabinet, username],
//      function(err, result) {
//         if (err) {
//            res.send({err: err});
//         }
       
//         res.send(result);
//      }
//    );
// });

// app.post('/newDoctor', (req, res) => {
//    const name = req.body.name;
//    const surname = req.body.surname;
//    const patronymic = req.body.patronymic;
//    const speciality = req.body.speciality;
//    const cabinet = req.body.cabinet;
//    const username = req.body.username;

//    db.execute(
//       "INSERT INTO doctor (name, surname, patronymic, speciality, cabinet, username) VALUES (?,?,?,?,?,?)",
//       [name, surname, patronymic, speciality, cabinet, username],
//       (err, result)=> {
//          if (err) {
//             res.send({err: err});
//         }
        
//         res.send(result);
//       }
//     );
// });



// app.post('/getTicketsAdminHome', (req, res) => {
   
//    db.execute(
//        "SELECT idtickets, date, time, free, user, doctor, (SELECT name FROM doctor WHERE iddoctor = doctor) AS doctorName, (SELECT surname FROM doctor WHERE iddoctor = doctor) AS doctorSurname, (SELECT patronymic FROM doctor WHERE iddoctor = doctor) AS doctorPatronymic, (SELECT speciality FROM doctor WHERE iddoctor = doctor) AS doctorSpeciality FROM tickets",
//        (err, result)=> {
//            if (err) {
//                res.send({err: err});
//            }
           
//            res.send(result);
//        }
//    );
// });

// app.post('/deleteTicketAdminHome', (req, res) => {
//    const ticket = req.body.ticket;

//    db.execute(
//        "DELETE FROM tickets WHERE idtickets=?",
//        [ticket],
//        (err, result)=> {
//            if (err) {
//                res.send({err: err});
//            }
           
//            res.send(result);
//        }
//    );
// });

// app.post('/newTicketAdminHome', (req, res) => {
//    const date = req.body.date;
//    const time = req.body.time;
//    const free = req.body.free;
//    const doctor = req.body.doctor;

//    db.execute(
//       "INSERT INTO tickets (date, time, free, doctor) VALUES (?,?,?,?)",
//       [date, time, free, doctor],
//       (err, result)=> {
//          if (err) {
//             res.send({err: err});
//         }
        
//         res.send(result);
//       }
//     );
// });
