import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Img from "gatsby-image"

class DocPages extends Component {
    render() {
        console.log(this.props.data.contentfulDocumentation.description)
        const { title, createdAt, icon, description } = this.props.data.contentfulDocumentation
        return (
            <div>
                <h1 style={{
                    borderBottom: '1px solid #ccc',
                    paddingBottom: '0.5rem'
                }}>
                    {title}
                </h1>
                <p>{createdAt}</p>
                <hr />
                <div dangerouslySetInnerHTML={{__html:description.childMarkdownRemark.html}} />
            </div>
        )
    }
}

DocPages.PropTypes = {
    data: PropTypes.object.isRequired
}

export default DocPages

export const pageQuery = graphql`
    query docPages($slug: String!){
        contentfulDocumentation(slug: {eq: $slug}) {
            title
            createdAt(formatString: "MMMM DD, YYYY")
            description {
                childMarkdownRemark {
                    html
                }
            }
        }
    }
`