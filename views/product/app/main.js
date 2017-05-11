import React from 'react' ;
import ReactDOM from 'react-dom' ;

import Boss from './boss.js';

import ProductList from './ProductList.js';
import ProductCon from './productCon.js';
import Game from './game.js'

import {Router,Route,IndexRoute,hashHistory} from 'react-router';

class WeiboList extends React.Component {
    render(){
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Boss}>
                    <IndexRoute component={ProductList}/>
                    <Route path="/productlist" component={ProductList}/>
                    <Route path="/productcon" component={ProductCon}/>
                    <Route path="/game" component={Game} />
                </Route>
            </Router>
        );
    }
}


ReactDOM.render(
<WeiboList />,
    document.getElementById('container')
) ;