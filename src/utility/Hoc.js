import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';

export default apolloAndReduxProviderHOC = (WrappedComponent, client) => {
  class Enhance extends React.Component {
    render () {
      return (
        <ApolloProvider client={client}>
          
            <WrappedComponent {...this.props} />
         
        </ApolloProvider>
      );
    }
  }
  
  return Enhance
}