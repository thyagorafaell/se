
export function toggleTodoState(id) {
    return {
        type: 'TODO_TOGGLE_DONE',
        id
    };
}

export function addTodo(text) {
    return {
        type: 'ADD_TODO',
        text
    }
}

export function changeFilterState(id) {
    return {
        type: 'FILTER_OPTION_CHANGE',
        id
    }
}