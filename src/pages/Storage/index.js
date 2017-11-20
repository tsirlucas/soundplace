import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import { loadStorageStatus, getCachedSongs, deleteMusic } from '../../core/storage/storage.actions';
import Playlist from '../../components/Songs';
import { formatBytes } from '../../util/formatBytes';

function mapStateToProps({ storage }) {
  return { storage };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ loadStorageStatus, getCachedSongs, deleteMusic }, dispatch) };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class StoragePage extends Component {
  componentDidMount() {
    this.props.actions.loadStorageStatus();
    this.props.actions.getCachedSongs();
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
  }

  render({ storage, actions }) {
    const dataArray = this.sortArr([
      { label: 'App', percent: (storage.appResources / storage.quota) * 100, color: '#5288D8' },
      { label: 'Songs', percent: (storage.songs / storage.quota) * 100, color: '#E97028' },
      { label: 'Free', percent: 100, color: '#00812F' }
    ]);

    dataArray[1].percent = dataArray[1].percent + dataArray[2].percent;

    return (
      <section>
        <ul class='chart-skills'>
          {dataArray.map((item) => (
            <li style={`transform: rotate(${(item.percent * 1.8)}deg); border-color: ${item.color};`}>
              <span style={`transform: rotate(-${(item.percent * 1.8)}deg);`}>{item.label}</span>
            </li>
          ))}
        </ul>

        <div style='text-align: center;'>
          <h2>Using {formatBytes(storage.usage)} of {formatBytes(storage.quota)}. {formatBytes(storage.free)} free</h2>
          <h3>App resources: {formatBytes(storage.appResources)}</h3>
          <br />
        </div>
        <br />
        {storage.cachedSongs.map((item) => {
          return (
            <div onClick={() => actions.deleteMusic(item.request.url)}>
              <span>{item.data.name} - {item.data.artist.name}: {item.data.size}</span> <br />
            </div>
          );
        })}
      </section>
    );
  }
}
