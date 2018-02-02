// Copyright 2017 The genesis-front Authors
// This file is part of the genesis-front library.
// 
// The genesis-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The genesis-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the genesis-front library. If not, see <http://www.gnu.org/licenses/>.

import * as React from 'react';
import { Col, Panel, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import DocumentTitle from 'components/DocumentTitle';
import Heading from 'components/Heading';
import PageLink from 'containers/Routing/PageLink';

export interface IInterfaceProps {
    vde?: boolean;
    pages: { id: string, name: string }[];
    menus: { id: string, name: string }[];
    blocks: { id: string, name: string }[];
}

const Interface: React.SFC<IInterfaceProps> = (props) => (
    <DocumentTitle title="admin.interface" defaultTitle="Interface">
        <div>
            <Heading>
                <FormattedMessage id="admin.interface" defaultMessage="Interface" />
                <div className="pull-right">
                    <PageLink className="ml btn-tool" page="create-page" section="admin" vde={props.vde}>
                        <em className="icon icon-plus" />
                        <span>
                            <FormattedMessage id="admin.interface.page.create" defaultMessage="Create page" />
                        </span>
                    </PageLink>
                    <PageLink className="ml btn-tool" page="create-block" section="admin" vde={props.vde}>
                        <em className="icon icon-plus" />
                        <span>
                            <FormattedMessage id="admin.interface.block.create" defaultMessage="Create block" />
                        </span>
                    </PageLink>
                    <PageLink className="ml btn-tool" page="create-menu" section="admin" vde={props.vde}>
                        <em className="icon icon-plus" />
                        <span>
                            <FormattedMessage id="admin.interface.menu.create" defaultMessage="Create menu" />
                        </span>
                    </PageLink>
                </div>
            </Heading>
            <div className="content-wrapper">
                <ol className="breadcrumb">
                    <li>
                        <FormattedMessage id="admin.interface" defaultMessage="Interface" />
                    </li>
                </ol>
                <Row>
                    <Col md={8}>
                        <Panel
                            header={<FormattedMessage id="admin.interface.pages" defaultMessage="Pages" />}
                            bsStyle="primary"
                        >
                            {props.pages.length ?
                                (
                                    <table className="table table-striped table-bordered table-hover">
                                        <tbody>
                                            {props.pages.map(page => (
                                                <tr key={page.id}>
                                                    <td>
                                                        <div>{page.name}</div>
                                                        {!props.vde && (
                                                            <PageLink className="btn btn-link p0" page="page-history" params={{ id: page.id }} section="admin">
                                                                <FormattedMessage id="admin.interface.page.history" defaultMessage="View history" />
                                                            </PageLink>
                                                        )}
                                                    </td>
                                                    <td style={{ width: 1 }}>
                                                        <PageLink className="btn btn-labeled btn-icon btn-default" page="edit-page" section="admin" params={{ id: page.id }} vde={props.vde}>
                                                            <span className="btn-label">
                                                                <em className="fa fa-edit" />
                                                            </span>
                                                        </PageLink>
                                                        {/* FIXME
                                                        <Link to={`/${props.vde ? 'vde' : 'admin'}/tabs/interfacePage-${page.id}-${page.name}`}>
                                                            <Button bsStyle="default" className="btn-labeled btn-icon">
                                                                <span className="btn-label">
                                                                    <em className="fa fa-files-o" />
                                                                </span>
                                                            </Button>
                                                        </Link>
                                                        */}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )
                                :
                                (
                                    <span className="text-muted">
                                        <FormattedMessage id="admin.interface.nothingfound" defaultMessage="Nothing found" />
                                    </span>
                                )
                            }
                        </Panel>
                    </Col>
                    <Col md={4}>
                        <Panel
                            header={<FormattedMessage id="admin.interface.menu" defaultMessage="Menu" />}
                            bsStyle="primary"
                        >
                            {props.menus.length ?
                                (
                                    <table className="table table-striped table-bordered table-hover">
                                        <tbody>
                                            {props.menus.map(menu => (
                                                <tr key={menu.id}>
                                                    <td>
                                                        <div>{menu.name}</div>
                                                        {!props.vde && (
                                                            <PageLink className="btn btn-link p0" page="menu-history" params={{ id: menu.id }} section="admin">
                                                                <FormattedMessage id="admin.interface.menu.history" defaultMessage="View history" />
                                                            </PageLink>
                                                        )}
                                                    </td>
                                                    <td style={{ width: 1 }}>
                                                        <PageLink className="btn btn-labeled btn-icon btn-default" page="edit-menu" section="admin" params={{ id: menu.id }} vde={props.vde}>
                                                            <span className="btn-label">
                                                                <em className="fa fa-edit" />
                                                            </span>
                                                        </PageLink>
                                                        {/* FIXME
                                                        <Link to={`/${props.vde ? 'vde' : 'admin'}/tabs/interfaceMenu-${menu.id}-${menu.name}`}>
                                                            <Button bsStyle="default" className="btn-labeled btn-icon">
                                                                <span className="btn-label">
                                                                    <em className="fa fa-files-o" />
                                                                </span>
                                                            </Button>
                                                        </Link>*/}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )
                                :
                                (
                                    <span className="text-muted">
                                        <FormattedMessage id="admin.interface.nothingfound" defaultMessage="Nothing found" />
                                    </span>
                                )
                            }
                        </Panel>
                        <Panel
                            header={<FormattedMessage id="admin.interface.blocks" defaultMessage="Blocks" />}
                            bsStyle="primary"
                        >
                            {props.blocks.length ?
                                (
                                    <table className="table table-striped table-bordered table-hover">
                                        <tbody>
                                            {props.blocks.map(block => (
                                                <tr key={block.id}>
                                                    <td>{block.name}</td>
                                                    <td style={{ width: 1 }}>
                                                        <PageLink className="btn btn-labeled btn-icon btn-default" page="edit-block" section="admin" params={{ id: block.id }} vde={props.vde}>
                                                            <span className="btn-label">
                                                                <em className="fa fa-edit" />
                                                            </span>
                                                        </PageLink>
                                                        {/* FIXME
                                                        <Link to={`/${props.vde ? 'vde' : 'admin'}/tabs/interfaceBlock-${block.id}-${block.name}`}>
                                                            <Button bsStyle="default" className="btn-labeled btn-icon">
                                                                <span className="btn-label">
                                                                    <em className="fa fa-files-o" />
                                                                </span>
                                                            </Button>
                                                        </Link>*/}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )
                                :
                                (
                                    <span className="text-muted">
                                        <FormattedMessage id="admin.interface.nothingfound" defaultMessage="Nothing found" />
                                    </span>
                                )
                            }
                        </Panel>
                    </Col>
                </Row>
            </div>
        </div>
    </DocumentTitle>
);

export default Interface;