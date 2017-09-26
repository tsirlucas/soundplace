import { h } from 'preact';
import { privateRoutes } from '../../routes/routes.config';

const Sidebar = () => (
  <aside id="sidebar">
    <div id="brand">
      <img src="http://via.placeholder.com/80x80" width="80" height="80" alt="brand name" className="brand-img" />
      <h2 className="brand-name">Marcelo Silva</h2>
    </div>
    <Navigation>
      { privateRoutes.childRoutes.map((route) => <NavigationItem header={route.header} /> )}
    </Navigation>
  </aside>
);

const Navigation = ({ children }) => (
  <ul className="brand-nav">
    {children}
  </ul>
)

const NavigationItem = ({ header }) => (
  <li className="brand-nav-item">
    <span>{header}</span>
  </li>
)

export default Sidebar;
