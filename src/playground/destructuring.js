const person = {
    name: 'Gary',
    age: 29,
    location: {
        city: 'Szeged',
        temp: 40
    }
};

const {name, age} = person;

console.log(`${name} is ${age}.`)

const book = {
    title: 'yes',
    author: 'jose',
    publisher: {
        name: 'something'
    }
};

const { name: publisherName = 'cucc' } = book.publisher;

console.log(publisherName);


const address = ['asd 12', 'fasz', 'nyeee', '1234'];

const [ , city, state, zip ] = address;

console.log(street);