import { render } from 'react-dom'
import React from 'react'
import HashRoute from './HashRoute.js'
import './style.css'

window['main'] = function () {
    render( <HashRoute /> , document.getElementById('LeitherBody'))
}