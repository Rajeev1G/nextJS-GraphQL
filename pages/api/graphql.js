
import {gql, ApolloServer} from  "apollo-server-micro";
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');


async function getData(id) {
  const db = await sqlite.open({
  filename: '/tmp/database.db',
  driver: sqlite3.Database
});
if (id) {
  const data = await await db.get('select * from Beer where id = ?', [id])
    return data
}
else {
  const data =  await db.all('select * from Beer')
  console.log(data)
  return data;
}
}

async function addData(name, alcoholPercent, description, price, countryOfOrigin) {
  const db = await sqlite.open({
  filename: '/tmp/database.db',
  driver: sqlite3.Database
});
const statement = await db.prepare('INSERT INTO Beer (name, alcoholPercent, description, price, countryOfOrigin) values (?,?,?,?,?)');
const result = await statement.run(name, alcoholPercent, description, price, countryOfOrigin);
const data =  await db.all('select * from Beer')
return data;
}


const typeDefs = gql`
  type Query {
    beers: [Beer]
    beer(id: String!): Beer
  }
  type Mutation {
    addBeer (name: String!, alcoholPercent: String!, description: String!, price: String!, countryOfOrigin: String!):[Beer]
  }
  type Beer {
    id: ID!
    name: String!
    alcoholPercent: String!
    description: String
    countryOfOrigin: String!
    price: String!
  }
`;

const resolvers = {
  Query: {
    beers: (_parent, _args, _ctx) => {
     return getData().then((data)=>  {return data})
    },
    beer: (_parent,{id},_ctx) => {
      return getData(id).then((data)=> {return data})
    }
  },
  Mutation: {
    addBeer: (_parent, {name, alcoholPercent, description, price, countryOfOrigin}, _ctx) => {
      return addData(name, alcoholPercent, description, price, countryOfOrigin).then((data)=> {return data})
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