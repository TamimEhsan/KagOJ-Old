import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {createStore} from 'redux'
import allReducers from './reducer'
import {Provider} from 'react-redux'


import { usePreview } from 'react-dnd-preview';

//export const base_url='http://43.224.110.202/'
// export const base_url='https://evnqhlzvfi.execute-api.ap-south-1.amazonaws.com/prod/'
export const base_url='http://localhost:3005/api/'


const store=createStore(allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const MyPreview = () => {
    const {display, itemType, item, style} = usePreview();
    if (!display) {
        return null;
    }
    style['padding']='0.5rem 1rem'
    style['border']='1px dashed #0090ff'
    style['borderRadius']='8px'
    style['color']='#0090ff'
    style['background']='white'
    return <div class="item-list__item" style={style}>{itemType}</div>;
};

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          
              <App />
              {/* <MyPreview /> */}
          
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
