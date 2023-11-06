
export async function doDragEnd(result, state, dispatch) {
    if (result.reason === "DROP") {
        if (!result.destination) {
            return;
        }

        if(
            result.source.droppableId === "jumpersList"
            && result.destination.droppableId === "poolList"
        ) {
            await addToPool(result, state)
                .then (function (response) {
                    dispatch({type: 'pool/added', payload: result})
                    reloadJumperList(dispatch)
                }
            )
        }

        if(
            result.source.droppableId === "poolList"
            && result.destination.droppableId === "jumpersList"
        ) {
            await removeFromPool(result, state)
                .then (function (response) {
                    dispatch({type: 'pool/removed', payload: result})
                    reloadJumperList(dispatch)
                }
            )
        }

        if(
            result.source.droppableId === "poolList"
            && result.destination.droppableId === "poolList"
        ) {
            dispatch({type: 'pool/moved', payload: result})
            reloadJumperList(dispatch)
        }
    }
}

async function addToPool(result, state) {
    return await axios.post(
        '/pool/add',
        {
            id : state.jumpers[result.source.index].id,
            sequence: result.destination.index,
            group_identifier: null,
            note: null
        }
    )
        .then(function (response) {
            console.log('Saved (bool)::',result)
        })
        .catch(function (error) {
            console.log('ERROR RESPONSE::', error)
            if(error.code === 'ERR_BAD_REQUEST') {
                window.location.replace("/login")
            }
        })
}

async function removeFromPool(result, state) {
    return await axios.post(
        '/pool/remove',
        {
            id : state.pool[result.source.index].id
        }
    )
        .then(function (response) {
            console.log('Saved (bool)::',result)
        })
        .catch(function (error) {
            console.log('ERROR RESPONSE::', error)
            if(error.code === 'ERR_BAD_REQUEST') {
                window.location.replace("/login")
            }
        })
}

async function  reloadJumperList(dispatch) {
    return await axios.get(
        '/manifest/jumpers'
    )
        .then(function (response) {
            dispatch({ type: 'jumpers/loaded', payload: response })
        })
        .catch(function (error) {
            console.log('ERROR RESPONSE::', error)
            if(error.code === 'ERR_BAD_REQUEST') {
                window.location.replace("/login")
            }
        })
}

export async function updateJumperManifestDetails(state) {
    return await axios.post(
        '/manifest/set_details',
        {
            poolState : state.pool,
        }
    )
        .catch(function (error) {
            console.log('ERROR RESPONSE::', error)
            if(error.code === 'ERR_BAD_REQUEST') {
                window.location.replace("/login")
            }
        })
}
