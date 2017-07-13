import '../css/main.css';

import {todos, filters} from './state';
import {render} from './view';
import {registerEventHandlers} from './events';
import {run} from './migrations/V1';

todos.subscribe(newState => render(document.body, newState));
filters.subscribe(newState => render(document.body, newState));

run();
render(document.body, todos.getState(), filters.getState());

registerEventHandlers();