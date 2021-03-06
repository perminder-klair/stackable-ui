import React from 'react';
import _ from 'underscore';

export default class UserStats extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          freeMonths: 0,
          modalVisible: false,
          referralCommission: SiteSettings.referralCommission
      };
  }

  componentDidMount() {
      $('#userBalance').progress({
          label: 'ratio',
          text: {
              ratio: '{value} month(s) free'
          }
      });

      $('#share-ref-modal')
          .modal({
              detachable: false
          })
          .modal(this.state.modalVisible ? 'show' : 'hide');
  }

  componentDidUpdate() {
      $('#share-ref-modal')
          .modal({
              detachable: false
          })
          .modal(this.state.modalVisible ? 'show' : 'hide');
  }

  showModal = () => {
      // trackEvent('Inviting User');
      this.setState({modalVisible: true});
  };

  renderModal() {
      const key = !_.isUndefined(this.props.user.referral) ? this.props.user.referral.key : 'invalid';
      const shareUrl = `http://www.stackable.space?ref=${key}`;

      return (
        <div className="ui modal" id="share-ref-modal" style={{padding: '0'}}>
          <div className="header">
            <img src="/images/logo.png" />
                  Share Your Link
            <i className="close icon" onClick={() => this.setState({modalVisible: false})} />
          </div>
          <div className="content" style={{textAlign: 'center'}}>
            <div className="ui segment">
              <p>Copy your personal referral link and share it with your friends and followers.</p>
            </div>

            <div className="ui action input" style={{width: '450px'}}>
              <input type="text" value={shareUrl} readOnly="true" />
              <button className="ui teal right labeled icon button">
                <i className="copy icon" />
                          Copy
              </button>
            </div>

            <br /><br />

            <a className="ui facebook button" href={`https://www.facebook.com/dialog/feed?app_id=1438439249728371&display=popup&caption=Create Dynamic Content Sites in Seconds&link=${shareUrl}&description=Create Dynamic Content Sites in Seconds at Stackable . Sign up and receive $5 in credit.`}  target="_blank" title="Share on Facebook">
              <i className="facebook icon" />
                      Facebook
            </a>

            <a className="ui twitter button" href={`http://twitter.com/share?text=Create Dynamic Content Sites in Seconds @GetStackable . Sign up and receive $5 in credit: ${shareUrl}`}  target="_blank" title="Share on Twitter">
              <i className="twitter icon" />
                      Twitter
            </a>
          </div>
        </div>
      )
  }

  render() {
      const balance = !_.isUndefined(this.props.user.referral) ? this.props.user.referral.balance : 0;

      return (
        <div className="ui grid user stats">
          <div className="two wide column">
            <div className="ui mini statistic">
              <div className="value">
                          ${balance}.00
              </div>
              <div className="label">
                          credit balance
              </div>
            </div>
          </div>
          <div className="seven wide column">
            <div className="ui blue progress" data-value={this.state.freeMonths} data-total="12" id="userBalance" onClick={this.showModal}>
              <div className="bar">
                <div className="progress" />
              </div>
              <div className="label">
                <span style={{textDecoration: 'underline'}}>invite</span> friends to get free <span style={{color: '#51B5E0'}}>production</span> plan ${this.state.referralCommission} credits per signup!
              </div>
            </div>
          </div>
          {this.renderModal()}
        </div>
      )
  }
};
