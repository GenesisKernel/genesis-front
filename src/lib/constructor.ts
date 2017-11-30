let result = null;

const findTagById = (el: any, id: string): any => {
    result = null;
    findNextTagById(el, id);
    return result;
};

const findNextTagById = (el: any, id: string): any => {
    if (el.id === id) {
        result = el;
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

export default findTagById;