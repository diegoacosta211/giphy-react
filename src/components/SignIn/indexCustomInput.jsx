import { useState } from 'react';
import FormInput from '../FormInput';
import Spinner from '../Spinner';
import useUser from '../../hooks/useUser';
import Message from '../Message/Message';

export default function SignIn() {
  const [state, setState] = useState({
    email: '',
    password: ''
  });
  const { user, login, loginWithGoogle, isLoggedIn, loading, error, message } = useUser();

  const handleSubmit = ev => {
    const { email, password } = state;
    ev.preventDefault();
    login({email, password});
  }

  const handleSubmitGoogle = ev => {
    ev.preventDefault();
    loginWithGoogle();
  }

  const handleChange = name => ev => setState( state => ({...state, [name]: ev.target.value }))

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-wide mb-7">
        Login { isLoggedIn ? user.displayName : null }
      </h2>
      {
        message ?
        <div className="mb-5">
          <Message error={error} message={message} />
        </div> :
          null
      }
      <form className="" action="" onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          id="email"
          value={state.email}
          label="Email"
          onChange={handleChange('email')}
          required
        />
        <FormInput
          type="password"
          name="password"
          id="password"
          value={state.password}
          label="Password"
          onChange={handleChange('password')}
          required
        />
        {
          loading ?
            <div className="flex justify-center flex-grow">
              <Spinner />
            </div> :
            <div className="flex flex-col items-center justify-center flex-grow">
              <button type="submit" className="px-5 py-3 font-semibold bg-purple-500 text-white focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-transparent transition-all">Sign in</button>
              <p className="my-5 text-gray-400">
                - OR conect with social media -
              </p>
              <button onClick={handleSubmitGoogle} type="button" className="px-5 py-3 font-semibold bg-purple-500 text-white focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-transparent transition-all">Sign in with Google</button>
            </div>
        }
      </form>
    </div>
  )
}
