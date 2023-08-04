import { useFormContext } from "react-hook-form";
const Input = ({label, type, placeholder,refreg,classname}) => {
    const {register, formState: {errors}}= useFormContext();
    return (
        <>
            <div className="form-control w-full max-w-xs ">
                <label className="label">
                    <span className={`${classname} label-text ${errors[refreg] ? "text-error font-bold" : ""}`}>{
                        errors[refreg]? errors[refreg].message : label
                    }</span>
                </label>
                <input 
                type={type} 
                placeholder={placeholder}
                className="input input-bordered w-full max-w-xs text-center"
                {...register(refreg)} 
                />
            </div>
        </>
    );
}

export default Input;