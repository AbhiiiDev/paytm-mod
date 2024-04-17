import Input from '../components/Input'

const Main = () => {
  return (
    <div className="m-5 p-5">
      <span className="font-bold text-xl">You Balance</span> :{" "}
      <span className="font-semibold"> Rs. 5000</span>
      <div className="mt-4 mb-4">
        <span className="text-2xl mr-2">Users</span>
        <input
          type="text"
          className="border-2 border-gray-500 w-1/2 rounded-md p-1"
          placeholder="search users"
        />
      </div>
      <hr />
      <div className="mt-4 grid grid-flow-col">
        <div className="avatar placeholder flex items-center col-span-11">
          <div className="bg-neutral text-neutral-content rounded-full w-12 ">
            <span>AY</span>
          </div>
          <span className="m-2">Abhishek Verma</span>
        </div>
        <button className="btn btn-neutral col-span-1" onClick={()=>document.getElementById('my_modal_1').showModal()}>Send Money</button>
        <dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h2 className="font-bold text-2xl text-center">Send Money!</h2>

    <div className="avatar placeholder flex items-center col-span-11">
          <div className="bg-neutral text-neutral-content rounded-full w-12 ">
            <span>AY</span>
          </div>
          <span className="m-2 font-semibold text-xl">Abhishek Verma</span>
        </div>
        <p className="font-semibold">Amount (in Rs)</p>
       <div className='flex flex-col justify-center'>
        <Input/>
        <button className='btn mt-4 btn-success w-1/2'>Send</button>
        </div>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
      </div>
    </div>
  );
};

export default Main;
