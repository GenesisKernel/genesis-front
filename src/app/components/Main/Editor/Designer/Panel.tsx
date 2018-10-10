// MIT License
// 
// Copyright (c) 2016-2018 AplaProject
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import * as React from 'react';
import styled from 'styled-components';

const PanelDiv = styled.div`
    .b-panel__header {
        position: relative;
        height: 34px;
        background-color: #3a4653;
        padding-left: 20px;
    }
    
    .b-panel__header__text {
        line-height: 34px;
        font-size: 14px;
        font-family: "Avenir-Book", "Source Sans Pro", sans-serif;
        text-transform: uppercase;
        color: #707c91;
    }
    
    .b-panel__header__toggle {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 16px;
        height: 3px;
        background-color: #dcdfe2;
        cursor: pointer;
    }
    
    .b-panel__body {
        background-color: #465669;
        min-height: 100px;
    }   
    
    .b-position-bullet {
        display: inline-block;
        position: relative;
        width: 11px;
        height: 11px;
        border-radius: 2px;
        border: 1px solid #9aa7b3;
        margin-left: 1px;
        margin-right: 1px;
        cursor: pointer;
    }
    
    .b-position-bullet_selected {
        border-color: #62b2fc;
        background-color: #62b2fc;
    }
    
    .b-position-bullet_selected:after {
        position: absolute;
        top: 50%;
        left: 50%;
        content: '';
        display: block;
        width: 4px;
        height: 4px;
        margin-left: -2px;
        margin-top: -2px;
        background-color: #FFF;
        border-radius: 2px;
    }


`;

interface IConstructorPanelProps {
    title: string;
}

const ConstructorPanel: React.SFC<IConstructorPanelProps> = (props) => (
    <PanelDiv>
        <div className="b-panel__header">
            <div className="b-panel__header__text">
                {props.title}
            </div>
            <div className="b-panel__header__toggle"/>
        </div>
        <div className="b-panel__body">
            {props.children}
        </div>
    </PanelDiv>
);

export default ConstructorPanel;