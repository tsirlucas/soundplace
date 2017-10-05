import { h, Component } from 'preact';
import { connect } from 'preact-redux';

function mapStateToProps({ api }) {
  return { hasNetwork: api.hasNetwork };
}

function mapDispatchToProps() {
  return {};
}

@connect(mapStateToProps, mapDispatchToProps)
export default class StatusBar extends Component {

  getBarstatus = (hasNetwork) => {
    switch (hasNetwork) {
      case true:
        return 'hide';
      case false:
        return 'show';
      default:
        return '';
    }
  };

  render() {
    const { hasNetwork } = this.props;

    return (
      <section className={`network-bar ${this.getBarstatus(hasNetwork)}`}>
        <span>Você está offline!</span>
      </section>
    );
  }
}
