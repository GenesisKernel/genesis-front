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
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { IntlProvider } from 'react-intl';
import { navigate } from 'modules/engine/actions';

import General from 'containers/General';
import Main from 'containers/Main';

interface IAppProps {
    locale: string;
    isAuthenticated: boolean;
    navigate?: typeof navigate;
}

class App extends React.Component<IAppProps> {
    componentWillReceiveProps(props: IAppProps) {
        if (this.props.isAuthenticated !== props.isAuthenticated) {
            this.props.navigate('/');
        }
    }

    render() {
        return (
            <IntlProvider locale={this.props.locale}>
                <div className="container height-full">
                    {this.props.isAuthenticated ?
                        (
                            <Route path="/" component={Main} />
                        ) :
                        (
                            <Route path="/" component={General} />
                        )
                    }
                </div>
            </IntlProvider>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    locale: state.engine.locale,
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
    navigate
};

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(App);