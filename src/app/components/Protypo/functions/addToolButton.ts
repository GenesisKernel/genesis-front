/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import Protypo from '../';
import { IParamsSpec } from 'components/Protypo/Protypo';

export interface IAddToolButtonProps {
    title?: string;
    icon?: string;
    page?: string;
    pageparams?: IParamsSpec;
}

const addToolButton = (context: Protypo, props: IAddToolButtonProps) => {
    context.addToolButton({
        ...props,
        pageparams: context.resolveParams(props.pageparams)
    });
};

export default addToolButton;