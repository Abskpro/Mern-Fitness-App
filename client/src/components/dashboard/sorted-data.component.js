import React from 'react';

class SortedData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: 0,
    };
  }

  render() {
    return (
      <div>
        <button className="btn" id="inc">
          ◄
        </button>
        <input type="text" value={this.state.date} />
        <button className="btn" id="dec">
          ►
        </button>
      </div>
    );
  }
}

export default SortedData;
