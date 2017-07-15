'use babel';

import RunTestInTerminalView from './run-test-in-terminal-view';
import { CompositeDisposable } from 'atom';

export default {

  runTestInTerminalView: null,
  modalPanel: null,
  subscriptions: null,
  config: {
    "testRunner": {
      "title": "Test Runner",
      "type": "string",
      "default": "rspec"
    }
  },

  activate(state) {
    console.log('activating');

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'run-test-in-terminal:run-test': () => this.runTestInTerminal()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.runTestInTerminalView.destroy();
  },

  consumeRunInTerminal(runInTerminal) {
    this.terminalRunner = runInTerminal;
  },

  runTestInTerminal() {
    console.log("running tests");
    editor = atom.workspace.getActiveTextEditor()
    cursor = editor.getLastCursor()
    line = cursor.getBufferRow() + 1
    command = atom.config.get("run-test-in-terminal.testRunner")
    this.terminalRunner.run([`${command} ${editor.getPath()}:${line}`]);
  },

  toggle() {
    console.log('RunTestInTerminal was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },

};
