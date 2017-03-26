YUI.add('todo-model-test', function(Y){
	"use strict";
	var Assert      = Y.Assert,
    TodoModel 		= new Y.TodoModel(),
    suite;

	suite = new Y.Test.Suite('TodoModel Suite');

	suite.add(new Y.Test.Case({

        name : "Todo Model Tests",

		'Calling toggleDone should toggle the done attribute on the todo-model' : function () {
			var doneValueBefore = TodoModel.set('done', false);
			TodoModel.toggleDone();
			var doneValueAfter = TodoModel.get('done');
			Assert.isTrue(doneValueAfter);

			doneValueBefore = TodoModel.set('done', true);
			TodoModel.toggleDone();
			doneValueAfter = TodoModel.get('done');
			Assert.isFalse(doneValueAfter);
        }

    }));

	Y.Test.Runner.add(suite);

}, 0.1, {requires:['todo-model']});
