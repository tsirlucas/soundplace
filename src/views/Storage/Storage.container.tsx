import {Component, h} from 'preact';
import {connect} from 'preact-redux';

import {formatBytes} from '../../util/formatBytes';
import {
  mapDispatchToProps,
  MapDispatchToProps,
  mapStateToProps,
  MapStateToProps,
} from './Storage.selectors';

type Props = MapStateToProps & MapDispatchToProps;

class StorageComponent extends Component<Props, {}> {
  componentDidMount() {
    this.props.actions.loadStorageStatus();
    this.props.actions.requestCachedSongs();
  }

  sortArr = (arr) => {
    return arr.sort((a, b) => {
      let comparison = 0;
      if (a.percent < b.percent) {
        comparison = 1;
      } else if (a.percent > b.percent) {
        comparison = -1;
      }
      return comparison;
    });
  };

  render({storage, tracks, actions}: Props) {
    const {storageInfo} = storage;
    const cachedSongs = Object.keys(tracks.saved).map((key) => tracks.data[key]);

    const dataArray = this.sortArr([
      {
        label: 'App',
        percent: (storageInfo.appResources / storageInfo.quota) * 100,
        color: '#5288D8',
      },
      {label: 'Songs', percent: (storageInfo.songs / storageInfo.quota) * 100, color: '#E97028'},
      {label: 'Free', percent: 100, color: '#00812F'},
    ]);

    dataArray[1].percent = dataArray[1].percent + dataArray[2].percent;

    return (
      <section>
        <ul class="chart-skills">
          {dataArray.map((item) => (
            <li style={`transform: rotate(${item.percent * 1.8}deg); border-color: ${item.color};`}>
              <span style={`transform: rotate(-${item.percent * 1.8}deg);`}>{item.label}</span>
            </li>
          ))}
        </ul>

        <div style="text-align: center;">
          <h2>
            Using {formatBytes(storageInfo.usage)} of {formatBytes(storageInfo.quota)}.{' '}
            {formatBytes(storageInfo.free)} free
          </h2>
          <h3>App resources: {formatBytes(storageInfo.appResources)}</h3>
          <br />
        </div>
        <br />
        {cachedSongs &&
          cachedSongs.map((item) => {
            return (
              <div onClick={() => actions.deleteMusic(item.id)}>
                <span>
                  {item.name} - {item.channel}: {123}
                </span>{' '}
                <br />
              </div>
            );
          })}
      </section>
    );
  }
}

export const Storage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StorageComponent);
