import {Component, h} from 'preact';
import {connect} from 'preact-redux';

import {Icon} from 'components';

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
    const cachedSongs = tracks.data
      ? Object.keys(tracks.saved).map((key) => ({
          ...tracks.data[key],
          ...tracks.saved[key],
        }))
      : [];

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
      <section id="storage">
        <ul className="chart-skills">
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
        <div className="tracks-list">
          {cachedSongs &&
            cachedSongs.filter((item) => item.name).map((item) => (
              <li className="track-item">
                <h3 className="track-name">{item.name}</h3>
                <p className="artist-info">{item.channel}</p>
                <p className="artist-info">{item.size}</p>
                <div className="track-actions">
                  <span className="storage-button" onClick={() => actions.deleteMusic(item.id)}>
                    {item.status === 'DOWNLOADING' && (
                      <span className="icon-spinner">
                        <Icon icon="SYNC" size="17" color="white" />
                      </span>
                    )}
                    {item.status === 'DONE' && <Icon icon="UNSTORAGE" size="17" color="white" />}
                  </span>
                </div>
              </li>
            ))}
        </div>
      </section>
    );
  }
}

export const Storage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StorageComponent);
