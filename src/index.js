import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import './index.css';


function Tweet({ tweet }) {
    return (
        <div className="tweet">
            <Avatar hash={tweet.gravatar}/>
            <div className="content">
                <NameWithHandle author={tweet.author} /><Time time={tweet.timestamp}/>
                <Message text={tweet.message}/>
                <div className="buttons">
                    <ReplyButton />
                    <RetweetButton count={tweet.retweets} />
                    <LikeButton count={tweet.likes} />
                    <MoreOptionsButton />
                </div>
            </div>
        </div>
    );
}

Tweet.propTypes = {
    tweet: PropTypes.shape({
        gravatar: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    retweets: PropTypes.number.isRequired,
    timestamp: PropTypes.string.isRequired,
    author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        handle: PropTypes.string.isRequired
    }).isRequired
    })
}



function Avatar({hash}) {
    var url = `https://www.gravatar.com/avatar/${hash}`;
    return (
        <img
            src={url}
            className="avatar"
            alt="avatar"
        />
    );
}

function Message({text}) {
    return (
        <div className="message">
            {text}
        </div>
    );
}

function NameWithHandle({author}) {
    const { name, handle } = author;
    return (
        <span className="name-with-handle">
            <span className="name">{name}</span>
            <span className="handle">@{handle}</span>
        </span>
    );
}

NameWithHandle.propTypes = {
    author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        handle: PropTypes.string.isRequired
    }).isRequired
}


const Time = ({time}) => {
    const timeString = moment(time).fromNow();
    return(
        <span className="time">
            {timeString}
        </span>
    );
};

const ReplyButton = () => (
    <i className="fa fa-reply reply-button"/>
);



function Count ({ count }) {
    if(count > 0) {
        return (
            <span className="retweet-count">
                {count}
            </span>
        );
    } else {
        return null;
    }
}


const RetweetButton = ({ count }) => (
    <span className="retweet-button">
        <i className="fa fa-retweet retweet-button"/>
        <Count count={count}/>
    </span>
);

RetweetButton.propTypes = {
    count: PropTypes.number
};



const LikeButton = ({ count }) => (
    <span className="like-button">
        <i className="fa fa-heart like-button"/>
            <span className="like-count">
                {count ? count : null}
            </span>
    </span>
);



LikeButton.propTypes = {
    count: PropTypes.number
};

const MoreOptionsButton = () => (
    <i className="fa fa-ellipsis-h more-options-button"/>
);


var testTweet = {
    message: "Something about cats.",
    gravatar: "xyz",
    author: {
        handle: "catperson",
        name: "IAMA Cat Person"
    },
    likes: 2,
    retweets: 10,
    timestamp: "2016-07-30 21:24:37"
};



ReactDOM.render(<Tweet tweet={testTweet}/>,
    document.querySelector('#root'));