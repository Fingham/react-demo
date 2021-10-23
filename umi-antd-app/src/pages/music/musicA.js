import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import { Table, Tag, Card, Affix, message, Modal, Button } from 'antd';
import {list } from './../../services/music'

import {CustomTextInput, FjhConstomTextInput} from './CustomTextInput'

export default class MusicBiz extends Component{



    componentDidMount(){
        list().then(resp=>{
            console.log('初始化数据', resp);
        })
        
    }

    
 

    render(){
        
        return(<div>
            <h2>Music</h2>
            <Button>Music-All</Button>
            <CustomTextInput/>
            <input type="text" />            
            <FjhConstomTextInput />
        </div>);
    }

}