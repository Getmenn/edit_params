import { ChangeEvent, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css'

type typeParam = "text" | "number" | "string[]"
type valueParam = string | number | string[]

interface ParamValue {
  id: number;
  value: valueParam;
  type: typeParam;
}

interface Param {
  paramId: number;
  name: string;
}

interface IProps {
  fields: ParamValue[];
  setFields: (fields: ParamValue[]) => void;
}

// данные для полей
const fieldsStatic: ParamValue[] = [
  {
    id: 1,
    value: 'jacket',
    type: 'text'
  },
  {
    id: 2,
    value: ['S', 'M', 'L'],
    type: 'string[]'
  },
  {
    id: 3,
    value: 5,
    type: 'number'
  },
  {
    id: 4,
    value: 5,
    type: 'string[]'
  },
]

// данные для заголовков
const labels: Param[] = [
  {
    paramId: 1,
    name: 'name'
  },
  {
    paramId: 2,
    name: 'size'
  },
  {
    paramId: 3,
    name: 'quantity'
  },
  {
    paramId: 4,
    name: 'error'
  },

]

// Предупреждение
const Warning = () =>  (
  <h1>Значение value не соответствует type</h1>
)

// обработчик для вывода полей в зависимости от типа
const Fields = ({ fields, setFields }: IProps) => {
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    setFields(fields.map(el => {
      if (el.id === id) {
        return {...el, value: e.target.value}
      } else {
        return el
      }
    }))
  }

  return (
    <>
      {fields.map((el: ParamValue) => {
        switch (el.type) {
          case 'number':
            const statusNumber = isNaN(Number(el.value))
            return !statusNumber
              ? (
                <input
                  key={el.id}
                  type="number"
                  value={statusNumber ? 0 : Number(el.value)}
                  className='item'
                  onChange={(e) => handleChange(e, el.id)}
                />
              )
              : <Warning />
          case 'string[]':
            return Array.isArray(el.value)
              ? (
                <select
                  onChange={e => console.log(e.target.value)}
                  key={el.id}
                  className='item'
                >
                  {el.value.map(el => (
                    <option value={el}>{el}</option>
                  ))}
                </select>
              )
              : <Warning />
          case 'text':
            return (
              <input
                key={el.id}
                type="text"
                value={el.value}
                className='item'
                onChange={(e) => handleChange(e, el.id)}
              />
            )
          default:
            return <Warning />
        }
      })}
    </>
  )
}

// функция для определения массива и добавления ему скобок
const checkArray = (data: valueParam) => {
  const isArray = Array.isArray(data)
  return isArray
    ? (
      data.reduce((ac, el) => ac + ` ${el} `, '[') + ']'
    )
    : data
}

const App = () => {
  const [visable, setVisable] = useState<boolean>(false)
  const [fields, setFields] = useState<ParamValue[]>(fieldsStatic)

  return (
    <div className='wrapper'>
      
      <div className="box">
        {
          labels.map((el) => (
            <label
              key={el.paramId}
              className='item'
            >
              {el.name}
            </label>
          ))
        }
      </div>

      <div className="box">
        <Fields fields={fields} setFields={setFields} />
      </div>
      
      <button
        onClick={() => setVisable(!visable)}
        className='button'
      >
        Click
      </button>

      {visable && // вывод типов полей и заголовков
        <div className='types'>
          <div className='listBox'>
            <h3>fields</h3>
            {fields.map((item) => (
              <ul key={item.id}>
                <li>id: {item.id}</li>
                <li>value: {checkArray(item.value)}</li>
                <li>type: {item.type}</li>
              </ul>
            ))}
          </div>

          <div className='listBox'>
            <h3>labels</h3>
            {labels.map((item) => (
              <ul key={item.paramId}>
                <li>paramId: {item.paramId}</li>
                <li>name: {item.name}</li>
              </ul>
            ))}
          </div>
        </div>
      }
    </div>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App/>
);



