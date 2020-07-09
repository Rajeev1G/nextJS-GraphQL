import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Link from 'next/link'
import styled from 'styled-components';

const TableStyle = styled.div`
  font-size: larger;
`;
const Row = styled.div`
  display: flex;
  padding: 10px;
  margin: auto;
  width: 900px;
  background-color: #efefef;
  margin-top: -1px;
  border: 1px solid black;
`;
const Element = styled.div`
  padding: 10px;
  width: 20%;
  text-align: center;
`;



const Table = ({sortVal}) => {
    const getBeers = gql`
  query Beers($sortVal: Int!) {
    beers(sortVal: $sortVal) {
      id
    name
    description
    alcoholPercent
    countryOfOrigin
    price
    }
   
  }
`;
    console.log(sortVal)
    const { data, loading, error } = useQuery(getBeers, {
        variables: { sortVal },
    });
    if (loading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        return <p>Error: {JSON.stringify(error)}</p>;
      }
    return (
        <TableStyle>
        {data && data.beers.map(beer => {
        return( 
        <Row>
            <Element>{beer.name}</Element>
            <Element>{beer.alcoholPercent}%</Element>
            <Element >{beer.countryOfOrigin}</Element>
            <Element >£{beer.price}</Element>
            <Element>
            <Link href="/[id]" as={`/${beer.id}`}>
                <a>View Beer</a>
            </Link>
        </Element>
        </Row>
    )
    })
    }
  </TableStyle>
    )
    
}

export default Table;