/* eslint-disable */
import { Button } from 'antd';
import React from 'react';


class Comment extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            arr:[],
            parnentTitle:'父给子传数据-fjh'
        }
    }

    componentDidMount(){
        let data = [
            {"userName":"张丽", "text":"这个A电影真不错!", "result": true},
            {"userName":"李新", "text":"这个B电影我不喜欢看!", "result": false},
            {"userName":"王力", "text":"这个C电影看的人还蛮多的!", "result": true},
        ];
        this.setState({arr:data});
    }

    parentFun = (childData) =>{
        console.log('parentFun 父组件收到子组件传过来的数据:', childData)
        this.setState({parnentTitle:childData},()=>{
            console.log('改变传给子组件的标签:', this.state.parnentTitle)
        })
    }

    transferCompFun = () =>{
        console.log("传递组件，使其在子组件中渲染出来即可")
        return <div><button>传递的组件按钮</button></div>
    }

    render(){

        return(<div>
            《parnentTitle：{this.state.parnentTitle}》
            <CommentList reviceComp={this.transferCompFun.bind(this)}  title={this.state.parnentTitle} arr={this.state.arr} childFun={this.parentFun.bind(this)} />
        </div>)
    }

}


class CommentList extends React.Component{

    constructor(props){
        super(props);
        // 从父组件中 传递过来的属性 从 props 中获取
        this.state={childTitle:'子组件的默认标题'}
    }

    childBtnFun = (title)=>{
        console.log('点击子组件按钮事件 childBtnFun')
        // 通过在 props 获取父组件中传递的函数属性
        this.props.childFun(title)
    }

    render(){

        return(<div>
             <h5>{this.props.parnentTitle?this.props.parnentTitle: this.state.childTitle}</h5>
            <ul>
                {
                    this.props.arr.map(item=>{
                        return (
                            <li key={item.userName}>{item.userName} 评论是:{item.text} </li>
                        )
                    })
                }
            </ul>
            《childTitle：{this.state.childTitle}》
            <Button onClick={this.childBtnFun.bind(this, this.state.childTitle)} >子向父传递数据</Button>
            {this.props.reviceComp()}
        </div>)
    }

}


export {CommentList, Comment };