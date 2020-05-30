import React, { Component } from 'react';

export default class CompanyPostsArea extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className='mt-3 pb-5'>
        {!posts[0] ? (
          <p>No Posts Found</p>
        ) : (
          posts.map((post, index) => {
            return (
              <div key={index} className='card bg-dark border-dark mt-2'>
                <div className='card-header'>{post.title}</div>
                <div className='card-body'>{post.description}</div>
                <div className='card-footer'>
                  <span className='font-weight-bold'>Uploaded At: </span>
                  {post.uploadedAt} |{' '}
                  <span className='font-weight-bold'>Uploaded By: </span>
                  {post.uploadedBy}
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
}
