import React from "react";

function Form(props) {

    return (
      <form onSubmit={props.method}>
        <select name="city">
            <option value="Nizhny Novgorod">Нижний Новгород</option>
            <option value="Moscow">Москва</option>
            <option value="Murmansk">Мурманск</option>
            <option value="Saint Petersburg">Санкт-Петербург</option>
        </select>
        <button>Получить погоду</button>
      </form>
    );
}

export default Form;