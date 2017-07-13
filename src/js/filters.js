import {isEnabled} from './lib/feature';

export function filterTodoItens(state) {
    let situation = state.filters.find(filter => {
        return !!filter.selected;
    });

    if (!isEnabled('filter')) {
        situation = state.filters.find(filter => {
            return !!filter.default;
        });
    }

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