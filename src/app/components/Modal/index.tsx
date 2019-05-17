/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';

import themed from 'components/Theme/themed';

export interface IModalProps<P, R> {
    params: P;
    onResult: (data: R) => void;
    onCancel: () => void;
    notify: (type: string, params: any) => void;
    changeLocale: (locale: string) => void;
    children: React.ReactNode[];
}

export type TModalComponentClass<P, R> =
    React.ComponentType<IModalProps<P, R>> |
    React.SFC<IModalProps<P, R>>;

const StyledHeader = themed.div`
    background: ${props => props.theme.modalHeaderBackground};
    color: ${props => props.theme.modalHeaderForeground};
    margin: -1px -1px 0 -1px;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
`;

const StyledBody = themed.div`
    padding: 15px;
    min-width: 300px;
`;

const StyledFooter = themed.div`
    padding: 15px;
    background: #efefef;
    border-top: solid 1px #d0dff3;
`;

export abstract class ModalContainer<P, S = {}> extends React.Component<P, S> {
    public static Header = StyledHeader;
    public static Body = StyledBody;
    public static Footer = StyledFooter;
}

export default abstract class Modal<P, R, S = {}> extends React.Component<IModalProps<P, R>, S> {
    public static Header = StyledHeader;
    public static Body = StyledBody;
    public static Footer = StyledFooter;
}