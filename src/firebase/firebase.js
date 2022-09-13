import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
//import { getDatabase, onValue, push, ref, set, update } from "firebase/database";

console.log('faszomgeci', process.env.NODE_ENV);
console.log('faszomgeci2', process.env);

console.log(process.env.FIREBASE_API_KEY);
console.log(process.env.FIREBASE_AUTH_DOMAIN);
console.log(process.env.FIREBASE_DATABASE_URL);
console.log(process.env.FIREBASE_PROJECT_ID);
console.log(process.env.FIREBASE_STORAGE_BUCKET);
console.log(process.env.FIREBASE_MESSAGING_SENDER_ID);
console.log(process.env.FIREBASE_APP_ID);
console.log(process.env.FIREBASE_MEASUREMENT_ID);

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };

initializeApp(config);

const database = getDatabase();

export { database as default };
// ------------------------------------------------------------------------------------------------------
// onValue(ref(getDatabase(), 'expenses'), (snapshot) => {
//     const expenses = [];

//     snapshot.forEach((child) => {
//         expenses.push({
//             id: child.key,
//             ...child.val()
//         });
//     });

//     console.log(expenses);
// });


// push(ref(getDatabase(), 'expenses'), {
//     description: 'Gum',
//     note: '',
//     amount: 195,
//     createdAt: 0
// });

// push(ref(getDatabase(), 'expenses'), {
//     description: 'Rent',
//     note: '',
//     amount: 109500,
//     createdAt: moment().subtract(4, 'days').valueOf()
// });

// push(ref(getDatabase(), 'expenses'), {
//     description: 'Credit Card',
//     note: '',
//     amount: 4500,
//     createdAt: moment().add(4, 'days').valueOf()
// });


// push(ref(getDatabase(), 'notes'), {
//     title: 'Stuff',
//     body: 'I don\'t know'
// });

// update(ref(getDatabase(), 'notes/-NBlApyQdXwyI61j4QgP'), {
//     title: 'To Dooooooooooo'
// });

// set(ref(getDatabase()), {
//     name: 'Gergely Papp',
//     age: 29,
//     isSingle: true,
//     location: {
//         city: 'Szeged',
//         country: 'Hungary'
//     }
// }).then(() => {
//     console.log('Data is saved');
// }).catch((e) => {
//     console.log('This failed', e);
// });

// set(ref(getDatabase(), 'age'), 30);
// set(ref(getDatabase(), 'location/city'), 'Bugyi');

// set(ref(getDatabase(), 'attributes'), {
//     height: 175,
//     weight: 66
// });
