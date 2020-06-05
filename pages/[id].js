import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Link from 'next/link'
const Beer = () => {
    const router = useRouter()
    const { id } = router.query
    const SINGLE_BEER_QUERY = gql`
    query Beer($id: String!){
        beer(id: $id) {
            name
            alcoholPercent
            description
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

    return (
    <>
        <div><h1>{data.beer.name}</h1></div>
        <div></div>
        <Link href="/" >
            <a>Home</a>
        </Link>
    </>
    )
}

export default Beer;