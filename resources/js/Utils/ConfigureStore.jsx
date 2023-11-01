import {createStore} from 'redux'
import rootReducer from '../Reducers/RootReducer.jsx'

export default function configureStore(preloadedState) {

    return createStore(rootReducer, preloadedState)
}
