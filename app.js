import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import WidgetContainer from './app/containers/WidgetContainer';
import MainReducer from './app/reducers';
import jQuery from 'jquery';

let store = createStore(MainReducer)

render(
    <Provider store={store}>
        <WidgetContainer />
        <TeapotStatusContainer />
    </Provider>,
    document.getElementById('root')
)


const fetchNumberOfNewPots = () => {
    jQuery.ajax({
        method: "GET",
        url: "/numberOfNewTeapots"
    }).done(function( msg ) {
        store.dispatch({type: 'SET_NUMBER_OF_TEAPOTS', numberOfTeapots: msg.numberOfTeapots})
    });
}
fetchNumberOfNewPots()
setInterval(fetchNumberOfNewPots, 60000)

const fetchTeapotStatus = () => {
    jQuery.ajax({
        method: "GET",
        url: "/teabotWebhook"
    }).done(function( msg ) {
        store.dispatch({type: 'GET_TEAPOT_STATUS', statusOfTeapot: msg.text})
    });
}

fetchTeapotStatus()
setInterval(fetchTeapotStatus, 30000)