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
import { Col, Row } from 'react-bootstrap';
import Panel from './Panel';
import AlignRadioButtons from './AlignRadioButtons';
import TransformRadioButtons from './TransformRadioButtons';
import ColorRadioButtons from './ColorRadioButtons';
import BtnRadioButtons from './BtnRadioButtons';
import Switch from './Switch';
import PropertiesInput from './PropertiesInput';
import { getInitialTagValue } from 'lib/constructor';
import resolveTagHandler from 'lib/constructor/tags';

interface IPropertiesProps {
    changePage?: any;
    tag?: any;
}

interface IPropertiesState {
}

export default class Properties extends React.Component<IPropertiesProps, IPropertiesState> {
    onChange(attr: string, e: React.ChangeEvent<HTMLInputElement>) {
        if (this.props && this.props.tag) {
            this.props.changePage({[attr]: e.target.value, tagID: this.props.tag.id});
        }
    }

    onAttrChange(attr: string, value: string) {
        if (this.props && this.props.tag) {
            this.props.changePage({[attr]: value, tagID: this.props.tag.id});
        }
    }

    render() {
        let Handler: any = null;
        if (this.props.tag) {
            Handler = resolveTagHandler(this.props.tag.tag);
        }
        if (Handler) {
            const Tag = new Handler(this.props.tag);

            return (
                <Panel title="Properties">
                    <div className="content-wrapper b-panel-light">
                        <form className="form-horizontal">
                            <PropertiesInput
                                name="tag"
                                title="Tag"
                                placeholder="Tag name"
                                value={this.props.tag && this.props.tag.tag || ''}
                                readOnly={true}
                            />
                            <PropertiesInput
                                name="id"
                                title="ID"
                                placeholder="Element ID"
                                value={this.props.tag && this.props.tag.id || ''}
                                readOnly={true}
                            />
                            { Tag.hasEditProp('class') && (
                                <PropertiesInput
                                    name="class"
                                    title="CSS CLASS"
                                    placeholder="Element Classes"
                                    value={this.props.tag && this.props.tag.attr && this.props.tag.attr.class || ''}
                                    onChange={this.onChange.bind(this, 'class')}
                                />
                            )}
                        </form>
                    </div>
                    <div className="content-wrapper"/>
                    <div className="content-wrapper b-panel-light">
                        <Row className="g-padding-bottom hidden">
                            <Col xs={3} className="text-uppercase">
                                position
                            </Col>
                            <Col xs={9}>
                                <div className="b-position-bullet b-position-bullet_selected"/>
                                <div className="b-position-bullet b-position-bullet_selected"/>
                                <div className="b-position-bullet b-position-bullet_selected"/>
                                <div className="b-position-bullet b-position-bullet_selected"/>
                                <div className="b-position-bullet b-position-bullet_selected"/>
                                <div className="b-position-bullet b-position-bullet_selected"/>
                                <div className="b-position-bullet"/>
                                <div className="b-position-bullet"/>
                                <div className="b-position-bullet"/>
                                <div className="b-position-bullet"/>
                                <div className="b-position-bullet"/>
                                <div className="b-position-bullet"/>
                            </Col>
                        </Row>
                        <form className="form-horizontal">
                            { Tag.hasEditProp('width') && (
                                <PropertiesInput
                                    name="width"
                                    title="Width"
                                    placeholder="Image width"
                                    value={this.props.tag && this.props.tag.attr && this.props.tag.attr.width || ''}
                                    onChange={this.onChange.bind(this, 'width')}
                                />
                            )}
                            { Tag.hasEditProp('ratio') && (
                                <PropertiesInput
                                    name="ratio"
                                    title="Height / ratio"
                                    placeholder="Image height or ratio"
                                    value={this.props.tag && this.props.tag.attr && this.props.tag.attr.ratio || ''}
                                    onChange={this.onChange.bind(this, 'ratio')}
                                />
                            )}
                            { Tag.hasEditProp('name') && (
                                <PropertiesInput
                                    name="name"
                                    title="Name"
                                    value={this.props.tag && this.props.tag.attr && this.props.tag.attr.name || ''}
                                    onChange={this.onChange.bind(this, 'name')}
                                />
                            )}
                            { Tag.hasEditProp('source') && (
                                <PropertiesInput
                                    name="source"
                                    title="Source"
                                    value={this.props.tag && this.props.tag.attr && this.props.tag.attr.source || ''}
                                    onChange={this.onChange.bind(this, 'source')}
                                />
                            )}
                            { Tag.hasEditProp('condition') && (
                                <PropertiesInput
                                    name="condition"
                                    title="Condition"
                                    value={this.props.tag && this.props.tag.attr && this.props.tag.attr.condition || ''}
                                    onChange={this.onChange.bind(this, 'condition')}
                                />
                            )}
                        </form>
                        <Row className="g-padding-bottom">
                            { Tag.hasEditProp('align') && (
                                <Col xs={4} className="text-center">
                                    <div className="text-uppercase">
                                        alignment
                                    </div>
                                    <AlignRadioButtons
                                        initialValue={(getInitialTagValue('align', this.props && this.props.tag))}
                                        onSelect={this.onAttrChange.bind(this, 'align')}
                                    />
                                </Col>
                            )}
                            { Tag.hasEditProp('transform') && (
                                <Col xs={4} className="text-center">
                                    <div className="text-uppercase">
                                        transform
                                    </div>
                                    <TransformRadioButtons
                                        initialValue={(getInitialTagValue('transform', this.props && this.props.tag))}
                                        onSelect={this.onAttrChange.bind(this, 'transform')}
                                    />
                                </Col>
                            )}
                            { Tag.hasEditProp('wrap') && (
                                <Col xs={4} className="text-center">
                                    <div className="text-center text-uppercase">
                                        no wrap
                                    </div>
                                    <Switch
                                        initialValue={(getInitialTagValue('wrap', this.props && this.props.tag))}
                                        onValue="nowrap"
                                        offValue=""
                                        onChange={this.onAttrChange.bind(this, 'wrap')}
                                    />
                                </Col>
                            )}
                        </Row>
                        <Row className="g-padding-bottom">
                            { Tag.hasEditProp('btn') && (
                                <div>
                                    <Col xs={12}>
                                        <div className="text-uppercase">
                                            button
                                        </div>
                                    </Col>
                                    <Col xs={12}>
                                        <BtnRadioButtons
                                            initialValue={(getInitialTagValue('btn', this.props && this.props.tag))}
                                            onSelect={this.onAttrChange.bind(this, 'btn')}
                                        />
                                    </Col>
                                </div>
                            )}
                            { Tag.hasEditProp('color') && (
                                <div>
                                    <Col xs={12}>
                                        <div className="text-uppercase">
                                            color
                                        </div>
                                    </Col>
                                    <Col xs={12}>
                                        <ColorRadioButtons
                                            initialValue={(getInitialTagValue('color', this.props && this.props.tag))}
                                            onSelect={this.onAttrChange.bind(this, 'color')}
                                        />
                                    </Col>
                                </div>
                            )}
                        </Row>
                    </div>
                </Panel>
            );
        }
        else {
            return (
                <Panel title="Properties"/>
            );
        }
    }
}