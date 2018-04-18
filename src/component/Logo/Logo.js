import React, { Component } from 'react'
import logoImg from './ariadust11.png'
import './Logo.less'

class Logo extends Component{
    render(){
        return (
            <div className="logo">
                <img src={logoImg} alt=""/>
            </div>
        )
    }
}

export default Logo