import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import { clearError } from '../../core/api/api.actions';

function mapStateToProps({ api }) {
  return { error: api.message };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ clearError }, dispatch) };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class StatusBar extends Component {

  render() {
    const { error } = this.props;
    const showStatusBar = error !== "" ? 'show' : 'hide';

    return (
      <section className={`status-bar ${showStatusBar}`}>
        <span>{error}</span>
      </section>
    );
  }

}
