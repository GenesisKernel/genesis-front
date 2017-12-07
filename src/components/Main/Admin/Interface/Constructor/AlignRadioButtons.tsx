import * as React from 'react';
// import { ReactElement } from 'react';
import RadioButton from './RadioButton';

import imgAlignLeft from 'images/constructor/group-28.svg';
import imgAlignCenter from 'images/constructor/group-27.svg';
import imgAlignRight from 'images/constructor/group-26.svg';

interface IRadioButtonsProps {
    onSelect?: any;
}

interface IRadioButtonsState {
    value: string;
}

export default class RadioButtons extends React.Component<IRadioButtonsProps, IRadioButtonsState> {

    constructor(props: IRadioButtonsProps) {
        super(props);
        this.state = {
            value: null
        };
    }

    render() {
        return (
            <div>
                <RadioButton value="alignLeft" onClick={this.selectRadio.bind(this, 'alignLeft')} selectedValue={this.state.value}>
                    <img src={imgAlignLeft} title="align left"/>
                </RadioButton>
                <RadioButton value="alignCenter" onClick={this.selectRadio.bind(this, 'alignCenter')} selectedValue={this.state.value}>
                    <img src={imgAlignCenter} title="align center"/>
                </RadioButton>
                <RadioButton value="alignRight" onClick={this.selectRadio.bind(this, 'alignRight')} selectedValue={this.state.value}>
                    <img src={imgAlignRight} title="align right"/>
                </RadioButton>
            </div>
        );
    }
    selectRadio(value: string) {
        let newValue: string = (value === this.state.value ? null : value);
        this.setState({
            value: newValue
        });
        if (this.props.onSelect) {
            this.props.onSelect(newValue);
        }
    }
}
