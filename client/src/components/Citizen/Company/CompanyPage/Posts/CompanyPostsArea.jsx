import React, { Component } from 'react';
import lang from "../../../../../language.json"

export default class CompanyPostsArea extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className='mt-3 pb-5'>
        {!posts[0] ? (
          <p>{lang.citizen.company.no_posts}</p>
        ) : (
          posts.map((post, index) => {
            return (
              <div key={index} className='card bg-dark border-dark mt-2'>
                <div className='card-header'>{post.title}</div>
                <div className='card-body'>{post.description}</div>
                <div className='card-footer'>
                  <span className='font-weight-bold'>{lang.citizen.company.uploaded_at}: </span>
                  {post.uploadedAt} |{' '}
                  <span className='font-weight-bold'>{lang.citizen.company.uploaded_by}: </span>
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
