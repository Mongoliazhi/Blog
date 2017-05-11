import React, { Component, PropTypes } from 'react';
import styles from './css/product.css';
import {Link} from 'react-router';

export default class Boss extends Component {
	constructor(props) {
		super(props);
		
	}

	render() {
		return(
			<div classname={styles.productList}>
				<ul className={styles.product_ul}>
					<li><Link to="/productlist">产品列表</Link></li>
					<li><Link to="/productcon">产品详情</Link></li>
					<li><Link to="/game">游戏列表</Link></li>
				</ul>
                {this.props.children}
			</div>
		)
	}

}
Boss.PropTypes = {

};