/* -------------------------------------------------------------------------- */
/*         This is sheet is for vanilla MongoDB practice purposes only        */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                      This will eventually be deleted                       */
/* -------------------------------------------------------------------------- */

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'tasks_db';


MongoClient.connect(
    connectionURL,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (error, client) => {
        if (error) {
            return console.log(error);
        }

        const db = client.db(databaseName);

/* -------------------------------------------------------------------------- */
/*                         INSERT METHODS FOR MONGODB                         */
/* -------------------------------------------------------------------------- */
        db.collection('users').insertOne({
          name: 'Robert',
          age: 31
        }, (error, result) => {
          if (error) throw error;

          console.log(result.ops);
        })

        db.collection('users').insertMany([
          {
            name: 'Andrew',
            age: 26
          }, {
            name: 'Krishna',
            age: 28
          }, {
            name: 'Alyssa',
            age: 29
          }
        ], (error, result) => {
          if (error) throw error;

          console.table(result.ops);
        })

/* -------------------------------------------------------------------------- */
/*                         FIND METHODS FOR MONGODB                           */
/* -------------------------------------------------------------------------- */
        db.collection('users').findOne({ _id: new ObjectID("5f6aca0fc420c4185be56b54") }, (error, result) => {
            if (error) throw error;

            console.log(result);
        });

        db.collection('users').find({ age: 31 }).toArray((error, results) => {
            if (error) throw error;
            console.table(results);
        })

        db.collection('tasks').findOne({ _id: new ObjectID("5f6aacdaf9bf3c1632cf0f18")}, (error, result) => {
          if (error) throw error;
          console.log(result)
        })

        db.collection('tasks').find({ completed: false }).toArray((error, results) => {
          if (error) throw error;
          console.log(results)
        })

/* -------------------------------------------------------------------------- */
/*                         UPDATE METHODS FOR MONGODB                         */
/* -------------------------------------------------------------------------- */
        db.collection('users').updateOne({
          _id: new ObjectID("5f6aa9abc6be1a14e3ff7e10")
        }, {
          $set: {
            name: 'Oliver'
          }
        }).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })

        db.collection('tasks')
            .updateMany(
                {
                    completed: false,
                },
                {
                    $set: {
                        completed: true,
                    },
                }
            )
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });


/* -------------------------------------------------------------------------- */
/*                         DELETE METHODS FOR MONGODB                         */
/* -------------------------------------------------------------------------- */
        db.collection('tasks').deleteOne({
            description: "Go out for a run"
        }).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        })

/* ---------------- END CONNECTION; DO NOT DELETE BELOW THIS ---------------- */
    }
);
