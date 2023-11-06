import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Client from "./components/Client";
import AddClientModal from "./components/AddClientModal";
import Project from "./components/Project";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
})
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <AddClientModal />
          <Project />
          <Client /> 
        </div>
      </ApolloProvider>     
    </>   
  );
}

export default App;
