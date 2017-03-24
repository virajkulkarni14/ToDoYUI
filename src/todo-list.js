YUI.add('todo-list', function(Y){
TodoList = Y.TodoList = Y.Base.create('todoList', Y.ModelList, [], {
  model: TodoModel,

  sync: LocalStorageSync('todo'),

  done: function () {
    return this.filter(function (model) {
      return model.get('done');
    });
  },

  remaining: function () {
    return this.filter(function (model) {
      return !model.get('done');
    });
  }
});

}, '0.1', { requires: ['todo-model', 'local-storage-sync', 'model-list'] });
