import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => (
  <Fragment>
    <div className="text-center hero my-5">
    <h1 className="mb-4">React.js Sample Project</h1>

    <p className="lead">
      This is a sample application that demonstrates an authentication flow for
      an SPA, using{" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://auth0.com/docs/quickstart/spa/react"
      >
        React.js
      </a>
    </p>
  </div>
  </Fragment>
);

export default Home;