import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, Route } from 'react-router-dom';

const Restrito = props => {
  if (!props.auth.isAuth) {
    return <Redirect to='/login'/>
  }

  return (
    <div>
      <h1>Restrito</h1>

      <p>
        <Link to='/admin'>Home</Link>
        <Link to='/admin/users'>Users</Link>
      </p>

      <div>
        <Route exact path={`${props.match.path}/`} component={Home}/>
        <Route path={`${props.match.path}/users`} component={Users}/>
      </div>
    </div>
  )
};


const mapStateToProps = state => {
  return {
    auth: state.auth
  }
};

export default connect(mapStateToProps)(Restrito);