// import { mergeTypes } from 'merge-graphql-schemas';
// import workerSchema from './workerSchema';
// import bookSchema from './bookSchema';

var mergeTypes = require("merge-graphql-schemas").mergeTypes;
var bookSchema = require("./bookSchema").bookSchema;
var workerSchema = require("./workerSchema").workerSchema;

 
const types = [
  bookSchema,
  workerSchema,
];
 
// NOTE: 2nd param is optional, and defaults to false
// Only use if you have defined the same type multiple times in
// different files and wish to attempt merging them together.
// export default mergeTypes(types, { all: true });

 module.exports = mergeTypes(types, { all: true});