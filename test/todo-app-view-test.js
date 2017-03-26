YUI.add('todo-app-view-test', function(Y){
	"use strict";
	var Assert      = Y.Assert,
    TodoAppView 	= new Y.TodoAppView(),
    suite;

	suite = new Y.Test.Suite('TodoAppView Suite');

	suite.add(new Y.Test.Case({
    name : "Todo App View Tests",

		'Creating a TodoAppView creates a todo list as well' : function () {
      Assert.isNotNull(TodoAppView.todoList);
    }

  }));

	Y.Test.Runner.add(suite);

}, 0.1, {requires:['todo-app-view']});
