import './src/script/components/app-bar.js';
import './src/script/components/noteForm.js';
import './src/script/components/noteSearch.js';
import './src/script/components/noteItem.js';
import './src/styles/style.css';
import './src/script/app.js';
import { main } from './src/script/app.js';

main();
const spinner = document.getElementById('spinner');
if (spinner) {
    spinner.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], {
        duration: 1000,
        iterations: Infinity,
    });
}
