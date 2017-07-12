import {createStore} from './lib/state';

const initialState = {
    todos: [
        {
            id: 0,
            text: 'Take a look at the application',
            done: true
        },
        {
            id: 1,
            text: 'Add ability to filter todos',
            done: false
        },
        {
            id: 2,
            text: 'Filter todos by status',
            done: false
        },
        {
            id: 3,
            text: 'Filter todos by text',
            done: false
        }
    ],
    filters: [
        {
            id: 'all',
            text: 'Mostrar todos',
            selected: true
        },
        {
            id: 'open',
            text: 'Somente abertos',
            selected: false
        },
        {
            id: 'done',
            text: 'Somente fechados',
            selected: false
        }
    ]
};

function todoChangeHandler(state, change) {
    switch(change.type) {
        case 'ADD_TODO':
            state.todos.push({
                id: state.todos.length,
                text: change.text,
                done: false
            });
            break;
        case 'TODO_TOGGLE_DONE':
            for(let todo of state.todos) {
                if(todo.id === change.id) {
                    todo.done = !todo.done;
                    break;
                }
            }
            break;
    }
}

function filterChangeHandler(state, change) {
    switch(change.type) {
        case 'FILTER_OPTION_CHANGE':
            state.filters.map(option => {
              option.selected = false;

              if (option.id === change.id) {
                  option.selected = true;
              }

              return option;
            });

            break;
    }
}

export const todos = createStore(todoChangeHandler, initialState);
export const filters = createStore(filterChangeHandler, initialState);
