import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {bindActionCreators} from 'redux';

import Icon from '../Icons/Icons';
import {getUser} from '../../core/user/user.actions';

function mapStateToProps({user}) {
  return {user};
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({getUser}, dispatch)};
}

@connect(mapStateToProps, mapDispatchToProps)
class Topbar extends Component {
  componentDidMount() {
    this.props.actions.getUser();
  }

  render() {
    const {user} = this.props;

    return (
      <div class="top-bar">
        <div id="brand">
          <img
            src={user.image}
            ref={(img) => (this.img = img)}
            alt={user.name}
            className="brand-img"
            onError={() => (this.img.src = '/assets/img/avatar.jpeg')}
          />
          <h3 className="brand-name">{user.name}</h3>
          <div style="width: 36px" />
          {/*<Icon icon="MENU" size={36} color="white"/>*/}
        </div>
      </div>
    );
  }
}

export default Topbar;
