import * as React from 'react';
import styled from 'styled-components';

const PanelDiv = styled.div`
    .b-panel__header {
        position: relative;
        height: 31px;
        background-color: #3a4653;
        padding-left: 20px;
    }
    
    .b-panel__header__text {
        line-height: 31px;
        font-size: 14px;
        font-family: "Avenir-Book", "Source Sans Pro", sans-serif;
        text-transform: uppercase;
        color: #707c91;
    }
    
    .b-panel__header__toggle {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 16px;
        height: 3px;
        background-color: #dcdfe2;
        cursor: pointer;
    }
    
    .b-panel__body {
        background-color: #465669;
        min-height: 100px;
    }   
`;

interface IConstructorPanelProps {
    title: string;
}

const ConstructorPanel: React.SFC<IConstructorPanelProps> = (props) => (
    <PanelDiv>
        <div className="b-panel__header">
            <div className="b-panel__header__text">
                {props.title}
            </div>
            <div className="b-panel__header__toggle"/>
        </div>
        <div className="b-panel__body">
            {props.children}
        </div>
    </PanelDiv>
);

export default ConstructorPanel;