const graphql = require('graphql');
const axios = require('axios');

const BASE_URL = 'http://localhost:3000/';

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,

    GraphQLList, // list

    GraphQLSchema,
    GraphQLNonNull,
} = graphql;

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return axios.get(`${BASE_URL}companies/${parentValue.id}/users`)
                    .then(res => res.data);
            }

        }
    }) ,
});

/**
 * UserType
 */
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },

        // relationships
        company: {
            type: CompanyType,
            resolve(parentValue, args) {
                // console.log(parentValue, args);
                return axios.get(`${BASE_URL}companies/${parentValue.companyId}`)
                    .then(res => res.data);
            }
        }
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) { 
                // allow GraphQL to enter into datagraph.
                //  returns actual results
                return axios.get(`${BASE_URL}users/${args.id}`)
                    .then(res => res.data);
            }
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) { 
                // allow GraphQL to enter into datagraph.
                //  returns actual results
                return axios.get(`${BASE_URL}companies/${args.id}`)
                    .then(res => res.data);
            }
        }
    }
});

// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                companyId: { type: GraphQLString },
            },
            resolve(parentValue, { firstName, age }) {
                return axios.post(`${BASE_URL}users`, {
                    firstName,
                    age,
                }).then(res => res.data);
                // args.firstName, args.age, args.companyId
            }
        }
    }
})

// Export the new schema defined above
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation,
});