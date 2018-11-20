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

import { AnimatedSwitch } from 'components/Animation';
import Sidebar from './Sidebar';
import Sections from 'containers/Main/Sections';
import NotFound from 'components/NotFound';
import themed from 'components/Theme/themed';
import SideButton from './Sidebar/SideButton';

export interface IMainProps {
    stylesheet: string;
    onSwitchSection: (section: string) => void;
}

const StyledContent = themed.div`
    position: fixed;
    left: ${props => props.theme.menuHeight}px;
    top: 0;
    right: 0;
    bottom: 0;
`;

const Main: React.SFC<IMainProps> = props => (
    <div className="wrapper">
        <style type="text/css">
            {props.stylesheet}
        </style>
        <Sidebar>
            <SideButton>
                <em className="icon-menu" />
            </SideButton>
            <SideButton active>
                <em className="icon-compass" />
            </SideButton>
            <SideButton>
                <em className="icon-flag" />
            </SideButton>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                <SideButton>
                    <em className="icon-user" />
                </SideButton>
            </div>
        </Sidebar>
        <StyledContent>
            <AnimatedSwitch animation={AnimatedSwitch.animations!.fade()}>
                <Route exact path="/:section/:page?" render={route => <Sections section={route.match.params.section} page={route.match.params.page} />} />
                <Route path="*" render={() => <NotFound main />} />
            </AnimatedSwitch>
        </StyledContent>
    </div>
);

export default Main;