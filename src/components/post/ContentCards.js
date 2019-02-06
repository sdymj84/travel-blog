import React from 'react'
import { Card } from 'react-bootstrap'

const ContentCards = (props) => {
  const { contents } = props
  return (
    <div>
      {contents.map((content, i) => {
        return (
          <Card key={i}>
            <Card.Img variant="top" src={content.image} />
            <Card.Body>
              <Card.Text>
                <span dangerouslySetInnerHTML={{ __html: content.body }}></span>
              </Card.Text>
            </Card.Body>
          </Card>
        )
      })}
    </div>
  )
}

export default ContentCards
