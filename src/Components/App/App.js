import React from 'react';
import './App.css';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [], playlistTracks: [], playlistName: 'Mah Playlist' };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let nPlaylist = this.state.playlistTracks;
    let found = false;
      for(let i=0; i<nPlaylist.length; i++) {
        if (nPlaylist[i].id === track.id) {
          found = true;
          break;
        }
      }
    if (found === false) {
    nPlaylist.push(track);
  }
  this.setState( {playlistTracks: nPlaylist} );
}

  removeTrack(track) {
    let nPlaylist = this.state.playlistTracks.filter(t => t !== track);
    this.setState( {playlistTracks: nPlaylist} );
}

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults})
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist onSave={this.savePlaylist} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
