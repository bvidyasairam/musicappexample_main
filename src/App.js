import React, { useState} from 'react';
import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SongsListFunction from "./SongsList"
import Playlist from "./PlayList"
import Loader from "react-loader"
import { FiPlayCircle } from "react-icons/fi";


function App() {
  const [sendFilteredContent, setSendFilteredContent] = useState([])
  const [booleanValue, setbooleanValue] = useState(false)
  const [AlbumList, setAlbumList] = useState([])
  const [showMore, setShowMore] = useState(5)
  function ReceiveValuefromSongsList(songlist, albumlist) {
    if (songlist.length > 0) {
      setbooleanValue(true)

      setSendFilteredContent(songlist)
      setAlbumList(albumlist)
    }
  }

  return (
    <div className="App">
      <div>
        <Tabs>
          <TabList>
            <Tab>All Songs</Tab>
            <Tab>Playlist</Tab>
          </TabList>
          <TabPanel>

            <Loader loaded={booleanValue}>
            </Loader>
            <SongsListFunction functionToShowFilteredConent={(receivedValueSongs, receivedValueAlbum) =>
              ReceiveValuefromSongsList(receivedValueSongs, receivedValueAlbum)} />
            <br />
            <div>

              {sendFilteredContent.slice(0, showMore).map((item, index) => (
                <ul className="ulListForUI">
                  <div className="MainTagForList">
                    <div className="SongContentWidth">
                      <li className="SongNameWidth">{item.title}{"..."}</li>
                      {AlbumList.filter((childItem) => (childItem.id === item.albumId)).map(childItem => (
                        <li className="liContent">{"ALBUM : "}{childItem.title}</li>
                      ))}
                    </div>
                    <div>
                      <img src={item.thumbnailUrl} alt={""} className="PhotofromURL" />
                    </div>
                    <div>
                      <FiPlayCircle
                        color={"green"}
                        size={35}

                      />
                    </div>
                  </div>
                </ul>
              ))
              }
              {sendFilteredContent.length > 0 ?
                <div className="showMoreLessButtonsUI">
                  <button className="addButtonUI" onClick={() => setShowMore(showMore + 10)}>SHOW MORE</button>
                  {showMore > 10 ? <button className="BackButtonUI" onClick={() => setShowMore(showMore - 10)}>SHOW LESS</button>
                    : null}
                </div>
                : null}
            </div>
          </TabPanel>
          <TabPanel>
            <Playlist />
          </TabPanel>
        </Tabs>
      </div>
    </div >
  );
}

export default App;
