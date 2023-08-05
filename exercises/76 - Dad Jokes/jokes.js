import { on } from './utils.js';
import { jButton } from './lib/elements.js';
import { handleClick } from './lib/handlers.js';

on(jButton, 'click', handleClick);
