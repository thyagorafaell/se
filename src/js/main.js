import '../css/main.css';

import {todos, filters} from './state';
import {render} from './view';
import {registerEventHandlers} from './events';

todos.subscribe(() => render(document.body, todos.getState()));
filters.subscribe(() => render(document.body, filters.getState()));

render(document.body, todos.getState());

registerEventHandlers();