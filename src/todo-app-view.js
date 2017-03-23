YUI.add('todo-app-view', function(Y){
  TodoAppView = Y.TodoAppView = Y.Base.create('todoAppView', Y.View, [], {
    events: {
      '#new-todo': {keypress: 'createTodo'},

      '.todo-clear': {click: 'clearDone'},

      '.todo-item': {
        mouseover: 'hoverOn',
        mouseout : 'hoverOff'
      }
    },

    template: null,

    initializer: function () {
      var list = this.todoList = new TodoList();
      if(!Y.Lang.isNull(Y.one('#todo-stats-template'))) {
        this.template = Y.one('#todo-stats-template').getHTML();
      }

      list.after('add', this.add, this);
      list.after('reset', this.reset, this);

      list.after(['add', 'reset', 'remove', 'todoModel:doneChange'],
        this.render, this);

      list.load();
    },

    render: function () {
      var todoList = this.todoList,
          stats    = this.get('container').one('#todo-stats'),
          numRemaining, numDone;

      if (todoList.isEmpty()) {
        if(!Y.Lang.isNull(stats)) stats.empty();
        return this;
      }

      numDone      = todoList.done().length;
      numRemaining = todoList.remaining().length;

      stats.setHTML(Y.Lang.sub(this.template, {
        numDone       : numDone,
        numRemaining  : numRemaining,
        doneLabel     : numDone === 1 ? 'task' : 'tasks',
        remainingLabel: numRemaining === 1 ? 'task' : 'tasks'
      }));

      if (!numDone) {
        stats.one('.todo-clear').remove();
      }

      return this;
    },


    add: function (e) {
      var view = new TodoView({model: e.model});

      this.get('container').one('#todo-list').append(
        view.render().get('container')
      );
    },

    clearDone: function (e) {
      var done = this.todoList.done();

      e.preventDefault();

      this.todoList.remove(done, {silent: true});

      Y.Array.each(done, function (todo) {
        todo.destroy({remove: true});
      });

      this.render();
    },

    createTodo: function (e) {
      var inputNode, value;
        inputNode = this.get('inputNode');
        value     = Y.Lang.trim(inputNode.get('value'));

        if (!value) { return; }

        this.todoList.create({text: value});

        inputNode.set('value', '');
      }
    },

    hoverOff: function (e) {
      e.currentTarget.removeClass('todo-hover');
    },

    hoverOn: function (e) {
      e.currentTarget.addClass('todo-hover');
    },

    reset: function (e) {
      var fragment = Y.one(Y.config.doc.createDocumentFragment());

      Y.Array.each(e.models, function (model) {
        var view = new TodoView({model: model});
        fragment.append(view.render().get('container'));
      });
      if(!Y.Lang.isNull(this.get('container').one('#todo-list'))) {
        this.get('container').one('#todo-list').setHTML(fragment);
      }
    }
  }, {
      ATTRS: {
        container: {
          valueFn: function () {
            return '#todo-app';
          }
        },

        inputNode: {
          valueFn: function () {
            return Y.one('#new-todo');
          }
        }
      }
  });

}, '0.1', { requires: ['view', 'json', 'event-focus', 'todo-list', 'todo-view'] });
