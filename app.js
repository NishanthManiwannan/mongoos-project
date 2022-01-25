// const mongoDB = require("mongodb").MongoClient;
// const assert = require("assert");

// // //connecting url
// const url = "mongodb://localhost:27017";
// const client = new mongoDB(url, { useNewUrlParser: true });

// //DB name
// const productDB = "fruitsDB";

// client.connect(function (err) {
//     assert.equal(null, err);
//     console.log("connected");

//     const db = client.db(productDB);

//     insertDocuments(db, function(){
//         client.close();
//     })

//     // findDocumnents(db, function(){
//     //     client.close()
//     // })
// });

// const insertDocuments = function (db, callback) {
//     //get collection first
//     const collection = db.collection("fruits");

//     //insert some val into collection
//     collection.insertMany(
//         [{
//             name: "pipeline",
//             score: 4,
//             review: "good"
//         },
//         {
//             name: "apple",
//             score: 43,
//             review: "good"
//         },
//         {
//             name: "oranf",
//             score: 40,
//             review: "good not"
//         }
//     ],function (err, result) {
//         assert.equal(err, null);
//         //that 3 - inserting 3 doc values
//         assert.equal(3,result.result.n);
//         assert.equal(3, result.ops.length);
//         console.log("3 item added");
//         callback(result);
//     });
// };

// const findDocumnents = function(db, callback){
//     const collection = db.collection("fruits");

//     collection.find({}).toArray(function(err, fruit){
//         assert.equal(err, null);
//         console.log("Records");
//         console.log(fruit);
//         callback(fruit)
//     })
// }

//---------------------------------------------------------------------------------------------
// code from mongo doc new v-------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------

// const { MongoClient } = require("mongodb");
// // or as an es module:
// // import { MongoClient } from 'mongodb'

// // Connection URL
// const url = "mongodb://localhost:27017";
// const client = new MongoClient(url);

// // Database Name
// const dbName = "fruitsDB";

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log("Connected successfully to server");
//   const db = client.db(dbName);
//   const collection = db.collection("fruits");

//   // the following code examples can be pasted here...

//   //add
//   //   const insertResult = await collection.insertMany([
//   //     { a: 1 },
//   //     { a: 2 },
//   //     { a: 3 },
//   //   ]);
//   //   console.log("Inserted documents =>", insertResult);

//   //find
//   const findResult = await collection.find({}).toArray();
//   console.log("Found documents =>", findResult);

//   return "done.";
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());

//------------------------------------------------------------------
//use mongoose --------------------------------------------------
//----------------------------------------------------------------

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fruitDB", {
  useNewUrlParser: true,
});

const fruitSchema = new mongoose.Schema({
  //validateing
  name: {
    type: String,
    required: [true, "name not added"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const Fruit = mongoose.model("fruit", fruitSchema);

const fruit = new Fruit({
  name : "gragon hunter",
  rating: 4,
  review: "Good",
});

fruit.save();

//---------------------- adding new items for fruit schema -----------------------
// const banana = new Fruit({
//   name: "bana",
//   score: 12,
//   review: "ok",
// });

// const cake = new Fruit({
//   name: "cakes",
//   score: 19,
//   review: "ok",
// });

// // --------------------- add new ----------------------
// Fruit.insertMany([banana, cake], function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("added");
//     }
// })

//---------------- find data ----------------------------
// Fruit.find(function (err, fruits) {
//   if (err) {
//     console.log(err);
//   } else {
//     mongoose.connection.close();

//     fruits.forEach(function (fruit) {
//       console.log(fruit);
//     //   console.log(fruit.name);
//     });
//   }
// });

//-------------------- update --------------------------------------
// Fruit.updateOne({_id : "61efd99afea5fee1f11e1d7a"}, {name: "update"}, function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("updated Succesfully");
//     }
// })

//------------------------- delete data -----------------------------------
// Fruit.deleteOne({_id : "61efd9a679869f4e5ea29247"}, function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Deleted succesfully")
//     }
// })

//------------------------- new person collection  ----------------------------------
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouritFruits : fruitSchema
});

const Person = mongoose.model("People", personSchema);

const person = new Person({
  name: "Nish ku",
  age: 20,
  favouritFruits : fruit
});

// person.save();

//-------------------- update person --------------------------------------
Person.updateOne({_id : "61efdd0798c7acba95962416"}, {favouritFruits: fruit}, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("updated Succesfully");
    }
})

// Person.deleteMany({ name: "Nish" }, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("All deleted");
//   }
// });
