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

import React from 'react';
import platform from 'lib/platform';

import themed from 'components/Theme/themed';
import BackButton from './BackButton';
import OptionButton from './OptionButton';

export interface IHeadingOption {
    icon: string;
    title: string;
    navigateUrl: string;
}

export interface IHeadingProps {
    className?: string;
    returnUrl?: string;
    onReturn?: () => void;
    option: IHeadingOption;
}

const Heading: React.SFC<IHeadingProps> = props => (
    <div className={props.className}>
        <div className="heading-content">
            <div className="heading-left">
                {(props.returnUrl || props.onReturn) && (
                    <BackButton returnUrl={props.returnUrl} onClick={props.onReturn} />
                )}
            </div>
            <div className="heading-title">
                {props.children}
            </div>
            {props.option && (
                <div className="heading-right">
                    <OptionButton icon={props.option.icon} navigateUrl={props.option.navigateUrl}>{props.option.title}</OptionButton>
                </div>
            )}
        </div>
    </div>
);

export default themed(Heading)`
    background: ${props => platform.select({ web: props.theme.headerBackground, desktop: 'transparent' })};
    margin: -15px -15px ${platform.select({ desktop: '0', web: '15px' })};
    padding: 0 15px;
    height: 45px;
    line-height: 43px;

    .heading-content {
        position: relative;

        .heading-left {
            position: absolute;
            top: 2px;
            left: 0;
            bottom: 0;
        }

        .heading-right {
            position: absolute;
            top: 2px;
            right: 0;
            bottom: 0;
        }

        .heading-title {
            color: ${props => platform.select({ web: props.theme.headerForeground, desktop: '#000' })};
            font-size: 18px;
        }
    }
`;