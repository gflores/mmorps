import { getApp } from '/imports/ui/App.jsx';

export const getState = function(){
    return getApp().state;
}

export const setState = function(fields){
    getApp().setState(fields);
}