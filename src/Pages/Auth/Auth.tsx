import React from 'react';
import { Link } from "react-router-dom"

import './Auth.css';

function Auth() {
  return (
    <div className="Auth">
      Hello Auth!
      <Link to='/game'>home</Link>
    </div>
  );
}

export default Auth;
