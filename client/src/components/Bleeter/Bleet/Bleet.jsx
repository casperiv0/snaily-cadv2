import React, { Component } from 'react';
import axios from 'axios';
import { backendURL } from '../../../config/config';
import Cookies from 'js-cookie';
import ReactMarkdown from 'react-markdown';
import LoadingArea from '../../Partials/LoadingArea';
import SuccessMessage from '../../Partials/Messages/SuccessMessage';
import { getSession } from '../../Auth/getSession';

export default class Bleet extends Component {
  constructor() {
    super();

    this.state = {
      bleet: [],
      loading: true,
      message: sessionStorage.getItem('bleeter-message'),
    };
  }

  getBleet = () => {
    axios({
      url: backendURL + '/bleeter/' + this.props.match.params.bleetId,
      method: 'GET',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    }).then((res) => {
      this.setState({
        bleet: res.data.bleet[0],
        loading: false,
      });
      document.title = res.data.bleet[0].title + ' - Bleeter';
    });
  };

  likeBleet = () => {
    axios({
      url: backendURL + '/bleeter/' + this.props.match.params.bleetId + '/like',
      method: 'POST',
      headers: {
        'x-auth-snailycad-token': Cookies.get('__session'),
      },
    })
      .then((res) => {
        if (res.data.msg === 'Liked') {
          this.getBleet();
          this.setState({
            message: 'Post Liked!',
          });
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getBleet();

    document.addEventListener(
      'beforeunload',
      sessionStorage.removeItem('bleeter-message')
    );
  }

  render() {
    const { bleet, loading, message } = this.state;

    if (loading) {
      return <LoadingArea />;
    }

    return (
      <div className='container text-light mt-2  pb-5'>
        <a href='/bleeter' className='btn btn-secondary mb-2'>
          <img
            style={{ width: '20px', marginRight: '5px' }}
            src='/icons/internal/go_back.svg'
            alt='go_back'
          />
          Go Back
        </a>
        {message ? <SuccessMessage message={message} dismiss /> : null}
        <div>
          <h3 className='pb-3 border-bottom'>
            {bleet.title}

            <div className='float-right'>
              {getSession().username === bleet.uploaded_by ? (
                <a
                  href={'/bleet/' + this.props.match.params.bleetId + '/edit'}
                  className='btn btn-success'
                  type='button'>
                  Edit Bleet
                </a>
              ) : (
                <button
                  className='btn btn-primary ml-2'
                  onClick={this.likeBleet}>
                  Like
                </button>
              )}
            </div>
          </h3>
          <span className='float-right'>
            {bleet.uploaded_at} | @{bleet.uploaded_by} | {bleet.likes}
            {bleet.likes === 1 ? ' Like' : ' Likes'}
          </span>
        </div>
        <div className='mt-5'>
          <ReactMarkdown source={bleet.description} escapeHtml={true} />
        </div>
        <div className='mt-5'>
          {bleet.file_dir !== '' ? (
            <img
              style={{ maxWidth: '85%' }}
              src={`${backendURL}/bleeter-pictures/${bleet.file_dir}`}
              alt=''
            />
          ) : null}
        </div>
      </div>
    );
  }
}
