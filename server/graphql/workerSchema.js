var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLID = require("graphql").GraphQLID;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;
var GraphQLFloat = require("graphql").GraphQLFloat;
var GraphQLBoolean = require("graphql").GraphQLBoolean;
var GraphQLDate = require("graphql-date");
var WorkerModel = require("../models/Worker");



var workerType = new GraphQLObjectType({
    worker: "worker",
    fields: function() {
        return {
            _id: {
                type: GraphQLString
            },
            fname: {
                type: GraphQLString
            },
            lname: 
            {
                type: GraphQLString
            },
            age: {
                type: GraphQLInt
            },
            wage: {
                type: GraphQLFloat
            },
            active: {
                type: GraphQLBoolean
            },
            bday: {
                type: GraphQLDate
            }
        }
    }
});



var queryType = new GraphQLObjectType({
    name: "Query",
    fields: function() {
        return {
            workers: {
                type: new GraphQLList(workerType),
                resolve: function() {
                    const workers = WorkerModel.find().exec();
                    if(!workers) {
                        throw new Error("Workers not found");
                    }
                    return workers;
                }
            },
            worker: {
                type: workerType,
                args: {
                    id: {
                        name: "_id",
                        type: GraphQLString
                    }
                },
                resolve: function(root, params) {
                    const worker = WorkerModel.findById(params.id).exec();
                    if(!worker) {
                        throw new Error(`Worker with id = ${params.id} could not be found.`);
                    }
                    return worker;
                }
            }
        }
    }
});



// id: String,
// fname: String,
// lname: String,
// age: { type: Number, min: 20, max: 70},
// wage: Number,
// active: Boolean,
// bday: { type: Date, default: Date.now}

var mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: function() {
        return {
            addWorker: {
                type: workerType,
                args: {
                    fname: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    lname: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    age: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    wage: {
                        type: new GraphQLNonNull(GraphQLFloat)
                    },
                    active: {
                        type: new GraphQLNonNull(GraphQLBoolean)
                    },
                    bday: {
                        type: new GraphQLNonNull(GraphQLDate)
                    }
                },
                resolve: function(root, params) {
                    const workerModel = new WorkerModel(params);
                    const newWorker = workerModel.save();
                    if(!newWorker) {
                        throw new Error("Could not create worker");
                    }
                    return newWorker;
                }
            },
            updateWorker: {
                type: workerType,
                args: {
                    id: {
                        name: "id",
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    fname: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    lname: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    age: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    wage: {
                        type: new GraphQLNonNull(GraphQLFloat)
                    },
                    active: {
                        type: new GraphQLNonNull(GraphQLBoolean)
                    },
                    bday: {
                        type: new GraphQLNonNull(GraphQLDate)
                    }
                },
                resolve: function(root, params) {
                    return WorkerModel.findByIdAndUpdate(params.id, {
                        fname: params.fname,
                        lname: params.lname,
                        age: params.age,
                        wage: params.wage,
                        active: params.active,
                        bday: params.bday
                    });
                }
            },
            removeWorker: {
                tyoe: workerType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remWorker = WorkerModel.findByIdAndDelete(params.id).exec();
                    if(!remWorker) {
                        throw new Error(`Could not delete Worker with id = ${params.id}`);
                    }
                    return remWorker;
                }
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: queryType,
    mutation: mutation
});