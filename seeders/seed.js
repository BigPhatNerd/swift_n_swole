require("dotenv").config();
const faker = require("faker");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const _ = require("lodash");
// Connection URL

const url = process.env.MONGODB_URI;
console.log({ url });

// Database Name
const dbName = "swole";

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);

  const db = client.db(dbName);

  const usersCollection = db.collection("users");
  const profilesCollection = db.collection("profiles");
  usersCollection.drop(function (err) {
    console.log("dropped Users Collection");
  });
  profilesCollection.drop(function (err) {
    console.log("dropped Profiles collection");
  });

  let users = [];

  for (let i = 0; i < 100; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const eventId = faker.datatype.number({
      min: 100,
      max: 105,
    });
    const paid = true;
    let newUser = {
      email: faker.internet.email(firstName, lastName),
      firstName,
      lastName,
      password: "password123",
      eventId,
      paid: true,
    };
    users.push(newUser);
  }
  usersCollection.insertMany(users);

  let profiles = [];
  for (let i = 0; i < 200; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const miles = faker.datatype.number({
      min: 10,
      max: 101,
    });
    const eventId = faker.datatype.number({
      min: 100,
      max: 105,
    });
    var arr = [];
    const initialArray = () => {
      for (var i = 0; i < 8; i++) {
        var obj = {
          benchPress: faker.datatype.number({
      min: 0,
      max: 120,
    }),
          deadlift: faker.datatype.number({
      min: 0,
      max: 120,
    }),
          hasSubmitted: true,
        };
        arr.push(obj);
      }

      return arr;
    };

    let newProfile = {
      user: _.sample(users),
      teamName: faker.lorem.words(2),
      eventId,
      team: [
        {
          participantName: faker.name.firstName() + " " + faker.name.lastName(),
          participantGender: "m",
          participantCellPhone: 5555555555,
          participantAddress: faker.address.streetAddress(),
          participantCity: faker.address.city(),
          participantState: faker.address.state(),
          participantZip: 38253,
          participantEmail: faker.internet.email(firstName, lastName),
          participantDOB: "10/11/1976",
        },
        {
          participantName: faker.name.firstName() + " " + faker.name.lastName(),
          participantGender: "m",
          participantCellPhone: 5555555555,
          participantAddress: faker.address.streetAddress(),
          participantCity: faker.address.city(),
          participantState: faker.address.state(),
          participantZip: 38253,
          participantEmail: faker.internet.email(firstName, lastName),
          participantDOB: "10/11/1976",
        },
      ],
      reps: initialArray(),
      miles: {
        total: miles,
        hasSubmitted: true,
      },
    };
    profiles.push(newProfile);
  }
  profilesCollection.insertMany(profiles);
  console.log("Database seeded! 😎");
  client.close();
});
