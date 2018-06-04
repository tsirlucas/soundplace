import {Component, h} from 'preact';

import {Props as ContainerProps} from '../AppLayout.container';

type Props = {
  error: string;
  hasPlayer: ContainerProps['showPlayer'];
};

export class StatusBar extends Component<Props, null> {
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
    const {error, hasPlayer} = this.props;
    const showStatusBar = this.getClassToBar(error, hasPlayer);

    return (
      <section className={`status-bar ${showStatusBar}`}>
        <span>{error}</span>
      </section>
    );
  }
}
