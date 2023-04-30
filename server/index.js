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


 app.post('/checkPersonByAddress', (req, res) => {
   const surname = req.body.surname;
   const name = req.body.name;
   const patronymic = req.body.patronymic;
   const address = req.body.address;
   
   db.execute(
       "SELECT * FROM people_by_address WHERE surname = ? AND name = ? AND patronymic = ? AND address = ?",
       [surname, name, patronymic, address],
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
   const status = 'incomplete';
   
   db.query(
      "UPDATE tickets SET free=?, status=?, user=? WHERE doctor=? AND date=? AND time=?",
     [free, status, username, doctor, date, time],
     function(err, result) {
        if (err) {
            console.log(JSON.stringify(err));
           res.send({err: err});
        }
       
        res.send(result);
     }
   );
});

app.post('/outputTickets', (req, res) => {
   const username = req.body.username;
   
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
   const status = null;
   
   db.query(
      "UPDATE tickets SET free=?, status=?, user=? WHERE idtickets=?",
     [free, status, user, idtickets],
     function(err, result) {
        if (err) {
           res.send({err: err});
        }
       
        res.send(result);
     }
   );
});

//----------------------------------- doctor home ------------------------------------------

app.post('/doctorOutputTickets', (req, res) => {
    const username = req.body.username;
    const date = req.body.date.slice(0, 10);
    const free = 'false';
    const status = 'incomplete';
    
    db.query(
       "SELECT idtickets, time, user, doctor, "+
       "(SELECT idpatient FROM patient WHERE username=user) AS patientId, "+
       "(SELECT name FROM patient WHERE username=user) AS patientName, "+
       "(SELECT surname FROM patient WHERE username=user) AS patientSurname, "+
       "(SELECT patronymic FROM patient WHERE username=user) AS patientPatronymic, "+
       "(SELECT sex FROM patient WHERE username=user) AS patientGender, "+
       "(SELECT age FROM patient WHERE username=user) AS patientAge, "+
       "(SELECT address FROM patient WHERE username=user) AS patientAddress, "+
       "(SELECT phone FROM patient WHERE username=user) AS patientPhone "+
       "FROM tickets "+
       "INNER JOIN doctor ON doctor.iddoctor = tickets.doctor "+
       "WHERE doctor.username = ? AND tickets.date = ? AND tickets.free = ? AND tickets.status = ?",
      [username, date, free, status],
      function(err, result) {
         if (err) {
            res.send({err: err});
         }
         res.send(result);
      }
    );
 });


 app.post('/doctorAddPatientToDatabase', (req, res) => {
    const idpatient = req.body.idpatient;
    const iddoctor = req.body.iddoctor;
    
    db.execute(
        "INSERT INTO patient_accounting (patientid, doctorid) VALUES (?,?)",
      [idpatient, iddoctor],
      (err, result)=> {
         if (err) {
            res.send({err: err});
         }
        
         res.send(result);
      }
    );
 });


 app.post('/doctorInsertRecordToElectronicCard', (req, res) => {
    const idpatient = req.body.idpatient;
    const iddoctor = req.body.iddoctor;
    const complaints = req.body.complaints;
    const conclusion = req.body.conclusion;
    const currentDate = new Date().toISOString().slice(0, 10);
    
    db.execute(
        "INSERT INTO electronic_card (patientid, doctorid, date, complaints, conclusion) VALUES (?,?,?,?,?)",
      [idpatient, iddoctor, currentDate, complaints, conclusion],
      (err, result)=> {
         if (err) {
            console.log('err section');
            res.send({err: err});
         }
        
         res.send(result);
      }
    );
 });


 app.post('/doctorCompleteTicket', (req, res) => {
    const idticket = req.body.idticket;
    const status = 'completed';
    
    db.query(
       "UPDATE tickets SET status=? WHERE idtickets=?",
      [status, idticket],
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
