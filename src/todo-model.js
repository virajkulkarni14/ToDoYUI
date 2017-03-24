YUI.add('todo-model', function(Y){
TodoModel = Y.TodoModel = Y.Base.create('todoModel', Y.Model, [], {
  sync: LocalStorageSync('todo'),

  toggleDone: function () {
    this.set('done', !this.get('done')).save();
  }
}, {
  ATTRS: {
    done: {value: false},

    text: {value: ''}
  }
});

}, '0.1', { requires: ['event-focus', 'model', 'local-storage-sync'] });
