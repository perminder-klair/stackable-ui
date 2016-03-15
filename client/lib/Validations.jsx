Validations = class Validations {

};

TextFieldValidations = class TextFieldValidations extends React.Component {
    static defaultProps = {
        showType: false
    };

    static propTypes = {
        onChange: React.PropTypes.func.isRequired,
        value: React.PropTypes.object.isRequired,
        showType: React.PropTypes.bool
    };

    constructor(props) {
        super(props);

        this.state = this.loadState(props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.loadState(nextProps));
    }

    componentDidUpdate() {
        let self = this;
        $('.ui.checkbox.between')
            .checkbox({
                'onChecked' : function() {
                    self.setState({between: true}, () => self.props.onChange(self.state));
                },
                'onUnchecked' : function() {
                    self.setState({between: false}, () => self.props.onChange(self.state));
                }
            })
            .checkbox(self.state.between ? 'set checked' : 'set unchecked');

        $('.ui.dropdown.type')
            .dropdown({
                'onChange' : function (value) {
                    self.setState({type: value}, () => self.props.onChange(self.state));
                }
            })
            .dropdown('set text', self.state.type);
    }

    loadState(props) {
        let data = {
            between: !_.isUndefined(props.value.between) ? props.value.between : false,
            min: !_.isUndefined(props.value.min) ? props.value.min : null,
            max: !_.isUndefined(props.value.max) ? props.value.max : null
        };

        if (props.showType) {
            data['type'] = !_.isUndefined(props.value.type) ? props.value.type : 'any';
        }

        return data;
    }

    triggerChange = () => {
        this.props.onChange(this.state);
    };

    render() {
        return (
            <div className="fieldsValidations">
                <div className="inline field">
                    <div className="ui slider checkbox between">
                        <input type="checkbox" tabIndex="0" className="hidden" />
                        <label>Number of characters between</label>
                    </div>
                </div>
                {this.state.between ?
                <div className="fields">
                    <div className="one wide field"></div>
                    <div className="four wide field">
                        <label>Minimum</label>
                        <input
                            type="number"
                            placeholder="Min characters"
                            value={this.state.min}
                            onChange={(e) => this.setState({min: e.target.value})}
                            onBlur={this.triggerChange}/>
                    </div>
                    <div className="four wide field">
                        <label>Maximum</label>
                        <input
                            type="number"
                            placeholder="Max characters"
                            value={this.state.max}
                            onChange={(e) => this.setState({max: e.target.value})}
                            onBlur={this.triggerChange}/>
                    </div>
                </div>:''}
                {this.props.showType ?
                <div className="field">
                    <label>Field Type</label>
                    <select className="ui fluid normal dropdown type">
                        <option value="any">Any</option>
                        <option value="email">Email</option>
                        <option value="url">URL</option>
                    </select>
                </div>:''}
            </div>
        )
    }
};

EnomFieldValidations = class EnomFieldValidations extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func.isRequired,
        value: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            options: !_.isUndefined(props.value.options) ? props.value.options : ''
        }
    }

    triggerChange = () => {
        this.props.onChange(this.state);
    };

    render() {
        return (
            <div className="fieldsValidations">
                <div className="ui small message">
                    Comma separated options to create drop down.
                </div>
                <div className="field">
                    <label>Options</label>
                    <input
                        type="text"
                        placeholder="EG: apple, mangoes, banana"
                        value={this.state.options}
                        onChange={(e) => this.setState({options: e.target.value})}
                        onBlur={this.triggerChange}/>
                </div>
            </div>
        )
    }
};