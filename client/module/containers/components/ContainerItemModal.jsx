ContainerItemModal = class ContainerItemModal extends React.Component {
  static propTypes = {
    visible: React.PropTypes.bool.isRequired,
    toggleModal: React.PropTypes.func.isRequired,
    item: React.PropTypes.object.isRequired,
    update: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = this.updateState(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.updateState(nextProps));
  }

  updateState(props) {
    return {
      _id: props.item._id || Random.id(6),
      name: props.item.name || '',
      description: props.item.description || '',
      type: props.item.type || 'text',
      validations: props.item.validations || '',
      isRequired: props.item.isRequired || false,
      isDisabled: props.item.isDisabled || false,
      listing_order: props.item.listing_order || 1
    }
  }

  componentDidUpdate() {
    let self = this;
    $('#container-item-modal').modal({
      detachable: false,
      onHidden: function() {
        self.props.toggleModal()
      }
    }).modal(this.props.visible
      ? 'show'
      : 'hide');
  }

  handleSubmit = () => {
    let item = this.state;
    this.props.update(item);
    this.props.toggleModal();
  };

  render() {
    return (
      <div className="ui modal" id="container-item-modal">
        <div className="header">
          <img src="/images/logo.png"/>
          Update Item
        </div>
        <div className="content">
          <div className="ui form">
            <div className="field">
              <label>Item Name</label>
              <input type="text" name="name" placeholder="Item name" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}/>
            </div>
            <div className="field">
              <label>Item Description</label>
              <input type="text" name="description" placeholder="Item description" value={this.state.description} onChange={(e) => this.setState({description: e.target.value})}/>
            </div>
            <div className="field">
              <div className="ui checkbox">
                <input type="checkbox" name="isRequired" value={this.state.isRequired} onChange={(e) => this.setState({isRequired: e.target.value})} />
                <label>Item Required</label>
              </div>
            </div>
            <div className="field">
              <label>Item Validations</label>
              <textarea rows="3" name="validations" value={this.state.validations} onChange={(e) => this.setState({validations: e.target.value})}></textarea>
            </div>
            <div className="field">
              <label>Item Listing Order</label>
              <input type="number" name="listing_order" placeholder="Item Listing Order" value={this.state.listing_order} onChange={(e) => this.setState({listing_order: e.target.value})}/>
            </div>
            <div className="field">
              <div className="ui checkbox">
                <input type="checkbox" name="isDisabled" value={this.state.isDisabled} onChange={(e) => this.setState({isDisabled: e.target.value})} />
                <label>Item Disabled</label>
              </div>
            </div>
            <button className="ui button" type="submit" onClick={this.handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    )
  }
};
