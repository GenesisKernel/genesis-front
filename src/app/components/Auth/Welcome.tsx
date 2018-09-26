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
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import LocalizedDocumentTitle from 'components/DocumentTitle/LocalizedDocumentTitle';
import Heading from './Heading';

export interface IWelcomeProps {
    onConfirm: () => void;
}

const Welcome: React.SFC<IWelcomeProps> = (props) => (
    <LocalizedDocumentTitle title="auth.welcome" defaultTitle="Welcome">
        <div>
            <Heading>Genesis</Heading>
            <h4>
                <FormattedMessage id="auth.welcome" defaultMessage="Welcome" />
            </h4>
            <p className="pv">
                <FormattedMessage id="auth.welcome.guide" defaultMessage="Before proceed, you will be guided through the wallet creation process. This will not take too much time. After completing this process you will be able to use all features of Genesis" />
            </p>
            <p>
                <FormattedMessage id="auth.welcome.continue" defaultMessage="Press 'Get started' button to begin the process of creating or restoring your wallet" />
            </p>
            <hr />
            <Button bsStyle="primary" className="btn-block" onClick={props.onConfirm}>
                <FormattedMessage id="auth.getstarted" defaultMessage="Get started" />
            </Button>
        </div>
    </LocalizedDocumentTitle>
);

export default Welcome;