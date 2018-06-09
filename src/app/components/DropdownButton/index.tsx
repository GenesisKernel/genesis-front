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
import classNames from 'classnames';
import propTypes from 'prop-types';

import themed from 'components/Theme/themed';
import Dropdown from 'components/Animation/Dropdown';
import onClickOutside, { InjectedOnClickOutProps } from 'react-onclickoutside';

const StyledDropdown = themed.div`
    display: inline-block;
    position: relative;

    &.dropdown-active button.dropdown-toggle {
        background: rgba(0,0,0,0.15);
    }

    button.dropdown-toggle {
        min-width: 40px;
        height: 40px;   
        line-height: 40px;
        padding: 0 10px;
        text-align: center;
        position: relative;
        z-index: 1000;

        .dropdown-badge {
            position: absolute;
            bottom: 0;
            right: 0;
            background: #d46565;
            display: block;
            width: 16px;
            height: 16px;
            padding: 0;
            line-height: 16px;
            font-size: 12px;
            font-weight: bold;
        }
    }

    .dropdown-content {
        line-height: normal;
        background: ${props => props.theme.dropdownMenuBackground};
        box-shadow: 0 0 25px rgba(0,0,0,.15);
        border: solid 1px ${props => props.theme.dropdownMenuOutline};
        border-top: none;
        text-align: left;

        &.dropdown-leftmost {
            border-left: none;
        }

        &.dropdown-rightmost {
            border-right: none;
        }

        &.icon-left .dropdown-group > li button > .icon {
            float: left;
            margin-right: 12px;
        }

        .dropdown-heading {
            border-top: solid 1px ${props => props.theme.dropdownMenuSeparator};
            height: 30px;
            line-height: 30px;
            padding: 0 15px;
            font-size: 11px;
            text-transform: uppercase;
            color: ${props => props.theme.dropdownMenuSecondary};

            &:first-child {
                border-top: none;
            }
        }

        .dropdown-info {
            font-size: 14px;
            padding: 0 15px;
            color: ${props => props.theme.dropdownMenuPrimary};
        }

        .dropdown-group {
            list-style: none;
            padding: 0;
            margin: 0;

            > li {
                a {
                    text-decoration: none;
                }

                button {
                    border-radius: 0;
                    outline: 0;
                    border: 0;
                    background: 0;
                    transition: background .15s;
                    width: 100%;
                    padding: 0 15px !important;
                    margin: 0;
                    height: 40px;
                    line-height: 40px;
                    font-size: 13px;
                    font-weight: 500;
                    text-decoration: none;
                    color: ${props => props.theme.dropdownMenuForeground};
                    cursor: pointer;
                    display: block;
                    text-align: left;

                    > .icon {
                        float: right;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 40px;
                    }

                    &[disabled] {
                        color: ${props => props.theme.dropdownMenuDisabled};
                    }

                    &:hover {
                        background: ${props => props.theme.dropdownMenuActive};
                    }

                    &:focus {
                        outline: dashed 1px #84baff !important;
                    }
                }
            }
        }
    }
`;

export interface IDropdownButtonProps {
    content: React.ReactNode;
    className?: string;
    leftMost?: boolean;
    rightMost?: boolean;
    align?: 'left' | 'right';
    width?: number;
    badge?: number;
    disabled?: boolean;
    onClick?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
}

interface IDropdownButtonState {
    active: boolean;
}

class DropdownButton extends React.Component<IDropdownButtonProps & InjectedOnClickOutProps, IDropdownButtonState> {
    static childContextTypes = {
        closeDropdown: propTypes.func.isRequired
    };

    constructor(props: IDropdownButtonProps & InjectedOnClickOutProps) {
        super(props);
        this.state = {
            active: false
        };
    }

    getChildContext() {
        return {
            closeDropdown: this.onCollapseToggle.bind(this, false)
        };
    }

    handleClickOutside(event: React.MouseEvent<HTMLElement>) {
        this.onCollapseToggle(false);
    }

    onCollapseToggle(active?: boolean) {
        this.setState({
            active: undefined === active ? !this.state.active : active
        });
    }

    onClick(e: React.MouseEvent<HTMLButtonElement>) {
        this.onCollapseToggle();
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }

    render() {
        return (
            <StyledDropdown className={this.state.active ? 'dropdown-active' : ''}>
                <button disabled={this.props.disabled} className={classNames('dropdown-toggle', this.props.className)} onClick={this.onClick.bind(this)}>
                    {this.props.children}
                    {this.props.badge ? (
                        <span className="dropdown-badge">{Math.min(this.props.badge, 99)}</span>
                    ) : null}
                </button>
                <Dropdown visible={this.state.active} align={this.props.align} width={this.props.width}>
                    <div className={classNames('dropdown-content', { 'dropdown-leftmost': this.props.leftMost, 'dropdown-rightmost': this.props.rightMost, 'icon-left': 'left' === this.props.align })}>
                        {this.props.content}
                    </div>
                </Dropdown>
            </StyledDropdown >
        );
    }
}

export const CloseDropdownButton: React.SFC<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = (props, context: { closeDropdown: () => void }) => {
    const onClick: React.MouseEventHandler<HTMLButtonElement> = e => {
        context.closeDropdown();
        if (props.onClick) {
            props.onClick(e);
        }
    };

    return (
        <button {...props} onClick={onClick} />
    );
};

CloseDropdownButton.contextTypes = {
    closeDropdown: propTypes.func.isRequired
};

export default onClickOutside(DropdownButton);