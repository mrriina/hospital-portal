const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const { json } = require("express");

const app = express();
app.use(express.json());
app.listen(3001, () => {
   console.log("running server");
});

app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "loginsystem",
 });

 app.post('/register', (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;

    db.execute(
      "INSERT INTO users (username, password, role) VALUES (?,?,?)",
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
    
    db.execute(
        "SELECT * FROM users WHERE username = ? AND password = ?",
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
    const sex = req.body.sex;
    const address = req.body.address;
    const phone = req.body.phone;
    const username = req.body.username;
    
    db.execute(
        "INSERT INTO patient (name, surname, patronymic, age, sex, address, phone, username) VALUES (?,?,?,?,?,?,?,?)",
      [name, surname, patronymic, age, sex, address, phone, username],
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
   
   db.execute(
       "SELECT * FROM patient WHERE username = ?",
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
   const sex = req.body.sex;
   const address = req.body.address;
   const phone = req.body.phone;
   const username = req.body.username;
   
   db.query(
      "UPDATE patient SET name=?, surname=?, patronymic=?, age=?, sex=?, address=?, phone=? WHERE username=?",
     [name, surname, patronymic, age, sex, address, phone, username],
     function(err, result) {
        if (err) {
           res.send({err: err});
        }
       
        res.send(result);
     }
   );
});

app.post('/getDoctors', (req, res) => {
   const speciality = req.body.speciality;
   
   db.execute(
       "SELECT * FROM doctor WHERE speciality = ?",
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
   
   db.execute(
       "SELECT * FROM tickets WHERE doctor = ? AND date = ? AND free = ?",
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
   
   db.query(
      "UPDATE tickets SET free=?, user=? WHERE doctor=? AND date=? AND time=?",
     [free, username, doctor, date, time],
     function(err, result) {
        if (err) {
           res.send({err: err});
        }
       
        res.send(result);
     }
   );
});

app.post('/outputTickets', (req, res) => {
   const username = req.body.username;
   console.log('usname= '+username);
   
   db.query(
      "SELECT idtickets, date, time, doctor, "+
      "(SELECT speciality FROM doctor WHERE iddoctor=doctor) AS doctorSpeciality, "+
      "(SELECT name FROM doctor WHERE iddoctor=doctor) AS doctorName, "+
      "(SELECT surname FROM doctor WHERE iddoctor=doctor) AS doctorSurname, "+
      "(SELECT patronymic FROM doctor WHERE iddoctor=doctor) AS doctorPatronymic, "+
      "(SELECT cabinet FROM doctor WHERE iddoctor=doctor) AS doctorCabinet "+
      "FROM tickets WHERE user = ?",
     [username],
     function(err, result) {
        if (err) {
           res.send({err: err});
        }
       
        res.send(result);
     }
   );
});

app.post('/deleteUsersTicket', (req, res) => {
   const idtickets = req.body.idtickets;
   const free = 'true';
   const user = '';
   console.log('idtickets= '+idtickets);
   
   db.query(
      "UPDATE tickets SET free=?, user=? WHERE idtickets=?",
     [free, user, idtickets],
     function(err, result) {
        if (err) {
           res.send({err: err});
        }
       
        res.send(result);
     }
   );
});

//----------------------------------- admin home ------------------------------------------

app.post('/getPatientsAdminHome', (req, res) => {
   
   db.execute(
       "SELECT name, surname, patronymic, age, sex, address, phone, username AS usern, idpatient, (SELECT password FROM users WHERE username = usern) AS password FROM patient",
       (err, result)=> {
           if (err) {
               res.send({err: err});
           }
           
           res.send(result);
       }
   );
});

app.post('/deletePatientAdminHome', (req, res) => {
   const patient = req.body.patient;

   db.execute(
       "DELETE FROM patient WHERE idpatient=?",
       [patient],
       (err, result)=> {
           if (err) {
               res.send({err: err});
           }
           
           res.send(result);
       }
   );
});

app.post('/deleteUserPatientAdminHome', (req, res) => {
   const username = req.body.username;

   db.execute(
       "DELETE FROM users WHERE username=?",
       [username],
       (err, result)=> {
           if (err) {
               res.send({err: err});
           }
           
           res.send(result);
       }
   );
});

app.post('/changeTicketPatientAdminHome', (req, res) => {
   const free = 'true';
   const user = '';
   const username = req.body.username;

   db.query(
      "UPDATE tickets SET free=?, user=? WHERE user=?",
     [free, user, username],
     function(err, result) {
        if (err) {
           res.send({err: err});
        }
       
        res.send(result);
     }
   );
});



app.post('/getDoctorsAdminHome', (req, res) => {
   db.execute(
       "SELECT name, surname, patronymic, speciality, cabinet, username AS usern, iddoctor, (SELECT password FROM users WHERE username = usern) AS password FROM doctor",
       (err, result)=> {
           if (err) {
               res.send({err: err});
           }
           
           res.send(result);
       }
   );
});

app.post('/deleteDoctorAdminHome', (req, res) => {
   const doctor = req.body.doctor;

   db.execute(
       "DELETE FROM doctor WHERE iddoctor=?",
       [doctor],
       (err, result)=> {
           if (err) {
               res.send({err: err});
           }
           
           res.send(result);
       }
   );
});

app.post('/deleteUserDoctorAdminHome', (req, res) => {
   const username = req.body.username;

   db.execute(
       "DELETE FROM users WHERE username=?",
       [username],
       (err, result)=> {
           if (err) {
               res.send({err: err});
           }
           
           res.send(result);
       }
   );
});

app.post('/deleteTicketDoctorAdminHome', (req, res) => {
   const iddoctor = req.body.iddoctor;

   db.execute(
       "DELETE FROM tickets WHERE doctor=?",
       [iddoctor],
       (err, result)=> {
           if (err) {
               res.send({err: err});
           }
           
           res.send(result);
       }
   );
});

app.post('/updateInfDoctor', (req, res) => {
   const name = req.body.name;
   const surname = req.body.surname;
   const patronymic = req.body.patronymic;
   const speciality = req.body.speciality;
   const cabinet = req.body.cabinet;
   const username = req.body.username;
   
   db.query(
      "UPDATE doctor SET name=?, surname=?, patronymic=?, speciality=?, cabinet=? WHERE username=?",
     [name, surname, patronymic, speciality, cabinet, username],
     function(err, result) {
        if (err) {
           res.send({err: err});
        }
       
        res.send(result);
     }
   );
});

app.post('/newDoctor', (req, res) => {
   const name = req.body.name;
   const surname = req.body.surname;
   const patronymic = req.body.patronymic;
   const speciality = req.body.speciality;
   const cabinet = req.body.cabinet;
   const username = req.body.username;

   db.execute(
      "INSERT INTO doctor (name, surname, patronymic, speciality, cabinet, username) VALUES (?,?,?,?,?,?)",
      [name, surname, patronymic, speciality, cabinet, username],
      (err, result)=> {
         if (err) {
            res.send({err: err});
        }
        
        res.send(result);
      }
    );
});



app.post('/getTicketsAdminHome', (req, res) => {
   
   db.execute(
       "SELECT idtickets, date, time, free, user, doctor, (SELECT name FROM doctor WHERE iddoctor = doctor) AS doctorName, (SELECT surname FROM doctor WHERE iddoctor = doctor) AS doctorSurname, (SELECT patronymic FROM doctor WHERE iddoctor = doctor) AS doctorPatronymic, (SELECT speciality FROM doctor WHERE iddoctor = doctor) AS doctorSpeciality FROM tickets",
       (err, result)=> {
           if (err) {
               res.send({err: err});
           }
           
           res.send(result);
       }
   );
});

app.post('/deleteTicketAdminHome', (req, res) => {
   const ticket = req.body.ticket;

   db.execute(
       "DELETE FROM tickets WHERE idtickets=?",
       [ticket],
       (err, result)=> {
           if (err) {
               res.send({err: err});
           }
           
           res.send(result);
       }
   );
});

app.post('/newTicketAdminHome', (req, res) => {
   const date = req.body.date;
   const time = req.body.time;
   const free = req.body.free;
   const doctor = req.body.doctor;

   db.execute(
      "INSERT INTO tickets (date, time, free, doctor) VALUES (?,?,?,?)",
      [date, time, free, doctor],
      (err, result)=> {
         if (err) {
            res.send({err: err});
        }
        
        res.send(result);
      }
    );
});
