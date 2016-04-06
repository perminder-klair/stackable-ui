ContainerUpdate = class ContainerUpdate extends React.Component {
    componentDidMount() {
        trackEvent('Updating Container');
    }

    getMeteorData() {
        let handle = Meteor.subscribe('containers.single', this.props.id);

        return {
            loading: !handle.ready(),
            container: Container.findOne(this.props.id)
        };
    }

    handleSubmit = (data) => {
        let formData = {
            name: data.name,
            items: data.items,
            isSingleItem: data.isSingleItem
        };

        Meteor.call('container.update', this.props.id, formData, (err, res) => {
            //console.log(err, res);
            if (!err) {
                FlashMessages.sendSuccess('Container updated successfully!');
            }
        });
    };

    render() {
        if (this.data.loading) {
            return <Loading active={true}/>
        }

        return <ContainerUpdateForm appId={this.data.container.appId} container={this.data.container} handleSubmit={this.handleSubmit}/>
    }
};

reactMixin(ContainerUpdate.prototype, ReactMeteorData);
