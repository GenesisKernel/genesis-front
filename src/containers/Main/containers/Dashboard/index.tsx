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
import { navigate } from 'modules/engine/actions';
import { IRootState } from 'modules';

interface IDashboardProps {
    navigate: (url: string) => any;
}

const Dashboard: React.SFC<IDashboardProps> = (props) => {
    return (
        <div className="content-wrapper">
            <div className="content-heading">Dashboard</div>
            <div className="panel widget bg-info available_balance">
                <div className="row row-table">
                    <div className="col-xs-3 text-center bg-info-dark pv-lg ico">
                        <em className="glyphicons glyphicons-coins x2"></em>
                    </div>
                    <div className="col-xs-9 pv-lg text">
                        <div className="h1 m0 text-bold">
                            <span>1985.9999999989416</span>
                            <span>&nbsp;</span>
                            <span>APL</span>
                        </div>
                        <div className="text-uppercase lang">Available balance</div>
                    </div>
                </div>
            </div>
            <div className="row dashboard">
                <div className="col-lg-3 col-sm-6 menu">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-3">
                                    <em className="glyphicons glyphicons-wallet x3"></em>
                                </div>
                                <div className="col-xs-9 text-right">
                                    <div className="text-lg">APL</div>
                                    <p className="m0 lang">Your wallet</p>
                                </div>
                            </div>
                        </div>
                        <a href="#" className="panel-footer bg-gray-dark bt0 clearfix btn-block">
                            <span className="pull-left lang">Wallet address</span>
                            <span className="pull-right">
                                <em className="fa fa-chevron-circle-right"></em>
                            </span>
                        </a>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 menu">
                    <div className="panel panel-green">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-3">
                                    <em className="glyphicons glyphicons-money x3"></em>
                                </div>
                                <div className="col-xs-9 text-right">
                                    <div className="text-lg">&nbsp;</div>
                                    <p className="m0">&nbsp;</p>
                                </div>
                            </div>
                        </div>
                        <a href="#" className="panel-footer bg-gray-dark bt0 clearfix btn-block">
                            <span className="pull-left lang">Money transfer</span>
                            <span className="pull-right">
                                <em className="fa fa-chevron-circle-right"></em>
                            </span>
                        </a>
                    </div>

                </div>
                <div className="col-lg-3 col-sm-6 menu">
                    <div className="panel panel-danger">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-3">
                                    <em className="fa fa-user fa-5x"></em>
                                </div>
                                <div className="col-xs-9 text-right">
                                    <div className="text-lg">&nbsp;</div>
                                    <p className="m0">&nbsp;</p>
                                </div>
                            </div>
                        </div>
                        <a href="#" className="panel-footer bg-gray-dark bt0 clearfix btn-block">
                            <span className="pull-left lang">Request membership</span>
                            <span className="pull-right">
                                <em className="fa fa-chevron-circle-right"></em>
                            </span>
                        </a>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 menu">
                    <div className="panel panel-purple">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-3">
                                    <em className="fa fa-th fa-5x"></em>
                                </div>
                                <div className="col-xs-9 text-right">
                                    <div className="text-lg">&nbsp;</div>
                                    <p className="m0">&nbsp;</p>
                                </div>
                            </div>
                        </div>
                        <a href="#" className="panel-footer bg-gray-dark bt0 clearfix btn-block">
                            <span className="pull-left lang">Forging</span>
                            <span className="pull-right">
                                <em className="fa fa-chevron-circle-right"></em>
                            </span>
                        </a>
                    </div>

                </div>

                {/*<div role="tabpanel" className="col-xs-12 panel panel-transparent">
                    <ul role="tablist" className="nav nav-tabs nav-justified">
                        <li role="presentation" className="active">
                            <a href="#tab1" aria-controls="home" role="tab" data-toggle="tab" className="bb0" aria-expanded="true">
                                <em className="fa fa-clock-o fa-fw"></em>
                                <span className="lang">Transactions history</span></a>
                        </li>
                        <li role="presentation">
                            <a href="#" role="tab" data-toggle="tab" className="bb0" aria-expanded="false">
                                <em className="fa fa-th fa-fw"></em>
                                <span className="lang">Block Explorer</span>
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content p0 bg-white">
                        <div role="tabpanel" className="tab-pane active">
                            <div className="box-placeholder text-center lang">No data available</div>
                            <div className="table-responsive">
                                <div className="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                    <div className="row">
                                        <div className="col-sm-6"></div>
                                        <div className="col-sm-6"></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <table className="table table-striped table-hover ui-responsive ui-table ui-table-reflow dataTable no-footer" data-role="table" role="grid">
                                                <thead>
                                                    <tr role="row">
                                                        <th className="lang sorting_disabled" data-colstart="1">Block ID</th>
                                                        <th className="lang sorting_disabled" data-colstart="2">Time</th>
                                                        <th className="lang sorting_disabled" data-colstart="3">Amount</th>
                                                        <th className="lang sorting_disabled" data-colstart="4">Sender</th>
                                                        <th className="lang sorting_disabled" data-colstart="5">Recipient</th>
                                                        <th className="lang sorting_disabled" data-colstart="6">Comment</th>
                                                        <th className="lang sorting_disabled" data-colstart="7">Confirmations</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr role="row" className="odd">
                                                        <td className="ui-table-title">
                                                            <b className="ui-table-cell-label">Block ID</b>
                                                            <div className="ui-table-td">
                                                                <a href="#" className="ui-link">3743527</a>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <b className="ui-table-cell-label">Time</b>
                                                            <div className="ui-table-td">28 August 2017, 04:06:06</div>
                                                        </td>
                                                        <td>
                                                            <b className="ui-table-cell-label">Amount</b>
                                                            <div className="ui-table-td">
                                                                <b>5e-17</b>
                                                                <span>APL</span>
                                                            </div>
                                                        </td>
                                                        <td className="Ellipsis">
                                                            <b className="ui-table-cell-label">Sender</b>
                                                            <div className="ui-table-td">
                                                                <div className="tooltipEllipsis">1640-1564-0902-4143-7580</div>
                                                            </div>
                                                        </td>
                                                        <td className="Ellipsis">
                                                            <b className="ui-table-cell-label">Recipient</b>
                                                            <div className="ui-table-td">
                                                                <div className="tooltipEllipsis">0508-4030-5648-9021-7950</div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <b className="ui-table-cell-label">Comment</b>
                                                            <div className="ui-table-td">Commission</div>
                                                        </td>
                                                        <td>
                                                            <b className="ui-table-cell-label">Confirmations</b>
                                                            <div className="ui-table-td">697352</div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="dataTables_processing panel panel-default">Processing...</div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-5"></div>
                                        <div className="col-sm-7"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-footer text-right">
                                <a href="#" className="btn btn-default btn-sm lang">View all history</a>
                            </div>
                        </div>
                        <div role="tabpanel" className="tab-pane">
                            <div className="table-responsive">
                                <table className="table table-striped table-hover ui-responsive ui-table ui-table-reflow" data-role="table">
                                    <thead>
                                        <tr>
                                            <th data-colstart="1">Block ID</th>
                                            <th data-colstart="2">Timestamp</th>
                                            <th data-colstart="3">Added by</th>
                                            <th data-colstart="4">Transactions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="ui-table-title">
                                                <b className="ui-table-cell-label">Block ID</b>
                                                <div className="ui-table-td">
                                                    <a href="#" className="ui-link">4440906</a>
                                                </div>
                                            </td>
                                            <td className="unixtime">
                                                <b className="ui-table-cell-label">Timestamp</b>
                                                <div className="ui-table-td">22 September 2017, 05:55:30</div>
                                            </td>
                                            <td>
                                                <b className="ui-table-cell-label">Added by</b>
                                                <div className="ui-table-td">0508-4030-5648-9021-7950</div>
                                            </td>
                                            <td>
                                                <b className="ui-table-cell-label">Transactions</b>
                                                <div className="ui-table-td">0</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="ui-table-title">
                                                <b className="ui-table-cell-label">Block ID</b>
                                                <div className="ui-table-td">
                                                    <a href="#" className="ui-link">4440906</a>
                                                </div>
                                            </td>
                                            <td className="unixtime">
                                                <b className="ui-table-cell-label">Timestamp</b>
                                                <div className="ui-table-td">22 September 2017, 05:55:30</div>
                                            </td>
                                            <td>
                                                <b className="ui-table-cell-label">Added by</b>
                                                <div className="ui-table-td">0508-4030-5648-9021-7950</div>
                                            </td>
                                            <td>
                                                <b className="ui-table-cell-label">Transactions</b>
                                                <div className="ui-table-td">0</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="ui-table-title">
                                                <b className="ui-table-cell-label">Block ID</b>
                                                <div className="ui-table-td">
                                                    <a href="#" className="ui-link">4440906</a>
                                                </div>
                                            </td>
                                            <td className="unixtime">
                                                <b className="ui-table-cell-label">Timestamp</b>
                                                <div className="ui-table-td">22 September 2017, 05:55:30</div>
                                            </td>
                                            <td>
                                                <b className="ui-table-cell-label">Added by</b>
                                                <div className="ui-table-td">0508-4030-5648-9021-7950</div>
                                            </td>
                                            <td>
                                                <b className="ui-table-cell-label">Transactions</b>
                                                <div className="ui-table-td">0</div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>*/}
            </div>
        </div>
    );
};

const mapStateToProps = (state: IRootState) => ({

});

const mapDispatchToProps = {
    navigate
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);