import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import styles from './css/product.css';

import {Link} from "react-router";


export default class ProductList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			UserData: [],
			bgconNum:-1,
			bgconActive:"product_bgcon",

		}		
	}
	componentDidMount() {
		this.serverRequest = $.ajax({
			url: '/product_list',
			type: 'GET',
			success: function (data) {
				// console.log(data)
				this.setState({
					UserData: data
				})
			}.bind(this),
		})
		// console.log("让问后台")

	}
    componentWillUnmount() {
    this.serverRequest.abort();
   }

    productActivity1(index){
        this.setState({
            bgconNum:index
        })
    }
    productActivity2(index){
        this.setState({
            bgconNum:-1
        })
    }
   getProductactive(index){
       return index !== this.state.bgconNum?"product_bgcon":"product_bgcon product_bgcon_active";
   }

	render() {

		var styleWidth = { width: "100%" }
		var ProductList = this.state.UserData.map((data,index)=> {
			var	data_product_bg= data.product_bg;
			return (
				<div className={styles.product_list} key={index}>
					<div className={styles.product_con} onMouseOver={this.productActivity1.bind(this,index)} onMouseOut={this.productActivity2.bind(this,index)}>
						<div className={styles.product_img}><img src={require('./images/'+data_product_bg)} alt="" /></div>
						<div className={this.getProductactive(index)}>
							<div className={styles.pro_top} >
								<div className={styles.pro_top_list}><img src={require('./images/bayinhe_1.jpg')} alt="" /></div>
								<div className={styles.pro_top_list}><img src={require('./images/bayinhe_2.jpg')} alt="" /></div>
								<div className={styles.pro_top_list}><img src={require('./images/bayinhe_3.jpg')} alt="" /></div>
							</div>
							<div className={styles.pro_btm}>
								<p className={styles.pro_btm_p}>{data.product_title}</p>
								<div className={styles.newsList_footer} style={styleWidth}>
									<span><img src={require('./images/time.png')} alt="" /><i>{data.product_time}</i></span>
									<span><img className={styles.img_love} src={require('./images/fabulous.png')} alt="" /><i>{data.product_thumbup}</i></span>
									<button type="button"><Link to="/productcon?1">阅读</Link></button>
								</div>
							</div>
						</div>
					</div>
				</div>)
		})
		return (<div>{ProductList}
		</div>)
	}

}

ProductList.PropTypes = {

};