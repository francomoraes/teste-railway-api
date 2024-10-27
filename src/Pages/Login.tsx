import useUserStore from '../store/useUserStore';

const Login = () => {
    const { setUser } = useUserStore();

    return (
        <div>
            <h2 className='custom-h2'>Login</h2>
            <button
                className='custom-link'
                onClick={() => setUser({ name: 'John Doe', email: 'johndoe@mail.com' })}
            >
                Set user John Doe
            </button>
        </div>
    );
};

export default Login;
