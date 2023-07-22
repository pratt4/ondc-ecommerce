import React from "react";
import { Link } from "react-router-dom";

function RouteErrorPage() {
  return (
    <div>
      <h1>Invalid Route, Page not found !</h1>
      <Link to={"/"}>Back to Home</Link>
    </div>
  );
}

export default RouteErrorPage;
