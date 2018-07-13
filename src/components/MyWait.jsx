import React from 'react'
import styled, { keyframes} from 'styled-components'

const bouncedelay  = keyframes`
    0%, 80%, 100% {
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
    } 40% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
    }
`

export default class Rotate extends React.Component { 
    render() { 
        const styles = Rotate.styles;
        return (
            <RotateLayout >
                <div className="spinner-container container1">
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                    <div className="circle3"></div>
                    <div className="circle4"></div>
                </div>
                <div className="spinner-container container2">
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                    <div className="circle3"></div>
                    <div className="circle4"></div>
                </div>
                <div className="spinner-container container3">
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                    <div className="circle3"></div>
                    <div className="circle4"></div>
                </div>
            </RotateLayout>
        )
    }
}
const RotateLayout = styled.div`
        margin: 100px auto;
        width: 80px;
        height: 80px;
        position: relative;
        & > div> div {
            width: 24px;
            height: 24px;
            background-color: #333;
            border-radius: 100%;
            position: absolute;
            animation: ${bouncedelay} 1.2s infinite ease-in-out;
            animation-fill-mode: both;
          }
           
          & .spinner-container {
            position: absolute;
            width: 100%;
            height: 100%;
          }
           
          & .container2 {
            -webkit-transform: rotateZ(45deg);
            transform: rotateZ(45deg);
          }
           
          & .container3 {
            -webkit-transform: rotateZ(90deg);
            transform: rotateZ(90deg);
          }
           
          &>div>.circle1 { top: 0; left: 0; }
          &>div>.circle2 { top: 0; right: 0; }
          &>div>.circle3 { right: 0; bottom: 0; }
          &>div>.circle4 { left: 0; bottom: 0; }
           
          & .container2 .circle1 {
            -webkit-animation-delay: -1.1s;
            animation-delay: -1.1s;
          }
           
          & .container3 .circle1 {
            -webkit-animation-delay: -1.0s;
            animation-delay: -1.0s;
          }
           
          & .container1 .circle2 {
            -webkit-animation-delay: -0.9s;
            animation-delay: -0.9s;
          }
           
          & .container2 .circle2 {
            -webkit-animation-delay: -0.8s;
            animation-delay: -0.8s;
          }
           
          & .container3 .circle2 {
            -webkit-animation-delay: -0.7s;
            animation-delay: -0.7s;
          }
           
          &  .container1 .circle3 {
            -webkit-animation-delay: -0.6s;
            animation-delay: -0.6s;
          }
           
          & .container2 .circle3 {
            -webkit-animation-delay: -0.5s;
            animation-delay: -0.5s;
          }
           
          & .container3 .circle3 {
            -webkit-animation-delay: -0.4s;
            animation-delay: -0.4s;
          }
           
          & .container1 .circle4 {
            -webkit-animation-delay: -0.3s;
            animation-delay: -0.3s;
          }
           
          & .container2 .circle4 {
            -webkit-animation-delay: -0.2s;
            animation-delay: -0.2s;
          }
           
          & .container3 .circle4 {
            -webkit-animation-delay: -0.1s;
            animation-delay: -0.1s;
          }
`
