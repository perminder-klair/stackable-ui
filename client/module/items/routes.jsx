FlowRouter.route('/items/:appId', {
    name: 'itemsList',
    action: function (params) {
        ReactLayout.render(MainLayout, {
            content: <ItemsList appId={params.appId}/>
        });
    }
});

FlowRouter.route('/item/create/:type/:appId', {
    name: 'itemCreate',
    action: function (params) {
        let data = {type: params.type, appId: params.appId};
        Meteor.call('item.create', data, (err, res) => {
            if (!err) {
                //console.log('result is:', res);
                ReactLayout.render(MainLayout, {
                    content: <ItemUpdate id={res._id}/>
                });
            }
        });
    }
});

FlowRouter.route('/item/update/:type/:id', {
    name: 'itemUpdate',
    action: function (params) {
        ReactLayout.render(MainLayout, {
            content: <ItemUpdate id={params.id}/>
        });
    }
});