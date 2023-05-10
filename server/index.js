const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');


// const db = mysql.createConnection({
//     host: '',
//     user: 'root',
//     password: '',
//     database: "",
// })

//Insert user, password, and databasename to start storing data locally...
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '******',
    database: 'affin_customers',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

// db.connect((err) => {
//     if (err) {
//         throw err
//     }
//     console.log('MySQL Connected');
// })

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.post('/customers', async (req, res) => {
    try {
      // Extract customer data from the request body
      const { first_name, last_name, phone, email } = req.body;
  
      // Create a new customer object
      const customer = {
        first_name,
        last_name,
        phone,
        email
      };
  
      // Insert the new customer into the database
      const [result] = await pool.query('INSERT INTO customers SET ?', customer);
  
      // Send a response indicating the customer was created successfully
      res.status(201).json({
        message: 'Customer created successfully',
        customer_id: result.insertId,
      });
    } catch (error) {
      console.error('Error creating customer:', error);
      res.status(500).json({ error: 'Error creating customer' });
    }
});


app.get('/customers-list', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows, fields] = await connection.execute('SELECT * FROM customers');
        connection.release();
        res.json(rows);
    }catch(error) {
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
})

async function updateCustomerById(customer_id, first_name, last_name, email, phone) {
    try {
      // get a connection from the pool
      const connection = await pool.getConnection();
  
      // run the update query
      const [rows] = await connection.execute(
        'UPDATE customers SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE customer_id = ?',
        [first_name, last_name, email, phone, customer_id]
      );
  
      // release the connection
      connection.release();
  
      return rows.affectedRows > 0; // return true if rows were updated
    } catch (error) {
      console.error(error);
      throw error;
    }
}

app.put('/customers/:customer_id', async (req, res) => {
    const customer_id = req.params.customer_id;
    const { first_name, last_name, email, phone } = req.body;
  
    try {
      const result = await updateCustomerById(customer_id, first_name, last_name, email, phone);
      res.send({ success: result });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Failed to update customer.' });
    }
  });

// app.put('/customers/:customer_id', async (req, res) => {
//     const customerId = req.params.id;
//     const { first_name, last_name, email, phone } = req.body;
//     const sql = 'UPDATE customers SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE customer_id = ?';

//     try {
//         pool.query(sql, [first_name, last_name, email, phone, customerId], (error, results) => {
//             if (error) throw error;
//             res.send(results);
//           });

//     }catch(error) {
//         console.error(error);
//         res.status(500).send('An error occurred while updating customer.');
//     }
// });

app.delete('/customers/:customer_id', async (req, res) => {
    const { customer_id } = req.params;
    const sql = 'DELETE FROM customers WHERE customer_id = ?';
  
    try {
      const [results] = await pool.execute(sql, [customer_id]);
      res.send(`Customer with ID ${customer_id} deleted.`);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while deleting the customer.');
    }
});

// Start the Express server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});




// const app = express();


//Create DB

// app.get('/createdb', (req, res) => {
//     let sql = "CREATE DATABASE nodemysql";
    
//     db.query(sql, (err) => {
//         if (err) {
//             throw err
//         }

//         res.send('Database Created');
//     })
// })