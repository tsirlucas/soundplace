import {h} from 'preact';
import icons from './Icons.constants';

const Icon = props => {
  const styles = {
    svg: {
      display: 'inline-block',
      verticalAlign: 'middle'
    },
    path: {
      fill: props.color || ''
    }
  };
  return (
    <svg
      style={styles.svg}
      width={`${props.size}px`}
      height={`${props.size}px`}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill-rule="evenodd"
      clip-rule="evenodd"
      stroke-linejoin="round"
      stroke-miterlimit="1.414">
      <path style={styles.path} d={icons[props.icon]}/>
    </svg>
  );
};
export default Icon;
