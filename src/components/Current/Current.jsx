import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getActiveProposals } from '../../actions/proposalActions';
import { Link } from 'react-router-dom';
import './Current.scss';

class Current extends Component {
  componentDidMount() {
    this.props.getActiveProposals();
  }

  render() {
    return (
      <div className="current-proposals">
        {
          this.props.proposals.map(proposal => (
            <div key={proposal._token} className="proposal-wrapper">
              <p className="started">{proposal.startTime.toLocaleString()}</p>
              <p className="title">
                <Link className="vote-wrapper" to={`/proposal/${proposal.id}`}>{proposal.title}</Link>
              </p>
              <Link className="vote-wrapper" to={`/proposal/${proposal.id}`}>VOTE</Link>
              <p className="description">{proposal.description}</p>
            </div>
          ))
        }
      </div>
    );
  }
}

Current.propTypes = {
  getActiveProposals: PropTypes.func.isRequired,
  proposals: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  proposals: state.proposal.activeProposals,
});

export default connect(mapStateToProps, {
  getActiveProposals,
})(Current);
