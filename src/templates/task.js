import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout"
import Seo from "../components/seo"

const Task = ({ data }) => {
  const node = data.nodeTask;

  return (
    <Layout>
       <Seo title={ node.title } />
        <Link to="/tasks/">
        <h4>Back to All Tasks</h4>
      </Link>
      <h1>{ node.title }</h1>
    <img src={ 'https://fridayapp.cu.ma'+node.relationships.field_task_thumbnail.uri.url } alt={ node.field_task_thumbnail.alt }
      />
      <strong>{ node.field_task_date }</strong>
      <div dangerouslySetInnerHTML={{ __html: node.body.processed }}
      />
    </Layout>
  );
};

Task.propTypes = {
  data: PropTypes.object.isRequired,
}

export const query = graphql `
query($TaskId: String!) {
  nodeTask(id: { eq: $TaskId }) {
          body {
            processed
            value
          }
          title
          field_task_date(formatString: "DD-MMM-YYYY h:m:s")
          field_task_thumbnail {
            alt
          }
          relationships {
            field_task_thumbnail {
              uri {
                url
              }
            }
          }
           path {
            alias
          }
          id
        }
      }
`;

export default Task;