import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import NavBar from '../components/NavBar'
const Beer = () => {
    const router = useRouter()
    const { id } = router.query
    const SINGLE_BEER_QUERY = gql`
    query Beer($id: String!){
        beer(id: $id) {
            name
            alcoholPercent
            description
            countryOfOrigin
            price
        }
    }
    `;

    const { loading, error, data } = useQuery(SINGLE_BEER_QUERY, {
        variables: { id },
    });

    if (loading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        return <p>Error: {JSON.stringify(error)}</p>;
      }
      console.log(data.beer)
    return (
    <>
        <NavBar/>
        <div><h1>{data.beer.name}</h1></div>
        <div className="overview">
            <h3>Overview</h3>
            <div className="details">
            <div className="detail">Country of Origin <div className="detailValue">{data.beer.countryOfOrigin}</div></div>
            <div className="detail">Price <div className="detailValue">£{data.beer.price}</div></div>
            <div className="detail">Alcohol Perecentage <div className="detailValue">{data.beer.alcoholPercent}%</div></div>
            </div>
            
        </div>
        <div className="description">
            <h3>Description</h3>
            {data.beer.description}
        </div>
        
    </>
    )
}

export default Beer;