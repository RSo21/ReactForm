import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

class App extends Component {
  state = {
    formState: {
      name: "",
      number: "",
      netPrice: "",
      tax: "",
      brutto: "",
      mode: true,
      nameError: "",
      numberError: "",
      netPriceError: ""
    },
    rows: [
      {
        name: "Lustro",
        number: 1,
        netPrice: 100,
        tax: 8,
        brutto: 108,
      }
    ]
  };

     resetFormState = () => {
      this.setState({
         formState: {
            name: "",
            number: "",
            netPrice: "",
            tax: "",
            brutto: "",
            mode: true,
         }
      });
   };

  onChange = e => {
    this.setState({
      formState: {
        ...this.state.formState,
        [e.target.name]: e.target.value
      }
    });
    //console.log(this.state.formState.number);
  };


  handleSubmit = e => {
    e.preventDefault();

    const { rows, formState } = this.state;

    const name = event.target.querySelector("input[name='name']").value;
    const number = event.target.querySelector("input[name='number']").value;
    const netPrice = event.target.querySelector("input[name='netPrice']").value;
    const tax = event.target.querySelector("#select").value;
    const brutto = parseInt(number) * ((parseInt(tax)/100) * parseInt(netPrice) + parseInt(netPrice));
    
    if (formState.mode === true) {
      this.setState({
        rows: [
          ...this.state.rows,
          {
            name,
            number,
            netPrice,
            tax,
            brutto,
          }
        ]
      });
    }
    this.resetFormState();
  };

  render() {
    const { formState, rows } = this.state;

    return (
      <div>
        <Form
          formState={formState}
          onChange={this.onChange}
          handleSubmit={this.handleSubmit}
        />
        <Table rows={rows} />
      </div>
    );
  }
}

const Table = ({ rows = [] }) => {
  return (
    <div>
      <div className="table">
        <div className="table-header">
          <div className="row">
            <div className="column">Nazwa produktu</div>
            <div className="column">Ilość</div>
            <div className="column">Cena netto</div>
            <div className="column">Podatek %</div>
            <div className="column">Brutto</div>
          </div>
        </div>
        <div className="table-body">
          {rows.map((row, key) => {
            return (
              <div className="row">
                <div className="column">{row.name}</div>
                <div className="column">{row.number}</div>
                <div className="column">{row.netPrice} zł</div>
                <div className="column">{row.tax} %</div>
                <div className="column">{row.brutto} zł</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const NameField = ({ label = "", name = "", value = "", onChange }) => {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input type="text" name={name} value={value} onChange={onChange} />
    </div>
  );
};

const Field = ({ label = "", name = "", value = "", onChange }) => {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input type="number" name={name} value={value} onChange={onChange} />
    </div>
  );
};

const TaxField = ({ label = "", name = "", value = "", onChange }) => {
  return (
    <div>
      <label htmlFor={value}>{label} 
        <select id="select" name={name} value={value} onChange={onChange}>
          <option value="8">8</option>
          <option value="23">23</option>
          <option value="32">32</option>
        </select>
      </label>
    </div>
  );
};

const Form = ({ formState = [], onChange, handleSubmit}) => {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <fieldset>
      <NameField
          name="name"
          label="Nazwa produktu "
          value={formState.name}
          onChange={onChange}
        />
        <Field
          name="number"
          label="ilość "
          value={formState.number}
          onChange={onChange}
        />
        <Field
          name="netPrice"
          label="Cena netto "
          value={formState.netPrice}
          onChange={onChange}
        />
        <TaxField
          name="tax"
          label="Podatek VAT %"
          value={formState.tax}
          onChange={onChange}
        />
      </fieldset>
      <button className="btn">Dodaj</button>
    </form>
  );
};

render(<App />, document.getElementById('root'));

