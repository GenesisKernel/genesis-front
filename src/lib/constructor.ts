import { IProtypoElement } from 'components/Protypo/Protypo';

let findTagByIdResult = null;

const findTagById = (el: any, id: string): any => {
    findTagByIdResult = null;
    findNextTagById(el, id);
    return findTagByIdResult;
};

const findNextTagById = (el: any, id: string): any => {
    if (el.id === id) {
        findTagByIdResult = el;
    }
    if (el instanceof Array) {
        for (var i = 0; i < el.length; i++) {
            findNextTagById(el[i], id);
        }
    }
    if (el.children) {
        findNextTagById(el.children, id);
    }
};

let onPasteStripFormattingIEPaste: boolean = false;

export function OnPasteStripFormatting(elem: any, e: any) {
    let text: string;
    if (e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData) {
        e.preventDefault();
        text = e.originalEvent.clipboardData.getData('text/plain');
        window.document.execCommand('insertText', false, text);
    }
    else if (e.clipboardData && e.clipboardData.getData) {
        e.preventDefault();
        text = e.clipboardData.getData('text/plain');
        window.document.execCommand('insertText', false, text);
    }
    else if (window['clipboardData'] && window['clipboardData'].getData) {
        // Stop stack overflow
        if (!onPasteStripFormattingIEPaste) {
            onPasteStripFormattingIEPaste = true;
            e.preventDefault();
            window.document.execCommand('ms-pasteTextOnly', false);
        }
        onPasteStripFormattingIEPaste = false;
    }
}

class Tag {
    private element: IProtypoElement;
    protected tagName: string = 'Tag';
    constructor(element: IProtypoElement) {
        this.element = element;
    }
    renderCode(): string {
        let result: string = this.tagName + '(';
        let params = [];
        params.push('Class: ' + (this.element && this.element.attr && this.element.attr.class || ''));
        let body = this.renderChildren();
        if (body.length > 0) {
           params.push('Body: ' + body);
        }
        result += params.join(', ');
        result += ') ';
        return result;
    }
    renderChildren(): string {
        if (!this.element.children) {
            return '';
        }
        let result = this.element.children.map((element, index) => {
            switch (element.tag) {
                case 'text':
                    return element.text;
                default:
                    const Handler = resolveTagHandler(element.tag);
                    if (Handler) {
                        let tag = new Handler(element);
                        return tag.renderCode();
                    }
                    return '';
            }
        }).join('\n');

        if (result.length > 0) {
            return result;
        }

        return '';
    }
}

class P extends Tag {
    constructor(element: IProtypoElement) {
        super(element);
        this.tagName = 'P';
    }
}

class Div extends Tag {
    constructor(element: IProtypoElement) {
        super(element);
        this.tagName = 'Div';
    }
}

class Span extends Tag {
    constructor(element: IProtypoElement) {
        super(element);
        this.tagName = 'Span';
    }
}

class Strong extends Tag {
    constructor(element: IProtypoElement) {
        super(element);
        this.tagName = 'Strong';
    }
}

export class CodeGenerator {
    private elements: IProtypoElement[];
    constructor(elements: IProtypoElement[]) {
        this.elements = elements;
    }
    render(): string {
        if (!this.elements) {
            return '';
        }
        return this.elements.map((element, index) => {
            switch (element.tag) {
                case 'text':
                    return element.text;
                default:
                    const Handler = resolveTagHandler(element.tag);
                    if (Handler) {
                        let tag = new Handler(element);
                        return tag.renderCode();
                    }
                    return '';
            }
        }).join('\n');
    }
}

const tagHandlers = {
//     'button': Button,
//     'data': Data,
//     'dbfind': DBFind,
    'div': Div,
//     'em': Em,
//     'forlist': ForList,
//     'form': Form,
//     'image': Image,
//     'imageinput': ImageInput,
//     'input': Input,
//     'inputerr': InputErr,
//     'label': Label,
//     'linkpage': LinkPage,
//     'menuitem': MenuItem,
//     'menugroup': MenuGroup,
    'p': P,
//     'radiogroup': RadioGroup,
//     'select': Select,
    'span': Span,
    'strong': Strong,
//     'table': Table
};

const resolveTagHandler = (name: string) => {
    return tagHandlers[name];
};

export default findTagById;