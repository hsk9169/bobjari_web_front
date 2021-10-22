export default function Login(props) {
    return (
        <div>
            <h1>Login</h1>
            <button onClick={() => {
                setTimeout(() => {
                    props.history.push('/');
                }, 2000);
        }} >로그인</button>
      </div>
    );
}