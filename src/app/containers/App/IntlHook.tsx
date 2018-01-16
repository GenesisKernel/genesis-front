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
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { IRootState } from 'modules';
import { registerIntl } from 'modules/engine/actions';

export interface IIntlHookProps {

}

interface IIntlHookState {

}

interface IIntlHookDispatch {
    registerIntl: typeof registerIntl;
}

class IntlHook extends React.Component<IIntlHookProps & IIntlHookState & IIntlHookDispatch & InjectedIntlProps> {
    componentDidMount() {
        this.props.registerIntl(this.props.intl);
    }

    render() {
        return null as JSX.Element;
    }
}

const mapStateToProps = (state: IRootState) => ({

});

const mapDispatchToProps = {
    registerIntl
};

export default injectIntl(connect<IIntlHookState, IIntlHookDispatch, IIntlHookProps>(mapStateToProps, mapDispatchToProps)(IntlHook));