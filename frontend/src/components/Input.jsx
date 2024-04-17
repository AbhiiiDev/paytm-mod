

const Input = ({label}) => {
  return (
 
    <label className="form-control w-full max-w-xs mb-2">
    <div className="label font-light">
      <span className="label-text mb-1 text-sm font-semibold">{label}</span>
    </div>
    <input type="text" placeholder="Enter Here" className="input input-bordered w-full max-w-xs" />
  </label>
 
  )
}

export default Input
