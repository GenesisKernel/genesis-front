// MIT License
//
// Copyright (c) 2016-2018 AplaProject
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

class Properties {
    private propertiesClasses = {
        'align': {
            'left': 'text-left',
            'center': 'text-center',
            'right': 'text-right'
        },
        'transform': {
            'lowercase': 'text-lowercase',
            'uppercase': 'text-uppercase'
        },
        'wrap': {
            'nowrap': 'text-nowrap'
        },
        'color': {
            'muted': 'text-muted',
            'primary': 'text-primary',
            'success': 'text-success',
            'info': 'text-info',
            'warning': 'text-warning',
            'danger': 'text-danger'
        },
        'btn': {
            'default': 'btn btn-default',
            'primary': 'btn btn-primary',
            'success': 'btn btn-success',
            'info': 'btn btn-info',
            'warning': 'btn btn-warning',
            'danger': 'btn btn-danger',
            'link': 'btn btn-link',
            'basic': 'btn'
        }
    };

    private getPropertyValue(propertyClasses: any, classes: string) {
        for (const value of Object.keys(propertyClasses)) {
            if (classes.indexOf(' ' + propertyClasses[value] + ' ') >= 0) {
                return value;
            }
        }
        return '';
    }

    public getInitial(property: string, tag: any) {
        let classes = tag && tag.attr && tag.attr.class || '';
        classes = ' ' + classes + ' ';
        const propertyClasses = this.propertiesClasses[property] || {};

        return this.getPropertyValue(propertyClasses, classes);
    }

    private removePropertyValues(classes: string, property: string) {
        for (const prop of Object.keys(this.propertiesClasses[property])) {
            classes = classes.replace(this.propertiesClasses[property][prop], '');
        }
        return classes;
    }

    private addPropertyValues(classes: string, property: string, value: string) {
        if (this.propertiesClasses[property][value]) {
            classes += ' ' + this.propertiesClasses[property][value];
        }
        return classes;
    }

    public updateClassList(classes: string, property: string, value: string) {
        switch (property) {
            case 'align':
            case 'transform':
            case 'wrap':
            case 'color':
            case 'btn':
                classes = this.removePropertyValues(classes, property);
                classes = this.addPropertyValues(classes, property, value);
                break;
            default:
                break;
        }
        return classes.replace(/\s+/g, ' ').trim();
    }
}

export default Properties;

export const getInitialTagValue = (prop: string, tag: any): string => {
    let properties = new Properties();
    return properties.getInitial(prop, tag);
};