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
import { injectIntl, FormattedMessage, InjectedIntlProps } from 'react-intl';
import { Button, Row, Col } from 'react-bootstrap';
import { sendAttachment } from 'lib/fs';

import Heading from 'containers/Widgets/Heading';
import Checkbox from 'components/Checkbox';
import ExportTable from './ExportTable';
import ExportTableData from './ExportTableData';
import DocumentTitle from 'components/DocumentTitle';
import TabView from 'components/TabView';

export interface IExportProps {
    exportPayload: any;
    exportData: (params: {
        pages: string[];
        blocks: string[];
        menus: string[];
        parameters: string[];
        languages: string[];
        contracts: { id: string, name: string }[];
        tables: string[];
        data: string[];
    }) => void;
    pages: { id: string, name: string }[];
    menus: { id: string, name: string }[];
    blocks: { id: string, name: string }[];
    parameters: { name: string }[];
    languages: { id: string, name: string }[];
    contracts: { id: string, name: string }[];
    tables: { name: string }[];
}

interface IExportState {
    pages: { id: string, name: string }[];
    blocks: { id: string, name: string }[];
    menus: { id: string, name: string }[];
    parameters: { name: string }[];
    languages: { id: string, name: string }[];
    contracts: { id: string, name: string }[];
    tables: { name: string }[];
    data: { name: string }[];
    compress: boolean;
}

class Export extends React.Component<IExportProps & InjectedIntlProps, IExportState> {
    constructor(props: IExportProps & InjectedIntlProps) {
        super(props);
        this.state = {
            pages: [],
            blocks: [],
            menus: [],
            parameters: [],
            languages: [],
            contracts: [],
            tables: [],
            data: [],
            compress: false
        };
    }

    componentWillReceiveProps(props: IExportProps & InjectedIntlProps) {
        if (!this.props.exportPayload && props.exportPayload) {
            sendAttachment('backup.sim', JSON.stringify(props.exportPayload, null, this.state.compress ? null : 4));
        }
    }

    onSelectPages(pages: { id: string, name: string }[]) {
        this.setState({
            pages
        });
    }

    onSelectBlocks(blocks: { id: string, name: string }[]) {
        this.setState({
            blocks
        });
    }

    onSelectMenus(menus: { id: string, name: string }[]) {
        this.setState({
            menus
        });
    }

    onSelectParameters(parameters: { name: string }[]) {
        this.setState({
            parameters
        });
    }

    onSelectLanguages(languages: { id: string, name: string }[]) {
        this.setState({
            languages
        });
    }

    onSelectContracts(contracts: { id: string, name: string }[]) {
        this.setState({
            contracts
        });
    }

    onSelectTables(tables: { name: string }[]) {
        this.setState({
            tables
        });
    }

    onSelectData(data: { name: string }[]) {
        this.setState({
            data
        });
    }

    onConfirm() {
        this.props.exportData({
            pages: this.state.pages.map(page => page.id),
            blocks: this.state.blocks.map(block => block.id),
            menus: this.state.menus.map(menu => menu.id),
            parameters: this.state.parameters.map(param => param.name),
            languages: this.state.languages.map(lang => lang.id),
            contracts: this.state.contracts.map(contract => ({ id: contract.id, name: contract.name })),
            tables: this.state.tables.map(table => table.name),
            data: this.state.data.map(data => data.name)
        });
    }

    onCompressToggle() {
        this.setState({
            compress: !this.state.compress
        });
    }

    isPristine() {
        return 0 === this.state.blocks.length
            && 0 === this.state.menus.length
            && 0 === this.state.pages.length
            && 0 === this.state.parameters.length
            && 0 === this.state.languages.length
            && 0 === this.state.contracts.length
            && 0 === this.state.tables.length
            && 0 === this.state.data.length;
    }

