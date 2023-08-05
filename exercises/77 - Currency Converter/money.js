import { $, on } from './utils.js';
import { init } from './init.js';

const app = $('.app');
on(app, 'mouseenter', init, { once: true });
