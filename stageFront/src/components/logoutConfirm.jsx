const LogoutConfirm = ({logout, isLoggingOut}) => {

    return (
        <div className="absolute top-0 left-0 z-50 w-full h-full flex flex-col justify-center items-center bg-slate-500/80">
            <div className="card w-1/4 bg-base-200 text-content text-black">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Confirmer Logout</h2>
                    <p>Voulez-vous sortir de votre session?</p>
                    <div className="w-full mt-3 flex justify-around">
                        <button className="btn btn-primary" onClick={logout}>Accepter</button>
                        <button className="btn btn-error" onClick={()=>isLoggingOut(false)}>Refuser</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogoutConfirm;