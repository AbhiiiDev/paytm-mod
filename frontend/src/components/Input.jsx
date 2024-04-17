

const Input = ({type,label,onChange}) => {
  return (
 
    <label className="form-control w-full max-w-xs ">
    <div className="label font-semibold">
      <span className="label-text ">{label}</span>
    </div>
    <input type={type} onChange={onChange} placeholder="Enter Here" className="input input-bordered w-full max-w-xs" />
  </label>
 
  )
}

export default Input
