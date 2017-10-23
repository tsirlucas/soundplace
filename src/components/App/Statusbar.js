import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import { clearError } from '../../core/api/api.actions';

function mapStateToProps({ api, player }) {
  return { error: api.message, hasPlayer: player };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ clearError }, dispatch) };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class StatusBar extends Component {

  getClassToBar = (error, hasPlayer) => {
    switch (true) {
      case error && !hasPlayer:
        return 'show';
      case error && !!hasPlayer:
        return 'show-over-player';
      default:
        return '';
    }

  };

  render() {
    const { error, hasPlayer } = this.props;
    const showStatusBar = this.getClassToBar(error, hasPlayer);

    return (
      <section className={`status-bar ${showStatusBar}`}>
        <span>{error}</span>
      </section>
    );
  }

}
