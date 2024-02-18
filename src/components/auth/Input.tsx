
const Input = ({ value, action, type, placeholder }) => {

  const capitalizeFirstLetter = (string) => {
    return string && string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className='Input'>
      <label htmlFor="ExampleEmailInput">{capitalizeFirstLetter(value)}</label> 
      <input
        type={type}
        id={value}
        name={value}
        placeholder={placeholder}
        onChange={action && action}
      />
    </div>

  )
}

export default Input