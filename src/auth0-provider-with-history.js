// un Auth0ProviderWithHistorycomposant, qui utilise la composition pour rendre les Hooks React Router disponibles pour Auth0Provider
import React from "react";
import { useHistory, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
// Vous avez besoin du SDK Auth0 React pour vous connecter à l'application Auth0 appropriée pour traiter l'authentification. 
// En tant que tel, vous devez utiliser le domaine Auth0 et l'ID client pour configurer le Auth0Provider.
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience = process.env.REACT_APP_AUDIENCE;
  
//Vous utilisez le useHistory()crochet pour obtenir l' historyobjet à partir de React Router. 
  const history = useHistory();

// Vous utilisez la onRedirectCallback()méthode pour gérer l'événement où Auth0 redirige vos utilisateurs de la page de connexion universelle Auth0 vers votre application React.
  const onRedirectCallback = (appState) => {
    // TODO 
    // appState.returnTo == > continue sa navigation vers une Route privé
    // "/dashboard" ==> On le redirige vers
    // window.location.pathname ===> reste sur la page sur lequel il s'est connecté
    // history.push(appState.returnTo || "/dashboard" || window.location.pathname);
    history.push("/profile" || window.location.pathname);
  };
  
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      // Pourquoi la valeur Audh0 Audience est-elle la même pour les deux applications? Auth0 utilise la valeur de l' audienceaccessoire pour déterminer le serveur de ressources (API) auquel l'utilisateur autorise votre application React à accéder.
      audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};
//Envelopper n'importe quelle arborescence de composants avec Auth0ProviderWithHistorylui donnera accès au Auth0Context.
export default Auth0ProviderWithHistory;