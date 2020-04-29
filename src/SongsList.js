import React, { useEffect, useState } from "react"
import './App.css';

function SongsListFunction(props) {
    const [songsList, setSongsList] = useState([])
    const [AlbumList, setAlbumList] = useState([])
    const [toggleForCross, setToggleForCross] = useState(false)
    function getAlbumList() {
        fetch('https://jsonplaceholder.typicode.com/albums')
            .then(res => res.json())
            .then(result => {
                setAlbumList(result)
            })
            .catch(err => { console.log(err, "err on constructor") })
    }

    function getSongsList() {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(res => res.json())
            .then(result => {
                setSongsList(result)
            })
            .catch(err => { console.log(err, "err on constructor") })
    }



    function filterSongs(event) {
        console.log(event.target.value)
        const localSongsList = Object.assign([], songsList)
        if (event.target.value !== "") {
            const filteredContent = localSongsList.filter((item) => item.title.toLowerCase().indexOf(event.target.value) >= 0)
            setToggleForCross(true)
            props.functionToShowFilteredConent(filteredContent, AlbumList)
        }
        else {
            setToggleForCross(false)
            props.functionToShowFilteredConent(songsList, AlbumList)
        }
    }



    useEffect(() => {
        getAlbumList()
        getSongsList()
    }, [])

    useEffect(() => {
        props.functionToShowFilteredConent(songsList, AlbumList)
    }, [songsList])

    return (
        <div className="SearchBarUI">
            <input type="text" placeholder={"Search for Songs"} onChange={(event) => filterSongs(event)} />
            
        </div>
    )
}

export default SongsListFunction;