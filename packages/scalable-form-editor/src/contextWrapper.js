/**
 * DragDropContext HOC
 */

import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';

export default function contextWrapper(YComponent) {
    return DragDropContext(HTML5Backend)(YComponent);
}