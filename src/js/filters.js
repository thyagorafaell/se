export function filterTodoItens(state) {
    const
        situation = state.filters.find(filter => {
            return !!filter.selected;
        })
    
    return filterTodoBySituation(state.todos, situation);
}

function filterTodoBySituation(todos, situation) {
    if (situation.id === 'all') {
        return todos;
    }
    
    let isDone = true;
    
    if (situation.id === 'open') {
        isDone = false;
    }
    
    return todos.filter(todo => {
        return todo.done === isDone;
    });
}