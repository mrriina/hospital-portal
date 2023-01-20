import React from 'react';
import Axios from 'axios';

class DoctorList extends React.Component {
    constructor(props) {
        super();
        this.speciality = props.speciality;
        
        this.state = {
            doctors: null
        };    
    }

    componentDidMount() {
        Axios.post("http://localhost:3001/getDoctors", {
                speciality: this.speciality,
            }).then((response) => {
                this.setState({
                    doctors: response.data.map(item => {
                      return (
                        <tr>
                            <button key={item.iddoctor} 
                                    value={item.iddoctor} 
                                    type="button" 
                                    className="btn btn-light" 
                                    onClick={(e)=>{this.props.func(e.target.value);}}>
                                {item.surname} {item.name} {item.patronymic}
                            </button>
                        </tr>
                      );
                    })
                  });
            });
      }
    
    render() {
        if (!this.state.doctors) {
            return null;
          } else {
            return (
              <table>
                <tbody>{this.state.doctors}</tbody>
              </table>
            );
          }
    }
}

export default DoctorList;