import {isEnabled} from './lib/feature';
import {filterTodoItens} from './filters';

export function render(el, state) {
    const filters = state.filters.map(renderFilter).join('');
    let todoItems = filterTodoItens(state);
    
    todoItems = todoItems.map(renderTodoItem).join('');

    el.innerHTML = renderApp(
        renderInput(),
        renderTodos(todoItems),
        renderFilters(filters)
    );

    document.getElementById('todoInput').focus();
}

function renderApp(input, todoList, filter) {
    let content = renderAddTodoContent(input, todoList);

    if(isEnabled('filter')) {
        content = renderFilterAndTodoContent(filter, content);
    }

    return `<div id="app">${content}</div>`;
}

function renderFilterAndTodoContent(filter, content) {
    if(isEnabled('filter')) {
        if(isEnabled('renderBottom') && isEnabled('filterTop')) {
            return filter + content;
        }

        return content += filter;
    }
}

function renderAddTodoContent(input, todoList) {
  if(isEnabled('renderBottom')) {
    return `${todoList} ${input}`;
  }

  return `${input} ${todoList}`;
}

function renderInput() {
    return `
        <div class="todo__input">
            <form>
                <input type="text" id="todoInput">
                <button type="submit" id="addTodo">Add</button>
            </form>
        </div>
    `;
}

function renderTodos(todoItems) {
    return `<ul class="todo">${todoItems}</ul>`;
}

function renderTodoItem(todo) {
    const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;

    return `<li class="${todoClass}">
        <input class="js_toggle_todo" type="checkbox" data-id="${todo.id}"${todo.done ? ' checked' : ''}>
        ${todo.text}
    </li>`;
}

function renderFilters(filters) {
    return `<ul class="filter">${filters}</ul>`;
}

function renderFilter(filter) {
    const filterClass = `filter__option ${filter.selected ? 'filter__option--selected' : ''}`;

    return `<li class="${filterClass}">
        <input type="radio" class="js_select_situation" id="${filter.id}" ${filter.selected ? ' checked' : ''} name="todo-filter-situation-option">
        <label for="${filter.id}">${filter.text}</label>
    </li>`;
}