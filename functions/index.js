const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const validateData = require('./middleware/validate');
const serviceAccount = require('./service-account.json');

/** Firestore collection name @const {string} */
const COLLECTION = 'users';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fir-users-api.firebaseio.com"
});

const firestore = admin.firestore();

const app = express();

/**
 * POST route to create a user in firestore
 * @name POST/api/create
 * @function
 * @param {Object} req 
 * @param {Object} res 
 */
app.post('/api/create', validateData, (req, res) => {
    (async () => {
        try {    
            const collectionRef = firestore.collection(COLLECTION)

            // check if user is already in store
            const snapshot = await collectionRef.where('contact', '==', req.body.contact).get();
            if(!snapshot.empty) {
                return res.status(400).send({
                    'error': 'Invalid data supplied'
                }); 
            }

            const ts = admin.firestore.Timestamp.now();

            // check all fields
            const addResponse = await collectionRef.add({ 
                name: req.body.name,
                surname: req.body.surname,
                address1: req.body.address1,
                address2: req.body.address2 || '',
                town: req.body.town,
                region: req.body.region || '',
                country: req.body.country,
                postCode: req.body.postCode,
                contact: req.body.contact,
                tsCreated: ts,
                tsUpdated: ts
            });

            return res.status(200).send({
                id: addResponse.id
            });
        }catch (error) {
            console.log(error);
            return res.status(500).send({
                'error': 'Something went wrong'
            });
        }
    })();
});

/**
 * GET route to read user data from firestore via an id
 * @name GET/api/read/:id
 * @function
 * @param {Object} req 
 * @param {Object} res 
 */
app.get('/api/read/:id', (req, res) => {
    (async () => {
        try {
            const docRef = firestore.collection(COLLECTION).doc(req.params.id);
    
            // check if user is already in store
            const doc = await docRef.get();
            if(!doc.exists){
                return res.status(404).send({
                    'error': 'Client was not found'
                }); 
            }
            return res.status(200).send(doc.data());
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

/**
 * GET route to read all user data from firestore
 * @name GET/api/read-all
 * @function
 * @param {Object} req 
 * @param {Object} res 
 */
app.get('/api/read-all', (req, res) => {
    (async () => {
        try {
            const queryRef = firestore.collection(COLLECTION);

            const query = await queryRef.get();

            const data = [];
            for(doc of query.docs){
                data.push({
                    id: doc.id,
                    ...doc.data()
                })
            }
            
            return res.status(200).send(data);
        }catch(error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

/**
 * PUT route to update data in firestore via an id
 * @name PUT/api/update/:id
 * @function
 * @param {Object} req 
 * @param {Object} res 
 */
app.put('/api/update/:id', validateData, (req, res) => {
    (async () => {
        try {
            const docRef = firestore.collection(COLLECTION).doc(req.params.id);
    
            // check if user does not exists
            const doc = await docRef.get();
            if(!doc.exists){
                return res.status(404).send({
                    'error': 'Client was not found'
                });
            }

            await docRef.update({ 
                name: req.body.name || doc.data().name,
                surname: req.body.surname || doc.data().surname,
                address1: req.body.address1 || doc.data().address1,
                address2: req.body.address2 || doc.data().address2,
                town: req.body.town || doc.data().town,
                region: req.body.region || doc.data().region,
                country: req.body.country || doc.data().country,
                postCode: req.body.postCode || doc.data.postCode,
                contact: req.body.contact || doc.data.contact,
                tsUpdated: admin.firestore.Timestamp.now()
            });
 
             return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

/**
 * DELETE route to delete data in firestore through an id
 * @name DELETE/api/delete/:id
 * @function
 * @param {Object} req 
 * @param {Object} res 
 */
app.delete('/api/delete/:id', (req, res) => {
    (async () => {
        try {
            const docRef = firestore.collection(COLLECTION).doc(req.params.id);
            
            // check if user does not exists
            const doc = await docRef.get();
            if(!doc.exists){
                return res.status(404).send({
                    'error': 'Client was not found'
                });
            }

            await docRef.delete();
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});


exports.app = functions.https.onRequest(app);