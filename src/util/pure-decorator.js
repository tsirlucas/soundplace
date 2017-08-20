export const shallowEqual = (a, b) => {
  for (let key in a) if (a[key] !== b[key]) return false;
  for (let key in b) if (!(key in a)) return false;
  return true;
};

const pure = () => (Component) =>
  class PureComponent extends Component {
    shouldComponentUpdate(props, state) {
      return !(shallowEqual(props, this.props) && shallowEqual(state, this.state));
    }
  };

export default pure;
