import {createStore} from './lib/state';
import {get, save, update} from './lib/storage';
import {run} from './migrations/V1';

run();

const initialState = {
    todos: get('todos'),
    filters: get('filters')
};

function todoChangeHandler(state, change) {
    switch(change.type) {
        case 'ADD_TODO':
            save('todos', {
                text: change.text,
                done: false
            });

            break;
        case 'TODO_TOGGLE_DONE':
            let todo = state.todos.find(todo => {
                return todo.id === change.id;
            });

            todo.done = !todo.done;

            update('todos', todo);
            break;
    }
}

function filterChangeHandler(state, change) {
    switch(change.type) {
        case 'FILTER_OPTION_CHANGE':
            state.filters.forEach(option => {
                option.selected = false;

                if (option.id === change.id) {
                    option.selected = true;
                }

                update('filters', option);
            });

            break;
    }
}

export const todos = createStore(todoChangeHandler, initialState);
export const filters = createStore(filterChangeHandler, initialState);
