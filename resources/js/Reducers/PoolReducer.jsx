

// Use the initialState as a default value
export default function poolReducer(state, action) {
    switch (action.type) {
        case 'jumpers/loaded' : {
            console.log('RUNNING JUMPERS/LOADED',action.payload.data)
            return {
                ...state,
                jumpers: action.payload.data,
            }
        }

        case 'pool/added': {
            return {
                ...state,
                pool: [
                    ...state.pool,
                    state.jumpers[action.payload.source.index]
                ],

            }
        }

        case 'pool/removed': {
            var array = state.pool
            array.splice(action.payload.source.index, 1)
            return {
                ...state,
                pool: array,
                jumpers:[
                    ...state.jumpers,
                    state.jumpers[action.payload.source.index]
                ]
            }
        }

        default:
            return state
    }
}
