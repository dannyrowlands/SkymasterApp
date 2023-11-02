

// Use the initialState as a default value
export default function poolReducer(state, action) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        case 'jumpers/loaded' : {
            console.log('RUNNING JUMPERS/LOADED',action.payload.data)
            return {
                // that has all the existing state data
                ...state,
                // but has a new array for the `pools` field
                jumpers: action.payload.data,
            }
        }

        // Do something here based on the different types of actions
        case 'pool/added': {
            // We need to return a new state object
            return {
                // that has all the existing state data
                ...state,
                // but has a new array for the `pools` field
                pool: [
                    // with all of the old pool items
                    ...state.pool,
                    // and the new jumper object to be added to pool
                    state.jumpers[action.payload.source.index]
                ],

            }
        }

        case 'pool/removed': {
            // We need to return a new state object
            var array = state.pool // make a separate copy of the array
            array.splice(action.payload.source.index, 1)
            return {
                // that has all the existing state data
                ...state,
                // but has a new array for the `pools` field
                pool: array,
                jumpers:[
                    ...state.jumpers,
                    state.jumpers[action.payload.source.index]
                ]
            }
        }

        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            console.log('Action not recognised')
            return state
    }
}
