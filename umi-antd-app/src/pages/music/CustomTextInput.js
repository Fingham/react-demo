import { Button } from 'antd';
import React from 'react';

/**
 1. 需要
    a. 初始化界面时 文本框A 会获取焦点
    b. 当点击按钮后 会将文本框A 获取光标焦点
 */
// 参考 https://www.jb51.net/article/185613.htm
class CustomTextInput extends React.Component {
    constructor(props) {
        super(props);
    
        this.textInput = null;
        // this.btnRef= React.createRef();
        this.setTextInputRef = element => {
            this.textInput = element;
        };
    
        // this.focusTextInput = () => {
        // // Focus the text input using the raw DOM API
        // if (this.textInput) this.textInput.focus();
        // };
    }

    focusTextInput = () => {
        // Focus the text input using the raw DOM API
        console.log(this.textInput)
        if (this.textInput) {
            this.textInput.focus();
            
            console.log(this.textInput.value)
        }
        
    };
   
    componentDidMount() {
        // autofocus the input on mount
        // 初始化组件时 让 其获取输入框的焦点
        this.focusTextInput();
    }
   
    render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return (
        <div>
            <input
            type="text"
            ref={this.setTextInputRef}
            />
            <input
            type="button"
            value="Focus the text input"
            onClick={this.focusTextInput}
            />
        </div>
        );
    }
   }

   
class FjhConstomTextInput extends React.Component{

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.fjhInputRef = React.createRef();
        this.fjhBtn = this.fjhBtn.bind(this);
      }
    
      
    
    fjhBtn = () =>{
        if(this.fjhInputRef){
            this.fjhInputRef.current.focus();
            console.log('this.fjhInputRef', this.fjhInputRef.current.value)
        }
    }  

      render(){

        return(<div>
            <h4>AAAFjhConstomTextInput</h4>
            <input type="text" ref={this.fjhInputRef} />
            <Button onClick={this.fjhBtn}>获取fjh输入框的焦点</Button>
            </div>);
      }
}


export  {CustomTextInput, FjhConstomTextInput};   

/**
 HOC   
    https://blog.csdn.net/CedricD/article/details/106603046

父组件调子组件
    https://blog.csdn.net/qq_36990322/article/details/109858890   
 */