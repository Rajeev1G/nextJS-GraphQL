import Head from 'next/head'  
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Modal from "../components/Modal"
import { useState } from 'react';
import Link from 'next/link'


const Table = styled.div`
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
const Button = styled.button`
  display: flex;
  margin: auto;
  margin-top: 30px;
  padding: 10px 40px;
  font-size: xx-large;
`;

const Form = styled.form`
display: flex;
flex-direction: column;
width: 300px;
margin: auto;
font-size: x-large;
`;

const Nav = styled.div`
text-align: center;
font-size: 50px;
margin-bottom: 20px;
background-color: #2F4454;
color: white;
`;

const getBeers = gql`
  query Beers {
    beers {
      id
    name
    description
    alcoholPercent
    countryOfOrigin
    price
    }
   
  }
`;

const ADD_BEER = gql`
  mutation AddBeer($name: String!, $alcoholPercent: String!, $description: String!, $price: String!, $countryOfOrigin: String! ) {
    addBeer(name: $name, alcoholPercent: $alcoholPercent, description: $description, price: $price, countryOfOrigin: $countryOfOrigin) {
      name
      alcoholPercent
      description
      countryOfOrigin
      price
    }
  }
`;

const handleSubmit = (e, name, percentage, description,price, origin, addBeer) => {
  e.preventDefault()
  addBeer({ variables: 
            { name, alcoholPercent: percentage, description, price, countryOfOrigin: origin },
            refetchQueries: [{ query: getBeers}], awaitRefetchQueries: true})
}

const Home = () =>  {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [percentage, setPercentage] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [origin, setOrigin] = useState("");
  const { data, loading, error } = useQuery(getBeers);
  const [addBeer, { dataReturned }] = useMutation(ADD_BEER);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav>BEER MENU</Nav>
      <Table>
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
      </Table>
      <Modal show={showModal} handleClose={()=> setShowModal(false)}>
          <Form onSubmit={(e)=> handleSubmit(e, name, percentage, description, price, origin, addBeer)}>
            <div className="nameField">
              <label for="name">Name: </label>
              <input type="text" name="name" onChange={(e)=> setName(e.target.value)}></input>
            </div>

            <div className="inputField">
              <label for="percentage">Alcohol Percentage: </label>
              <input type="text" name="percentage" onChange={(e)=> setPercentage(e.target.value)}></input>
            </div>

            <label for="description">Description: </label>
            <input type="text" name="description" onChange={(e)=> setDescription(e.target.value)}></input>

            <div className="inputField">
              <label for="price">Price(in £): </label>
              <input type="text" name="price" onChange={(e)=> setPrice(e.target.value)}></input>
            </div>

            <div className="inputField">
              <label for="origin">Country of Origin: </label>
              <input type="text" name="origin" onChange={(e)=> setOrigin(e.target.value)}></input>
            </div>

            <input type="submit" value="Submit"></input>
          </Form>
      </Modal>
      <Button onClick={()=> setShowModal(true)}>Add Beer</Button>
    </div>
  );
  
}

export default Home;