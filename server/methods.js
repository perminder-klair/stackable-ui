Meteor.methods({
    'item.create': function (doc) {
        if (_.isNull(this.userId)) {
            //if not logged in
            throw new Meteor.Error('not-logged-in', 'Please login to continue.');
        }

        //check if current user own this app
        let app = Application.findOne({_id: doc.appId, 'users': this.userId});
        if (_.isUndefined(app)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this app.');
        }

        let container = Container.findOne({slug: doc.type});

        let fieldsData = {};
        container.items.map((item) => {
            fieldsData[item.title] = '';
        });

        var item = new Item();
        item.set({
            container: container.slug,
            containerId: container._id,
            data: fieldsData,
            appId: doc.appId
        });

        item.save();
        return item;

        //contentType.validate();
        //
        //if (contentType.hasValidationErrors()) {
        //    contentType.throwValidationException();
        //} else {
        //    contentType.save();
        //    return contentType;
        //}
    },
    'app.delete': function (docId) {
        let app = Application.findOne({_id: docId, 'users': this.userId});

        //check if current user own this app
        if (_.isUndefined(app)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this app.');
        }

        //remove all related containers
        Container.remove({appId: app._id});

        //remove all related items
        Item.remove({appId: app._id});

        return app.remove();
    },
    'container.delete': function (docId) {
        var container = Container.findOne({_id: docId});

        //check if current user own this app
        let app = Application.findOne({_id: container.appId, 'users': this.userId});
        if (_.isUndefined(app)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this app.');
        }

        //remove all related entries
        Item.remove({containerId: container._id});

        return container.remove();
    },
    'app.addUser': function (appId, userEmail) {
        let app = Application.findOne({_id: appId, 'users': this.userId});

        //check if current user own this app
        if (_.isUndefined(app)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this app.');
        }

        let user = User.findOne({"emails.address" : userEmail});

        //if user not found
        //todo invite user to site
        if (_.isUndefined(user)) {
            throw new Meteor.Error('not-found', 'User not found, make sure user is registered.');
        }

        //add domain to user
        user.push('apps', app._id);
        user.save();

        //add user id to app
        app.push('users', user._id);
        app.save();

        return app;
    },
    'app.removeUser': function (appId, userId) {
        let app = Application.findOne({_id: appId, 'users': this.userId});
        let user = User.findOne({_id: userId});

        //check if current user own this app
        if (_.isUndefined(app)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this app.');
        }

        //remove domain from user
        user.pull('apps', app._id);
        user.save();

        //remove user id from domain
        app.pull('users', user._id);
        app.save();

        return app;
    }
});
