const Button = ({children,className}) => {
  return (
    <button className={`${className} px-5 py-2`}>{children}</button>
  )
}

export default Button