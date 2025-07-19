const Button = ({children,className,onClick}) => {
  return (
    <button onClick={onClick} className={`${className} px-5 py-2`}>{children}</button>
  )
}

export default Button