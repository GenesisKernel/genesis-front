// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { push } from 'react-router-redux';
import { IRootState } from 'modules';
import { actions } from 'modules/auth';
import { IStoredKey } from 'lib/storage';
import Keyring from 'lib/keyring';

import RegisterForm from 'components/RegisterForm';

interface IRegisterProps {
    session: string;
    uid: string;
    isCreatingAccount: boolean;
    loadedSeed: string;
    createdAccount: IStoredKey;
    navigate: (url: string) => any;
    importSeed: (file: Blob) => any;
    createAccount: (keyring: Keyring) => any;
}

const Register: React.SFC<IRegisterProps> = (props: IRegisterProps) => (
    <RegisterForm {...props}>
        <div>
            <h4 className="text-center">NL_CREATE_ACCOUNT</h4>
            <div className="form-horizontal">
                <div className="form-group list-group-item">
                    <label className="control-label col-sm-3" htmlFor="email">NL_SEED</label>
                    <div className="col-sm-9">
                        <textarea className="form-control" />
                        <div className="col-sm-4">
                            <button className="btn btn-primary btn-block">NL_GENERATE</button>
                        </div>
                        <div className="col-sm-4">
                            <button className="btn btn-primary btn-block">NL_SAVE</button>
                        </div>
                        <div className="col-sm-4">
                            <button className="btn btn-primary btn-block">NL_SELECT</button>
                        </div>
                    </div>
                </div>
                <div className="form-group list-group-item">
                    <label className="control-label col-sm-3" htmlFor="password">NL_PASSWORD</label>
                    <div className="col-sm-9">
                        <input type="password" className="form-control" />
                    </div>
                </div>
                <div className="form-group">
                    <p className="text-center mt0">Lorem ipsum dolor sit amet. Consecturer adepiscing elit</p>
                </div>
            </div>
        </div>
    </RegisterForm>
);

const mapStateToProps = (state: IRootState) => ({
    session: state.engine.session,
    uid: state.engine.uid,
    isCreatingAccount: state.auth.isCreatingAccount,
    createdAccount: state.auth.createdAccount,
    loadedSeed: state.auth.loadedSeed
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    navigate: (url: string) => dispatch(push(url)),
    importSeed: (file: Blob) => dispatch(actions.importSeed.started(file)),
    createAccount: (keyring: Keyring) => dispatch(actions.createAccount.started(keyring))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);