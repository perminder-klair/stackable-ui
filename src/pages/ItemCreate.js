import React from 'react';

import Layout from '../components/core/Layout';
import ItemUpdateForm from '../components/items/ItemUpdateForm';
import ContainerList from '../components/items/ContainerList';
import ItemList from '../components/items/ItemList';

class ItemCreate extends React.Component {
  render() {
    const { match, location } = this.props;
    return (
      <Layout url={location.pathname}>
        <div
          className="ui grid full-height item-edit"
          style={{ marginLeft: '0' }}
        >
          <div className="two wide column containers-list">
            <button
              className="fluid ui green button"
              style={{
                lineHeight: '26px',
                padding: '0.4em 0.2em',
                textAlign: 'left',
              }}
            >
              <img
                src="/images/stack-icon.png"
                alt="stack-icon"
                style={{ width: '25px', height: 'auto', float: 'left' }}
              />
              {/* {titleize(this.props.app.name)} */} Stack Name
            </button>
            <div className="ui link list" style={{ marginTop: '30px' }}>
              <ContainerList containerId={match.params.containerId} />
            </div>
          </div>
          <ItemList
            appId={match.params.appId}
            containerId={match.params.containerId}
          />
          <ItemUpdateForm />
        </div>
      </Layout>
    );
  }
}

export default ItemCreate;

// container={this.data.container}
// allItems={this.data.allItems}
// allContainers={this.data.allContainers}
// isContainerView={isUndefined(this.props.isView)}
// app={this.data.app}
// handleSubmit={this.handleSubmit}
