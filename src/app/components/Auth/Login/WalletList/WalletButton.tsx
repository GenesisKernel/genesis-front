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
import styled from 'styled-components';

import Avatar from 'containers/Avatar';

export interface IWalletButtonProps {
    className?: string;
    keyID: string;
    address: string;
    username: string;
    ecosystemID: string;
    ecosystemName: string;
    notifications?: number;
    onSelect: () => void;
    onRemove: () => void;
}

const WalletButton: React.SFC<IWalletButtonProps> = props => (
    <div className={props.className}>
        <Button className="wallet-main" block bsStyle="default" onClick={props.onSelect}>
            <div className="media-box text-left">
                <div className="pull-left">
                    <Avatar
                        size={44}
                        keyID={props.keyID}
                        ecosystem={props.ecosystemID}
                    />
                </div>
                <div className="media-box-body clearfix">
                    <p className="m0">
                        <b>{props.username || props.keyID}</b>
                        <span className="ml">({props.ecosystemName || props.ecosystemID})</span>
                    </p>
                    <p className="m0">
                        <small>{props.address}</small>
                    </p>
                </div>
                {props.notifications && (
                    <div className="notifications">
                        {props.notifications}
                    </div>
                )}
            </div>
        </Button>
        <button className="wallet-delete" onClick={props.onRemove}>&times;</button>
    </div>
);

export default styled(WalletButton) `
    padding-right: 46px;
    margin-top: 8px;
    position: relative;

    button.wallet-main {
        position: relative;
        border: solid 1px transparent;
        padding: 0;
        height: 46px;
        overflow: hidden;
        padding-right: 45px;

        .notifications {
            text-align: center;
            position: absolute;
            right: 10px;
            top: 10px;
            bottom: 10px;
            width: 25px;
            line-height: 25px;
            background: #d87272;
            color: #fff;
        }
    }

    button.wallet-delete {
        font-size: 19px;
        border: 0;
        background: 0;
        margin: 5px;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        color: #999;

        &:hover {
            color: #666;
        }
    }
`;