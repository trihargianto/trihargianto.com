import React from "react"
import PropTypes from "prop-types"
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share"

const Share = ({ socialConfig }) => (
  <React.Fragment>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: 50,
      }}
    >
      <span style={{ height: 32 }}>Bagikan: &nbsp;</span> <br />
      <FacebookShareButton
        url={socialConfig.config.url}
        quote={socialConfig.config.title}
        hashtag={""}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>{" "}
      &nbsp;
      <TwitterShareButton
        url={socialConfig.config.url}
        title={socialConfig.config.title}
        via={socialConfig.twitter}
        hashtag={""}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>{" "}
      &nbsp;
      <LinkedinShareButton
        url={socialConfig.config.url}
        title={socialConfig.config.title}
        summary={socialConfig.config.description}
        source={socialConfig.config.url}
        hashtag={""}
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  </React.Fragment>
)

Share.propTypes = {
  socialConfig: PropTypes.shape({
    twitter: PropTypes.string.isRequired,
    config: PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  }).isRequired,
}

export default Share
