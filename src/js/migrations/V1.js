import * as uuid from 'uuid-v4';
const appPrefix = '__se__todo__app__';

function createTodos() {
    localStorage.setItem(appPrefix + 'todos', JSON.stringify([
        {
            id: uuid.default(),
            text: 'Take a look at the application',
            done: true
        },
        {
            id: uuid.default(),
            text: 'Add ability to filter todos',
            done: false
        },
        {
            id: uuid.default(),
            text: 'Filter todos by status',
            done: false
        },
        {
            id: uuid.default(),
            text: 'Filter todos by text',
            done: false
        }
    ]));
};

function createFilters() {
    localStorage.setItem(appPrefix + 'filters', JSON.stringify([
        {
            id: 'all',
            text: 'Mostrar todos',
            selected: true,
            default: true
        },
        {
            id: 'open',
            text: 'Somente abertos',
            selected: false,
            default: false
        },
        {
            id: 'done',
            text: 'Somente fechados',
            selected: false,
            default: false
        }
    ]));
};

export function run() {
    if (!localStorage.getItem(appPrefix + 'todos')) {
        createTodos();
    }

    if (!localStorage.getItem(appPrefix + 'filters')) {
        createFilters();
    }
};
