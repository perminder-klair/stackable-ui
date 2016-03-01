Meteor.publish('items.all', function (appId, containerId) {
    check(appId, String);
    let itemFind = {};

    if (!_.isUndefined(containerId)) {
        check(containerId, String);
        itemFind['containerId'] = containerId;
    }

    //check only app owners can get data
    let app = Application.findOne({_id: appId, 'users': this.userId});
    itemFind['appId'] = app._id;

    if (this.userId && app) {
        return Item.find(itemFind, {sort: {createdAt: -1}});
    } else {
        this.ready();
    }
});

Meteor.publish('items.single', function (id) {
    check(id, String);

    let item = Item.findOne({_id: id});
    let app = Application.findOne({_id: item.appId, 'users': this.userId});

    //check only app owners can get data
    if (this.userId && app) {
        return [
            Container.find({_id: item.containerId}),
            Item.find({_id: item._id})
        ];
    } else {
        this.ready();
    }
});

Meteor.publish('items.find', function (query, limit) {
    //todo optimise and secure it
    //find by query
    let find = {};

    if (!_.isNull(query)) {
        let queryRegex = ".*" + query + ".*";
        find = {
            $or: [
                {"tags": {$regex: queryRegex, $options: 'i'}}
            ]
        };
    }

    //todo set limit
    return Item.find(find, {sort: {createdAt: -1}});
});
