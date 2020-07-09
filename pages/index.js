import Head from 'next/head'  
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Modal from "../components/Modal"
import NavBar from "../components/NavBar"
import { useState } from 'react';
import Link from 'next/link'
import Table from "../components/Table"


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
  const [sortValue,setSortValue] = useState(0)
  const [name, setName] = useState("");
  const [percentage, setPercentage] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [origin, setOrigin] = useState("");
  const [addBeer, { dataReturned }] = useMutation(ADD_BEER);

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar/>
      <div className="">
        <div>
          Sort: 
          <button onClick={()=> setSortValue(1)}>Alphabetic order</button>
        </div>
        <Table sortVal={sortValue}/>
      </div>
      
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