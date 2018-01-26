// Copyright 2017 The genesis-front Authors
// This file is part of the genesis-front library.
// 
// The genesis-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The genesis-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the genesis-front library. If not, see <http://www.gnu.org/licenses/>.

import * as React from 'react';
import * as classNames from 'classnames';
import * as propTypes from 'prop-types';
import styled from 'styled-components';
import Dropdown from 'components/Animation/Dropdown';
import onClickOutside, { InjectedOnClickOutProps } from 'react-onclickoutside';

const StyledDropdown = styled.div`
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
        background: #fff;
        box-shadow: 0 0 25px rgba(0,0,0,.15);
        border: solid 1px #add1ff;
        border-top: none;

        &.dropdown-leftmost {
            border-left: none;
        }

        &.dropdown-rightmost {
            border-right: none;
        }

        .dropdown-heading {
            border-top: solid 1px #ddd;
            height: 30px;
            line-height: 30px;
            padding: 0 15px;
            font-size: 11px;
            text-transform: uppercase;
            color: #999;

            &:first-child {
                border-top: none;
            }
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
                    width: 100%;
                    display: block;
                    padding: 0 15px !important;
                    margin: 0;
                    height: 40px;
                    line-height: 40px;
                    font-size: 13px;
                    font-weight: 500;
                    text-decoration: none;
                    color: #666;
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
                        color: #ccc;
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
                <button className={classNames('dropdown-toggle', this.props.className)} onClick={this.onClick.bind(this)}>
                    {this.props.children}
                    {this.props.badge ? (
                        <span className="dropdown-badge">{Math.min(this.props.badge, 99)}</span>
                    ) : null}
                </button>
                <Dropdown visible={this.state.active} align={this.props.align} width={this.props.width}>
                    <div className={classNames('dropdown-content', { 'dropdown-leftmost': this.props.leftMost, 'dropdown-rightmost': this.props.rightMost })}>
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