import Head from 'next/head'  
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const getBeers = gql`
  query Beers {
    beers {
      id
    name
    description
    alcoholPercent
    }
   
  }
`;

const Home = () =>  {
  const { data, loading, error } = useQuery(getBeers);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }
  console.log(data)
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        {JSON.stringify(data)}
        {data && data.beers.map(beer => <div>{beer.name}</div>)}
    </div>
  );
  
}

export default Home;