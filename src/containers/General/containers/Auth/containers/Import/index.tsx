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
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
//import { login } from 'modules/auth';

const Import = (props: { login: Function }) => (
    <div>
        <h4>Heading</h4>
        <p>Hello from the left container!</p>
        {/*<button onClick={props.login.bind(null, MOCK_PASSWORD, MOCK_PUBLIC_KEY, MOCK_ENCRYPTED_KEY)}>AUTHENTICATE</button>*/}
    </div>
);

const mapDispatchToProps = (dispatch: Dispatch<{}>) => bindActionCreators({
    //login: (password: string, publicKey: string, encryptedKey: string) => dispatch(login(password, publicKey, encryptedKey))
}, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(Import);