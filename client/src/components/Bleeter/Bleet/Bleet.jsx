import React, { Component } from 'react';
import { backendURL } from '../../../config/config';
import ReactMarkdown from 'react-markdown';
import LoadingArea from '../../Partials/LoadingArea';
import SuccessMessage from '../../Partials/Messages/SuccessMessage';
import { getSession } from '../../Auth/getSession';
import { handleRequest } from '../../../functions';
import lang from '../../../language.json';


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
    handleRequest(`/bleeter/${this.props.match.params.bleetId}`, 'GET')
      .then((res) => {
        this.setState({
          bleet: res.data.bleet[0],
          loading: false,
        });
        document.title = res.data.bleet[0].title + ' - Bleeter';
      })
      .catch((e) => console.log(e));
  };

  likeBleet = () => {
    handleRequest(`/bleeter/${this.props.match.params.bleetId}/like`, 'POST')
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
          {lang.bleeter.go_back}
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
                  {lang.bleeter.edit_bleet}
                </a>
              ) : (
                <button
                  className='btn btn-primary ml-2'
                  onClick={this.likeBleet}>
                  {lang.global.like}
                </button>
              )}
            </div>
          </h3>
          <span className='float-right'>
            {bleet.uploaded_at} | @{bleet.uploaded_by} | {bleet.likes}
            {bleet.likes === 1 ? ` ${lang.global.like}` : ` ${lang.global.likes}`}
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
