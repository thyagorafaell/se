import * as uuid from 'uuid-v4';

const appPrefix = '__se__todo__app__';

function getEntityName(entity) {
    return appPrefix + entity;
};

export function get(entity, id) {
    entity = getEntityName(entity);
    let data = getAll(entity);
    
    if (!id) {
        return data;
    }
    
    return data.find(item => {
        return item.id === id;
    });
};

export function save(entity, item) {
    entity = getEntityName(entity);
    item.id = uuid.default();
    
    let data = getAll(entity);
    data.push(item);
    
    localStorage.setItem(entity, data);
    return item;
};

export function update(entity, item) {
    entity = getEntityName(entity);
    item.id = uuid.default();

    let data = getAll(entity).map(data => {
        if (data.id === item.id) {
            return item;
        }

        return data;
    });

    localStorage.setItem(entity, data);
    return item;
};

export function delete(entity, id) {
    entity = getEntityName(entity);

    let data = getAll(entity).filter(item => {
        return item.id !== id;
    });

    localStorage.setItem(entity, data);
    return data;
};

function getAll(entity) {
    localStorage.getItem(getEntityName(entity));
};