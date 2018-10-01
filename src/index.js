import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/searchBar';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';

import {API_K} from '../apikey';

const API_KEY = API_K;

class App extends Component{
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('beyonce');
    }

    videoSearch(term) {
        YTSearch({
            key: API_KEY,
            term: term
        }, (videos) => {
           this.setState({
                videos:videos,
                selectedVideo:videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term)=>{this.videoSearch(term)},300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos}/>
            </div>
        );
    }
}

//passing an instance to render
ReactDOM.render(<App />, document.querySelector('.container')); 