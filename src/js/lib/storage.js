import * as uuid from 'uuid-v4';
const appPrefix = '__se__todo__app__';

function getEntityName(entity) {
    return appPrefix + entity;
};

export function get(entity, id) {
    let data = getAll(entity);
    
    if (!id) {
        return data;
    }
    
    return data.find(item => {
        return item.id === id;
    });
};

export function save(entity, item) {
    item.id = uuid.default();
    
    let data = getAll(entity);
    data.push(item);
    
    saveData(entity, data);
    return item;
};

export function update(entity, item) {
    let data = getAll(entity).map(data => {
        if (data.id === item.id) {
            return item;
        }

        return data;
    });

    saveData(entity, data);
    return item;
};

export function delete(entity, id) {
    let data = getAll(entity).filter(item => {
        return item.id !== id;
    });

    saveData(entity, data);
    return data;
};

function getAll(entity) {
    entity = getEntityName(entity);
    let data = localStorage.getItem(entity);

    return parse(data);
};

function saveData(entity, data) {
    entity = getEntityName(entity);
    data = prepareData(data);

    localStorage.setItem(entity, data);
};

function parse(data) {
    return JSON.parse(data);
};

function prepareData(data) {
    return JSON.stringify(data);
};
