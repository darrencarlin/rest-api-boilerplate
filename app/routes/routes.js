let ObjectID = require('mongodb').ObjectID

module.exports = function (app, database) {
    // 'data' should be app specific
    const db = database.db('data')

    // GET all data 

    app.get('/data/', (req, res) => {
       
        db.collection('data').find({}).toArray((err, item) => {
            if (err) {
                res.send({
                    'error': 'An error has occured'
                });
            } else {
                res.send(item);
            }
        });
    });

    // GET all data by id

    app.get('/data/:id', (req, res) => {
        const id = req.params.id
        const details = {
            '_id': new ObjectID(id)
        };
        db.collection('data').findOne(details, (err, item) => {
            if (err) {
                res.send({
                    'error': 'An error has occured'
                });
            } else {
                res.send(item);
            }
        });
    });

    // DELETE data by id

    app.delete('/data/:id', (req, res) => {
        const id = req.params.id
        const details = {
            '_id': new ObjectID(id)
        };
        db.collection('data').remove(details, (err, item) => {
            if (err) {
                res.send({
                    'error': 'An error has occured'
                });
            } else {
                res.send('item ' + id + ' deleted');
            }
        })
    })

    // PUT, update data by id 

    app.put('/data/:id', (req, res) => {
        const id = req.params.id
        const details = {
            '_id': new ObjectID(id)
        };
        const note = {
            data0: req.body.data0,
            data1: req.body.data1,
            data2: req.body.data2,
            data2: req.body.data2,
        };
        db.collection('data').update(details, note, (err, item) => {
            if (err) {
                res.send({
                    'error': 'An error has occured'
                });
            } else {
                res.send(item);
            }
        });
    });
    
    // POST data 

    app.post('/data', (req, res) => {
        // create data object here
        const data = {
            data0: req.body.data0,
            data1: req.body.data1,
            data2: req.body.data2,
            data2: req.body.data2,
        };
        db.collection('data').insert(data, (err, result) => {
            if (err) {
                res.send({
                    'error': 'An error has occured'
                });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
}