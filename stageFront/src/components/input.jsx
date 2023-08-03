const Input = ({label, type, placeholder}) => {
    return (
        <>
            <div className="form-control w-full max-w-xs ">
                <label className="label">
                    <span className="label-text">{label}</span>

                </label>
                <input type={type} placeholder={placeholder} className="input input-bordered w-full max-w-xs text-center" />

            </div>
        </>
    );
}

export default Input;