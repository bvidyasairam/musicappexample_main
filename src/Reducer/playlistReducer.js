const initialState = {
    createdPlaylist: []
    // {
    //     Playlistname: "",
    //     playlistContent: []
    // }

}

const playlistReducerFunction = (state = initialState, action) => {
    switch (action.type) {
        case "CREATEPLAYLIST": {
            return {
                ...state,
                Playlistname: state.createdPlaylist.push({
                    id: Math.random(),
                    Playlistname: action.playlistName,
                    PlayListContent: []

                })
            }
        }
        case "ADD TITLETRACK": {
            return {
                ...state,
                Playlistname: action.data
            }
        }
        case "DELETE TITLETRACK": {
            return {
                ...state,
                Playlistname: action.data
            }
        }
        default: {
            return state;
        }
    }
}

export default playlistReducerFunction;