YUI.add('todo-view', function(Y){
TodoView = Y.TodoView = Y.Base.create('todoView', Y.View, [], {
  containerTemplate: '<li class="todo-item"/>',

  events: {
    '.todo-checkbox': {click: 'toggleDone'},

    '.todo-content': {
      click: 'edit',
      focus: 'edit'
    },

    '.todo-input'   : {
      blur    : 'save',
      keypress: 'enter'
    },

    '.todo-remove': {click: 'remove'}
  },

  template: null,

  initializer: function () {
    if(!Y.Lang.isNull(Y.one('#todo-item-template'))) {
      this.template = Y.one('#todo-item-template').getHTML();
    }

    var model = this.get('model');

    model.after('change', this.render, this);

    model.after('destroy', function () {
      this.destroy({remove: true});
    }, this);
  },

  render: function () {
    var container = this.get('container'),
        model     = this.get('model'),
        done      = model.get('done');

    container.setHTML(Y.Lang.sub(this.template, {
      checked: done ? 'checked' : '',
      text   : model.getAsHTML('text')
    }));

    container[done ? 'addClass' : 'removeClass']('todo-done');
    this.set('inputNode', container.one('.todo-input'));

    return this;
  },

  edit: function () {
    this.get('container').addClass('editing');
    this.get('inputNode').focus();
  },

  enter: function (e) {
    if (e.keyCode === 13) { // enter key
      Y.one('#new-todo').focus();
    }
  },

  remove: function (e) {
    e.preventDefault();

    this.constructor.superclass.remove.call(this);
    this.get('model').destroy({'delete': true});
  },

  save: function () {
    this.get('container').removeClass('editing');
    this.get('model').set('text', this.get('inputNode').get('value')).save();
  },

  toggleDone: function () {
    this.get('model').toggleDone();
  }
});

}, '0.1', { requires: ['view', 'model', 'event-focus'] });
