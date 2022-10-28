const graphql = require('graphql');
const mongodb = require('../database/connect');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema } = graphql;

//Schema defines data on the Graph like object types(book type), relation between
//these object types and descibes how it can reach into the graph to interact with
//the data to retrieve or mutate the data

const DayType = new GraphQLObjectType({
  name: 'Day',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    recipeName: { type: GraphQLString }
  })
});

//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular book
//or get a particular author.
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    day: {
      type: DayType,
      //argument passed by the user while making the query
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //Here we define how to get data from database source

        //this will return the book with id passed in argument by the user
        return mongodb
          .getDatabase()
          .db(process.env.DB_NAME)
          .collection('Days')
          .find((item) => {
            return item.id == args.id;
          });
      }
    }
  }
});

//Creating a new GraphQL Schema, with options query which defines query
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
  query: RootQuery
});
