import * as React from 'react';
import * as classnames from 'classnames';

interface IRadioButtonProps {
    src?: any;
    value: string;
    selectedValue?: string;
    onClick?: any;

}

interface IRadioButtonState {

}

export default class RadioButton extends React.Component<IRadioButtonProps, IRadioButtonState> {

    constructor(props: IRadioButtonProps) {
        super(props);
    }

    render() {
        const classes = classnames({
            'b-bullet': true,
            'b-bullet_selected': this.props.value === this.props.selectedValue
        });
        return (
            <div className={classes} onClick={this.props.onClick.bind(this, this.props.value)}>
                {this.props.children}
            </div>
        );
    }
}