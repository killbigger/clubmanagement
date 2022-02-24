const router = require("express").Router();
const conn = require('../startup.js/db');
const jwt = require("jsonwebtoken");
const uid = require('generate-unique-id');

//REGISTER
router.post("/register/student", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const classid = req.body.classid;
  const clubids = req.body.clubids;
conn.query(`SELECT email FROM student WHERE email = '${email}'`, function (err, result) {
    if (err) throw err;
    console.log(result);
    if(result.length == 0) {
      console.log('creating ztudent');
      const id = uid({
        length: 10,
        useLetters: false
      });
      var sql = `INSERT INTO student (email,password,std_name,std_id,class,club_ids) VALUES ('${email}','${password}','${name}','${id}','${classid}','${clubids}')`;

      conn.query(sql,(err,result)=>{
        if (err) throw err;
        console.log('user created')
        try {
          res.status(201).json(result);
        } catch (err) {
          res.status(500).json(err);
        }
      })
     
     
    } else {
      try {
        res.status(500).json("user already exists");
      } catch (err) {
        res.status(500).json(err);
      }
    }
   
  });   
 
});

//LOGIN

router.post('/login/student', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
    try{

      const sql = `SELECT * FROM student WHERE email = '${email}'`;

      conn.query(sql,(err,result)=>{
        if (err) throw err;
        console.log(result);
        if(result.length == 1) { 
  const originalPassword =  result[0].password;
        const inputPassword = password;
        
        if(originalPassword != inputPassword)  {

          return  res.status(500).json("Wrong password or user");
         }

        const accessToken = jwt.sign(
        {
            id: result[0].std_id,
            // isAdmin: user.isAdmin,
        },
        "sebindavis",
            {expiresIn:"3d"}
        );
  
       
        res.status(200).json({accessToken});
        }
        res.status(500).json('user or password is incorrect');
      })




    }catch(err){
        res.status(500).json(err);
    }

});

module.exports = router;
