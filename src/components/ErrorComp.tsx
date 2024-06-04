interface ErrorComp {
    top?: boolean,
    darkColor?: boolean
}

const ErrorComp = ({ top, darkColor }: ErrorComp) => (
    <div className={`flex flex-col items-center justify-center my-10 w-full ${top ? 'mt-10' : "h-full"}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${!darkColor ? 'text-slate-100': 'text-slate-900'} w-16 h-16`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
        <p className={`${!darkColor ? 'text-slate-100': 'text-slate-900'} font-bold text-lg`}>Oopsy :/</p>
    </div>
)

export default ErrorComp