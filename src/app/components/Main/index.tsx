// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
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

import React from 'react';
import { Route } from 'react-router-dom';
import { TSection } from 'genesis/content';
import { history } from 'store';

import { AnimatedSwitch } from 'components/Animation';
import Sidebar from './Sidebar';
import Sections from 'containers/Main/Sections';
import NotFound from 'components/NotFound';
import themed from 'components/Theme/themed';
import SideButton from './Sidebar/SideButton';
// import TransactionsMenu from './TransactionsMenu';

export interface IMainProps {
    section: string;
    sections: { [name: string]: TSection };
    stylesheet: string;
    onSwitchSection: (section: string) => void;
}

/*const StyledControls = themed.div`
    position: absolute;
    top: ${platform.select({ win32: '1px' }) || 0};
    left: ${platform.select({ win32: '1px' }) || 0};
    right: ${platform.select({ win32: '1px' }) || 0};
    z-index: 10000;
`;

const StyledTitlebar = themed.div`
    background: ${props => props.theme.headerBackground};
    height: ${props => props.theme.headerHeight}px;
    line-height: ${props => props.theme.headerHeight}px;
    font-size: 15px;
    color: #fff;
    text-align: center;
`;*/

const StyledContent = themed.div`
    position: fixed;
    left: ${props => props.theme.menuHeight}px;
    top: 0;
    right: 0;
    bottom: 0;
`;

class Main extends React.Component<IMainProps> {
    onBack() {
        history.goBack();
    }

    onForward() {
        history.goForward();
    }

    render() {
        return (
            <div className="wrapper">
                <style type="text/css">
                    {this.props.stylesheet}
                </style>
                <Sidebar>
                    <SideButton>
                        <em className="icon-menu" />
                    </SideButton>
                </Sidebar>
                <StyledContent>
                    <AnimatedSwitch animation={AnimatedSwitch.animations.fade()}>
                        <Route exact path="/:section/:page?" component={Sections} />
                        <Route path="*" render={() => <NotFound main />} />
                    </AnimatedSwitch>
                </StyledContent>
            </div>
        );
    }
}

export default Main;