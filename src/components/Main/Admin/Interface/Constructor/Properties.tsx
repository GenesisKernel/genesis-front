import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import Panel from './Panel';
import AlignRadioButtons from './AlignRadioButtons';
import TransformRadioButtons from './TransformRadioButtons';
import ColorRadioButtons from './ColorRadioButtons';
import Switch from './Switch';
import { getInitialTagValue } from 'lib/constructor';

interface IPropertiesProps {
    changePage?: any;
    tag?: any;
}

interface IPropertiesState {
}

export default class Properties extends React.Component<IPropertiesProps, IPropertiesState> {
    onClassesChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (this.props && this.props.tag) {
            this.props.changePage({class: e.target.value, tagID: this.props.tag.id});
        }
    }

    onAlignChange(align: string) {
        if (this.props && this.props.tag) {
            this.props.changePage({align: align, tagID: this.props.tag.id});
        }
    }

    onTransformChange(transform: string) {
        if (this.props && this.props.tag) {
            this.props.changePage({transform: transform, tagID: this.props.tag.id});
        }
    }

    onWrapChange(wrap: string) {
        if (this.props && this.props.tag) {
            this.props.changePage({wrap: wrap, tagID: this.props.tag.id});
        }
    }

    onColorChange(color: string) {
        if (this.props && this.props.tag) {
            this.props.changePage({color: color, tagID: this.props.tag.id});
        }
    }

    render() {
        return (
            <Panel title="Properties">
                <div className="content-wrapper b-panel-light">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label className="col-xs-3 control-label g-no-padding"><small>Tag</small></label>
                            <Col xs={9}>
                                <input type="text" className="form-control input-sm" placeholder="Tag name" value={this.props.tag && this.props.tag.tag || ''} readOnly={true}/>
                            </Col>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-3 control-label g-no-padding"><small>ID</small></label>
                            <Col xs={9}>
                                <input type="text" className="form-control input-sm" placeholder="Element ID" value={this.props.tag && this.props.tag.id || ''} readOnly={true}/>
                            </Col>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-3 control-label g-no-padding"><small>CSS CLASS</small></label>
                            <Col xs={9}>
                                <input type="text" className="form-control input-sm" placeholder="Element Classes" value={this.props.tag && this.props.tag.attr && this.props.tag.attr.class || ''} onChange={this.onClassesChange.bind(this)}/>
                            </Col>
                        </div>
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
                    <Row className="g-padding-bottom">
                        <Col xs={4} className="text-center">
                            <div className="text-uppercase">
                                alignment
                            </div>
                            <AlignRadioButtons initialValue={(getInitialTagValue('align', this.props && this.props.tag))} onSelect={this.onAlignChange.bind(this)}/>
                        </Col>
                        <Col xs={4} className="text-center">
                            <div className="text-uppercase">
                                transform
                            </div>
                            <TransformRadioButtons initialValue={(getInitialTagValue('transform', this.props && this.props.tag))} onSelect={this.onTransformChange.bind(this)}/>
                        </Col>
                        <Col xs={4} className="text-center">
                            <div className="text-center text-uppercase">
                                no wrap
                            </div>
                            <Switch initialValue={(getInitialTagValue('wrap', this.props && this.props.tag))} onValue="nowrap" offValue="" onChange={this.onWrapChange.bind(this)} />
                        </Col>
                    </Row>
                    <Row className="g-padding-bottom">
                        <Col xs={12}>
                            <div className="text-uppercase">
                                color
                            </div>
                        </Col>
                        <Col xs={12}>
                            <ColorRadioButtons initialValue={(getInitialTagValue('color', this.props && this.props.tag))} onSelect={this.onColorChange.bind(this)}/>
                            {/*<div className="b-bullet-color b-bullet-color_blue"/>*/}
                            {/*<div className="b-bullet-color b-bullet-color_green b-bullet-color_selected"/>*/}
                            {/*<div className="b-bullet-color b-bullet-color_red"/>*/}
                            {/*<div className="b-bullet-color b-bullet-color_yellow"/>*/}
                            {/*<div className="b-bullet-color b-bullet-color_magenta"/>*/}
                            {/*<div className="b-bullet-color b-bullet-color_dark-blue"/>*/}
                            {/*<div className="b-bullet-color b-bullet-color_light-grey"/>*/}
                            {/*<div className="b-bullet-color b-bullet-color_black"/>*/}
                            {/*<div className="b-bullet-color b-bullet-color_grey"/>*/}
                        </Col>
                    </Row>
                </div>
            </Panel>
        );
    }

}