import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"


const Tasks = ({ data }) => {
  const tasks = data.allNodeTask.nodes;

return (
 <Layout>
   <Seo title="Tasks" />
    <Link to="/">
        <h4>Back to Home</h4>
      </Link>
 <h1>All Tasks</h1>
	
	 {tasks.map(node =>(

<div style={{ display: `flex`}}>
<img  style={{ width: `100%`, height: `200px`, maxWidth: `280px`, marginRight: `15px` }} src={ 'https://fridayapp.cu.ma'+node.relationships.field_task_thumbnail.uri.url } alt={ node.field_task_thumbnail.alt }/> 
<div>
<h2><Link to={node.path.alias}>{ node.title }</Link></h2>
<strong>{ node.field_task_date }</strong>
<div dangerouslySetInnerHTML={{ __html: node.body.processed.substring(0, 150) }} ></div> 
<Link to={node.path.alias}>Read More</Link>
</div>
</div>
))}
</Layout>
);
}

export const query = graphql`
query Tasks {
  allNodeTask(sort: {fields: created, order: DESC}) {
      nodes {
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
          pid
        }
        id
      }
    }
}
`

export default Tasks