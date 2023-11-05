import React from 'react';
import { gql, useQuery} from '@apollo/client';

const GET_CLIENTS = gql`
  query getClients {
    clients {
        id
        name
        email
        phone
    }
  }
`

const Client = () => {
    const { loading, error, data } = useQuery(GET_CLIENTS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Something went wrong</p>
  return (
    <>
      {!loading && !error && <h1>Client</h1>}
    </>
  )
}

export default Client