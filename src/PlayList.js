import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import SongsListFunction from "./SongsList"
import { FiPlayCircle } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import Loader from "react-loader"
import { FaArrowLeft } from "react-icons/fa";
import { BsMusicNoteList } from "react-icons/bs"

function Playlist() {
    const [PlaylistName, setPlaylistName] = useState("")
    const [toggleForPlayListInput, settoggleForPlayListInput] = useState(false)
    const [selectedContent, setSelectedContent] = useState("")
    const [selectedPlayList, setSelectedPlayList] = useState("")
    const [selectedID, setSelectedID] = useState("")
    const [MainToggle, setMainToggle] = useState(false)
    const [shuffleContentToDisplay, setshuffleContentToDisplay] = useState([])
    const [addShuffleOptionToggle, setAddShuffleOptionToggle] = useState(false)
    const [addShuffleOptionToggle_Content, setAddShuffleOptionToggle_Content] = useState(false) //MAINCONTEN TOGGLE
    const [Index, setIndex] = useState(null)
    const [sendFilteredContent, setSendFilteredContent] = useState([])
    const [AlbumList, setAlbumList] = useState([])
    const dispatch = useDispatch()
    const createdPlayList = useSelector((state) => state)
    const [showMore, setShowMore] = useState(3)
    const [mouseHoverToggle, setMouseHoverToggle] = useState(false)
    const [booleanValue, setbooleanValue] = useState(false)
    const [booleanValueforEdit, setbooleanValueforEdit] = useState(false)
    

    function AddingContentToPlayListFunction(item, index) {
        const PlayListContentHandle = Object.assign([], createdPlayList)
        PlayListContentHandle.createdPlaylist[index] = {
            id: PlayListContentHandle.createdPlaylist[index].id,
            Playlistname: PlayListContentHandle.createdPlaylist[index].Playlistname,
            PlayListContent: PlayListContentHandle.createdPlaylist[index].PlayListContent.concat({
                id: Math.random(),
                value: item
            })
        }
        PlayListContentHandle.createdPlaylist[index].PlayListContent.sort(function (a, b) {
            var x = a.value.title.toLowerCase();
            var y = b.value.title.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        })

        alert("SONG HAS BEEN ADDED TO PLAYLIST")
        dispatch({
            type: "ADD TITLETRACK",
            data: PlayListContentHandle
        })
    }

    function CreatePlaylist() {
        settoggleForPlayListInput(!toggleForPlayListInput)
        setPlaylistName("")
        dispatch({
            type: "CREATEPLAYLIST",
            playlistName: PlaylistName
        })

    }

    function ReceiveValuefromSongsList(songlist, albumlist) {
        if (songlist.length > 0) {
            setbooleanValue(true)
            setSendFilteredContent(songlist)
            setAlbumList(albumlist)
        }
    }

    function LoadSongs(item, index) {

        setSelectedID(item.id)
        setSelectedPlayList(item.PlaylistName)
        setSelectedContent(item.PlayListContent)
        setIndex(index)
        setMainToggle(true)
        setAddShuffleOptionToggle(false)

    }

    function DeleteContent(MainIndex, SubIndex) {
        const PlayListContentHandle = Object.assign([], createdPlayList)
        PlayListContentHandle.createdPlaylist[MainIndex].PlayListContent.splice(SubIndex, 1)
        dispatch({
            type: "DELETE TITLETRACK",
            data: PlayListContentHandle
        })

    }

    function shuffleContent() {
        const childArrayforShuffle = Object.assign([], createdPlayList)
        let newPosition, temp;
        for (let i = childArrayforShuffle.createdPlaylist[Index].PlayListContent.length - 1; i > 0; i--) {
            newPosition = Math.floor(Math.random() * (i + 1))
            temp = childArrayforShuffle.createdPlaylist[Index].PlayListContent[i].value
            childArrayforShuffle.createdPlaylist[Index].PlayListContent[i].value = childArrayforShuffle.createdPlaylist[Index].PlayListContent[newPosition].value
            childArrayforShuffle.createdPlaylist[Index].PlayListContent[newPosition].value = temp
        }
        setAddShuffleOptionToggle_Content(true)
        setshuffleContentToDisplay(childArrayforShuffle)


    }

    function BackButton() {
        createdPlayList.createdPlaylist[Index].PlayListContent.sort(function (a, b) {
            var x = a.value.title.toLowerCase();
            var y = b.value.title.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        })
        setMainToggle(false)
        setAddShuffleOptionToggle_Content(false)
    }

    return (
        <div>
            {!MainToggle ? < div >
                {toggleForPlayListInput ? <input placeholder="Enter Playlist Name" onChange={(e) => setPlaylistName(e.target.value)} /> : null}
                <br /><br />
                {(createdPlayList.createdPlaylist.length > 0) ?
                    createdPlayList.createdPlaylist.map((item, index) => (
                        <ul >
                            <div className={"Tag-DivForPlayList"}
                                onClick={() => LoadSongs(item, index)}>
                                <li className="SongNameWidth">{item.Playlistname}</li>
                                <IoIosAddCircle
                                    size={30}
                                    color="black"
                                />
                            </div>
                        </ul>
                    )) :
                    null
                }
                {toggleForPlayListInput ?
                    <div className="PlayListButton"
                        onClick={() => CreatePlaylist()}>
                        <BsMusicNoteList
                            color={"white"}
                            size={15}
                        />
                        <h5  className="buttonContent">Create Playlist</h5>
                    </div> :
                    <div className="PlayListButton"
                        onClick={() => settoggleForPlayListInput(!toggleForPlayListInput)}>
                        <div>
                            <BsMusicNoteList
                                color={"white"}
                                size={15}
                            />
                        </div>
                        <div>
                            <h5  className="buttonContent">Create Playlist</h5>
                        </div>
                    </div>}

            </div> :
                <div>
                    <div className="BackButtonContentForUI">
                        <FaArrowLeft
                            size={30}
                            onClick={() => BackButton()}
                            color={"firebrick"}
                        />
                        <h5>BACK</h5>
                    </div>
                    {!addShuffleOptionToggle ?
                        <div className="addShuffleButtonUI">
                            <button className="shuffleButtonUI" onClick={shuffleContent}>SHUFFLE SONGS</button>
                            <button className="addButtonUI" onClick={() => setAddShuffleOptionToggle(true)}>ADD SONGS</button>

                        </div>
                        :
                        <>

                            <SongsListFunction functionToShowFilteredConent={(receivedValueSongs, receivedValueAlbum) =>
                                ReceiveValuefromSongsList(receivedValueSongs, receivedValueAlbum)} />
                            <div className="ShuffleButtonUI">
                                <button className="shuffleButtonUI" onClick={shuffleContent}>SHUFFLE SONGS</button>
                                {!booleanValueforEdit ? <button className="addButtonUI" onClick={() => setbooleanValueforEdit(true)}>EDIT</button> :
                                    <button className="addButtonUI" onClick={() => setbooleanValueforEdit(false)}>DONE</button>}
                            </div>
                        </>}

                    {
                        
                        addShuffleOptionToggle_Content ?
                            (shuffleContentToDisplay.createdPlaylist[Index].PlayListContent.length > 0) ?
                                shuffleContentToDisplay.createdPlaylist[Index].PlayListContent.map((item, index) => (
                                    <ul className="ulListForUI">
                                        <div className="MainTagForList">
                                            <div className="SongContentWidth">
                                                <li className="SongNameWidth">{item.value.title}{"..."}</li>
                                                {AlbumList.filter((childItem) => (childItem.id === item.value.albumId)).map(childItem => (
                                                    <li className="liContent">{"ALBUM : "}{childItem.title}</li>
                                                ))}
                                            </div>
                                            <div>
                                                <img src={item.value.thumbnailUrl} className="PhotofromURL" />
                                            </div>
                                            <div>
                                                <FiPlayCircle
                                                    color={"green"}
                                                    size={30}
                                                />
                                            </div>
                                            <div>
                                                {booleanValueforEdit ?
                                                    <AiFillDelete
                                                        color={"red"}
                                                        size={30}
                                                        onClick={() => DeleteContent(Index, index)}
                                                    /> : null}
                                            </div>
                                        </div>
                                    </ul>
                                )) :
                                null

                            :

                            (createdPlayList.createdPlaylist[Index].PlayListContent.length > 0) ?
                                createdPlayList.createdPlaylist[Index].PlayListContent.map((item, index) => (
                                    <ul className="ulListForUI">
                                        <div className="MainTagForList">
                                            <div className="SongContentWidth">
                                                
                                                <li className="SongNameWidth">{item.value.title}{"..."}</li>
                                                {AlbumList.filter((childItem) => (childItem.id === item.value.albumId)).map(childItem => (
                                                    <li className="liContent">{"ALBUM : "}{childItem.title}</li>
                                                ))}
                                                
                                            </div>
                                            <div>
                                                <img src={item.value.thumbnailUrl} className="PhotofromURL" />
                                            </div>
                                            <div>
                                               
                                                <FiPlayCircle
                                                    color={"green"}
                                                    size={30}
                                                />
                                            </div>
                                            <div>

                                                {booleanValueforEdit ?
                                                    <AiFillDelete
                                                        color={"red"}
                                                        size={30}
                                                        onClick={() => DeleteContent(Index, index)}
                                                    /> : null}
                                                
                                            </div>
                                        </div>
                                    </ul>
                                )) :
                                null
                    }
                    {
                        addShuffleOptionToggle ?
                            <div>
                                <div className="SearchResultUI">
                                    <h1>Songs for you</h1>
                                </div>
                                <Loader loaded={booleanValue}>
                                </Loader>
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
                                                <img src={item.thumbnailUrl} className="PhotofromURL" />
                                            </div>
                                            <div>
                                                
                                                <FiPlayCircle
                                                    color={"green"}
                                                    size={30}
                                                />
                                            </div>
                                            
                                            <div>
                                                <IoIosAddCircle
                                                    size={30}
                                                    onClick={() => AddingContentToPlayListFunction(item, Index)}
                                                    color="blue"
                                                />
                                                
                                            </div>
                                        </div>
                                    </ul>

                                ))}
                            </div> : null}
                    {
                        addShuffleOptionToggle ?
                            sendFilteredContent.length > 0 ?
                                <div className="showMoreLessButtonsUI">
                                    <button className="addButtonUI" onClick={() => setShowMore(showMore + 10)}>SHOW MORE</button>
                                    {showMore > 10 ? <button className="BackButtonUI" onClick={() => setShowMore(showMore - 10)}>SHOW LESS</button>
                                        : null}
                                </div>
                                : null : null}


                </div>}
        </div >
    )
}

export default Playlist;