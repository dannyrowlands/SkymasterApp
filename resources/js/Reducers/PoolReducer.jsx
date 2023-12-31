

// Use the initialState as a default value
export default function poolReducer(state, action) {
    var statePool = []
    switch (action.type) {
        case 'jumpers/loaded' : {
            return {
                ...state,
                jumpers: action.payload.data,
            }
        }

        case 'pool/added': {
            statePool = state.pool
            statePool.splice(action.payload.destination.index, 0, state.jumpers[action.payload.source.index])
            return {
                ...state,
                pool: statePool
            }
        }

        case 'pool/moved': {
            statePool = state.pool
            if( action.payload.source.index === action.payload.destination.index ) return state;
            var target = statePool[action.payload.source.index]
            var increment = action.payload.destination.index < action.payload.source.index ? -1 : 1
            for (var k = action.payload.source.index; k !== action.payload.destination.index; k += increment)
            {
                statePool[k] = state.pool[k + increment]
            }
            statePool[action.payload.destination.index] = target
            return {
                ...state,
                pool: statePool
            }
        }

        case 'pool/removed': {
            const arr = state.pool.filter(function(item) {
                return item !== state.pool[action.payload.source.index]
            })
            return {
                ...state,
                pool: arr
            }
        }

        case 'pool/reloaded': {
            return {
                ...state,
                pool: action.payload.data
            }
        }

        default:
            return state
    }
}
