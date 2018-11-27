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

import React, { ComponentProps } from 'react';
import { IModalProps } from 'components/Modal';

import DebugContractModal from 'components/Modal/Editor/DebugContractModal';
import ImageEditorModal from 'components/Modal/ImageEditorModal';
import MapEditorModal from 'components/Modal/MapEditorModal';
import InfoModal from 'components/Modal/InfoModal';
import TxErrorModal from 'components/Modal/Tx/ErrorModal';
import AuthErrorModal from 'components/Modal/Auth/AuthErrorModal';
import PasswordChangedModal from 'components/Modal/Auth/PasswordChangedModal';
import TxConfirmModal from 'components/Modal/Tx/TxConfirmModal';
import PageModal from 'components/Modal/PageModal';
import CopyWalletModal from 'components/Modal/Auth/CopyWalletModal';
import RegisterModal from 'components/Modal/Auth/RegisterModal';
import RolePickerModal from 'containers/Modal/RolePickerModal';
import ChangePasswordModal from 'containers/Modal/ChangePasswordModal';
import AboutModal from 'containers/Modal/AboutModal';
import ChangeLocaleModal from 'components/Modal/ChangeLocale';
import AuthorizeModal from 'containers/Modal/AuthorizeModal';
import RemoveWalletModal from 'containers/Modal/RemoveWalletModal';

const modalDefs = {
    AUTHORIZE: AuthorizeModal,
    AUTH_ERROR: AuthErrorModal,
    REMOVE_WALLET: RemoveWalletModal,
    CHANGE_PASSWORD: ChangePasswordModal,
    PASSWORD_CHANGED: PasswordChangedModal,
    REGISTER_WALLET: RegisterModal,
    COPY_WALLET: CopyWalletModal,
    TX_CONFIRM: TxConfirmModal,
    TX_ERROR: TxErrorModal,
    DEBUG_CONTRACT: DebugContractModal,
    IMAGE_EDITOR: ImageEditorModal,
    MAP_EDITOR: MapEditorModal,
    PAGE_MODAL: PageModal,
    INFO: InfoModal,
    ABOUT: AboutModal,
    CHANGE_LOCALE: ChangeLocaleModal,
    ROLE_PICKER: RolePickerModal
};

export type TModalType = keyof typeof modalDefs;

export type TModalDef<T extends TModalType> =
    React.ComponentType<TModalProps<T>>;

export type TModalProps<T> = T extends TModalType ? ComponentProps<typeof modalDefs[T]> : unknown;
export type TModalParams<T> = T extends TModalType ? ComponentProps<typeof modalDefs[T]> extends IModalProps<infer P> ? P : unknown : unknown;

export interface IModal<T extends TModalType> {
    type: T;
    params: TModalParams<T>;
}

export const MODAL_COMPONENTS = modalDefs as {
    [K in TModalType]: TModalDef<K>;
};