import {h} from 'preact';

import Card from '../../components/Card';
import Button from '../../components/Button';

const Login = () => (
  <section className="section full-height" id="login">
    <Card>
      <Button className="button-spotify">Conecte-se com Spotify</Button>
    </Card>
  </section>
);

export default Login;
