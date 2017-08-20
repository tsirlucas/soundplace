import {h} from 'preact';

const Layout = (props) => {
  return (
    <div id="app">
      <main id="content">
        {props.children}
      </main>
    </div>
  );
};
export default Layout;
