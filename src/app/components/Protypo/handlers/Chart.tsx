// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import * as _ from 'lodash';
import * as React from 'react';
import * as propTypes from 'prop-types';
import { Bar, Line, Pie } from 'react-chartjs-2';

import StyledComponent from './StyledComponent';

export interface IChartProps {
    id: string;
    colors?: string[];
    fieldlabel?: string;
    fieldvalue?: string;
    source?: string;
    type?: string;
}

interface IChartContext {
    resolveSource: (name: string) => { columns: string[], types: string[], data: string[][] };
}

class Chart extends React.Component<IChartProps> {
    private _cachedSourceData: { columns: string[], types: string[], data: string[][] };

    static contextTypes = {
        resolveSource: propTypes.func.isRequired
    };

    shouldComponentUpdate(props: IChartProps, state: never, context: IChartContext) {
        const source = context.resolveSource(props.source);
        return !_.isEqual(props, this.props) || !_.isEqual(this._cachedSourceData, source);
    }

    render() {
        const context = this.context as IChartContext;

        this._cachedSourceData = context.resolveSource(this.props.source);

        if (!this._cachedSourceData) {
            return null;
        }

        const fieldLabelRowIndex = this._cachedSourceData.columns.indexOf(this.props.fieldlabel);
        const fieldValueRowIndex = this._cachedSourceData.columns.indexOf(this.props.fieldvalue);

        if (fieldValueRowIndex === -1 || fieldLabelRowIndex === -1) {
            return null;
        }

        const labels = this._cachedSourceData.data.map((row, rowIndex) => (
            row[fieldLabelRowIndex]
        ));

        const data = this._cachedSourceData.data.map((row, rowIndex) => (
            parseFloat(row[fieldValueRowIndex])
        ));

        let chartData: any = {
            labels,
            datasets: [
                {
                    label: '',
                    data,
                    borderWidth: 2,
                    backgroundColor: this.props.colors
                }
            ]
        };

        if (this.props.type === 'line') {
            if (this.props.colors && this.props.colors.length > 0) {
                chartData.datasets[0].borderColor = this.props.colors[0];
                chartData.datasets[0].backgroundColor = null;
            }
        }

        const options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        };

        switch (this.props.type) {
            case 'line':
                return (
                    <div>
                        <Line
                            data={chartData}
                            options={options}
                        />
                    </div>
                );

            case 'pie':
                return (
                    <div>
                        <Pie
                            data={chartData}
                            options={options}
                        />
                    </div>
                );

            case 'bar':
            default:
                return (
                    <div>
                        <Bar
                            data={chartData}
                            options={options}
                        />
                    </div>
                );
        }
    }
}

export default StyledComponent(Chart);