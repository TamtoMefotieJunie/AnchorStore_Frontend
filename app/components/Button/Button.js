'use client'

export default function Button({variant,icon,label,onClick}){
  
  const baseStyles = "flex justify-center px-3 py-1.5 text-lg font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
  const variantStyles = {
    filled:" w-full bg-tertiary  rounded-md text-white hover:bg-complementary",
    outline:"w-[15%] text-center text-white rounded-xl bg-tertiary border-slate-600 hover:bg-tertiary/70 hover:text-secondary ",
    text:"bg-white rounded-lg shadow-xl text-tertiary hover:bg-gray-200 hover:text-red-100",
    disabled:"disabled:bg-gray-300 pointer-events-none",
    secondary:"w-[60%] bg-secondary text-white rounded-[50] h-[50] text-center items-center hover:bg-secondary/70"
  }
  let buttonClasses = `${baseStyles} ${variantStyles[variant]}`;
  if(icon){
    buttonClasses += "flex items-center justify-center"
  }

  return (
    
    <button
    type="button"
    className={buttonClasses} onClick={onClick}>
     <span className="mr-2">{icon}</span>
      {label}
    </button>

    
  )
}