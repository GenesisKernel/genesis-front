import * as React from 'react';
import styled from 'styled-components';
import imgSwitchOn from 'images/constructor/group-18.svg';
import imgSwitchOff from 'images/constructor/group-29.svg';

interface ISwitchProps {
    onChange?: any;
    default?: boolean;
}

interface ISwitchState {
    value: boolean;
}

const ImgSwitch = styled.img`
    width: 30px;
`;

export default class Switch extends React.Component<ISwitchProps, ISwitchState> {

    constructor(props: ISwitchProps) {
        super(props);
        this.state = {
            value: (this.props.default ? true : false)
        };
    }

    render() {
        return (
            <div className="b-switch" onClick={this.change.bind(this)}>
                <ImgSwitch src={this.state.value ? imgSwitchOn : imgSwitchOff} />
            </div>
        );
    }
    change() {
        let value: boolean = !this.state.value;
        this.setState({
            value
        });
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }
}
