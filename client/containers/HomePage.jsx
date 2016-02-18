HomePage = class HomePage extends React.Component {
    getMeteorData() {
        return {
            apps: Application.find().fetch(),
            user: Meteor.user()
        };
    }

    deleteApp(appId) {
        Meteor.call('app.delete', appId, (err) => {
            if (!err) {
                FlashMessages.sendSuccess('App deleted successfully!');
            }
        });
    }

    render() {
        if (_.isNull(this.data.user)) {
            return <div></div>
        }

        return (
            <div>
                <h2>Apps</h2>
                <ul>
                    {this.data.apps.map((app) => {
                        return (
                            <li key={app._id}>
                                <a href={FlowRouter.path('appManage', {id: app._id})}>{app.name}</a>
                                - Key: {app.authKey}
                                - <a href={FlowRouter.path('appUpdate', {id: app._id})}>edit</a>
                                - <a onClick={() => this.deleteApp(app._id)}>delete</a>
                            </li>
                        )
                    })}
                </ul>
                <a href={FlowRouter.path('appCreate')}>create app</a>
            </div>
        )
    }
};

reactMixin(HomePage.prototype, ReactMeteorData);
