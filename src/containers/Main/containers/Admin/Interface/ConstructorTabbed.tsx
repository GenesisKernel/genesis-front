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
import { getPage } from 'modules/admin/actions';

// import Constructor, { IConstructorProps } from 'components/Main/Admin/Interface/Constructor';
import Constructor from 'containers/Main/containers/Admin/Interface/Constructor';
import ConstructorTabs from 'components/ConstructorTabs';

import storage from 'lib/storage';

export interface IConstructorTabbedProps {
    pageID?: string;
    pageName?: string;
    page?: any;
    tabs: any;
    // template: string;
    treeCode?: any;
    session: string;
}

class ConstructorTabbed extends React.Component<IConstructorTabbedProps & { getPage: typeof getPage.started, match?: { params: { pageID: string, pageName: string } } }> {
    componentWillMount() {
        //let pageIds = [1, 2, 3];
        //pageIds.map(item => {
        //    alert(item);
        //});

        // this.props.getPage({ id: this.props.match.params.pageID });
        //alert(JSON.stringify(this.props.match.params));

        //alert(this.props.match.params.pageName);

        this.loadTabs();
    }

    loadTabs() {
        let constructorTabs:any = storage.settings.load("constructorTabs");
        if(!constructorTabs) {
            constructorTabs = [];
        }
        else {
            constructorTabs = JSON.parse(constructorTabs);
        }
        if(constructorTabs.indexOf(this.props.match.params.pageID) === -1) {
            constructorTabs = constructorTabs.concat(this.props.match.params.pageID);
        }
        storage.settings.save("constructorTabs", JSON.stringify(constructorTabs));


    }

    onTabClose(index: number) {
        alert('close ' + index);
    }

    render() {
        let tabs = [];

        //let pageName = this.props.page ? this.props.page.name : 'New page';
        let pageID = this.props.match.params.pageID;
        let pageName = this.props.match.params.pageName;

        tabs.push(pageName + ' (ID ' + pageID + ')');
        tabs.push('page 2');
        tabs.push('page 3');

        //alert(JSON.stringify(this.props));


        return (
            <ConstructorTabs
                tabs={tabs}
                onTabClose={this.onTabClose}
            >
                <Constructor pageID={pageID}/>
                {/*<Constructor {...this.props} />*/}
                <Constructor pageID={'2'}/>
                <Constructor pageID={'3'}/>
            </ConstructorTabs>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    // page: state.admin.page,
    tabs: (state.admin.constructor && state.admin.constructor.tabs) || null,
    session: state.auth.sessionToken
});

const mapDispatchToProps = {
    getPage: getPage.started
};

export default connect(mapStateToProps, mapDispatchToProps)(ConstructorTabbed);