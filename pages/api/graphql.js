
import {gql, ApolloServer} from  "apollo-server-micro";
import setup from "../../database-test"
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');


async function getData() {
  const db = await sqlite.open({
  filename: '/tmp/database.db',
  driver: sqlite3.Database
});
const data =  await db.all('select * from Beer')
return data;
}


const typeDefs = gql`
  type Query {
    beers: [Beer]
  }
  type Beer {
    id: ID!
    name: String!
    alcoholPercent: String!
    description: String
  }
`;

const resolvers = {
  Query: {
    beers: (_parent, _args, _ctx) => {
     return getData().then((l)=>  {return l})
     
    }
  }
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
});

const handler = apolloServer.createHandler({path: "/api/graphql"});
export const config = {
  api: {
    bodyParser: false
  }
};
export default handler;