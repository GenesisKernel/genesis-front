import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import Panel from './Panel';

import imgAlignLeft from 'images/constructor/group-28.svg';
import imgAlignCenter from 'images/constructor/group-27.svg';
import imgAlignRight from 'images/constructor/group-26.svg';
import imgSwitchOff from 'images/constructor/group-29.svg';
import imgLowercase from 'images/constructor/tt-lower.svg';
import imgUppercase from 'images/constructor/tt-upper.svg';

interface IPropertiesProps {
    changePage?: any;
    tag?: any;
}

interface IPropertiesState {

}

export default class Properties extends React.Component<IPropertiesProps, IPropertiesState> {

    // constructor(props: IPropertiesProps) {
    //     super(props);
    // }

    // componentWillReceiveProps(props: IPropertiesProps) {
    // }

    onClassesChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.changePage({ class: e.target.value, tagID: this.props.tag.id });
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
                    <Row className="g-padding-bottom">
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
                            <div className="b-bullet b-bullet_selected">
                                <img src={imgAlignLeft} />
                            </div>
                            <div className="b-bullet">
                                <img src={imgAlignCenter} />
                            </div>
                            <div className="b-bullet">
                                <img src={imgAlignRight} />
                            </div>
                        </Col>
                        <Col xs={4} className="text-center">
                            <div className="text-uppercase">
                                transform
                            </div>
                            <div className="b-bullet b-bullet_selected">
                                <img src={imgUppercase} />
                            </div>
                            <div className="b-bullet">
                                <img src={imgLowercase} />
                            </div>
                        </Col>
                        <Col xs={4} className="text-center">
                            <div className="text-center text-uppercase">
                                no wrap
                            </div>
                            <div className="b-switch">
                                <img src={imgSwitchOff} />
                            </div>
                        </Col>
                    </Row>
                    <Row className="g-padding-bottom">
                        <Col xs={12}>
                            <div className="text-uppercase">
                                color
                            </div>
                        </Col>
                        <Col xs={12}>
                            <div className="b-bullet-color b-bullet-color_blue"/>
                            <div className="b-bullet-color b-bullet-color_green b-bullet-color_selected"/>
                            <div className="b-bullet-color b-bullet-color_red"/>
                            <div className="b-bullet-color b-bullet-color_yellow"/>
                            <div className="b-bullet-color b-bullet-color_magenta"/>
                            <div className="b-bullet-color b-bullet-color_dark-blue"/>
                            <div className="b-bullet-color b-bullet-color_light-grey"/>
                            <div className="b-bullet-color b-bullet-color_black"/>
                            <div className="b-bullet-color b-bullet-color_grey"/>
                        </Col>
                    </Row>
                </div>
            </Panel>
        );
    }

}