import {todos, filters} from './state';
import {listen} from './lib/events';
import {addTodo, toggleTodoState, changeFilterState} from './actions';

export function registerEventHandlers() {
    listen('click', '#addTodo', event => {
        const todoInput = document.getElementById('todoInput');
        todos.dispatch(addTodo(todoInput.value));
        event.stopPropagation();
    });

    listen('click', '.js_toggle_todo', event => {
        const id = event.target.getAttribute('data-id');
        todos.dispatch(toggleTodoState(id));
    });
    
    listen('click', '.js_select_situation', event => {
        const id = event.target.getAttribute('id');
        filters.dispatch(changeFilterState(id));
    });
}
