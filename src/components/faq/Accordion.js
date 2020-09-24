import React, { Component } from "react";
import "./index.scss";
export default class Accordion extends Component {
  state = {
    accordionItems: ""
  };

  // component will mount
  componentWillMount() {
    let accordion = [];

    this.props.data.forEach(i => {
      accordion.push({
        title: i.title,
        content: i.content,
        open: false
      });
    });

    this.setState({
      accordionItems: accordion
    });
  }

  // handleClick
  handleClick = i => {
    const newAccordion = this.state.accordionItems.slice();
    const index = newAccordion.indexOf(i);

    newAccordion[index].open = !newAccordion[index].open;
    this.setState({ accordionItems: newAccordion });
  };

  render() {
    const sections = this.state.accordionItems.map(i => (
      <div key={this.state.accordionItems.indexOf(i)}>
        <div className="title" onClick={() => this.handleClick(i)}>
          <div className="arrow-wrapper">
            <i
              className={
                i.open ? "fa fa-angle-down fa-rotate-180" : "fa fa-angle-down"
              }
            ></i>
          </div>
          <span className="title-text">{i.title}</span>
        </div>
        <div>
          {i.open ? (
            <div
              className="content"
              // className={className={i.open ? "content content-open" : "content"}
              //   "content-text content-text-open" : "content-text"
              // }
            >
              ${i.content}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    ));

    console.log(sections, "sections");
    return <div className="accordion">{sections}</div>;
  }
}
