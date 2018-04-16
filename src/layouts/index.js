import React from 'react'
import Link from 'gatsby-link'
import Img from "gatsby-image"

const Documentation = ({node}) => {
    return (
        <div style={{
            marginBottom: '1.5rem',
            padding: '1.5rem',
            border: '1px solid #ccc'
        }}>
            <h3><Link to={node.slug}>{node.title}</Link></h3>
            <div>
                <div>
                    <Img resolutions={node.icon.resolutions}/>
                </div>
                <div dangerouslySetInnerHTML={{__html:node.description.childMarkdownRemark.html}} />
            </div>
        </div>
    )
}

const IndexPage = (props) => {

    console.log(props.data.allContentfulDocumentation)
    return (
        <div>
            {props.data.allContentfulDocumentation.edges.map((edge) => <Documentation key={edge.node.id} node={edge.node} />)}
        </div>
    )
}

export default IndexPage

export const pageQuery = graphql`
    query pageQuery {
        allContentfulDocumentation(
            filter: {
                node_locale: {eq: "en-US"}
            },
            sort: {
                fields: [createdAt], order: DESC
            }
        ) {
            edges {
                node {
                    id
                    title
                    slug
                    createdAt(formatString: "MMMM DD, YYYY")
                    icon {
                        resolutions(width: 50) {
                            ...GatsbyContentfulResolutions
                        }
                    }
                    description {
                        childMarkdownRemark {
                            html
                        }
                    }
                }
            }
        }
    }
`