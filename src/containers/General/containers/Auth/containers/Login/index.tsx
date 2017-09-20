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

import AuthForm from 'components/AuthForm';

interface ILoginProps {
    isLoggingIn: boolean;
    navigate: (url: string) => any;
}

const Login: React.SFC<ILoginProps> = (props) => {
    return (
        <AuthForm navigate={props.navigate} intl={null} />
    );
};

const mapStateToProps = (state: IRootState) => ({
    isLoggingIn: state.auth.isLoggingIn
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    navigate: (url: string) => dispatch(push(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);