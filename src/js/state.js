import {createStore} from 'redux';
import {get, save, update} from './lib/storage';
import {run} from './migrations/V1';

run();

const initialState = {
    todos: get('todos'),
    filters: get('filters')
};

function todoChangeHandler(state = initialState.todos, change) {
    switch(change.type) {
        case 'ADD_TODO':
            save('todos', {
                text: change.text,
                done: false
            });

            state.todos = get('todos');
            return state;
            break;
        case 'TODO_TOGGLE_DONE':
            let todo = state.todos.find(todo => {
                return todo.id === change.id;
            });

            todo.done = !todo.done;

            update('todos', todo);
            state.todos = get('todos');
            return state;
            break;
        default:
            return state;
    }
}

function filterChangeHandler(state = initialState.filters, change) {
    switch(change.type) {
        case 'FILTER_OPTION_CHANGE':
            state.filters.forEach(option => {
                option.selected = false;

                if (option.id === change.id) {
                    option.selected = true;
                }

                update('filters', option);
            });

            return state;
            break;
        default:
            return state;
    }
}

export const todos = createStore(todoChangeHandler, initialState);
export const filters = createStore(filterChangeHandler, initialState);
