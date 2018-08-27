import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';


class Page extends Component {

  render() {
    const { children, id, className, ...rest } = this.props;

    return (
      <div id={id} className={className}>
        <Helmet
        />
        {children}
      </div>
    );
  }
}

export default withRouter(Page);
