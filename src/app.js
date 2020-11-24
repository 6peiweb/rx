import { editor } from 'monaco-editor/esm/vs/editor/editor.main.js';

const editorContainer = document.getElementById('container');
const editorExhibition = document.getElementById('exhibition');

const log = console.log;
const monacoInstance = editor.create(editorContainer, {
	value: localStorage.getItem('content'),
	language: 'javascript',
});


monacoInstance.onDidChangeModelContent(setExhibition), setExhibition();

function setExhibition() {
	editorExhibition.innerHTML = '';
	console.log = function (...args) {
		editorExhibition.innerHTML += args.join(' ') + '<br />';
		log(...args);
	}
	const jsContent = monacoInstance.getValue();
	localStorage.setItem('content', jsContent);
	try {
		const value = eval(jsContent);
		if (value !== undefined) {
			editorExhibition.innerHTML += value;
		}
	} catch (e) {
		editorExhibition.innerHTML = e.stack.replace(/at\b/g, '<br />at');
	}
}

addEventListener('keydown', e => {
	if (e.keyCode == 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
		e.preventDefault();
	}
}, false);