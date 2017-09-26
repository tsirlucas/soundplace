import {h} from 'preact';
import Sidebar from './Sidebar';

const Layout = (props) => (
  <main>
    <Sidebar />
    {props.children}
  </main>
);

export default Layout;
