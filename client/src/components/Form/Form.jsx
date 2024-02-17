import inputs from "./Form.json";
import "./Form.css";

export const Form = ({ handleChange, handleClick }) => {
  return (
    <div className="Form">
      <form className="Form-form">
        <h3 className="Form-heading">Generate PDF</h3>

        <div className="Form-input-content">
          {inputs.map((input, id) => (
            <input
              className="Form-input"
              key={id}
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              autoComplete={input.autoComplete}
              onChange={handleChange}
            />
          ))}
        </div>

        <button className="Form-button" type="submit" onClick={handleClick}>
          Download PDF
        </button>
      </form>
    </div>
  );
};
