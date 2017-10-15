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
import { IRootState } from 'modules';
import { getLanguage } from 'modules/admin/actions';

import Edit, { IEditProps } from 'components/Main/Admin/Languages/Edit';

class EditContainer extends React.Component<IEditProps & { translation: any, getLanguage: typeof getLanguage.started, match: { params: { translationID: string } } }> {
    componentWillMount() {
        this.props.getLanguage({
            id: this.props.match.params.translationID
        });
    }

    render() {
        return (
            <Edit {...this.props} />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    translation: state.admin.language
});

const mapDispatchToProps = {
    getLanguage: getLanguage.started
};

export default connect(mapStateToProps, mapDispatchToProps)(EditContainer);