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
import PromptModal from 'components/Modal/PromptModal';
import ImageEditorModal from 'components/Modal/ImageEditorModal';
import MapEditorModal from 'components/Modal/MapEditorModal';
import AboutModal from 'components/Modal/AboutModal';
import InfoModal from 'components/Modal/InfoModal';
import ErrorModal from 'components/Modal/ErrorModal';
import ConfirmModal from 'components/Modal/ConfirmModal';
import CreatePageModal from 'components/Modal/Editor/CreatePageModal';
import CreateInterfaceModal from 'components/Modal/Editor/CreateInterfaceModal';
import AuthorizeModal from 'components/Modal/Tx/AuthorizeModal';
import SignatureModal from 'components/Modal/Tx/SignatureModal';
import TxErrorModal from 'components/Modal/Tx/ErrorModal';
import AuthErrorModal from 'components/Modal/Auth/AuthErrorModal';
import AuthRemoveWalletModal from 'components/Modal/Auth/AuthRemoveWalletModal';
import AuthPasswordChangedModal from 'components/Modal/Auth/AuthPasswordChangedModal';
import TxConfirmModal from 'components/Modal/Tx/ConfirmModal';
import PageModal from 'components/Modal/PageModal';
import ChangeLocaleModal from 'components/Modal/ChangeLocale';
import CopyWalletModal from 'components/Modal/Auth/CopyWalletModal';
import RegisterModal from 'components/Modal/Auth/RegisterModal';
import RolePickerModal from 'containers/Modal/RolePickerModal';
import ChangePasswordModal from 'containers/Modal/ChangePasswordModal';

const modalDefs = {
    AUTHORIZE: AuthorizeModal,
    AUTH_ERROR: AuthErrorModal,
    AUTH_REMOVE_WALLET: AuthRemoveWalletModal,
    AUTH_CHANGE_PASSWORD: ChangePasswordModal,
    AUTH_PASSWORD_CHANGED: AuthPasswordChangedModal,
    REGISTER_WALLET: RegisterModal,
    COPY_WALLET: CopyWalletModal,
    TX_CONFIRM: TxConfirmModal,
    TX_ERROR: TxErrorModal,
    TX_SIGNATURE: SignatureModal,
    CREATE_PAGE: CreatePageModal,
    CREATE_INTERFACE: CreateInterfaceModal,
    DEBUG_CONTRACT: DebugContractModal,
    IMAGE_EDITOR: ImageEditorModal,
    MAP_EDITOR: MapEditorModal,
    PAGE_MODAL: PageModal,
    PROMPT: PromptModal,
    CONFIRM: ConfirmModal,
    INFO: InfoModal,
    ERROR: ErrorModal,
    ABOUT: AboutModal,
    CHANGE_LOCALE: ChangeLocaleModal,
    ROLE_PICKER: RolePickerModal
};

export type TModalType = keyof typeof modalDefs;

export type TModalDef<T extends TModalType> =
    React.ComponentType<TModalProps<T>>;

export type TModalResultReason =
    // Dispatched when Modal component received active=false while modal was visible
    'CANCEL' |

    // Dispatched when another modal window overlays the current one
    'OVERLAP' |

    // Dispatched when clicked outside or close button was clicked
    'CLOSE' |

    // Dispatched when correct result was yielded
    'RESULT';

export type TModalProps<T> = T extends TModalType ? ComponentProps<typeof modalDefs[T]> : unknown;
export type TModalParams<T> = T extends TModalType ? ComponentProps<typeof modalDefs[T]> extends IModalProps<infer P, any> ? P : unknown : unknown;
export type TModalResult<T> = T extends TModalType ? ComponentProps<typeof modalDefs[T]> extends IModalProps<any, infer R> ? R : unknown : unknown;

export interface IModalResult<T> {
    reason: TModalResultReason;
    data: TModalResult<T>;
}

export interface IModal<T extends TModalType> {
    id: string;
    type: T;
    result?: IModalResult<T>;
    params: TModalParams<T>;
}

export interface IModalCall<T extends TModalType> {
    id: string;
    type: T;
    params: TModalParams<T>;
}

export const MODAL_COMPONENTS = modalDefs as {
    [K in TModalType]: TModalDef<K>;
};