    renderItem(title: string, items: string[], badge: number) {
        return (
            <div className="list-group m0">
                <div className="list-group-item">
                    <div className="media-box">
                        <div className="media-box-body clearfix">
                            <small className="text-muted pull-right ml">
                                ({badge})
                            </small>
                            <div className="media-box-heading">
                                <div className="m0">
                                    {title}
                                </div>
                            </div>
                            <p className="m0">
                                <small>
                                    {items.length ?
                                        (
                                            <span>{items.join(', ')}</span>
                                        ) :
                                        (
                                            <span className="text-muted">
                                                <FormattedMessage id="admin.export.selection.empty" defaultMessage="Nothing selected" />
                                            </span>
                                        )
                                    }
                                </small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <DocumentTitle title="admin.export" defaultTitle="Export">
                <div>
                    <Heading>
                        <FormattedMessage id="admin.export" defaultMessage="Export" />
                    </Heading>
                    <div className="content-wrapper">
                        <Row>
                            <Col md={12}>
                                <div className="well">
                                    <h4>
                                        <FormattedMessage id="admin.export.generate" defaultMessage="Generate export payload" />
                                    </h4>
                                    <p>
                                        <FormattedMessage id="admin.export.generate.description" defaultMessage="Select every element which do you want to export and proceed to the payload generation process. Make sure that you select all of the dependencies that your application requires to function properly" />
                                    </p>
                                </div>
                            </Col>
                        </Row>
                        <hr className="mt0" />
                        <Row>
                            <Col md={8} lg={9}>
                                <TabView
                                    className="p0"
                                    tabs={[
                                        this.props.intl.formatMessage({ id: 'admin.interface.pages', defaultMessage: 'Pages' }),
                                        this.props.intl.formatMessage({ id: 'admin.interface.blocks', defaultMessage: 'Blocks' }),
                                        this.props.intl.formatMessage({ id: 'admin.interface.menu', defaultMessage: 'Menu' }),
                                        this.props.intl.formatMessage({ id: 'admin.parameters.short', defaultMessage: 'Parameters' }),
                                        this.props.intl.formatMessage({ id: 'admin.languages.short', defaultMessage: 'Languages' }),
                                        this.props.intl.formatMessage({ id: 'admin.contracts.short', defaultMessage: 'Contracts' }),
                                        this.props.intl.formatMessage({ id: 'admin.tables', defaultMessage: 'Tables' })
                                    ]}
                                >
                                    <div>
                                        <ExportTable
                                            dataKey="id"
                                            payload={this.props.pages || []}
                                            onSelect={this.onSelectPages.bind(this)}
                                        />
                                    </div>
                                    <div>
                                        <ExportTable
                                            dataKey="id"
                                            payload={this.props.blocks || []}
                                            onSelect={this.onSelectBlocks.bind(this)}
                                        />
                                    </div>
                                    <div>
                                        <ExportTable
                                            dataKey="id"
                                            payload={this.props.menus || []}
                                            onSelect={this.onSelectMenus.bind(this)}
                                        />
                                    </div>
                                    <div>
                                        <ExportTable
                                            dataKey="name"
                                            payload={this.props.parameters || []}
                                            onSelect={this.onSelectParameters.bind(this)}
                                        />
                                    </div>
                                    <div>
                                        <ExportTable
                                            dataKey="id"
                                            payload={this.props.languages || []}
                                            onSelect={this.onSelectLanguages.bind(this)}
                                        />
                                    </div>
                                    <div>
                                        <ExportTable
                                            dataKey="id"
                                            payload={this.props.contracts || []}
                                            onSelect={this.onSelectContracts.bind(this)}
                                        />
                                    </div>
                                    <div>
                                        <ExportTableData
                                            dataKey="name"
                                            payload={this.props.tables || []}
                                            onSelect={this.onSelectTables.bind(this)}
                                            onDataSelect={this.onSelectData.bind(this)}
                                        />
                                    </div>
                                </TabView>
                            </Col>
                            <Col md={4} lg={3}>
                                <div className="panel panel-primary">
                                    <div className="panel-heading">
                                        <FormattedMessage id="admin.export.selected" defaultMessage="Selected items" />
                                    </div>

                                    <div className="list-group">
                                        {this.renderItem(this.props.intl.formatMessage(
                                            { id: 'admin.interface.pages', defaultMessage: 'Pages' }),
                                            this.state.pages.map(l => l.name),
                                            this.state.pages.length
                                        )}
                                        {this.renderItem(this.props.intl.formatMessage(
                                            { id: 'admin.interface.blocks', defaultMessage: 'Blocks' }),
                                            this.state.blocks.map(l => l.name),
                                            this.state.blocks.length
                                        )}
                                        {this.renderItem(this.props.intl.formatMessage(
                                            { id: 'admin.interface.menu', defaultMessage: 'Menu' }),
                                            this.state.menus.map(l => l.name),
                                            this.state.menus.length
                                        )}
                                        {this.renderItem(this.props.intl.formatMessage(
                                            { id: 'admin.parameters.short', defaultMessage: 'Parameters' }),
                                            this.state.parameters.map(l => l.name),
                                            this.state.parameters.length
                                        )}
                                        {this.renderItem(this.props.intl.formatMessage(
                                            { id: 'admin.languages', defaultMessage: 'Language resources' }),
                                            this.state.languages.map(l => l.name),
                                            this.state.languages.length
                                        )}
                                        {this.renderItem(this.props.intl.formatMessage(
                                            { id: 'admin.contracts', defaultMessage: 'Smart contracts' }),
                                            this.state.contracts.map(l => l.name),
                                            this.state.contracts.length
                                        )}
                                        {this.renderItem(this.props.intl.formatMessage(
                                            { id: 'admin.tables', defaultMessage: 'Tables' }),
                                            this.state.tables.map(l => l.name),
                                            this.state.tables.length
                                        )}
                                        {this.renderItem(this.props.intl.formatMessage(
                                            { id: 'admin.tables.data', defaultMessage: 'Table data' }),
                                            this.state.data.map(l => l.name),
                                            this.state.data.length
                                        )}
                                    </div>

                                    <div className="panel-body">
                                        <div>
                                            <Checkbox className="mt0" checked={this.state.compress} onChange={this.onCompressToggle.bind(this)} title={this.props.intl.formatMessage({ id: 'admin.export.compress', defaultMessage: 'Compress data' })} />
                                        </div>
                                        <div className="small text-muted">
                                            <FormattedMessage id="admin.export.compress.desc" defaultMessage="By selecting this option you will reduce size of the file, but it will make backup unreadable for most users if they will try to open it in a text editor" />
                                        </div>
                                    </div>

                                    <div className="panel-footer text-right">
                                        <Button bsStyle="primary" onClick={this.onConfirm.bind(this)} disabled={this.isPristine()}>
                                            <FormattedMessage id="admin.export.confirm" defaultMessage="Confirm export" />
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

export default injectIntl(Export);