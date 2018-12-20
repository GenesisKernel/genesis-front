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
import { Route, Switch } from 'react-router-dom';

import Sidebar from 'containers/Sidebar';
import Sections from 'containers/Main/Sections';
import NotFound from 'components/NotFound';
import themed from 'components/Theme/themed';
import Desktop from 'components/Main/Desktop';

export interface IMainProps {
    stylesheet: string;
}

const StyledContent = themed.div`
    position: fixed;
    left: ${props => props.theme.menuWidth}px;
    top: 0;
    right: 0;
    bottom: 0;
`;

const Main: React.SFC<IMainProps> = props => (
    <div className="wrapper">
        <style type="text/css">
            {props.stylesheet}
        </style>
        <Sidebar />
        <StyledContent>
            <div className="switch-wrapper">
                <Switch>
                    <Route exact path="/:section/:page?" render={route => <Sections section={route.match.params.section} page={route.match.params.page} />} />
                    <Route exact path="/" render={() => <Desktop />} />
                    <Route path="*" render={() => <NotFound main />} />
                </Switch>
            </div>
        </StyledContent>
    </div>
);

export default Main;